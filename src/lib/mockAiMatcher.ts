/**
 * Mocks the Gemini-based sighting matcher from the real backend.
 * Produces a deterministic-ish score based on overlapping keywords
 * between the child's profile and the witness description.
 */
export type AiMatchResult = {
  score: number;
  reasoning: string;
  keyMatches: string[];
  keyMismatches: string[];
  shouldNotifyPolice: boolean;
};

type ChildProfile = {
  age: number;
  description: string;
  clothing: string;
  lastSeenLocation: string;
};

const POLICE_THRESHOLD = 70;

const STOPWORDS = new Set([
  "a", "an", "and", "the", "with", "of", "on", "in", "at", "to", "for", "is", "was",
  "by", "or", "i", "my", "he", "she", "it", "near", "looks", "looked", "saw", "seen",
  "had", "has", "wearing", "wears", "about", "year", "years", "old", "child", "kid",
  "boy", "girl",
]);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

export function mockMatch(profile: ChildProfile, sighting: string): AiMatchResult {
  const profileTokens = new Set(
    [...tokens(profile.description), ...tokens(profile.clothing), ...tokens(profile.lastSeenLocation)],
  );
  const sightingTokens = tokens(sighting);

  const matches: string[] = [];
  for (const t of sightingTokens) {
    if (profileTokens.has(t) && !matches.includes(t)) matches.push(t);
  }

  // Age detection in sighting
  const ageMatch = sighting.match(/\b(\d{1,2})\b/);
  let ageBonus = 0;
  if (ageMatch) {
    const reported = parseInt(ageMatch[1], 10);
    if (Math.abs(reported - profile.age) <= 1) {
      ageBonus = 15;
      matches.push(`age ~${reported}`);
    } else if (Math.abs(reported - profile.age) <= 3) {
      ageBonus = 5;
    }
  }

  const overlapScore = Math.min(70, matches.length * 14);
  const score = Math.min(98, Math.max(8, overlapScore + ageBonus));

  let reasoning = "";
  if (score >= 85) {
    reasoning = `Strong match — ${matches.length} specific details from the profile appear in the sighting, including age and clothing cues.`;
  } else if (score >= 70) {
    reasoning = `Likely match — multiple distinctive details overlap. Worth dispatching police.`;
  } else if (score >= 40) {
    reasoning = `Possible match — some details overlap but key identifiers are missing or conflicting.`;
  } else {
    reasoning = `Unlikely match — few overlapping details. Logged for review but not escalating.`;
  }

  return {
    score,
    reasoning,
    keyMatches: matches.slice(0, 5),
    keyMismatches: [],
    shouldNotifyPolice: score >= POLICE_THRESHOLD,
  };
}
