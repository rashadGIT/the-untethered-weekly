/**
 * @jest-environment node
 *
 * Contract tests for app/api/fearx-apply/route.ts
 *
 * We import the POST handler directly and invoke it with a synthetic
 * NextRequest.  No HTTP server is required.
 *
 * The node environment is used because NextRequest depends on the Web Fetch
 * API (Request/Response) which is built into Node 18+ but is not available
 * in jsdom.
 */

import { POST } from "../../app/api/fearx-apply/route";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const VALID_PAYLOAD = {
  type: "speaker",
  firstName: "Jane",
  email: "jane@example.com",
  role: "Sales Director",
  yearsInSales: "5-10",
  story: "This is a long enough courage story about overcoming fear in sales.",
};

function buildRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/fearx-apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockWebhookSuccess() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  } as Response);
}

function mockWebhookFailure() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
    json: async () => ({}),
  } as Response);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("POST /api/fearx-apply", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // Validation
  // -----------------------------------------------------------------------
  describe("input validation", () => {
    it("returns 400 when email is missing", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, email: undefined });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when email is an empty string", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, email: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("returns 400 when firstName is missing", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, firstName: undefined });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when firstName is an empty string", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, firstName: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("returns 400 when story is missing", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, story: undefined });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when story is an empty string", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, story: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });

  // -----------------------------------------------------------------------
  // Happy path
  // -----------------------------------------------------------------------
  describe("successful submission", () => {
    it("returns 200 with { success: true } on a valid speaker application", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("returns 200 with { success: true } on a valid panelist application", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, type: "panelist" });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("forwards all required fields to the n8n webhook", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      await POST(req);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwarded = JSON.parse(options.body);

      expect(forwarded.type).toBe("speaker");
      expect(forwarded.name).toBe("Jane");   // route maps firstName -> name
      expect(forwarded.email).toBe("jane@example.com");
      expect(forwarded.role).toBe("Sales Director");
      expect(forwarded.yearsInSales).toBe("5-10");
      expect(forwarded.story).toBe(VALID_PAYLOAD.story);
    });

    it("makes a POST request to the n8n webhook URL", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      await POST(req);

      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toContain("n8n.cloud");
      expect(options.method).toBe("POST");
      expect(options.headers["Content-Type"]).toBe("application/json");
    });
  });

  // -----------------------------------------------------------------------
  // Webhook failure
  // -----------------------------------------------------------------------
  describe("n8n webhook failure", () => {
    it("returns 500 when the webhook responds with a non-ok status", async () => {
      mockWebhookFailure();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(500);
    });

    it("returns a descriptive error body on webhook failure", async () => {
      mockWebhookFailure();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });
  });
});
