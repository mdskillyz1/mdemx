"use client";

import { Banknote, Mail, Plus, Send, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { InvoiceRecord, InvoiceStatus } from "@/lib/invoices";

type InvoiceSummary = {
  totals: {
    invoices: number;
    draft: number;
    sent: number;
    paid: number;
    outstanding: number;
    revenue: number;
    outstandingValue: number;
    pipelineValue: number;
  };
  recentInvoices: InvoiceRecord[];
};

const invoiceStatuses: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"];

export function InvoiceAdminPanel() {
  const [summary, setSummary] = useState<InvoiceSummary | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    businessName: "",
    projectName: "",
    dueDate: "",
    notes: "",
    paymentInstructions: "Bank transfer details will be provided by MDemx.",
    lineItems: [{ description: "Website design and development", quantity: 1, unitPrice: 0 }],
  });

  const invoiceTotal = useMemo(
    () => form.lineItems.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0),
    [form.lineItems],
  );

  useEffect(() => {
    void loadInvoices();
  }, []);

  async function loadInvoices() {
    try {
      const response = await fetch("/api/invoices");
      const result = (await response.json()) as { summary?: InvoiceSummary; error?: string };
      if (!response.ok) throw new Error(result.error || "Could not load invoices");
      setSummary(result.summary ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load invoices");
    }
  }

  async function createInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { summary?: InvoiceSummary; error?: string };
      if (!response.ok) throw new Error(result.error || "Could not create invoice");
      setSummary(result.summary ?? null);
      setMessage("Invoice draft created. Review it below, then send it to the client.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create invoice");
    } finally {
      setLoading(false);
    }
  }

  async function sendInvoice(id: string) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/invoices/${id}/send`, { method: "POST" });
      const result = (await response.json()) as { summary?: InvoiceSummary; error?: string };
      if (!response.ok) throw new Error(result.error || "Could not send invoice");
      setSummary(result.summary ?? null);
      setMessage("Invoice sent to the client and copied to MDemx.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not send invoice");
    } finally {
      setLoading(false);
    }
  }

  async function updateInvoice(id: string, status: InvoiceStatus) {
    const response = await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const result = (await response.json()) as { summary?: InvoiceSummary; error?: string };
    if (!response.ok) {
      setMessage(result.error || "Could not update invoice");
      return;
    }
    setSummary(result.summary ?? null);
    setMessage("Invoice status updated.");
  }

  async function deleteInvoice(id: string) {
    const response = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    const result = (await response.json()) as { summary?: InvoiceSummary; error?: string };
    if (!response.ok) {
      setMessage(result.error || "Could not delete invoice");
      return;
    }
    setSummary(result.summary ?? null);
    setMessage("Invoice deleted.");
  }

  function updateLineItem(index: number, field: "description" | "quantity" | "unitPrice", value: string) {
    setForm((current) => ({
      ...current,
      lineItems: current.lineItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: field === "description" ? value : Number(value) } : item,
      ),
    }));
  }

  return (
    <section className="glass-panel rounded-[2rem] p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Invoice automation</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Create, send, and track MDemx invoices.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Add the client email, project details, and line items. MDemx generates the invoice email, sends it via Resend, and tracks revenue.
          </p>
        </div>
        <button
          type="button"
          onClick={loadInvoices}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InvoiceMetric label="Revenue paid" value={formatCurrency(summary?.totals.revenue ?? 0)} />
        <InvoiceMetric label="Outstanding" value={formatCurrency(summary?.totals.outstandingValue ?? 0)} />
        <InvoiceMetric label="Pipeline" value={formatCurrency(summary?.totals.pipelineValue ?? 0)} />
        <InvoiceMetric label="Invoices" value={summary?.totals.invoices ?? 0} />
      </div>

      <form onSubmit={createInvoice} className="mt-6 rounded-[2rem] border border-[var(--line)] bg-[#07110c]/70 p-5">
        <h3 className="text-xl font-semibold text-white">New invoice</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InvoiceField label="Client name">
            <input className="form-field" value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} />
          </InvoiceField>
          <InvoiceField label="Client email">
            <input className="form-field" type="email" required value={form.clientEmail} onChange={(event) => setForm({ ...form, clientEmail: event.target.value })} />
          </InvoiceField>
          <InvoiceField label="Business name">
            <input className="form-field" value={form.businessName} onChange={(event) => setForm({ ...form, businessName: event.target.value })} />
          </InvoiceField>
          <InvoiceField label="Project name">
            <input className="form-field" value={form.projectName} onChange={(event) => setForm({ ...form, projectName: event.target.value })} />
          </InvoiceField>
          <InvoiceField label="Due date">
            <input className="form-field" type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} />
          </InvoiceField>
        </div>

        <div className="mt-5 grid gap-3">
          {form.lineItems.map((item, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[1fr_0.22fr_0.28fr]">
              <input className="form-field" value={item.description} onChange={(event) => updateLineItem(index, "description", event.target.value)} placeholder="Service description" />
              <input className="form-field" type="number" min={0} step="1" value={item.quantity} onChange={(event) => updateLineItem(index, "quantity", event.target.value)} placeholder="Qty" />
              <input className="form-field" type="number" min={0} step="0.01" value={item.unitPrice} onChange={(event) => updateLineItem(index, "unitPrice", event.target.value)} placeholder="Price" />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm((current) => ({ ...current, lineItems: [...current.lineItems, { description: "", quantity: 1, unitPrice: 0 }] }))}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
          >
            <Plus size={16} /> Add item
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InvoiceField label="Payment instructions">
            <textarea className="form-field min-h-28" value={form.paymentInstructions} onChange={(event) => setForm({ ...form, paymentInstructions: event.target.value })} />
          </InvoiceField>
          <InvoiceField label="Notes">
            <textarea className="form-field min-h-28" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
          </InvoiceField>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-semibold text-white">Total: {formatCurrency(invoiceTotal)}</p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Banknote size={17} /> Create invoice draft
          </button>
        </div>
      </form>

      {message ? <p className="mt-5 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm text-[var(--muted)]">{message}</p> : null}

      <div className="mt-6 grid gap-4">
        {(summary?.recentInvoices ?? []).map((invoice) => (
          <article key={invoice.id} className="rounded-[2rem] border border-[var(--line)] bg-white/[0.035] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--mint)]">{invoice.invoiceNumber}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{invoice.businessName || invoice.clientName || invoice.clientEmail}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{invoice.projectName || "Website project"} - {formatCurrency(invoice.total)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select className="form-field min-h-11 w-auto" value={invoice.status} onChange={(event) => updateInvoice(invoice.id, event.target.value as InvoiceStatus)}>
                  {invoiceStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => sendInvoice(invoice.id)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-4 text-sm font-semibold text-[#07110c] transition hover:bg-white"
                >
                  <Send size={16} /> Send
                </button>
                <button
                  type="button"
                  onClick={() => deleteInvoice(invoice.id)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-400/30 px-4 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
            <pre className="mt-5 whitespace-pre-wrap rounded-3xl border border-[var(--line)] bg-black/20 p-4 text-xs leading-5 text-[var(--muted)]">
              {invoice.emailBody}
            </pre>
          </article>
        ))}
        {!summary?.recentInvoices.length ? <p className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5 text-sm text-[var(--muted)]">No invoices yet.</p> : null}
      </div>
    </section>
  );
}

function InvoiceMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
      <Mail size={20} className="text-[var(--mint)]" />
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}

function InvoiceField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-white">
      {label}
      {children}
    </label>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}
