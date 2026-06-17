import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { addAnalyticsEvent } from "@/lib/analytics";
import { sendEmail, sendOwnerEmail } from "@/lib/email";
import { getInvoice, getInvoiceSummary, updateInvoiceStatus } from "@/lib/invoices";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const invoice = getInvoice(id);
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  await sendOwnerEmail({
    subject: invoice.emailSubject,
    text: invoice.emailBody,
    replyTo: undefined,
  });

  // sendOwnerEmail targets the site owner by default. Send directly to client as well.
  await sendEmail({
    to: invoice.clientEmail,
    subject: invoice.emailSubject,
    text: invoice.emailBody,
    replyTo: process.env.ADMIN_2FA_EMAIL,
  });

  const updatedInvoice = updateInvoiceStatus(id, "Sent");

  addAnalyticsEvent({
    type: "click",
    sessionId: request.headers.get("x-mdemx-session") || invoice.id,
    visitorId: request.headers.get("x-mdemx-visitor") || invoice.id,
    path: "/admin/briefs",
    label: `Invoice sent ${invoice.invoiceNumber}`,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
    userAgent: request.headers.get("user-agent") || "",
  });

  return NextResponse.json({ invoice: updatedInvoice, summary: getInvoiceSummary() });
}
