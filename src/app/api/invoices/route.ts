import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { addAnalyticsEvent } from "@/lib/analytics";
import { createInvoice, getInvoiceSummary, listInvoices, type InvoiceLineItem } from "@/lib/invoices";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  return NextResponse.json({ invoices: listInvoices(), summary: getInvoiceSummary() });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = (await request.json()) as {
    clientName?: string;
    clientEmail?: string;
    businessName?: string;
    projectName?: string;
    dueDate?: string;
    lineItems?: InvoiceLineItem[];
    notes?: string;
    paymentInstructions?: string;
  };

  if (!body.clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.clientEmail)) {
    return NextResponse.json({ error: "Valid client email is required" }, { status: 400 });
  }

  if (!body.lineItems?.length || body.lineItems.some((item) => !item.description || item.unitPrice <= 0)) {
    return NextResponse.json({ error: "Add at least one invoice item with a price" }, { status: 400 });
  }

  const invoice = createInvoice({
    clientName: body.clientName ?? "",
    clientEmail: body.clientEmail,
    businessName: body.businessName ?? "",
    projectName: body.projectName ?? "",
    dueDate: body.dueDate ?? "On receipt",
    lineItems: body.lineItems,
    notes: body.notes ?? "",
    paymentInstructions: body.paymentInstructions ?? "",
  });

  addAnalyticsEvent({
    type: "click",
    sessionId: request.headers.get("x-mdemx-session") || invoice.id,
    visitorId: request.headers.get("x-mdemx-visitor") || invoice.id,
    path: "/admin/briefs",
    label: `Invoice created ${invoice.invoiceNumber}`,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
    userAgent: request.headers.get("user-agent") || "",
  });

  return NextResponse.json({ invoice, summary: getInvoiceSummary() });
}
