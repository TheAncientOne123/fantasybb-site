import json
import os
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import generate_team_data as generator
import export_league_teams as exporter


class SeasonSyncTests(unittest.TestCase):
    def setUp(self):
        self.temp_root = Path(__file__).resolve().parent / '__pycache__'
        self.temp_root.mkdir(exist_ok=True)

    def test_renaming_preserves_espn_identity_and_historical_catalog(self):
        with tempfile.TemporaryDirectory(dir=self.temp_root) as directory:
            root = Path(directory)
            old_path = root / 'src/data/seasons/2026/teams-catalog.json'
            old_path.parent.mkdir(parents=True)
            archived = json.dumps({'teams': [{'id': 'beijing-ducks', 'espnTeamId': 8, 'displayName': '北京首钢霹雳鸭'}]})
            old_path.write_text(archived, encoding='utf-8')
            team = SimpleNamespace(team_id=8, team_name='THANOS', roster=[])
            league = SimpleNamespace(teams=[team], draft=[])
            with patch.object(generator, 'DATA_ROOT', root / 'src/data'), patch.object(exporter, 'PROJECT_ROOT', root), \
                 patch.object(exporter.league_data, 'get_team_logo_url', return_value='https://example.test/new.svg'):
                generator.known_team_ids.cache_clear()
                self.assertEqual(generator.get_team_slug(team), 'beijing-ducks')
                exporter.export_teams('2027', league=league)
                current = json.loads((root / 'src/data/seasons/2027/teams-catalog.json').read_text())
                self.assertEqual(current['teams'][0]['id'], 'beijing-ducks')
                self.assertEqual(current['teams'][0]['displayName'], 'THANOS')
                self.assertEqual(old_path.read_text(encoding='utf-8'), archived)
            generator.known_team_ids.cache_clear()

    def test_logo_refresh_writes_immutable_paths_in_its_season(self):
        with tempfile.TemporaryDirectory(dir=self.temp_root) as directory:
            root = Path(directory)
            class Response:
                status = 200
                headers = {'Content-Type': 'image/png'}
                def __init__(self, content): self.content = content
                def __enter__(self): return self
                def __exit__(self, *args): return False
                def read(self): return self.content
            with patch.object(generator, 'LOGOS_DIR', root / 'team-logos'), patch.dict(os.environ, {'YEAR': '2027'}):
                with patch.object(generator, 'urlopen', return_value=Response(b'old-photo')):
                    old = generator.download_team_logo('https://mystique-api.fantasy.espn.com/old', 'team')
                with patch.object(generator, 'urlopen', return_value=Response(b'new-photo')):
                    new = generator.download_team_logo('https://mystique-api.fantasy.espn.com/new', 'team')
                self.assertNotEqual(old, new)
                self.assertTrue(new.startswith('/team-logos/2027/'))
                self.assertEqual((root / old.lstrip('/')).read_bytes(), b'old-photo')
                self.assertEqual((root / new.lstrip('/')).read_bytes(), b'new-photo')

    def test_unscored_season_exports_draft_without_creating_rewinds(self):
        league = SimpleNamespace(teams=[], draft=[])
        with patch.object(generator.nv, 'get_league', return_value=league), \
             patch.object(generator.nv, 'get_available_weeks', return_value=[1]), \
             patch.object(generator.nv, 'has_scored_matchups', return_value=False), \
             patch.object(exporter, 'export_teams') as export, \
             patch.object(generator, '_write_stats_room_ts') as write_stats, \
             patch.dict(os.environ, {'YEAR': '2027'}):
            generator.generate_all_teams('2027')
            export.assert_called_once_with('2027', refresh_logos=True, league=league)
            write_stats.assert_not_called()


if __name__ == '__main__':
    unittest.main()
