import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const headerStore = await headers();
  const requestId = headerStore.get("x-request-id") ?? "unknown";
  const userAgent = headerStore.get("user-agent") ?? "unknown";
  const renderedAt = new Date().toISOString();

  return (
    <main>
      <h1>Rendered on this request</h1>
      <p className="lede">
        This page is <code>force-dynamic</code>. The values below are computed
        by the Next.js server for each HTTP request — they cannot be written
        into a static <code>out/</code> folder.
      </p>
      <dl className="grid">
        <div className="card">
          <dt>Server time</dt>
          <dd>{renderedAt}</dd>
        </div>
        <div className="card">
          <dt>Request id (middleware)</dt>
          <dd>{requestId}</dd>
        </div>
        <div className="card">
          <dt>User-Agent</dt>
          <dd>{userAgent}</dd>
        </div>
      </dl>
      <p>
        Also see the JSON Route Handler at{" "}
        <Link href="/api/time">/api/time</Link>, the{" "}
        <Link href="/search?q=export">search page</Link> (query string), and
        the <Link href="/dashboard">dashboard</Link> (cookies + Server
        Actions).
      </p>
    </main>
  );
}
