create table if not exists seasons (
  id text primary key,
  year integer not null check (year between 2000 and 2200),
  label text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists seasons_one_active_idx
  on seasons (is_active)
  where is_active;

create table if not exists teams (
  id text primary key check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  display_name text not null,
  owner text,
  description text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists team_seasons (
  team_id text not null references teams (id) on delete cascade,
  season_id text not null references seasons (id) on delete cascade,
  display_name text not null,
  owner text,
  description text,
  record text not null default '—',
  regular_season_rank integer not null default 0 check (regular_season_rank >= 0),
  made_playoffs boolean not null default false,
  won_finals boolean not null default false,
  playoff_depth_label text not null default '—',
  longest_streaks text,
  highest_scoring_week text,
  debt_paid text not null default '—',
  longevity_key_weeks_team_avg double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (team_id, season_id),
  check (not won_finals or made_playoffs)
);

create index if not exists team_seasons_season_idx
  on team_seasons (season_id, regular_season_rank, team_id);

create table if not exists profile_achievements (
  team_id text not null,
  season_id text not null,
  position integer not null check (position >= 0),
  name text not null,
  label text,
  image_url text,
  primary key (team_id, season_id, position),
  foreign key (team_id, season_id)
    references team_seasons (team_id, season_id) on delete cascade
);

create table if not exists profile_roster_entries (
  team_id text not null,
  season_id text not null,
  roster_kind text not null check (roster_kind in ('final', 'drafted', 'longevity', 'core', 'waiver')),
  position integer not null check (position >= 0),
  player_external_id bigint,
  name text not null,
  positions_json jsonb not null default '[]'::jsonb check (jsonb_typeof(positions_json) = 'array'),
  headshot_url text,
  pro_team_abbrev text,
  team_logo_url text,
  pro_team_from_nba_catalog boolean,
  pro_team_name text,
  lineup_weeks integer check (lineup_weeks is null or lineup_weeks >= 0),
  key_piece_weeks integer check (key_piece_weeks is null or key_piece_weeks >= 0),
  fantasy_points text,
  stats_9cat jsonb not null default '{}'::jsonb check (jsonb_typeof(stats_9cat) = 'object'),
  primary key (team_id, season_id, roster_kind, position),
  foreign key (team_id, season_id)
    references team_seasons (team_id, season_id) on delete cascade
);

create index if not exists profile_roster_entries_player_idx
  on profile_roster_entries (player_external_id)
  where player_external_id is not null;

create table if not exists team_category_stats (
  team_id text not null,
  season_id text not null,
  category text not null,
  rank integer not null default 0 check (rank >= 0),
  value_display text,
  primary key (team_id, season_id, category),
  foreign key (team_id, season_id)
    references team_seasons (team_id, season_id) on delete cascade
);

create table if not exists team_nba_composition (
  team_id text not null,
  season_id text not null,
  team_abbrev text not null,
  player_count integer not null check (player_count >= 0),
  percentage double precision not null check (percentage >= 0 and percentage <= 100),
  primary key (team_id, season_id, team_abbrev),
  foreign key (team_id, season_id)
    references team_seasons (team_id, season_id) on delete cascade
);
