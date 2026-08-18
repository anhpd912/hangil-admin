# hangil-admin

Internal admin dashboard for **Hangil** — the Korean-learning platform for Vietnamese speakers. Used by
the team to manage learning content, users, and inbound signups.

This repo is frontend-only: no database, no API routes, no server-side business logic. Everything is
fetched from [`hangil-server`](https://github.com/anhpd912/hangil-server), which is also where
authorization is actually enforced.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 strict · Tailwind CSS 4 · Better Auth client ·
ESLint 9 flat config. No UI component library — table, drawer, dialog, pagination and form primitives are
hand-built in `features/admin/components/ui/`.

## Getting started

```bash
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001" > .env.local
npm run dev -- -p 3100      # http://localhost:3100
```

**Use port 3100.** The backend builds its CORS allowlist and Better Auth `trustedOrigins` from
`ADMIN_FRONTEND_URL`, which defaults to `http://localhost:3100`; on Next's default port 3000 every request
is rejected. `NEXT_PUBLIC_API_BASE_URL` is required — the API client throws immediately without it.

You also need an account whose `role` is `admin` in the database; the dashboard is otherwise unreachable.

```bash
npm run dev      # dev server
npm run build    # production build — also the only typecheck (no tsc script; use npx tsc --noEmit)
npm start        # serve the production build
npm run lint     # eslint
```

No test runner is configured.

## Features

| Route | What it does |
|---|---|
| `/login` | Email/password sign-in; non-admins are turned away |
| `/admin` | Overview — key stats, completion chart, recent activity, service status |
| `/admin/lessons` | Lesson CRUD, publish toggle, structured editor for theory / examples / exercises |
| `/admin/vocabulary` | Vocabulary CRUD plus bulk import |
| `/admin/users`, `/admin/users/[id]` | Search users, inspect detail, edit plan/role/track, CSV export |
| `/admin/waitlist` | Landing-page waitlist signups |
| `/admin/feedback` | In-app feedback inbox |

## Structure

```
app/          App Router routes only — thin pages that wrap a features/ component in <Suspense>
              (pages read useSearchParams, which requires it)
features/     admin/<feature>/ — page component + components/ + lib/ per feature
              admin/components/ui/ — shared primitives: button, data-table, drawer, pagination, …
              admin/components/admin-shell/ — nav and header chrome
shared/       api/ (client + one module per backend resource + types), auth/ (client + AdminGuard)
```

Route protection lives in `app/admin/layout.tsx`, which wraps every admin page in `AdminGuard` and then
`AdminShell`. The `@/*` path alias maps to the repo root.

## Talking to the API

`shared/api/api-client.ts` exposes `apiFetch<T>()`, which unwraps the server's
`{ success, data } | { success, error, code }` envelope and throws a typed `ApiError` carrying the code and
HTTP status. One module per backend resource (`admin-users-api.ts`, `admin-lessons-api.ts`, …), with types
under `shared/api/types/`, and `buildQuery()` for query strings.

Error codes are mapped to Vietnamese user-facing copy in `features/admin/lib/error-message.ts` — extend
that map when the backend adds a code, rather than writing messages inline at call sites.

Authentication is bearer-token only, never cookies. `shared/auth/auth-client.ts` stores the token in
`localStorage` under `hangil_admin_token` (a different key from the learner app, so the two do not share a
session). `AdminGuard` redirects when there is no session or `role !== "admin"`, but that is UI only — the
real boundary is the server's `requireAdmin` hook covering every `/api/v1/admin/*` route.

## List pages

All list screens follow the same shape: `useSearchParams` holds `page` and `search` state synced to the
URL, a `useEffect` fetches into local state, and the render branches through `LoadingState` / `ErrorState` /
`EmptyState` (`features/admin/components/ui/state-views.tsx`) before showing the table and `Pagination`.
Follow it when adding a screen.

## Design

Shares the Hangil design system: parchment `#F2ECE0`, ink `#131110`, red `#C9381C` for CTAs and active
states only, muted `#9A9080`; Be Vietnam Pro for text, IBM Plex Mono for numbers and labels; pill radius on
controls, 2rem on cards; strictly left-aligned; **no box-shadows**. The full spec lives in the sibling
repo at `hangil-app/.claude/rules/DESIGN.md`. Unlike the learner app, this dashboard has no dark mode.

## Interface language

UI copy and most code comments are Vietnamese; identifiers are English. Keep Vietnamese strings as they are
when editing surrounding code.

## License

Proprietary — all rights reserved. See [LICENSE](LICENSE).
