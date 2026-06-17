import { NextResponse } from "next/server";
import { verifyAdminChallenge } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { code?: string };
  const verified = verifyAdminChallenge(request, body.code ?? "");

  if (!verified) {
    return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 401 });
  }

  const response = NextResponse.json({
    ok: true,
    message: "Admin verified.",
    expiresAt: verified.expiresAt,
  });

  response.headers.append("Set-Cookie", verified.sessionCookie);
  response.headers.append("Set-Cookie", verified.clearChallengeCookie);

  return response;
}
