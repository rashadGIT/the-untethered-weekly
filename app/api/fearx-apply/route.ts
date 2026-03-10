import { NextRequest, NextResponse } from "next/server";

const N8N_FEARX_WEBHOOK_URL = "https://rashadbarnett.app.n8n.cloud/webhook/f0cfeac5-e6c7-43d5-9a76-ab72d46a19a5";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, firstName, email, role, yearsInSales, story } = body;

  if (!email || !firstName || !story) {
    return NextResponse.json(
      { error: "Name, email, and story are required." },
      { status: 400 }
    );
  }

  // If no webhook is configured yet, return success so the UI works during development
  if (!N8N_FEARX_WEBHOOK_URL) {
    return NextResponse.json({ success: true });
  }

  const response = await fetch(N8N_FEARX_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, name: firstName, email, role, yearsInSales, story }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
