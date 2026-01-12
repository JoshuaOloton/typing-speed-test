# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project type

- Next.js App Router project (TypeScript) created with `create-next-app`.
- Uses `app/` directory, Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`, and `next-themes` for dark/light theme support.
- Primary path alias: `@/*` mapped to the repo root (see `tsconfig.json`).

## Commands

All commands below assume `npm` (a `package-lock.json` is present).

- Development server (hot reload):
  - `npm run dev`
  - Serves the app at `http://localhost:3000`.
- Production build:
  - `npm run build`
- Run production build locally:
  - `npm start`
- Lint the entire project (Next + TypeScript rules):
  - `npm run lint`
- Lint a specific file or directory (bypassing the `lint` script and using the shared config in `eslint.config.mjs`):
  - `npx eslint app/page.tsx`
  - `npx eslint components/`

There is currently **no test script** or test framework configured in `package.json`, so there is no standard command to run a single test.

## High-level architecture

### App directory

- `app/layout.tsx`
  - Root layout for the App Router.
  - Imports and configures fonts (`Geist`, `Geist_Mono`, `Sora`) as CSS variables.
  - Wraps the entire app in `ThemeProvider` from `components/theme-provider` to enable light/dark theming via `next-themes`.
  - Uses `<html lang="en" suppressHydrationWarning>` and sets the body class to apply the Sora font and base typography.
- `app/page.tsx`
  - Current root route (`/`) implementation.
  - Exports the `Home` component and sets a static `Home.theme = 'dark'` property, which is available for future theme-based routing/layout logic.
- `app/globals.css`
  - Global styles and design tokens.
  - Defines CSS custom properties for the neutral, blue, red, green, and yellow palettes that align with `style-guide.md`.
  - Uses Tailwind v4 `@theme inline` to expose tokens like `--color-background`, `--color-foreground`, and font variables for Tailwind utilities.
  - Handles light/dark mode by toggling `--background` and `--foreground` based on `prefers-color-scheme: dark`.
- `app/data.txt`
  - Plain-text content that can be used as sample text for typing-speed features.

### Shared components

- `components/theme-provider.tsx`
  - Small wrapper around `next-themes` `ThemeProvider`.
  - Accepts all `next-themes` props (via `React.ComponentProps<typeof NextThemesProvider>`) and passes them through while rendering `children`.
  - Root layout is responsible for configuring props such as `attribute`, `defaultTheme`, `enableSystem`, and `disableTransitionOnChange`.

### Configuration and tooling

- `tsconfig.json`
  - Strict TypeScript settings (`strict: true`, `noEmit: true`, `moduleResolution: "bundler"`).
  - Includes all `*.ts`, `*.tsx`, and `*.mts` files plus Next-generated type files.
  - Defines the `@/*` path alias to the repo root to support imports like `@/components/theme-provider`.
- `eslint.config.mjs`
  - Uses the flat ESLint config with `eslint-config-next` (`core-web-vitals` + `typescript`).
  - Overrides default ignores via `globalIgnores`, explicitly ignoring `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
  - `npm run lint` runs `eslint` with this configuration.
- `next.config.ts`
  - Minimal Next.js config placeholder (`const nextConfig: NextConfig = { /* config options here */ }`).
  - Extend this file when you need custom Next.js configuration (e.g., redirects, headers, experimental flags).

### Styling and design system

- `style-guide.md`
  - Documents the intended design system (layout breakpoints, color tokens, typography) that correspond to the CSS variables in `app/globals.css`.
  - When adding new UI, align colors and typography with the tokens defined in `globals.css` instead of hard-coding values.

## Notes for future Warp agents

- Prefer the `@/` import alias for cross-cutting modules instead of long relative paths.
- When introducing tests, add appropriate `test`/`test:watch` scripts to `package.json` so future agents can rely on standardized test commands.