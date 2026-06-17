import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { generateProposalDraft, getBrief, updateBrief } from "@/lib/briefs";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const brief = getBrief(id);

  if (!brief) {
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }

  const proposalDraft = generateProposalDraft(brief);
  const updatedBrief = updateBrief(id, { proposalDraft });

  return NextResponse.json({ proposalDraft, brief: updatedBrief });
}
