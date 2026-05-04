create table if not exists public.gd20_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  player_name text not null default 'Player',
  save_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.gd20_saves enable row level security;

drop policy if exists "Players can read their own Geometry Dash save" on public.gd20_saves;
create policy "Players can read their own Geometry Dash save"
on public.gd20_saves for select
using (auth.uid() = user_id);

drop policy if exists "Players can insert their own Geometry Dash save" on public.gd20_saves;
create policy "Players can insert their own Geometry Dash save"
on public.gd20_saves for insert
with check (auth.uid() = user_id);

drop policy if exists "Players can update their own Geometry Dash save" on public.gd20_saves;
create policy "Players can update their own Geometry Dash save"
on public.gd20_saves for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
