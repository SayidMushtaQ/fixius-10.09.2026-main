# AGENT_RULES.md — Strict Project Rules

> These rules are **mandatory** for all agents working on this project. Violating any rule is a build-breaking error.

---

## 1. Routing — `proxy.ts` Only

- ✅ Use `proxy.ts` (Next.js 16) for lightweight URL rewrites, redirects, and header injection.
- ❌ **NEVER** create or use `middleware.ts`. It does not exist and must not exist.
- ❌ `proxy.ts` must **NOT** perform authentication, database queries, or heavy I/O.

### Authentication Enforcement (Data Access Layer)

Authentication is enforced **at the Data Access Layer**, not at the routing level:

- **Server Components**: Call `auth()` from AuthJS → `redirect('/login')` if no session.
- **API Route Handlers**: Call `auth()` → return `401 Unauthorized` if no session.
- **Server Actions**: Call `auth()` → throw if unauthorized.
- Use `React.cache()` to memoize session lookups per request.

---

## 2. Animation — `motion/react` Only

- ✅ Import from `"motion/react"` for all animations.
- ❌ **NEVER** install or import `framer-motion`. It is banned.

```tsx
// ✅ Correct
import { motion, AnimatePresence } from "motion/react";

// ❌ BANNED
import { motion } from "framer-motion";
```

---

## 3. Styling — Tailwind CSS v4

- ✅ Use `@import "tailwindcss"` in `globals.css` (CSS-first configuration).
- ✅ Use `@theme { }` blocks for design tokens (colors, spacing, fonts, etc.).
- ❌ **NEVER** create `tailwind.config.js` or `tailwind.config.ts`. The project uses Tailwind v4 CSS-first config.
- ✅ Use `@tailwindcss/postcss` in `postcss.config.js`.

---

## 4. Modals — Native `<dialog>` via `@/components/ui/Modal`

- ✅ Import `Modal` from `"@/components/ui/Modal"`.
- ❌ **NEVER** install or import `react-modal`. It is banned.
- The `Modal` component uses native `<dialog>` with the same API: `isOpen`, `onRequestClose`, `className`, `overlayClassName`.

---

## 5. Spinners / Loaders — Tailwind CSS Animations

- ✅ Use the `<Loader>` component from `"@/components/Loader"` or Tailwind CSS `animate-spin`.
- ❌ **NEVER** install or import `react-spinners`. It does not support React 19.

---

## 6. Tabs — Native Accessible Tabs

- ✅ Build tabs with `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, and React state.
- ❌ **NEVER** install or import `react-tabs`. It is banned.

---

## 7. Password Hashing — `bcryptjs` Only

- ✅ Import from `"bcryptjs"`.
- ❌ **NEVER** import from `"bcrypt"` (native module — causes issues in serverless/edge).

---

## 8. Banned Packages

The following packages must **NEVER** be installed or imported:

| Banned Package              | Reason                               | Alternative                                  |
| --------------------------- | ------------------------------------ | -------------------------------------------- |
| `framer-motion`             | Replaced by `motion/react`           | `motion` (import from `motion/react`)        |
| `react-modal`               | Replaced by native `<dialog>`        | `@/components/ui/Modal`                      |
| `react-spinners`            | Does not support React 19            | Tailwind CSS spinner / `@/components/Loader` |
| `react-tabs`                | Unnecessary dependency               | Native accessible tabs with `role` attrs     |
| `express`                   | Not used in App Router               | Next.js Route Handlers                       |
| `express-validator`         | Not compatible with App Router       | `zod`                                        |
| `cors`                      | Not needed in App Router             | Next.js CORS headers in route handlers       |
| `python-shell`              | No Python usage                      | —                                            |
| `html2canvas`               | Unused                               | —                                            |
| `puppeteer`                 | Unused (heavy dependency)            | —                                            |
| `node-fetch`                | Unnecessary — use native `fetch`     | `fetch` (built-in)                           |
| `lodash`                    | Unused                               | Native JS methods                            |
| `bcrypt`                    | Native module conflicts              | `bcryptjs`                                   |
| `dotenv`                    | Next.js has built-in env loading     | `process.env`                                |
| `middleware.ts` (as a file) | Replaced by `proxy.ts` in Next.js 16 | `proxy.ts`                                   |

---

## 9. Server Components by Default

- ✅ All components are Server Components unless they need interactivity.
- ✅ Add `"use client"` only when the component uses `useState`, `useEffect`, event handlers, or browser APIs.
- ✅ Split interactive parts into small Client Components, keep the parent as a Server Component.

---

## 10. Data Validation — Zod

- ✅ Validate all API route handler inputs with `zod` schemas.
- ✅ Return proper HTTP status codes (400 for validation errors, 401 for auth, 404 for not found, 500 for server errors).

---

## 11. Toast Notifications — `sonner`

- ✅ Use `sonner` for all user-facing notifications.
- ✅ Import as `import { toast } from "sonner"`.

---

## 12. Image Uploads — Cloudinary SDK

- ✅ Use the `cloudinary` npm package (server-side SDK) for image uploads.
- ❌ **DO NOT** use `next-cloudinary`. It is not installed.
- ✅ Use `next/image` for rendering images (with proper `remotePatterns` in `next.config.mjs`).
