import { createHmac, randomInt, randomUUID, timingSafeEqual } from "crypto";

const CHALLENGE_COOKIE = "mdemx_admin_challenge";
const SESSION_COOKIE = "mdemx_admin_session";
const CHALLENGE_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

type SignedPayload = {
  value: string;
  signature: string;
};

type ChallengePayload = {
  username: string;
  otpHash: string;
  nonce: string;
  expiresAt: number;
};

type SessionPayload = {
  username: string;
  expiresAt: number;
};

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || (process.env.NODE_ENV === "production" ? "" : "admin");
}

export function isAdminAuthConfigured() {
  const hasBaseAuth = Boolean(getAuthSecret() && getAdminUsername() && getAdminPassword() && process.env.ADMIN_2FA_EMAIL);

  if (process.env.NODE_ENV === "production") {
    return Boolean(hasBaseAuth && process.env.RESEND_API_KEY);
  }

  return hasBaseAuth;
}

export function validateAdminCredentials(username: string, password: string) {
  const configuredUsername = getAdminUsername();
  const configuredPassword = getAdminPassword();

  if (!configuredUsername || !configuredPassword) return false;

  return safeEqual(username.trim(), configuredUsername) && safeEqual(password, configuredPassword);
}

export async function createAdminChallenge(username: string) {
  const otp = String(randomInt(100000, 999999));
  const nonce = randomUUID();
  const payload: ChallengePayload = {
    username,
    otpHash: hashOtp(otp, nonce),
    nonce,
    expiresAt: Date.now() + CHALLENGE_TTL_MS,
  };

  await sendAdminOtpEmail(otp);

  return {
    cookie: serializeCookie(CHALLENGE_COOKIE, signPayload(payload), CHALLENGE_TTL_MS / 1000),
    expiresAt: payload.expiresAt,
  };
}

export function verifyAdminChallenge(request: Request, code: string) {
  const signed = getCookie(request, CHALLENGE_COOKIE);
  if (!signed) return null;

  const payload = verifyPayload<ChallengePayload>(signed);
  if (!payload || payload.expiresAt < Date.now()) return null;

  if (!safeEqual(payload.otpHash, hashOtp(code.trim(), payload.nonce))) return null;

  const session: SessionPayload = {
    username: payload.username,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  return {
    sessionCookie: serializeCookie(SESSION_COOKIE, signPayload(session), SESSION_TTL_MS / 1000),
    clearChallengeCookie: clearCookie(CHALLENGE_COOKIE),
    expiresAt: session.expiresAt,
  };
}

export function getAdminSession(request: Request) {
  const signed = getCookie(request, SESSION_COOKIE);
  if (!signed) return null;

  const payload = verifyPayload<SessionPayload>(signed);
  if (!payload || payload.expiresAt < Date.now()) return null;

  return payload;
}

export function isAdminRequest(request: Request) {
  return Boolean(getAdminSession(request));
}

export function getLogoutCookie() {
  return clearCookie(SESSION_COOKIE);
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET || (process.env.NODE_ENV === "production" ? "" : "dev-only-admin-secret");
}

function getCookie(request: Request, name: string) {
  const cookies = request.headers.get("cookie") ?? "";
  const cookie = cookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : "";
}

function serializeCookie(name: string, value: string, maxAgeSeconds: number) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${Math.floor(maxAgeSeconds)}`,
  ].join("; ");
}

function clearCookie(name: string) {
  return [`${name}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Secure", "Max-Age=0"].join("; ");
}

function signPayload(payload: object) {
  const value = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = hmac(value);
  const signed: SignedPayload = { value, signature };

  return Buffer.from(JSON.stringify(signed), "utf8").toString("base64url");
}

function verifyPayload<T>(signedValue: string) {
  try {
    const signed = JSON.parse(Buffer.from(signedValue, "base64url").toString("utf8")) as SignedPayload;
    if (!safeEqual(signed.signature, hmac(signed.value))) return null;
    return JSON.parse(Buffer.from(signed.value, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

function hmac(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function hashOtp(otp: string, nonce: string) {
  return createHmac("sha256", getAuthSecret()).update(`${otp}:${nonce}`).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) return false;

  return timingSafeEqual(left, right);
}

async function sendAdminOtpEmail(otp: string) {
  const to = process.env.ADMIN_2FA_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!to) {
    throw new Error("ADMIN_2FA_EMAIL is not configured.");
  }

  if (!resendKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`MDemx admin 2FA code: ${otp}`);
      return;
    }

    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ADMIN_EMAIL_FROM || "MDemx Admin <onboarding@resend.dev>",
      to,
      subject: "Your MDemx admin verification code",
      text: `Your MDemx admin verification code is ${otp}. It expires in 10 minutes.`,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not send admin verification email.");
  }
}
