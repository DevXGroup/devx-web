# DevX Group Website CRUSH.md

This document outlines the essential commands and coding conventions for this Next.js project.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Run dev server**: `pnpm run dev`
- **Run tests**: `pnpm run test`
- **Run a single test**: `pnpm jest <path/to/test.tsx>`
- **Lint files**: `pnpm run lint`
- **Production build**: `pnpm run build`

## Code Style & Conventions

- **Formatting**: We use Prettier with 2-space indentation, single quotes, and no semicolons. Run `pnpm run lint --fix` to format.
- **Naming**: Components are PascalCase (`MyComponent.tsx`), files are kebab-case (`my-component.ts`).
- **Imports**: Use absolute paths with the `@/*` alias for anything inside `src/`.
  - e.g., `import { MyComponent } from '@/components/MyComponent';`
- **Styling**: Use Tailwind CSS utility classes. Avoid inline styles.
- **Types**: TypeScript is in strict mode. Add types for all props and function signatures. Use Zod for schema validation where applicable.
- **Error Handling**: Use React Error Boundaries for component-level errors. For async operations, use try/catch blocks with proper error logging or user feedback.
- **Components**: Create functional components with React Hooks. Keep components small and focused on a single responsibility.
- **State Management**: Use React Hooks (`useState`, `useReducer`) for local state. For global state, consider React Context.
- **API Routes**: Follow Next.js conventions for API routes in `src/app/api/`.
