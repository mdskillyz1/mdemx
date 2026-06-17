import { NextResponse } from "next/server";
import { createAdminChallenge, isAdminAuthConfigured, validateAdminCredentials } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin authentication is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_AUTH_SECRET, ADMIN_2FA_EMAIL, and RESEND_API_KEY." },
      { status: 503 },
    );
  }

  if (!validateAdminCredentials(body.username ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  try {
    const challenge = await createAdminChallenge((body.username ?? "").trim());
    const response = NextResponse.json({
      ok: true,
      message: "Verification code sent to the admin email address.",
      expiresAt: challenge.expiresAt,
    });
    response.headers.append("Set-Cookie", challenge.cookie);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send verification code." },
      { status: 500 },
    );
  }
}
