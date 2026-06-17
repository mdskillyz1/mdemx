export type BriefStatus = "New" | "Reviewed" | "Quoted" | "In Progress" | "Completed";

export type WebsiteRequirement = {
  websiteName: string;
  purpose: string;
  targetAudience: string;
  mainGoal: string;
  pagesNeeded: string[];
  featuresNeeded: string[];
  colourScheme: string;
  secondaryColour: string;
  stylePreference: string[];
  exampleWebsites: string;
  contentAvailable: string;
  notes: string;
};

export type ClientBriefPayload = {
  client: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
  };
  websiteCount: number;
  websites: WebsiteRequirement[];
  design: {
    primaryColour: string;
    secondaryColour: string;
    fontPreference: string;
    stylePreferences: string[];
    logoFileNames: string[];
    assetFileNames: string[];
  };
  content: {
    copyReady: string;
    imagesReady: string;
    brandAssetsReady: string;
    contentNotes: string;
  };
  domainHosting: {
    hasDomain: string;
    domainName: string;
    needsHosting: string;
    needsBusinessEmail: string;
    notes: string;
  };
  project: {
    budget: string;
    timeline: string;
    priority: string;
    finalNotes: string;
  };
  security?: {
    website?: string;
    startedAt?: number;
    submittedAtClient?: number;
  };
};

export type ClientBriefRecord = ClientBriefPayload & {
  id: string;
  submittedAt: string;
  status: BriefStatus;
  internalNotes: string;
  proposalDraft?: string;
  source: "mdemx-client-brief";
};

type BriefStoreState = {
  briefs: ClientBriefRecord[];
};

const globalForBriefs = globalThis as typeof globalThis & {
  mdemxBriefStore?: BriefStoreState;
};

export const briefStore = globalForBriefs.mdemxBriefStore ?? { briefs: [] };
globalForBriefs.mdemxBriefStore = briefStore;

export const briefStatuses: BriefStatus[] = ["New", "Reviewed", "Quoted", "In Progress", "Completed"];

export function addBrief(payload: ClientBriefPayload) {
  const record: ClientBriefRecord = {
    ...payload,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status: "New",
    internalNotes: "",
    source: "mdemx-client-brief",
  };

  briefStore.briefs.unshift(record);
  return record;
}

export function listBriefs() {
  return briefStore.briefs;
}

export function getBrief(id: string) {
  return briefStore.briefs.find((brief) => brief.id === id);
}

export function updateBrief(id: string, updates: Partial<Pick<ClientBriefRecord, "status" | "internalNotes" | "proposalDraft">>) {
  const brief = getBrief(id);
  if (!brief) return null;

  if (updates.status) brief.status = updates.status;
  if (typeof updates.internalNotes === "string") brief.internalNotes = updates.internalNotes.slice(0, 4000);
  if (typeof updates.proposalDraft === "string") brief.proposalDraft = updates.proposalDraft.slice(0, 12000);

  return brief;
}

export function deleteBrief(id: string) {
  const index = briefStore.briefs.findIndex((brief) => brief.id === id);
  if (index === -1) return false;

  briefStore.briefs.splice(index, 1);
  return true;
}

export function generateProposalDraft(brief: ClientBriefRecord) {
  const websiteSummaries = brief.websites
    .map((website, index) => {
      return [
        `Website ${index + 1}: ${website.websiteName || "Untitled website"}`,
        `Purpose: ${website.purpose || "To be confirmed"}`,
        `Goal: ${website.mainGoal || "To be confirmed"}`,
        `Audience: ${website.targetAudience || "To be confirmed"}`,
        `Suggested pages: ${website.pagesNeeded.join(", ") || "To be confirmed"}`,
        `Suggested features: ${website.featuresNeeded.join(", ") || "To be confirmed"}`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    `Proposal draft for ${brief.client.businessName || brief.client.fullName}`,
    "",
    "Project summary",
    `${brief.client.fullName} is requesting ${brief.websiteCount} website${brief.websiteCount === 1 ? "" : "s"} for ${brief.client.businessName || "their business"}. The project should focus on practical business outcomes, clear user journeys, strong conversion routes, and a premium MDemx build quality.`,
    "",
    "Website goals",
    websiteSummaries,
    "",
    "Suggested approach",
    "Plan the content and structure first, then create a clean responsive design system, build SEO-ready pages, configure lead capture, and prepare the site for launch with analytics, domain, hosting, and support checks.",
    "",
    "Estimated timeline",
    `${brief.project.timeline || "Timeline to be confirmed"} depending on content readiness, revisions, integrations, and number of websites.`,
    "",
    "Notes for quote",
    `Budget range: ${brief.project.budget || "Not provided"}. Priority: ${brief.project.priority || "Not provided"}. Domain/hosting notes: ${brief.domainHosting.notes || "None provided"}. Final notes: ${brief.project.finalNotes || "None provided"}.`,
  ].join("\n");
}

export function cleanBriefPayload(payload: ClientBriefPayload): ClientBriefPayload {
  return {
    client: {
      fullName: clean(payload.client.fullName, 120),
      email: clean(payload.client.email, 160).toLowerCase(),
      phone: clean(payload.client.phone, 60),
      businessName: clean(payload.client.businessName, 160),
      businessType: clean(payload.client.businessType, 120),
    },
    websiteCount: Math.min(Math.max(Number(payload.websiteCount) || 1, 1), 8),
    websites: payload.websites.slice(0, 8).map((website) => ({
      websiteName: clean(website.websiteName, 160),
      purpose: clean(website.purpose, 1200),
      targetAudience: clean(website.targetAudience, 600),
      mainGoal: clean(website.mainGoal, 600),
      pagesNeeded: cleanList(website.pagesNeeded),
      featuresNeeded: cleanList(website.featuresNeeded),
      colourScheme: clean(website.colourScheme, 40),
      secondaryColour: clean(website.secondaryColour, 40),
      stylePreference: cleanList(website.stylePreference),
      exampleWebsites: clean(website.exampleWebsites, 1200),
      contentAvailable: clean(website.contentAvailable, 600),
      notes: clean(website.notes, 1600),
    })),
    design: {
      primaryColour: clean(payload.design.primaryColour, 40),
      secondaryColour: clean(payload.design.secondaryColour, 40),
      fontPreference: clean(payload.design.fontPreference, 160),
      stylePreferences: cleanList(payload.design.stylePreferences),
      logoFileNames: cleanList(payload.design.logoFileNames, 20),
      assetFileNames: cleanList(payload.design.assetFileNames, 30),
    },
    content: {
      copyReady: clean(payload.content.copyReady, 80),
      imagesReady: clean(payload.content.imagesReady, 80),
      brandAssetsReady: clean(payload.content.brandAssetsReady, 80),
      contentNotes: clean(payload.content.contentNotes, 1600),
    },
    domainHosting: {
      hasDomain: clean(payload.domainHosting.hasDomain, 80),
      domainName: clean(payload.domainHosting.domainName, 240),
      needsHosting: clean(payload.domainHosting.needsHosting, 80),
      needsBusinessEmail: clean(payload.domainHosting.needsBusinessEmail, 80),
      notes: clean(payload.domainHosting.notes, 1600),
    },
    project: {
      budget: clean(payload.project.budget, 120),
      timeline: clean(payload.project.timeline, 120),
      priority: clean(payload.project.priority, 120),
      finalNotes: clean(payload.project.finalNotes, 2400),
    },
    security: {
      website: clean(payload.security?.website, 160),
      startedAt: payload.security?.startedAt,
      submittedAtClient: payload.security?.submittedAtClient,
    },
  };
}

function clean(value = "", maxLength = 1600) {
  return String(value).trim().slice(0, maxLength);
}

function cleanList(values: string[] = [], maxItems = 40) {
  return values
    .slice(0, maxItems)
    .map((value) => clean(value, 160))
    .filter(Boolean);
}
