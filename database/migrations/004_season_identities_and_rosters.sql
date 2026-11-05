-- Identity belongs to participation in a season, not to the franchise globally.
alter table season_teams add column display_name text;
alter table season_teams add column logo_url text;
alter table season_teams add column espn_team_id integer;

update season_teams st
set display_name = coalesce((select ts.display_name from team_seasons ts
  where ts.team_id = st.team_id and ts.season_id = st.season_id), t.display_name),
  logo_url = t.logo_url
from teams t where st.team_id = t.id;

alter table season_teams alter column display_name set not null;
create unique index season_teams_espn_identity_idx
  on season_teams (season_id, espn_team_id) where espn_team_id is not null;

-- Draft and current rosters exist before any scored matchup/statistical profile.
create table season_rosters (
  season_id text not null,
  team_id text not null,
  generated_at timestamptz not null,
  current_roster jsonb not null check (jsonb_typeof(current_roster) = 'array'),
  drafted_roster jsonb not null check (jsonb_typeof(drafted_roster) = 'array'),
  draft_picks jsonb not null check (jsonb_typeof(draft_picks) = 'array'),
  primary key (season_id, team_id),
  foreign key (season_id, team_id) references season_teams (season_id, team_id) on delete cascade
);
