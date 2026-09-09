// Alice TypeScript types - message, conversation, lead, and configuration interfaces

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  sessionId?: string;
  turnstileToken?: string;
}

export interface CapturedFields {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  industry?: string;
  country?: string;
  team_size?: string;
  existing_certifications?: string;
  certification_interest?: string;
  urgency?: string;
  tender_pressure?: string;
  preferred_contact?: string;
  notes?: string;
}

export interface ChatResponse {
  reply: string;
  captured?: CapturedFields;
  sessionId: string;
  conversationId?: string;
}

export interface ChatErrorResponse {
  error: string;
}

export interface QualityCheckInput {
  conversationId: string;
  aiScore?: number;
  aiNotes?: string;
  visitorRating?: "helpful" | "not_helpful";
  visitorRatedAt?: string;
  /** false when the judge found a claim that must never be published */
  compliancePassed?: boolean;
  /** verbatim offending sentences, null when there were none */
  complianceBreaches?: string | null;
}

export interface AIQualityCheckResult {
  score: number;
  notes: string;
  rawResponse: string;
  /**
   * Separate from `score` deliberately: a conversation can be commercially
   * excellent and still contain a claim that must never ship. Defaults to false
   * when the verdict cannot be parsed.
   */
  compliancePassed: boolean;
  complianceBreaches: string | null;
}
