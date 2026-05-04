# Geometry Dash 2.0 by Justin Ku

A browser-playable neon rhythm platformer prototype with levels, multiplayer, creator tools, a store, local saves, and optional Supabase cloud saves.

## Local Run

Optional Supabase cloud-save env for local testing:

```sh
cp .env.example .env.local
```

Then edit `.env.local` with your Supabase connector values.

```sh
npm install
npm run build
npm run dev
```

Then open:

```txt
http://localhost:4173
```

The game also still works by opening `index.html` directly. When Supabase env vars are missing, saves stay in the browser.

## Deploy On Vercel + Supabase

1. Create a Supabase project.
2. In Supabase SQL Editor, run:

```txt
supabase/migrations/001_gd20_cloud_saves.sql
```

3. In Supabase Auth settings, turn off email confirmation for this game. The game uses the player name as a local-style login and creates an internal email like `justin@gd20.local`.
4. In Vercel, import this repo.
5. Add the Supabase integration/connector to the Vercel project.
6. Make sure Vercel has these environment variables from the connector:

```txt
SUPABASE_URL
SUPABASE_ANON_KEY
```

The build also accepts `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `PUBLIC_SUPABASE_URL`, and `PUBLIC_SUPABASE_ANON_KEY` if your Vercel connector exposes those names instead.

7. Deploy.

Vercel runs `npm run build`, which writes `src/env.generated.js` from those environment variables. The browser then uses Supabase Auth plus the `gd20_saves` table to sync each player’s saved progress, store items, settings, character, and created levels.

## Useful Commands

```sh
npm run build
npm run check
npm run dev
```

## Notes

- Supabase cloud saves are optional. Without Supabase, the game keeps using browser storage.
- Do not put the Supabase service-role key in Vercel browser env vars. Only use the anon key.
- If players can sign up but cannot log in immediately, email confirmation is probably still enabled in Supabase Auth.
