create table if not exists stats_room_snapshots (
  season_id text primary key references seasons (id) on delete cascade,
  generated_at timestamptz,
  playoff_bracket jsonb not null check (jsonb_typeof(playoff_bracket) = 'object'),
  consolation_brackets jsonb check (
    consolation_brackets is null or jsonb_typeof(consolation_brackets) = 'object'
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists stats_standings (
  season_id text not null,
  team_id text not null,
  display_name text not null,
  wins integer not null default 0 check (wins >= 0),
  losses integer not null default 0 check (losses >= 0),
  ties integer not null default 0 check (ties >= 0),
  rank integer not null check (rank > 0),
  primary key (season_id, team_id),
  unique (season_id, rank),
  foreign key (season_id, team_id)
    references season_teams (season_id, team_id) on delete cascade
);

create table if not exists stats_regular_season_matchups (
  season_id text not null references seasons (id) on delete cascade,
  week integer not null check (week > 0),
  team_a_id text not null,
  team_b_id text not null,
  score_a double precision not null,
  score_b double precision not null,
  primary key (season_id, week, team_a_id, team_b_id),
  check (team_a_id <> team_b_id),
  foreign key (season_id, team_a_id)
    references season_teams (season_id, team_id) on delete cascade,
  foreign key (season_id, team_b_id)
    references season_teams (season_id, team_id) on delete cascade
);

create index if not exists stats_regular_matchups_team_a_idx
  on stats_regular_season_matchups (season_id, team_a_id, week);

create index if not exists stats_regular_matchups_team_b_idx
  on stats_regular_season_matchups (season_id, team_b_id, week);

create table if not exists stats_nine_cat (
  season_id text not null,
  team_id text not null,
  category text not null,
  rank integer not null default 0 check (rank >= 0),
  value_display text not null,
  primary key (season_id, team_id, category),
  foreign key (season_id, team_id)
    references season_teams (season_id, team_id) on delete cascade
);

create table if not exists stats_season_totals (
  season_id text not null,
  team_id text not null,
  stats jsonb not null check (jsonb_typeof(stats) = 'object'),
  primary key (season_id, team_id),
  foreign key (season_id, team_id)
    references season_teams (season_id, team_id) on delete cascade
);

create table if not exists stats_next_draft_order (
  season_id text not null references seasons (id) on delete cascade,
  pick integer not null check (pick > 0),
  team_id text,
  label text not null,
  locked boolean not null default false,
  primary key (season_id, pick),
  foreign key (season_id, team_id)
    references season_teams (season_id, team_id) on delete cascade
);
