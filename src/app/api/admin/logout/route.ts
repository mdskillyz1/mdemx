import { NextResponse } from "next/server";
import { getLogoutCookie } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.append("Set-Cookie", getLogoutCookie());
  return response;
}
