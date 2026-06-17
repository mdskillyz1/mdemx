"use client";

import { BarChart3, Clock, FileText, Lock, LogOut, Mail, MousePointerClick, RefreshCw, ShieldCheck, Sparkles, Trash2, Users } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { InvoiceAdminPanel } from "@/components/invoice-admin-panel";
import type { BriefStatus, ClientBriefRecord } from "@/lib/briefs";

const briefStatuses: BriefStatus[] = ["New", "Reviewed", "Quoted", "In Progress", "Completed"];

type AnalyticsSummary = {
  totals: {
    events: number;
    visitors: number;
    sessions: number;
    pageViews: number;
    clicks: number;
    leads: number;
    briefs: number;
    avgTimeMs: number;
    totalTimeMs: number;
  };
  topPages: { label: string; value: number }[];
  topClicks: { label: string; value: number }[];
  hourly: { hour: string; pageViews: number; clicks: number; leads: number; briefs: number }[];
  recentEvents: {
    id: string;
    type: string;
    path: string;
    label?: string;
    createdAt: string;
    durationMs?: number;
  }[];
};

export function BriefAdminDashboard() {
  const [authStep, setAuthStep] = useState<"checking" | "login" | "verify" | "authenticated">("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [briefs, setBriefs] = useState<ClientBriefRecord[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedBrief = useMemo(
    () => briefs.find((brief) => brief.id === selectedId) ?? briefs[0],
    [briefs, selectedId],
  );

  useEffect(() => {
    void checkSession();
  }, []);

  async function checkSession() {
    const response = await fetch("/api/admin/me");
    if (response.ok) {
      setAuthStep("authenticated");
      await loadBriefs();
      await loadAnalytics();
      return;
    }

    setAuthStep("login");
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Login failed");
      setAuthStep("verify");
      setMessage(result.message || "Verification code sent.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function submitVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ code }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Verification failed");
      setAuthStep("authenticated");
      setPassword("");
      setCode("");
      await loadBriefs();
      await loadAnalytics();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setBriefs([]);
    setAnalytics(null);
    setSelectedId("");
    setAuthStep("login");
    setMessage("Logged out.");
  }

  async function loadBriefs() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/briefs");
      const result = (await response.json()) as { briefs?: ClientBriefRecord[]; error?: string };
      if (!response.ok) throw new Error(result.error || "Could not load briefs");
      setBriefs(result.briefs ?? []);
      if (!selectedId && result.briefs?.[0]) setSelectedId(result.briefs[0].id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load briefs");
      if (error instanceof Error && error.message.toLowerCase().includes("unauthorised")) {
        setAuthStep("login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadAnalytics() {
    try {
      const response = await fetch("/api/analytics");
      const result = (await response.json()) as AnalyticsSummary & { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not load analytics");
      setAnalytics(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load analytics");
    }
  }

  async function refreshAll() {
    await Promise.all([loadBriefs(), loadAnalytics()]);
  }

  async function updateBrief(id: string, updates: { status?: BriefStatus; internalNotes?: string }) {
    const response = await fetch(`/api/briefs/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });

    const result = (await response.json()) as { brief?: ClientBriefRecord; error?: string };
    if (!response.ok || !result.brief) {
      setMessage(result.error || "Could not update brief");
      return;
    }

    setBriefs((current) => current.map((brief) => (brief.id === id ? result.brief! : brief)));
    setMessage("Brief updated.");
  }

  async function deleteSelectedBrief(id: string) {
    const response = await fetch(`/api/briefs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      setMessage("Could not delete brief.");
      return;
    }

    setBriefs((current) => current.filter((brief) => brief.id !== id));
    setSelectedId("");
    setMessage("Brief deleted.");
  }

  async function generateProposal(id: string) {
    setLoading(true);
    const response = await fetch(`/api/briefs/${id}/proposal`, {
      method: "POST",
      headers: getHeaders(),
    });
    const result = (await response.json()) as { brief?: ClientBriefRecord; error?: string };
    setLoading(false);

    if (!response.ok || !result.brief) {
      setMessage(result.error || "Could not generate proposal");
      return;
    }

    setBriefs((current) => current.map((brief) => (brief.id === id ? result.brief! : brief)));
    setMessage("Proposal draft generated.");
  }

  if (authStep === "checking") {
    return (
      <section className="container-shell pb-16 md:pb-24">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] p-8 text-center">
          <ShieldCheck size={34} className="mx-auto text-[var(--mint)]" />
          <h2 className="mt-5 text-2xl font-semibold text-white">Checking admin session</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">Securing the MDemx brief dashboard.</p>
        </div>
      </section>
    );
  }

  if (authStep !== "authenticated") {
    return (
      <section className="container-shell pb-16 md:pb-24">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] p-6 md:p-8">
          <div className="grid size-14 place-items-center rounded-2xl bg-[rgba(167,243,194,0.14)] text-[var(--mint)]">
            {authStep === "login" ? <Lock size={25} /> : <Mail size={25} />}
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-white">
            {authStep === "login" ? "Admin login" : "Email verification"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {authStep === "login"
              ? "Enter the MDemx admin username and password. A verification code will be emailed before access is granted."
              : "Enter the six-digit code sent to the configured admin email address."}
          </p>

          {authStep === "login" ? (
            <form onSubmit={submitLogin} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-white">
                Username
                <input className="form-field" value={username} onChange={(event) => setUsername(event.target.value)} required autoComplete="username" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white">
                Password
                <input className="form-field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Send email code <ShieldCheck size={17} />
              </button>
            </form>
          ) : (
            <form onSubmit={submitVerification} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-white">
                Verification code
                <input
                  className="form-field text-center text-2xl tracking-[0.4em]"
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setAuthStep("login")}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
                >
                  Back to login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Verify and open <ShieldCheck size={17} />
                </button>
              </div>
            </form>
          )}

          {message ? <p className="mt-5 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm text-[var(--muted)]">{message}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell grid gap-8 pb-16 md:pb-24 lg:grid-cols-[0.38fr_0.62fr]">
      <aside className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Admin</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Client briefs</h2>
          </div>
          <button
            type="button"
            onClick={refreshAll}
            className="grid size-11 place-items-center rounded-full border border-[var(--line)] text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
            aria-label="Refresh briefs"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
        >
          <LogOut size={16} /> Log out
        </button>

        {message ? <p className="mt-4 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-3 text-sm text-[var(--muted)]">{message}</p> : null}

        <div className="mt-6 grid gap-3">
          {briefs.length === 0 ? (
            <p className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5 text-sm text-[var(--muted)]">
              {loading ? "Loading briefs..." : "No client briefs yet."}
            </p>
          ) : (
            briefs.map((brief) => (
              <button
                key={brief.id}
                type="button"
                onClick={() => setSelectedId(brief.id)}
                className={`rounded-3xl border p-4 text-left transition ${
                  selectedBrief?.id === brief.id
                    ? "border-[var(--mint)] bg-[rgba(167,243,194,0.12)]"
                    : "border-[var(--line)] bg-white/[0.035] hover:border-[var(--mint)]"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-sm font-semibold text-white">{brief.client.businessName || brief.client.fullName}</span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {brief.websiteCount} website{brief.websiteCount === 1 ? "" : "s"} - {new Date(brief.submittedAt).toLocaleDateString("en-GB")}
                    </span>
                  </span>
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--mint)]">{brief.status}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </aside>

      <article className="grid gap-8">
        <AnalyticsPanel analytics={analytics} onRefresh={refreshAll} />
        <InvoiceAdminPanel />
        <div className="glass-panel rounded-[2rem] p-5 md:p-8">
        {selectedBrief ? (
          <div>
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Brief details</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{selectedBrief.client.businessName || selectedBrief.client.fullName}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {selectedBrief.client.fullName} - {selectedBrief.client.email} - {selectedBrief.client.phone || "No phone"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteSelectedBrief(selectedBrief.id)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-400/30 px-4 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <AdminStat label="Status" value={selectedBrief.status} />
              <AdminStat label="Websites" value={String(selectedBrief.websiteCount)} />
              <AdminStat label="Budget" value={selectedBrief.project.budget || "Not set"} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-white">
                Status
                <select
                  className="form-field"
                  value={selectedBrief.status}
                  onChange={(event) => updateBrief(selectedBrief.id, { status: event.target.value as BriefStatus })}
                >
                  {briefStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-white">
                Internal notes
                <textarea
                  className="form-field min-h-28"
                  value={selectedBrief.internalNotes}
                  onChange={(event) => updateBrief(selectedBrief.id, { internalNotes: event.target.value })}
                  placeholder="Private notes for quote, follow-up, or next action."
                />
              </label>
            </div>

            <div className="mt-8 grid gap-5">
              {selectedBrief.websites.map((website, index) => (
                <section key={index} className="rounded-[2rem] border border-[var(--line)] bg-white/[0.035] p-5">
                  <h3 className="text-xl font-semibold text-white">
                    Website {index + 1}: {website.websiteName || "Untitled"}
                  </h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Detail label="Purpose" value={website.purpose} />
                    <Detail label="Main goal" value={website.mainGoal} />
                    <Detail label="Target audience" value={website.targetAudience} />
                    <Detail label="Example websites" value={website.exampleWebsites} />
                    <Detail label="Pages" value={website.pagesNeeded.join(", ")} />
                    <Detail label="Features" value={website.featuresNeeded.join(", ")} />
                    <Detail label="Colours" value={`${website.colourScheme} / ${website.secondaryColour}`} />
                    <Detail label="Style" value={website.stylePreference.join(", ")} />
                    <Detail label="Content/images" value={website.contentAvailable} />
                    <Detail label="Notes" value={website.notes} />
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[var(--line)] bg-[#07110c]/70 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <Sparkles size={22} className="mt-1 text-[var(--mint)]" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Generate Proposal Draft</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      Turns the answers into a proposal outline for summary, goals, pages, features, timeline, and quote notes.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => generateProposal(selectedBrief.id)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
                >
                  <FileText size={17} /> Generate Proposal Draft
                </button>
              </div>
              {selectedBrief.proposalDraft ? (
                <pre className="mt-5 whitespace-pre-wrap rounded-3xl border border-[var(--line)] bg-black/20 p-5 text-sm leading-6 text-[var(--muted)]">
                  {selectedBrief.proposalDraft}
                </pre>
              ) : null}
            </section>
          </div>
        ) : (
          <div className="grid min-h-[520px] place-items-center text-center">
            <div>
              <FileText size={42} className="mx-auto text-[var(--mint)]" />
              <h2 className="mt-5 text-2xl font-semibold text-white">No brief selected</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Submit a client brief first, then it will appear here.</p>
            </div>
          </div>
        )}
        </div>
      </article>
    </section>
  );
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

function AdminStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mint)]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{value || "Not provided"}</p>
    </div>
  );
}

function AnalyticsPanel({ analytics, onRefresh }: { analytics: AnalyticsSummary | null; onRefresh: () => void }) {
  const maxHourly = Math.max(1, ...(analytics?.hourly.map((hour) => hour.pageViews + hour.clicks + hour.leads + hour.briefs) ?? [1]));

  return (
    <section className="glass-panel rounded-[2rem] p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Analytics command centre</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Website performance, visitors, clicks, and conversions.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            First-party MDemx tracking for page views, sessions, visitor activity, time on site, CTA clicks, leads, and website brief conversions.
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--mint)] transition hover:border-[var(--mint)] hover:text-white"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Users} label="Visitors" value={analytics?.totals.visitors ?? 0} />
        <MetricCard icon={BarChart3} label="Page views" value={analytics?.totals.pageViews ?? 0} />
        <MetricCard icon={MousePointerClick} label="Clicks" value={analytics?.totals.clicks ?? 0} />
        <MetricCard icon={Clock} label="Avg time" value={formatDuration(analytics?.totals.avgTimeMs ?? 0)} />
        <MetricCard icon={FileText} label="Briefs" value={analytics?.totals.briefs ?? 0} />
        <MetricCard icon={Sparkles} label="Leads" value={analytics?.totals.leads ?? 0} />
        <MetricCard icon={ShieldCheck} label="Sessions" value={analytics?.totals.sessions ?? 0} />
        <MetricCard icon={BarChart3} label="Events" value={analytics?.totals.events ?? 0} />
      </div>

      <div className="mt-6 rounded-3xl border border-[var(--line)] bg-[#07110c]/70 p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Last 24 hours</h3>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Views + clicks + conversions</p>
        </div>
        <div className="mt-5 flex h-44 items-end gap-1">
          {(analytics?.hourly ?? []).map((hour) => {
            const total = hour.pageViews + hour.clicks + hour.leads + hour.briefs;
            const height = Math.max(6, Math.round((total / maxHourly) * 100));

            return (
              <div key={hour.hour} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-[var(--mint)]/80"
                  style={{ height: `${height}%` }}
                  title={`${hour.hour}: ${total} events`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <TopList title="Top pages" items={analytics?.topPages ?? []} />
        <TopList title="Top clicks" items={analytics?.topClicks ?? []} />
        <div className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
          <h3 className="text-lg font-semibold text-white">Recent activity</h3>
          <div className="mt-4 grid max-h-80 gap-3 overflow-auto pr-1">
            {(analytics?.recentEvents ?? []).slice(0, 16).map((event) => (
              <div key={event.id} className="rounded-2xl border border-[var(--line)] bg-[#07110c]/55 p-3">
                <p className="text-sm font-semibold text-white">{event.type.replaceAll("_", " ")}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {event.label || event.path} - {new Date(event.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
            ))}
            {!analytics?.recentEvents.length ? <p className="text-sm text-[var(--muted)]">No tracked activity yet.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
      <Icon size={21} className="text-[var(--mint)]" />
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}

function TopList({ title, items }: { title: string; items: { label: string; value: number }[] }) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-[var(--muted)]">{item.label}</span>
              <span className="font-semibold text-white">{item.value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[var(--mint)]" style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} />
            </div>
          </div>
        ))}
        {!items.length ? <p className="text-sm text-[var(--muted)]">No data yet.</p> : null}
      </div>
    </div>
  );
}

function formatDuration(ms: number) {
  if (!ms) return "0s";
  const seconds = Math.round(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
}
