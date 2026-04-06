// Typed API client — all FE calls go through here

const BASE = "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// --- Types (mirrors Mongoose models) ---

export interface Track {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Archetype {
  _id: string;
  trackId: string | Track;
  name: string;
  slug: string;
  description: string;
}

export interface TorviUser {
  _id: string;
  email: string;
  fullName: string;
  timezone: string;
  trackId: string | Track | null;
  archetypeId: string | Archetype | null;
  runId: string | null;
  currentWeek: number;
  billingStatus: string;
  learningStatus: string;
  slackStatus: string;
  certificateStatus: string;
  upsellStatus: string;
  aiSupportStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface Guide {
  _id: string;
  title: string;
  slug: string;
  weekId: number;
  purpose: string;
  estimatedTimeMinutes: number;
  expectedOutput: string;
  guideType: string;
  isRequired: boolean;
  doneChecklist: string[];
  retrievalTags: string[];
}

export interface Artifact {
  _id: string;
  userId: string;
  artifactType: string;
  status: string;
  title: string;
  description: string;
  submissionUrl: string;
  reviewStatus: string;
  updatedAt: string;
}

// --- Tracks ---

export async function getTracks(): Promise<Track[]> {
  const data = await request<{ tracks: Track[] }>("/api/tracks");
  return data.tracks;
}

// --- Archetypes ---

export async function getArchetypes(trackId?: string): Promise<Archetype[]> {
  const qs = trackId ? `?trackId=${trackId}` : "";
  const data = await request<{ archetypes: Archetype[] }>(`/api/archetypes${qs}`);
  return data.archetypes;
}

// --- Users ---

export async function createUser(payload: {
  email: string;
  fullName?: string;
  trackId?: string;
  archetypeId?: string;
  learningStatus?: string;
}): Promise<TorviUser> {
  const data = await request<{ user: TorviUser }>("/api/users", {
    method: "POST",
    body: JSON.stringify({
      fullName: payload.fullName ?? payload.email.split("@")[0],
      ...payload,
    }),
  });
  return data.user;
}

export async function getUser(id: string): Promise<TorviUser> {
  const data = await request<{ user: TorviUser }>(`/api/users/${id}`);
  return data.user;
}

export async function updateUser(id: string, patch: Partial<TorviUser>): Promise<TorviUser> {
  const data = await request<{ user: TorviUser }>(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return data.user;
}

// --- Guides ---

export async function getGuides(params: {
  weekId?: number;
  trackId?: string;
  archetypeId?: string;
}): Promise<Guide[]> {
  const qs = new URLSearchParams();
  if (params.weekId !== undefined) qs.set("weekId", String(params.weekId));
  if (params.trackId) qs.set("trackId", params.trackId);
  if (params.archetypeId) qs.set("archetypeId", params.archetypeId);
  const data = await request<{ guides: Guide[] }>(`/api/guides?${qs.toString()}`);
  return data.guides;
}

// --- Artifacts ---

export async function getUserArtifacts(userId: string): Promise<Artifact[]> {
  const data = await request<{ artifacts: Artifact[] }>(`/api/artifacts?userId=${userId}`);
  return data.artifacts;
}

export async function createArtifact(payload: Partial<Artifact> & { userId: string }): Promise<Artifact> {
  const data = await request<{ artifact: Artifact }>("/api/artifacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.artifact;
}

export async function updateArtifact(id: string, patch: Partial<Artifact>): Promise<Artifact> {
  const data = await request<{ artifact: Artifact }>(`/api/artifacts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return data.artifact;
}

// --- Resources ---

export interface DBResource {
  slug: string;
  title: string;
  type: "prompt_pack" | "template" | "worksheet";
  roleSlug: string | null;
}

export async function getResources(roleSlug?: string): Promise<DBResource[]> {
  const qs = roleSlug ? `?roleSlug=${roleSlug}` : "";
  const data = await request<{ resources: DBResource[] }>(`/api/resources${qs}`);
  return data.resources;
}

// --- Progress ---

export async function recordProgress(event: {
  userId: string;
  eventName: string;
  weekId?: number;
  guideId?: string;
  payload?: Record<string, unknown>;
}): Promise<void> {
  await request("/api/progress", {
    method: "POST",
    body: JSON.stringify({ source: "site", ...event }),
  });
}

// --- AI Coach ---

export async function sendAIMessage(payload: {
  userId: string;
  message: string;
  threadId?: string;
  blockerCategory?: string;
}): Promise<{ threadId: string; response: string }> {
  return request<{ threadId: string; response: string }>("/api/ai-coach", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Support ---

export async function createSupportCase(payload: {
  userId: string;
  category: string;
  subject: string;
  description: string;
  currentWeek?: number;
}): Promise<{ _id: string }> {
  const data = await request<{ supportCase: { _id: string } }>("/api/support", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.supportCase;
}

// --- Local storage helpers ---

const UID_KEY = "torvi_uid";

export function getStoredUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(UID_KEY);
}

export function storeUserId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(UID_KEY, id);
}

export function clearStoredUserId(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(UID_KEY);
}
