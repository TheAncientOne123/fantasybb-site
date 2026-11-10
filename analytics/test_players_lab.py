import unittest

from players_lab import build_window, classify, games_next_7, replacement_level, usage_proxy


def window(fpts, gp=10, minutes=30.0, fg=(5.0, 10.0), tp=(1.0, 3.0)):
    return {'gp': gp, 'min': minutes, 'fpts': fpts, 'fgm': fg[0], 'fga': fg[1], 'fgPct': fg[0] / fg[1],
            'tpa': tp[1], 'tpPct': tp[0] / tp[1]}


def player(status='FA', injury='ACTIVE', owned=10.0, games=3, **windows):
    return {'status': status, 'injuryStatus': injury, 'percentOwned': owned, 'gamesNext7': games,
            'windows': windows}


def kinds(p, replacement=25.0, projected_top=30.0):
    return [label['kind'] for label in classify(p, replacement, projected_top)]


class WindowTests(unittest.TestCase):
    def test_builds_averages_stocks_and_usage(self):
        w = build_window({'applied_avg': 30.04, 'total': {'GP': 5},
                          'avg': {'PTS': 20, 'STL': 1.5, 'BLK': 0.5, 'FGM': 7, 'FGA': 14, 'FTM': 4, 'FTA': 5,
                                  '3PM': 2, '3PA': 0, 'TO': 2, 'MIN': 36}})
        self.assertEqual(w['stocks'], 2.0)
        self.assertEqual(w['fgPct'], 0.5)
        self.assertIsNone(w['tpPct'])  # 0 intentos → sin porcentaje, no 0%
        self.assertEqual(w['usage'], round(14 + 0.44 * 5 + 2, 1))
        self.assertEqual(w['fpts'], 30.0)

    def test_no_games_means_no_window(self):
        self.assertIsNone(build_window({'applied_avg': 0, 'total': {'GP': 0}, 'avg': {'PTS': 0}}))
        self.assertIsNone(build_window(None))

    def test_usage_needs_minutes(self):
        self.assertIsNone(usage_proxy(10, 4, 2, 0))


class LabelTests(unittest.TestCase):
    def test_streamer_requires_free_healthy_and_replacement_level(self):
        hot = {'last7': window(30, gp=3)}
        self.assertIn('streamer', kinds(player(**hot)))
        self.assertIn('streamer', kinds(player(status='WAIVERS', **hot)))
        self.assertNotIn('streamer', kinds(player(status='TEAM', **hot)))
        self.assertNotIn('streamer', kinds(player(injury='OUT', **hot)))
        self.assertNotIn('streamer', kinds(player(last7=window(20, gp=3))))

    def test_sleeper_needs_more_minutes_not_just_points(self):
        base = window(20, minutes=20)
        self.assertIn('sleeper', kinds(player(projected=base, last15=window(25, gp=5, minutes=26))))
        self.assertNotIn('sleeper', kinds(player(projected=base, last15=window(25, gp=5, minutes=21))))
        self.assertNotIn('sleeper', kinds(player(owned=60, projected=base, last15=window(25, gp=5, minutes=26))))

    def test_fluke_is_hot_shooting_without_minutes(self):
        base = window(20, minutes=25, fg=(4.0, 10.0))
        hot_shooting = window(26, gp=5, minutes=25, fg=(6.0, 10.0))
        self.assertIn('fluke', kinds(player(projected=base, last15=hot_shooting)))
        same_shooting = window(26, gp=5, minutes=25, fg=(4.0, 10.0))
        self.assertNotIn('fluke', kinds(player(projected=base, last15=same_shooting)))

    def test_slump_is_short_term_and_bust_is_season_long(self):
        projected = window(40, gp=70)
        slump = kinds(player(status='TEAM', projected=projected, season=window(36, gp=12), last15=window(28, gp=6)))
        self.assertEqual(slump, ['slump'])
        bust = kinds(player(status='TEAM', projected=projected, season=window(28, gp=12), last15=window(28, gp=6)))
        self.assertEqual(bust, ['bust'])

    def test_slump_ignores_injured_or_irrelevant_players(self):
        args = dict(status='TEAM', projected=window(40, gp=70), last15=window(25, gp=5))
        self.assertNotIn('slump', kinds(player(injury='DAY_TO_DAY', **args)))
        self.assertNotIn('slump', kinds(player(status='TEAM', projected=window(15, gp=70), last15=window(8, gp=5))))


class PoolTests(unittest.TestCase):
    def test_replacement_level_uses_rostered_players(self):
        players = [player(status='TEAM', season=window(50 - i, gp=5)) for i in range(30)]
        players.append(player(status='FA', season=window(100, gp=5)))
        self.assertEqual(replacement_level(players, team_count=2), 31)  # 20.º jugador con roster

    def test_games_next_7_counts_only_the_window(self):
        schedule = {5: {'10': [], '12': [], '16': [], '17': []}}
        self.assertEqual(games_next_7(schedule, 5, 10), 3)
        self.assertIsNone(games_next_7(schedule, 9, 10))


if __name__ == '__main__':
    unittest.main()
