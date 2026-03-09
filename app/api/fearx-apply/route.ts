import { NextRequest, NextResponse } from "next/server";

// Wire up a new N8N webhook URL here when the workflow is created
const N8N_FEARX_WEBHOOK_URL = "";

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
    body: JSON.stringify({ type, firstName, email, role, yearsInSales, story }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
