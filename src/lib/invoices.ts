export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type InvoiceRecord = {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  sentAt?: string;
  paidAt?: string;
  status: InvoiceStatus;
  clientName: string;
  clientEmail: string;
  businessName: string;
  projectName: string;
  dueDate: string;
  currency: "GBP";
  lineItems: InvoiceLineItem[];
  notes: string;
  paymentInstructions: string;
  subtotal: number;
  total: number;
  emailSubject: string;
  emailBody: string;
};

type InvoiceStoreState = {
  invoices: InvoiceRecord[];
};

const globalForInvoices = globalThis as typeof globalThis & {
  mdemxInvoiceStore?: InvoiceStoreState;
};

export const invoiceStore = globalForInvoices.mdemxInvoiceStore ?? { invoices: [] };
globalForInvoices.mdemxInvoiceStore = invoiceStore;

export const invoiceStatuses: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"];

export function listInvoices() {
  return invoiceStore.invoices;
}

export function getInvoice(id: string) {
  return invoiceStore.invoices.find((invoice) => invoice.id === id);
}

export function createInvoice(input: {
  clientName: string;
  clientEmail: string;
  businessName: string;
  projectName: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  notes: string;
  paymentInstructions: string;
}) {
  const lineItems = input.lineItems.map((item) => ({
    description: clean(item.description, 220),
    quantity: normaliseMoney(item.quantity),
    unitPrice: normaliseMoney(item.unitPrice),
  }));
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const invoiceNumber = `MDX-${new Date().getFullYear()}-${String(invoiceStore.invoices.length + 1).padStart(4, "0")}`;
  const email = generateInvoiceEmail({
    invoiceNumber,
    clientName: input.clientName,
    businessName: input.businessName,
    projectName: input.projectName,
    dueDate: input.dueDate,
    lineItems,
    total: subtotal,
    notes: input.notes,
    paymentInstructions: input.paymentInstructions,
  });

  const invoice: InvoiceRecord = {
    id: crypto.randomUUID(),
    invoiceNumber,
    createdAt: new Date().toISOString(),
    status: "Draft",
    clientName: clean(input.clientName, 140),
    clientEmail: clean(input.clientEmail, 180).toLowerCase(),
    businessName: clean(input.businessName, 180),
    projectName: clean(input.projectName, 180),
    dueDate: clean(input.dueDate, 80),
    currency: "GBP",
    lineItems,
    notes: clean(input.notes, 2400),
    paymentInstructions: clean(input.paymentInstructions, 1200),
    subtotal,
    total: subtotal,
    emailSubject: email.subject,
    emailBody: email.body,
  };

  invoiceStore.invoices.unshift(invoice);
  return invoice;
}

export function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  const invoice = getInvoice(id);
  if (!invoice) return null;

  invoice.status = status;
  if (status === "Sent" && !invoice.sentAt) invoice.sentAt = new Date().toISOString();
  if (status === "Paid" && !invoice.paidAt) invoice.paidAt = new Date().toISOString();

  return invoice;
}

export function deleteInvoice(id: string) {
  const index = invoiceStore.invoices.findIndex((invoice) => invoice.id === id);
  if (index === -1) return false;

  invoiceStore.invoices.splice(index, 1);
  return true;
}

export function getInvoiceSummary() {
  const invoices = invoiceStore.invoices;
  const sent = invoices.filter((invoice) => invoice.status === "Sent" || invoice.status === "Paid" || invoice.status === "Overdue");
  const paid = invoices.filter((invoice) => invoice.status === "Paid");
  const outstanding = invoices.filter((invoice) => invoice.status === "Sent" || invoice.status === "Overdue");
  const draft = invoices.filter((invoice) => invoice.status === "Draft");

  return {
    totals: {
      invoices: invoices.length,
      draft: draft.length,
      sent: sent.length,
      paid: paid.length,
      outstanding: outstanding.length,
      revenue: paid.reduce((sum, invoice) => sum + invoice.total, 0),
      outstandingValue: outstanding.reduce((sum, invoice) => sum + invoice.total, 0),
      pipelineValue: invoices
        .filter((invoice) => invoice.status !== "Cancelled")
        .reduce((sum, invoice) => sum + invoice.total, 0),
    },
    recentInvoices: invoices.slice(0, 30),
  };
}

export function generateInvoiceEmail(input: {
  invoiceNumber: string;
  clientName: string;
  businessName: string;
  projectName: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  total: number;
  notes: string;
  paymentInstructions: string;
}) {
  const subject = `Invoice ${input.invoiceNumber} from MDemx`;
  const itemText = input.lineItems
    .map((item) => `- ${item.description}: ${item.quantity} x ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.quantity * item.unitPrice)}`)
    .join("\n");

  const body = [
    `Hi ${input.clientName || input.businessName || "there"},`,
    "",
    `Thank you for working with MDemx. Please find your invoice details below for ${input.projectName || "your project"}.`,
    "",
    `Invoice: ${input.invoiceNumber}`,
    `Due date: ${input.dueDate || "On receipt"}`,
    "",
    "Invoice items",
    itemText || "- Website services",
    "",
    `Total due: ${formatCurrency(input.total)}`,
    "",
    input.paymentInstructions ? `Payment instructions\n${input.paymentInstructions}` : "Payment instructions\nPlease reply to this email if you need payment details resent.",
    "",
    input.notes ? `Notes\n${input.notes}` : "",
    "",
    "Kind regards,",
    "MDemx",
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, body };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function clean(value = "", maxLength = 1600) {
  return String(value).trim().slice(0, maxLength);
}

function normaliseMoney(value: number) {
  return Math.max(0, Math.round((Number(value) || 0) * 100) / 100);
}
