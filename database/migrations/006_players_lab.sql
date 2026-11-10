-- Players Lab: una captura diaria por temporada con métricas y etiquetas por jugador.
create table players_lab_snapshots (
  season_id text primary key references seasons (id) on delete cascade,
  method_version text not null,
  generated_at timestamptz not null,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
