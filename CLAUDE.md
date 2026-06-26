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

## AGENT WORKFLOW RULES
- Đọc/trả lời prompt user trong repo này bằng caveman mode (compress, tiết kiệm token).
- Dùng GitNexus (`gitnexus_query`/`gitnexus_context`/`gitnexus_explore`) để hiểu code — KHÔNG grep toàn project. Chỉ Grep/Read trực tiếp khi GitNexus không trả đủ thông tin. (Chạy `npx gitnexus analyze` nếu repo này chưa index.)

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **hangil-admin** (382 symbols, 831 relationships, 28 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/hangil-admin/context` | Codebase overview, check index freshness |
| `gitnexus://repo/hangil-admin/clusters` | All functional areas |
| `gitnexus://repo/hangil-admin/processes` | All execution flows |
| `gitnexus://repo/hangil-admin/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
