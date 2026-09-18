import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
};

const CATALOG = [
  { id: "static-export", title: "Static export", kind: "hosting" },
  { id: "cookies", title: "Cookie session", kind: "auth" },
  { id: "headers", title: "Request headers", kind: "ssr" },
  { id: "search-params", title: "URL search params", kind: "ssr" },
  { id: "route-handler", title: "Route Handlers", kind: "api" },
  { id: "server-actions", title: "Server Actions", kind: "mutations" },
  { id: "middleware", title: "Middleware", kind: "edge" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const hits = query
    ? CATALOG.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.kind.includes(query) ||
          item.id.includes(query),
      )
    : CATALOG;

  return (
    <main>
      <h1>Search</h1>
      <p className="lede">
        This page reads <code>searchParams</code> on the server. The result
        set is different for <code>/search?q=auth</code> vs{" "}
        <code>/search?q=api</code>, so Next.js cannot prerender a single HTML
        file for every query.
      </p>
      <form action="/search" method="get">
        <label htmlFor="q">Query</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="try cookies, api, ssr…"
        />
        <button type="submit">Filter</button>
      </form>
      <p className="muted">
        {hits.length} result{hits.length === 1 ? "" : "s"}
        {query ? ` for “${query}”` : ""}
      </p>
      <ul className="results">
        {hits.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <span className="muted"> · {item.kind}</span>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/search?q=ssr">Preset: ssr</Link>
      </p>
    </main>
  );
}
