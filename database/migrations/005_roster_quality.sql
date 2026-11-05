create table roster_quality_snapshots (
  season_id text primary key references seasons (id) on delete cascade,
  method_version text not null,
  generated_at timestamptz not null,
  projection_status text not null check (projection_status in ('captured', 'not-captured', 'unavailable')),
  projection jsonb check (projection is null or jsonb_typeof(projection) = 'object'),
  performance jsonb check (performance is null or jsonb_typeof(performance) = 'object'),
  check ((projection_status = 'captured') = (projection is not null))
);
