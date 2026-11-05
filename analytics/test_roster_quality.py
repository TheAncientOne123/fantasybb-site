import unittest
from types import SimpleNamespace
from roster_quality import build_quality, measure, rate


def player(average, games, actual_average=0, actual_games=0):
    return SimpleNamespace(stats={
        '2027_projected': {'applied_avg': average, 'total': {'GP': games}},
        '2027_total': {'applied_avg': actual_average, 'total': {'GP': actual_games}},
    })


class RosterQualityTests(unittest.TestCase):
    def setUp(self):
        self.rosters = [
            {'id': 'a', 'draftedRoster': [{'playerId': 1}], 'currentRoster': [{'playerId': 2}]},
            {'id': 'b', 'draftedRoster': [{'playerId': 2}], 'currentRoster': [{'playerId': 1}]},
        ]

    def test_freezes_first_preseason_projection(self):
        before = build_quality('2027', self.rosters, {1: player(40, 82), 2: player(30, 82)}, 'first')
        after = build_quality('2027', self.rosters, {1: player(10, 82), 2: player(60, 82)}, 'later', before)
        self.assertEqual(before['projection'], after['projection'])
        self.assertIsNone(after['performance'])

    def test_never_labels_retrospective_projection_as_original(self):
        data = build_quality('2027', self.rosters, {1: player(40, 82, 20, 40), 2: player(30, 82, 30, 40)}, 'today')
        self.assertIsNone(data['projection'])
        self.assertEqual(data['projectionStatus'], 'not-captured')

    def test_improvement_uses_same_actual_reference_and_window(self):
        data = build_quality('2027', self.rosters, {1: player(99, 82, 20, 40), 2: player(1, 82, 30, 40)}, 'today')
        a = data['performance']['teams'][0]
        self.assertGreater(a['improvement'], 0)
        self.assertEqual(a['improvement'], round(a['final']['score'] - a['drafted']['score'], 1))
        self.assertEqual(data['performance']['windowGames'], 40)

    def test_missing_player_does_not_become_a_zero_rating(self):
        row = measure([1, 2], {'1': {'pointsPerGame': 20, 'games': 82}}, 82)
        self.assertIsNone(row['rawValue'])
        self.assertIsNone(row['score'])
        self.assertEqual(row['knownPlayers'], 1)

    def test_unidentified_slots_are_not_removed_from_coverage(self):
        row = measure([1, None, None], {'1': {'pointsPerGame': 20, 'games': 82}}, 82)
        self.assertEqual(row['totalPlayers'], 3)
        self.assertEqual(row['knownPlayers'], 1)
        self.assertIsNone(row['rawValue'])

    def test_availability_and_depth_affect_measure(self):
        full = measure([1, 2], {'1': {'pointsPerGame': 40, 'games': 82}, '2': {'pointsPerGame': 20, 'games': 82}}, 82)
        injured = measure([1, 2], {'1': {'pointsPerGame': 40, 'games': 41}, '2': {'pointsPerGame': 20, 'games': 82}}, 82)
        self.assertEqual(full['rawValue'], 30)
        self.assertEqual(injured['rawValue'], 20)

    def test_equal_rosters_tie_at_middle_and_zero_improvement(self):
        rosters = [{'id': 'a', 'draftedRoster': [{'playerId': 1}], 'currentRoster': [{'playerId': 1}]},
                   {'id': 'b', 'draftedRoster': [{'playerId': 2}], 'currentRoster': [{'playerId': 2}]}]
        data = build_quality('2027', rosters, {1: player(20, 82, 20, 82), 2: player(20, 82, 20, 82)}, 'today')
        for row in data['performance']['teams']:
            self.assertEqual(row['drafted']['score'], 50)
            self.assertEqual(row['improvement'], 0)

    def test_final_evaluation_is_immutable(self):
        before = build_quality('2027', self.rosters, {1: player(20, 82, 20, 82), 2: player(30, 82, 30, 82)}, 'end', is_final=True)
        after = build_quality('2027', self.rosters, {1: player(50, 82, 99, 82), 2: player(5, 82, 1, 82)}, 'later', before)
        self.assertEqual(before['performance'], after['performance'])

    def test_missing_old_stats_cannot_enable_hindsight_forecast(self):
        data = build_quality('2027', self.rosters, {1: player(20, 82), 2: player(30, 82)}, 'today', allow_projection=False)
        self.assertIsNone(data['projection'])
        self.assertEqual(data['projectionStatus'], 'not-captured')

    def test_snapshot_from_another_season_is_rejected(self):
        with self.assertRaises(ValueError):
            build_quality('2027', self.rosters, {}, 'today', {'seasonId': '2026', 'methodVersion': 'fantasy-roster-v1'})


if __name__ == '__main__':
    unittest.main()
