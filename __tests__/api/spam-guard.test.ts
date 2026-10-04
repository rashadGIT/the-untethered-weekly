/**
 * @jest-environment node
 *
 * Unit tests for app/api/_lib/spam-guard.ts
 */

import {
  hasExcessiveDigitRatio,
  isHoneypotTripped,
  isOverLength,
  isSubmittedTooFast,
  isValidEmailFormat,
  looksLikeGibberishName,
} from "../../app/api/_lib/spam-guard";

describe("isValidEmailFormat", () => {
  it("accepts a standard email", () => {
    expect(isValidEmailFormat("jane@example.com")).toBe(true);
  });

  it("accepts a plus-tagged email", () => {
    expect(isValidEmailFormat("jane+tag@example.co.uk")).toBe(true);
  });

  it("rejects a string with no @", () => {
    expect(isValidEmailFormat("not-an-email")).toBe(false);
  });

  it("rejects a string with no domain suffix", () => {
    expect(isValidEmailFormat("jane@example")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmailFormat("")).toBe(false);
  });
});

describe("isOverLength", () => {
  it("returns false when the value is under the max", () => {
    expect(isOverLength("hello", 10)).toBe(false);
  });

  it("returns false when the value is exactly at the max", () => {
    expect(isOverLength("hello", 5)).toBe(false);
  });

  it("returns true when the value exceeds the max", () => {
    expect(isOverLength("hello world", 5)).toBe(true);
  });
});

describe("hasExcessiveDigitRatio", () => {
  it("returns false for ordinary prose", () => {
    expect(hasExcessiveDigitRatio("I have been in sales for 10 years.")).toBe(false);
  });

  it("returns true for a phone-number dump", () => {
    expect(hasExcessiveDigitRatio("5551234567 5551234567")).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(hasExcessiveDigitRatio("")).toBe(false);
  });

  it("respects a custom ratio threshold", () => {
    expect(hasExcessiveDigitRatio("abc123", 0.1)).toBe(true);
    expect(hasExcessiveDigitRatio("abc123", 0.9)).toBe(false);
  });
});

describe("looksLikeGibberishName", () => {
  it("returns false for a normal name", () => {
    expect(looksLikeGibberishName("Jane")).toBe(false);
  });

  it("returns true for a vowel-less bot-style string", () => {
    expect(looksLikeGibberishName("Xkqzvbrt")).toBe(true);
  });

  it("returns false for a short real name with a low vowel ratio (avoids false positives)", () => {
    expect(looksLikeGibberishName("Chris")).toBe(false);
  });

  it("returns false for very short strings (avoids false positives on initials)", () => {
    expect(looksLikeGibberishName("Jo")).toBe(false);
  });
});

describe("isHoneypotTripped", () => {
  it("returns false when the field is empty", () => {
    expect(isHoneypotTripped("")).toBe(false);
  });

  it("returns false when the field is undefined", () => {
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it("returns false for a whitespace-only value", () => {
    expect(isHoneypotTripped("   ")).toBe(false);
  });

  it("returns true when the field has content", () => {
    expect(isHoneypotTripped("Acme Corp")).toBe(true);
  });
});

describe("isSubmittedTooFast", () => {
  it("returns true when startedAt is missing", () => {
    expect(isSubmittedTooFast(undefined)).toBe(true);
  });

  it("returns true when startedAt is not a number", () => {
    expect(isSubmittedTooFast("not-a-number")).toBe(true);
  });

  it("returns true when submitted immediately", () => {
    expect(isSubmittedTooFast(Date.now())).toBe(true);
  });

  it("returns false when enough time has elapsed", () => {
    expect(isSubmittedTooFast(Date.now() - 5000)).toBe(false);
  });

  it("respects a custom minimum", () => {
    const startedAt = Date.now() - 1000;
    expect(isSubmittedTooFast(startedAt, 500)).toBe(false);
    expect(isSubmittedTooFast(startedAt, 2000)).toBe(true);
  });
});
