import { NextRequest, NextResponse } from "next/server";
import {
  SPAM_GUARD_LIMITS,
  isHoneypotTripped,
  isOverLength,
  isSubmittedTooFast,
  isValidEmailFormat,
  logSpamRejection,
} from "../_lib/spam-guard";

const ROUTE = "newsletter";
const fakeSuccess = () => NextResponse.json({ success: true, message: null });

export async function POST(request: NextRequest) {
  const { email, firstName, company, startedAt } = await request.json();

  if (isHoneypotTripped(company)) {
    logSpamRejection(ROUTE, "honeypot");
    return fakeSuccess();
  }

  if (isSubmittedTooFast(startedAt)) {
    logSpamRejection(ROUTE, "too_fast");
    return fakeSuccess();
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (
    isOverLength(email, SPAM_GUARD_LIMITS.EMAIL_MAX_LENGTH) ||
    (firstName && isOverLength(firstName, SPAM_GUARD_LIMITS.NAME_MAX_LENGTH))
  ) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  if (!isValidEmailFormat(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;
  const sharedSecret = process.env.N8N_SHARED_SECRET;

  if (!webhookUrl || !sharedSecret) {
    console.error(`[${ROUTE}] Missing N8N_NEWSLETTER_WEBHOOK_URL or N8N_SHARED_SECRET env var`);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": sharedSecret,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({ email, name: firstName || "" }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }

  const n8nData = await response.json().catch(() => ({}));
  return NextResponse.json({ success: true, message: n8nData.message || null });
}
