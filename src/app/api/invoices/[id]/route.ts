import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteInvoice, getInvoiceSummary, invoiceStatuses, updateInvoiceStatus, type InvoiceStatus } from "@/lib/invoices";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { status?: InvoiceStatus };

  if (!body.status || !invoiceStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid invoice status" }, { status: 400 });
  }

  const invoice = updateInvoiceStatus(id, body.status);
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  return NextResponse.json({ invoice, summary: getInvoiceSummary() });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteInvoice(id);
  if (!deleted) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  return NextResponse.json({ ok: true, summary: getInvoiceSummary() });
}
