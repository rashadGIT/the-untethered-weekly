import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://rashadbarnett.app.n8n.cloud/webhook/untethered-weekly-signup";

export async function POST(request: NextRequest) {
  const { email, firstName } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name: firstName || "" }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500}
    );
  }

  const n8nData = await response.json().catch(() => ({}));
  return NextResponse.json({ success: true, message: n8nData.message || null });
}
