"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const OPERATORS = ["harbor", "keel", "lumen", "nimbus", "sable"] as const;

export async function signIn() {
  const name = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
  const store = await cookies();
  store.set("operator", name, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/dashboard");
}

export async function signOut() {
  const store = await cookies();
  store.delete("operator");
  redirect("/");
}

export async function postNote(formData: FormData) {
  const body = String(formData.get("note") ?? "").trim();
  if (!body) {
    redirect("/dashboard?error=empty");
  }

  const store = await cookies();
  store.set("last-note", body.slice(0, 160), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/dashboard?saved=1");
}
