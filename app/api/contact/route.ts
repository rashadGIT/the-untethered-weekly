import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://rashadbarnett.app.n8n.cloud/webhook/shannon-contact-form";

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
