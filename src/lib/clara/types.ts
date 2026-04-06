// Clara TypeScript types - message, conversation, lead, and configuration interfaces

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  sessionId?: string;
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
}

export interface ChatErrorResponse {
  error: string;
}
