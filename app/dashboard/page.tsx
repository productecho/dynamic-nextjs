import type { Metadata } from "next";
import { cookies } from "next/headers";
import { postNote, signIn, signOut } from "@/app/actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ saved, error }, cookieStore] = await Promise.all([
    searchParams,
    cookies(),
  ]);
  const operator = cookieStore.get("operator")?.value;
  const lastNote = cookieStore.get("last-note")?.value;

  return (
    <main>
      <h1>Operator dashboard</h1>
      <p className="lede">
        Session state lives in an httpOnly cookie, mutated by Server Actions.
        Both require a running Next.js server.
      </p>

      {error === "empty" ? (
        <p className="flash">Note was empty — nothing saved.</p>
      ) : null}
      {saved ? <p className="flash">Note stored on this session.</p> : null}

      <dl className="grid">
        <div className="card">
          <dt>Signed in as</dt>
          <dd>{operator ?? "anonymous"}</dd>
        </div>
        <div className="card">
          <dt>Last note</dt>
          <dd>{lastNote ?? "—"}</dd>
        </div>
      </dl>

      {operator ? (
        <form action={signOut}>
          <button type="submit">Sign out</button>
        </form>
      ) : (
        <form action={signIn}>
          <button type="submit">Sign in</button>
        </form>
      )}

      <form action={postNote}>
        <label htmlFor="note">Shift note</label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Visible on the next request via cookie"
        />
        <button type="submit">Save note</button>
      </form>
    </main>
  );
}
