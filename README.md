# Next.js dynamic features

A small ops board that **must run on a Next.js server**. Each request can
read cookies, headers, and query strings; Route Handlers and Server Actions
mutate server-side state. This project cannot use `output: "export"`.

## Dynamic features in use

| Feature | Where |
| --- | --- |
| `export const dynamic = "force-dynamic"` | `app/page.tsx`, `/api/time` |
| `headers()` | Home page (User-Agent, request id) |
| Middleware | `middleware.ts` sets `x-request-id` |
| `searchParams` | `/search?q=` |
| `cookies()` + Server Actions | `/dashboard` sign-in and notes |
| Route Handler | `GET /api/time` |

## Run

```bash
cd nextjs-dynamic
npm install
npm run dev          # http://localhost:3000
npm run build
npm start            # production Next.js server
```

Refresh `/` and watch the server timestamp and request id change. Filter
`/search?q=api`. Sign in on `/dashboard` and save a note — the cookie is
read on the next server render.

Trying `output: "export"` here fails: middleware, Route Handlers, cookies,
and Server Actions all need a server at request time.
