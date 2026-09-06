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
const FRESH_STARTED_AT = () => Date.now() - 5000;

const VALID_PAYLOAD = {
  type: "speaker",
  firstName: "Jane",
  email: "jane@example.com",
  role: "Sales Director",
  yearsInSales: "5-10",
  story: "This is a long enough courage story about overcoming fear in sales.",
  startedAt: FRESH_STARTED_AT(),
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
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      N8N_FEARX_WEBHOOK_URL: "https://rashadbarnett.app.n8n.cloud/webhook/test-fearx",
      N8N_SHARED_SECRET: "test-shared-secret",
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
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

    it("returns 400 when email format is invalid", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, email: "not-an-email" });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/valid email/i);
    });

    it("returns 400 when firstName exceeds the max length", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, firstName: "A".repeat(101) });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/too long/i);
    });

    it("returns 400 when story exceeds the max length", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, story: "A".repeat(5001) });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/too long/i);
    });

    it("accepts a story right at the max length boundary", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, story: "A".repeat(5000) });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("returns 400 when firstName looks like bot gibberish (no vowels)", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, firstName: "Xkqzvbrt" });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/valid name/i);
    });

    it("returns 400 when story is mostly digits (phone-number stuffing)", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, story: "5551234567 5551234567 5551234567" });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/own words/i);
    });
  });

  // -----------------------------------------------------------------------
  // Bot defenses (honeypot, timing)
  // -----------------------------------------------------------------------
  describe("bot defenses", () => {
    it("returns a fake success without calling the webhook when the honeypot field is filled", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, company: "Acme Corp" });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("returns a fake success without calling the webhook when submitted too fast", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, startedAt: Date.now() });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("returns a fake success without calling the webhook when startedAt is missing", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, startedAt: undefined });
      const res = await POST(req);
      expect(res.status).toBe(200);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Server configuration
  // -----------------------------------------------------------------------
  describe("server configuration", () => {
    it("returns 500 and never calls fetch when N8N_FEARX_WEBHOOK_URL is missing", async () => {
      delete process.env.N8N_FEARX_WEBHOOK_URL;
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(500);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("returns 500 and never calls fetch when N8N_SHARED_SECRET is missing", async () => {
      delete process.env.N8N_SHARED_SECRET;
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(500);
      expect(global.fetch).not.toHaveBeenCalled();
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

    it("makes a POST request to the n8n webhook URL with the shared secret header", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      await POST(req);

      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toContain("n8n.cloud");
      expect(options.method).toBe("POST");
      expect(options.headers["Content-Type"]).toBe("application/json");
      expect(options.headers["X-Webhook-Secret"]).toBe("test-shared-secret");
      expect(options.headers["User-Agent"]).toBeTruthy();
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

  // -----------------------------------------------------------------------
  // Chaos scenarios
  // -----------------------------------------------------------------------
  describe("chaos scenarios", () => {
    it("handles network-level fetch rejection", async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
      const req = buildRequest(VALID_PAYLOAD);
      await expect(POST(req)).rejects.toThrow("Network error");
    });

    it("handles all three required fields missing simultaneously", async () => {
      const req = buildRequest({ type: "speaker", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("handles special characters and unicode in story field", async () => {
      mockWebhookSuccess();
      const req = buildRequest({
        ...VALID_PAYLOAD,
        story: "こんにちは 🎉 <script>alert('xss')</script> & courage",
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("accepts type='panelist' with all required fields", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, type: "panelist" });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("forwards type to the webhook payload", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, type: "panelist" });
      await POST(req);
      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwarded = JSON.parse(options.body);
      expect(forwarded.type).toBe("panelist");
    });

    it("handles webhook returning unexpected 2xx status (201)", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      } as Response);
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(200);
    });
  });
});
