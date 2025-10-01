# Copilot Instructions for AI Agents

## Project Overview
- This is a React + TypeScript project using Vite for fast development and builds.
- The codebase is organized with a clear separation between pages (`src/pages`), reusable components (`src/components`), hooks (`src/hooks`), and type definitions (`src/types`).
- Data for the app is loaded from static JSON files in `public/data/` (e.g., `data.json`).

## Key Architectural Patterns
- **Pages**: Top-level views are in `src/pages/`. Each page (e.g., `DashboardPage.tsx`, `OrdersPage.tsx`) is responsible for a major route or screen.
- **Components**: UI elements are in `src/components/`. Components are designed to be reusable and composable.
- **Hooks**: Custom hooks (e.g., `useData.ts`) encapsulate data fetching and state logic. Prefer using hooks for cross-cutting concerns.
- **Styling**: Uses Tailwind CSS (`tailwind.config.js`, `postcss.config.js`). Global styles are in `src/styles.css` and `src/index.css`.
- **Type Safety**: All code is TypeScript. Shared types are in `src/types/`.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (runs Vite with HMR)
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Lint**: `npm run lint` (uses ESLint, see `eslint.config.js`)
- **No built-in test scripts**: Add tests as needed; follow the structure of existing files.

## Project-Specific Conventions
- **Data Loading**: Use the custom hook in `src/hooks/useData.ts` to access and manage data from `public/data/data.json`.
- **Component Structure**: Prefer functional components. Co-locate component styles in the same file or import from `App.css`/`styles.css`.
- **Type Usage**: Always import shared types from `src/types/`.
- **No React Compiler**: The React Compiler is not enabled for performance reasons (see README for details).

## Integration Points
- **Vite Plugins**: Uses `@vitejs/plugin-react` for React Fast Refresh.
- **ESLint**: Configured for TypeScript and React. See `eslint.config.js` for extending rules.
- **Tailwind CSS**: Configured via `tailwind.config.js` and `postcss.config.js`.

## Examples
- To add a new page, create a file in `src/pages/` and add a route in the main app entry (`src/main.tsx`).
- To fetch or update data, use the `useData` hook instead of direct fetch calls.
- To add a new component, place it in `src/components/` and import it where needed.

## References
- See `README.md` for more on ESLint and Vite configuration.
- See `public/data/data.json` for the app's data structure.

---

*Update this file if you introduce new architectural patterns, workflows, or conventions that AI agents should follow.*
