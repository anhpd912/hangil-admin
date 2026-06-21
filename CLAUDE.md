# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Admin dashboard (Next.js App Router, no backend in this repo) for Hangil, Vietnamese-learner-focused Korean app. Talks to an external API via `NEXT_PUBLIC_API_BASE_URL` (set in `.env.local`, not committed). This repo is frontend-only — no DB, no server routes beyond Next.js pages.

## Commands

```
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint      # eslint (flat config, eslint.config.mjs)
```

No test runner configured yet. No typecheck script — use `npx tsc --noEmit` if needed.

## Architecture

**Layering: `app/` → `features/` → `shared/`.** `app/**/page.tsx` files are thin: they wrap the real page component from `features/` in `<Suspense>` (pages read `useSearchParams`, which requires it) and render nothing else. Route auth/layout chrome lives in `app/admin/layout.tsx`, which wraps children in `AdminGuard` (`shared/auth`) then `AdminShell` (`features/admin/components/admin-shell`).

```
app/admin/<route>/page.tsx        -> renders features/admin/<feature>/<feature>-list-page.tsx (or similar)
features/admin/<feature>/         -> page component + components/ + lib/ for that feature
features/admin/components/ui/     -> shared admin UI primitives (button, data-table, drawer, etc.)
shared/api/                       -> apiFetch wrapper + one *-api.ts module per backend resource + types/
shared/auth/                      -> better-auth client, session hook, AdminGuard
```

- **API calls**: every backend resource gets a `shared/api/admin-<resource>-api.ts` module exporting an object of methods (see `admin-users-api.ts`), all built on `apiFetch<T>()` from `shared/api/api-client.ts`. `apiFetch` expects the backend envelope `{ success: true, data } | { success: false, error, code }` and throws `ApiError` (code + status) on failure or non-2xx. Use `buildQuery()` for query params. Types for each resource live in `shared/api/types/admin-<resource>.ts`.
- **Errors**: `ApiError.code` is one of `ApiErrorCode` (`shared/api/api-error.ts`). Map codes to Vietnamese user-facing strings via `errorMessage()` in `features/admin/lib/error-message.ts` — extend that map (not ad-hoc strings) whenever the backend adds a new error code.
- **Auth**: Bearer-token flow via `better-auth/react`, no cookies (`credentials: "omit"` — backend CORS doesn't set `credentials: true`). Token persists in `localStorage` (`hangil_admin_token`) through `shared/auth/auth-client.ts`, and `shared/api/api-client.ts` pulls it via a module-level injector (`setAuthTokenGetter`) to avoid an import cycle between `shared/api` and `shared/auth`. `AdminGuard` (`shared/auth/admin-guard.tsx`) is **UI-only** route protection (redirects if no session / `role !== "admin"`); the real authorization boundary is the backend's `requireAdmin` check on every `/admin/*` route.
- **List pages**: standard pattern is `useSearchParams` for `page`/`search` state (synced to URL via `router.push`), `useEffect` to fetch into local state, then branch render on `LoadingState` / `ErrorState` / `EmptyState` (`features/admin/components/ui/state-views.tsx`) before the real table + `Pagination`.
- **Styling**: Tailwind v4 (`@theme inline` in `app/globals.css`), no shadows, no centered layouts — see `.claude/rules/DESIGN.md` for the full design system (colors, type, components). Key points: Be Vietnam Pro for all body/heading text including inline Hangul (no Hangul-specific font — intentional fallback to OS font), IBM Plex Mono (`font-mono-label`) for numbers/labels/indices, pill radius (`1rem`) on buttons/tags, `2rem` radius on cards, accent red used sparingly for CTAs/active states only.
- Vietnamese strings (UI copy, error messages, code comments) are normal in this codebase — don't translate them when editing nearby code.
