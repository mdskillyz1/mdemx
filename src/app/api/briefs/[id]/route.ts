import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { briefStatuses, deleteBrief, getBrief, updateBrief, type BriefStatus } from "@/lib/briefs";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const brief = getBrief(id);

  if (!brief) {
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }

  return NextResponse.json({ brief });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { status?: BriefStatus; internalNotes?: string };

  if (body.status && !briefStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const brief = updateBrief(id, {
    status: body.status,
    internalNotes: body.internalNotes,
  });

  if (!brief) {
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }

  return NextResponse.json({ brief });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteBrief(id);

  if (!deleted) {
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
