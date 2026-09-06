import { NextRequest, NextResponse } from "next/server";
import {
  SPAM_GUARD_LIMITS,
  hasExcessiveDigitRatio,
  isHoneypotTripped,
  isOverLength,
  isSubmittedTooFast,
  isValidEmailFormat,
  logSpamRejection,
  looksLikeGibberishName,
} from "../_lib/spam-guard";

const ROUTE = "contact";
const fakeSuccess = () =>
  NextResponse.json({
    success: true,
    message: "Message received! I'll be in touch within 48 hours.",
  });

export async function POST(request: NextRequest) {
  const { name, email, phone, message, company, startedAt } = await request.json();

  if (isHoneypotTripped(company)) {
    logSpamRejection(ROUTE, "honeypot");
    return fakeSuccess();
  }

  if (isSubmittedTooFast(startedAt)) {
    logSpamRejection(ROUTE, "too_fast");
    return fakeSuccess();
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (
    isOverLength(name, SPAM_GUARD_LIMITS.NAME_MAX_LENGTH) ||
    isOverLength(email, SPAM_GUARD_LIMITS.EMAIL_MAX_LENGTH) ||
    isOverLength(message, SPAM_GUARD_LIMITS.MESSAGE_MAX_LENGTH) ||
    (phone && isOverLength(phone, SPAM_GUARD_LIMITS.SHORT_TEXT_MAX_LENGTH))
  ) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  if (!isValidEmailFormat(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (looksLikeGibberishName(name)) {
    logSpamRejection(ROUTE, "gibberish_name", { name });
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }

  if (hasExcessiveDigitRatio(message)) {
    logSpamRejection(ROUTE, "digit_heavy_message");
    return NextResponse.json({ error: "Please write your message in your own words." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  const sharedSecret = process.env.N8N_SHARED_SECRET;

  if (!webhookUrl || !sharedSecret) {
    console.error(`[${ROUTE}] Missing N8N_CONTACT_WEBHOOK_URL or N8N_SHARED_SECRET env var`);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": sharedSecret,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({ name, email, phone: phone || "", message }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }

  const n8nData = await response.json().catch(() => ({}));
  return NextResponse.json({
    success: true,
    message: n8nData.message || "Message received! I'll be in touch within 48 hours.",
  });
}
