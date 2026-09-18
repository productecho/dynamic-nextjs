export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    now: new Date().toISOString(),
    source: "app/api/time/route.ts",
    note: "Route Handlers are not available with output: \"export\".",
  });
}
