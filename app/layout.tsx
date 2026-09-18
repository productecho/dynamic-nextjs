import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pulse Board",
    template: "%s · Pulse Board",
  },
  description:
    "A Next.js sample that depends on request-time (dynamic) features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="top">
            <Link href="/" className="brand">
              PULSE
            </Link>
            <nav>
              <Link href="/">Live</Link>
              <Link href="/search">Search</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
