create table if not exists season_teams (
  season_id text not null references seasons (id) on delete cascade,
  team_id text not null references teams (id) on delete cascade,
  is_expansion boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (season_id, team_id)
);

create index if not exists season_teams_season_expansion_idx
  on season_teams (season_id, is_expansion, team_id);

-- Every existing statistical profile also represents participation.
insert into season_teams (season_id, team_id, is_expansion)
select season_id, team_id, false
from team_seasons
on conflict (season_id, team_id) do nothing;

-- When a newly-created active season has no membership rows yet, carry the
-- latest known league membership forward. Statistics remain in team_seasons
-- and are deliberately not copied.
with empty_active_seasons as (
  select s.id, s.year
  from seasons s
  where s.is_active
    and not exists (
      select 1 from season_teams st where st.season_id = s.id
    )
), previous_seasons as (
  select
    active.id as active_season_id,
    previous.id as previous_season_id
  from empty_active_seasons active
  cross join lateral (
    select s.id
    from seasons s
    where s.year < active.year
      and exists (
        select 1 from season_teams st where st.season_id = s.id
      )
    order by s.year desc, s.id desc
    limit 1
  ) previous
)
insert into season_teams (season_id, team_id, is_expansion)
select previous.active_season_id, st.team_id, false
from previous_seasons previous
join season_teams st on st.season_id = previous.previous_season_id
on conflict (season_id, team_id) do nothing;
