// Extracts structured captured fields from Clara's response and returns a clean reply

import type { CapturedFields } from "@/lib/clara/types";

interface ExtractionResult {
  cleanReply: string;
  captured: CapturedFields;
}

export function extractFields(rawResponse: string): ExtractionResult {
  // Try fenced code block first: ```json ... ``` or ``` ... ```
  const fencedPattern = /```(?:json)?\s*\n?\s*(\{[\s\S]*?"captured"[\s\S]*?\})\s*\n?\s*```\s*$/;
  const fencedMatch = rawResponse.match(fencedPattern);

  if (fencedMatch) {
    const parsed = tryParseCaptured(fencedMatch[1]);
    if (parsed) {
      const cleanReply = rawResponse.slice(0, fencedMatch.index).trim();
      return { cleanReply, captured: parsed };
    }
  }

  // Try plain JSON object at the end of the response
  const plainPattern = /(\{"captured"\s*:\s*\{[\s\S]*?\}\s*\})\s*$/;
  const plainMatch = rawResponse.match(plainPattern);

  if (plainMatch) {
    const parsed = tryParseCaptured(plainMatch[1]);
    if (parsed) {
      const cleanReply = rawResponse.slice(0, plainMatch.index).trim();
      return { cleanReply, captured: parsed };
    }
  }

  return { cleanReply: rawResponse.trim(), captured: {} };
}

function tryParseCaptured(jsonString: string): CapturedFields | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === "object" && parsed.captured && typeof parsed.captured === "object") {
      return parsed.captured as CapturedFields;
    }
    return null;
  } catch {
    return null;
  }
}
