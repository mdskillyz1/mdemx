import { site } from "@/lib/site";

type EmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendOwnerEmail({ subject, text, replyTo }: EmailInput) {
  const to = process.env.ADMIN_2FA_EMAIL || process.env.BRIEF_EMAIL_TO || site.email;

  return sendEmail({ to, subject, text, replyTo });
}

export async function sendClientEmail({ to, subject, text }: EmailInput & { to?: string }) {
  if (!to) return { skipped: true };

  return sendEmail({ to, subject, text });
}

export async function sendEmail({ to, subject, text, replyTo }: EmailInput & { to: string }) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_EMAIL_FROM || process.env.BRIEF_EMAIL_FROM || "MDemx <admin@mdemx.co.uk>";

  if (!resendKey) {
    console.info("Email skipped because RESEND_API_KEY is not configured", { subject, text });
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Resend email failed: ${errorText || response.statusText}`);
  }

  return { ok: true };
}
