<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## What this is

Single-route Next.js 16 App Router travel landing page (`src/app/page.tsx` is still empty; UI is being built). React 19 + React Compiler, Tailwind v4, shadcn UI on Base UI.

## Commands

- `npm run dev` — Turbopack dev server. A dev server is often already running; `next dev` then prints the existing URL/PID instead of starting a second one. Reuse it.
- `npm run build` — production build (Turbopack, also runs TypeScript). Currently green.
- `npm run lint` — `eslint` with no args (flat config, lints the whole repo).
- No test suite and no `typecheck` script. Typecheck with `npx tsc --noEmit`, but only after a `next dev`/`next build` run: `next-env.d.ts` imports `.next/dev/types/*`, so a checkout without `.next/` fails on generated globals.
- PowerShell here blocks the `npx`/`npm` `.ps1` shims; run `cmd /c "npm run ..."` when that happens.

## Known lint state

`npm run lint` already fails with 2 `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus an unused `Image` import warning in `src/app/page.tsx`. These are pre-existing in generated/boilerplate files — don't report them as regressions and don't rewrite those files just to satisfy the rule.

## UI layer

- `src/components/ui/*` is shadcn output for the **base-nova** style (`components.json`), built on `@base-ui/react` — not Radix. Radix snippets from training data won't typecheck or behave the same; check Base UI props (`render` instead of `asChild`) before porting.
- Add components with `npx shadcn@latest add <name>` so they match the configured style/registry rather than hand-writing them.
- Import the class helper from the package: `import { cn } from "cn"` (all existing components do). `src/lib/utils.ts` only re-exports it.
- Tailwind v4 is CSS-first: tokens live in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`). There is no `tailwind.config.*` or `postcss.config.*`; Tailwind runs through the `@tailwindcss/turbopack` loader declared in `next.config.ts`.

## Framework specifics

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. With Cache Components on, an uncached data read (`fetch`, `cookies()`, `connection()`) outside `<Suspense>` fails prerendering at build time — wrap it in Suspense or add `"use cache"` + `cacheLife`. The error output lists the accepted fixes.
- Route prop types are generated globals (`LayoutProps<"/">`, `PageProps<...>`) and `params`/`searchParams` are Promises. Use the generated types; don't declare them by hand.
- Alias `@/*` → `src/*`. Font is Josefin Sans via `next/font/google` in `src/app/layout.tsx`.

## Repo state

Work in progress is mostly untracked (`src/components/`, `src/hooks/`, `src/lib/`, `components.json`, new `public/*.png` and `public/destinations/`). Check `git status` before any `git clean`, `git checkout --`, or bulk delete.
