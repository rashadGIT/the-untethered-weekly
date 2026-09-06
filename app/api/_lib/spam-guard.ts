export const SPAM_GUARD_LIMITS = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  SHORT_TEXT_MAX_LENGTH: 200,
  MESSAGE_MAX_LENGTH: 5000,
  MIN_TIME_ON_PAGE_MS: 3000,
  MAX_DIGIT_RATIO: 0.4,
  MIN_VOWEL_RATIO: 0.2,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VOWEL_REGEX = /[aeiouAEIOU]/g;
const DIGIT_REGEX = /[0-9]/g;
const LETTER_REGEX = /[a-zA-Z]/g;

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isOverLength(value: string, max: number): boolean {
  return value.length > max;
}

export function hasExcessiveDigitRatio(
  value: string,
  maxRatio: number = SPAM_GUARD_LIMITS.MAX_DIGIT_RATIO
): boolean {
  if (value.length === 0) return false;
  const digitCount = value.match(DIGIT_REGEX)?.length ?? 0;
  return digitCount / value.length > maxRatio;
}

export function looksLikeGibberishName(
  name: string,
  minVowelRatio: number = SPAM_GUARD_LIMITS.MIN_VOWEL_RATIO
): boolean {
  const letters = name.match(LETTER_REGEX)?.length ?? 0;
  if (letters < 4) return false;
  const vowels = name.match(VOWEL_REGEX)?.length ?? 0;
  return vowels / letters < minVowelRatio;
}

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isSubmittedTooFast(
  startedAt: unknown,
  minMs: number = SPAM_GUARD_LIMITS.MIN_TIME_ON_PAGE_MS
): boolean {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return true;
  return Date.now() - startedAt < minMs;
}

export function logSpamRejection(
  route: string,
  reason: string,
  meta: Record<string, unknown> = {}
): void {
  console.log(
    JSON.stringify({
      event: "spam_rejected",
      route,
      reason,
      ...meta,
      timestamp: new Date().toISOString(),
    })
  );
}

export function logRateLimitHit(route: string, meta: Record<string, unknown> = {}): void {
  console.log(
    JSON.stringify({
      event: "rate_limit_hit",
      route,
      ...meta,
      timestamp: new Date().toISOString(),
    })
  );
}
