# Boilerplate Frontend

Next.js boilerplate with authentication, UI components, testing, and quality tooling ready to go.

## Tech Stack

| Technology                                           | Version | Purpose                                             |
| ---------------------------------------------------- | ------- | --------------------------------------------------- |
| [Next.js](https://nextjs.org)                        | 16.x    | React framework (App Router, Turbopack)             |
| [TypeScript](https://typescriptlang.org)             | 5.x     | Type safety                                         |
| [Tailwind CSS](https://tailwindcss.com)              | 4.x     | Utility-first CSS (OKLCH colors, CSS-first config)  |
| [shadcn/ui](https://ui.shadcn.com)                   | latest  | UI components (Button, Input, Card, Label)          |
| [Better Auth](https://better-auth.com)               | 1.x     | Authentication (email/password, session management) |
| [PostgreSQL](https://postgresql.org)                 | -       | Database for auth sessions and users                |
| [Vitest](https://vitest.dev)                         | 4.x     | Unit testing                                        |
| [React Testing Library](https://testing-library.com) | 16.x    | Component testing                                   |
| [Playwright](https://playwright.dev)                 | 1.x     | E2E testing                                         |
| [ESLint](https://eslint.org)                         | 9.x     | Linting (flat config)                               |
| [Prettier](https://prettier.io)                      | 3.x     | Code formatting                                     |
| [Husky](https://typicode.github.io/husky)            | 9.x     | Git hooks                                           |
| [Commitlint](https://commitlint.js.org)              | 20.x    | Conventional commits                                |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+
- PostgreSQL running locally (or remotely)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/boilerplate_dev
```

### 3. Create the database

```bash
createdb boilerplate_dev
```

Or via psql:

```sql
CREATE DATABASE boilerplate_dev;
```

### 4. Run Better Auth migrations

This creates the required tables (`user`, `session`, `account`, `verification`):

```bash
pnpm dlx @better-auth/cli migrate
```

### 5. Start development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script               | Command                | Description                     |
| -------------------- | ---------------------- | ------------------------------- |
| `pnpm dev`           | `next dev --turbopack` | Start dev server with Turbopack |
| `pnpm build`         | `next build`           | Production build                |
| `pnpm start`         | `next start`           | Start production server         |
| `pnpm lint`          | `eslint`               | Run ESLint                      |
| `pnpm format`        | `prettier --write`     | Format source files             |
| `pnpm test`          | `vitest`               | Run unit tests (watch mode)     |
| `pnpm test -- --run` | `vitest --run`         | Run unit tests (single run)     |
| `pnpm test:e2e`      | `playwright test`      | Run E2E tests                   |

## Project Structure

```
src/
├── app/
│   ├── globals.css                    # Tailwind v4 + shadcn theme
│   ├── layout.tsx                     # Root layout (Geist font)
│   ├── page.tsx                       # Home page (/)
│   ├── api/auth/[...all]/route.ts     # Better Auth API handler
│   ├── login/page.tsx                 # Login form (/login)
│   ├── signup/page.tsx                # Signup form (/signup)
│   ├── logout/page.tsx                # Sign out handler (/logout)
│   └── dashboard/page.tsx             # Protected page (/dashboard)
├── components/
│   └── ui/                            # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── helpers/
│   ├── get-current-user.ts            # getCurrentUser() - server-side session
│   └── require-auth.ts               # requireAuth() - redirect if unauthenticated
├── lib/
│   ├── auth.ts                        # Better Auth server config
│   ├── auth-client.ts                 # Better Auth client (for client components)
│   └── utils.ts                       # cn() utility (clsx + tailwind-merge)
├── middleware.ts                       # Route protection (cookie-based)
└── __tests__/
    ├── setup.ts                       # Test setup (@testing-library/jest-dom)
    ├── components/button.test.tsx      # Button component tests
    └── utils/cn.test.ts               # cn() utility tests
e2e/
└── smoke.spec.ts                      # E2E smoke test
```

## Authentication

### How it works

Better Auth handles authentication server-side with sessions stored in PostgreSQL:

- **Cookies**: HttpOnly, Secure (production), SameSite=Lax - JavaScript cannot access tokens
- **Sessions**: Stored in PostgreSQL, validated server-side, 7-day expiry with 24h auto-refresh
- **Passwords**: Hashed with scrypt (memory-hard, brute-force resistant)
- **CSRF**: Multi-layer protection (Origin header, Content-Type, Fetch Metadata)
- **Rate Limiting**: 100 req/60s general, 3 req/10s for sign-in endpoint
- **Cookie Caching**: 5-minute cache to reduce database queries

### Route Protection

Two layers of protection:

1. **Middleware** (`src/middleware.ts`): Fast cookie-based check using `getSessionCookie()`. Runs on the Edge Runtime without database calls. Redirects unauthenticated users from `/dashboard` to `/login`, and authenticated users from `/login`/`/signup` to `/dashboard`.

2. **Server-side helpers** (`src/helpers/`): Full session validation via `auth.api.getSession()` with database lookup. Used in Server Components for secure data access.

### Helpers

```typescript
// Get session (returns null if not authenticated)
import { getCurrentUser } from "@/helpers/get-current-user";
const session = await getCurrentUser();

// Require auth (redirects to /login if not authenticated)
import { requireAuth } from "@/helpers/require-auth";
const session = await requireAuth();
```

### Adding Social Providers

1. Edit `src/lib/auth.ts` and uncomment the desired provider:

```typescript
socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
},
```

2. Add the corresponding environment variables to `.env`.

3. Run migrations if needed: `pnpm dlx @better-auth/cli migrate`

## PostgreSQL Setup

Better Auth requires PostgreSQL for storing users and sessions.

### Local development

```bash
# Create the database
createdb boilerplate_dev

# Set DATABASE_URL in .env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/boilerplate_dev

# Run migrations (creates user, session, account, verification tables)
pnpm dlx @better-auth/cli migrate
```

### Production

Set `DATABASE_URL` to your production PostgreSQL connection string. Better Auth will automatically use secure cookie settings (Secure flag, etc.) in production.

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components are installed as source code in `src/components/ui/`. Browse available components at [ui.shadcn.com](https://ui.shadcn.com).

## Quality Tooling

### Git Hooks (Husky)

- **pre-commit**: Runs `lint-staged` (ESLint fix + Prettier on staged files)
- **commit-msg**: Runs `commitlint` (enforces [Conventional Commits](https://www.conventionalcommits.org))

### Commit Message Format

```
type(scope): description

# Examples:
feat(auth): add Google OAuth provider
fix(dashboard): resolve session refresh issue
docs: update README with deployment guide
```

### Testing

- **Unit tests**: `pnpm test` (Vitest + React Testing Library)
- **E2E tests**: `pnpm test:e2e` (Playwright with Chromium)

The `PORT` environment variable can be used to change the E2E test server port:

```bash
PORT=3100 pnpm test:e2e
```

## Environment Variables

| Variable                      | Required | Description                                                                                                                      |
| ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`          | Yes      | Signing key for cookies (min 32 chars). Generate with `openssl rand -base64 32`                                                  |
| `BETTER_AUTH_URL`             | Yes      | Base URL of the application (e.g., `http://localhost:3000`)                                                                      |
| `BETTER_AUTH_TRUSTED_ORIGINS` | No       | Comma-separated list of allowed origins (e.g., `http://localhost:3000,http://localhost:3001`). Useful when the dev port changes. |
| `DATABASE_URL`                | Yes      | PostgreSQL connection string                                                                                                     |
| `GITHUB_CLIENT_ID`            | No       | GitHub OAuth app client ID                                                                                                       |
| `GITHUB_CLIENT_SECRET`        | No       | GitHub OAuth app client secret                                                                                                   |
| `GOOGLE_CLIENT_ID`            | No       | Google OAuth client ID                                                                                                           |
| `GOOGLE_CLIENT_SECRET`        | No       | Google OAuth client secret                                                                                                       |

## Technical Decisions

| Decision                           | Rationale                                                          |
| ---------------------------------- | ------------------------------------------------------------------ |
| PostgreSQL (not SQLite)            | Production-ready from day one; same database in dev and prod       |
| Server-side sessions (not JWT)     | Tokens never exposed to client-side; immediate revocation possible |
| `getSessionCookie()` in middleware | Fast Edge Runtime check without database calls                     |
| `auth.api.getSession()` in helpers | Full server-side validation with database lookup                   |
| Cookie caching (5 min)             | Performance optimization while maintaining revocation capability   |
| Vitest (not Jest)                  | Faster, better DX, native ESM support                              |
| Playwright (Chromium only)         | Lightweight for boilerplate; easy to add Firefox/WebKit            |
| ESLint flat config + Prettier      | Current Next.js standard with consistent formatting                |
| Tailwind CSS v4                    | CSS-first configuration, OKLCH colors, faster builds               |
