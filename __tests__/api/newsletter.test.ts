/**
 * @jest-environment node
 *
 * Contract tests for app/api/newsletter/route.ts
 *
 * We import the POST handler directly and invoke it with a synthetic
 * NextRequest.  No HTTP server is required.
 *
 * The node environment is used because NextRequest depends on the Web Fetch
 * API (Request/Response) which is built into Node 18+ but is not available
 * in jsdom.
 */

import { POST } from "../../app/api/newsletter/route";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const FRESH_STARTED_AT = () => Date.now() - 5000;

function buildRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockN8nSuccess(responseBody: Record<string, unknown> = {}) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => responseBody,
  } as Response);
}

function mockN8nFailure() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
    json: async () => ({}),
  } as Response);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("POST /api/newsletter", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      N8N_NEWSLETTER_WEBHOOK_URL: "https://rashadbarnett.app.n8n.cloud/webhook/test-newsletter",
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
      mockN8nSuccess();
      const req = buildRequest({ firstName: "Shannon", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/email is required/i);
    });

    it("returns 400 when email is an empty string", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "", firstName: "Shannon", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("does NOT return 400 when firstName is missing (firstName is optional)", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      // firstName is optional — the route should forward successfully
      expect(res.status).toBe(200);
    });

    it("returns 400 when email format is invalid", async () => {
      const req = buildRequest({ email: "not-an-email", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/valid email/i);
    });
  });

  // -----------------------------------------------------------------------
  // Bot defenses (honeypot, timing)
  // -----------------------------------------------------------------------
  describe("bot defenses", () => {
    it("returns a fake success without calling the webhook when the honeypot field is filled", async () => {
      mockN8nSuccess();
      const req = buildRequest({
        email: "test@example.com",
        company: "Acme Corp",
        startedAt: FRESH_STARTED_AT(),
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("returns a fake success without calling the webhook when submitted too fast", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", startedAt: Date.now() });
      const res = await POST(req);
      expect(res.status).toBe(200);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Server configuration
  // -----------------------------------------------------------------------
  describe("server configuration", () => {
    it("returns 500 and never calls fetch when N8N_NEWSLETTER_WEBHOOK_URL is missing", async () => {
      delete process.env.N8N_NEWSLETTER_WEBHOOK_URL;
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(500);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("returns 500 and never calls fetch when N8N_SHARED_SECRET is missing", async () => {
      delete process.env.N8N_SHARED_SECRET;
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(500);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Happy path
  // -----------------------------------------------------------------------
  describe("successful submission", () => {
    it("returns 200 with { success: true } on a valid request", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", firstName: "Shannon", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("forwards the email and firstName to the n8n webhook with the shared secret header", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "shannon@example.com", firstName: "Shannon", startedAt: FRESH_STARTED_AT() });
      await POST(req);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwardedBody = JSON.parse(options.body);
      expect(forwardedBody.email).toBe("shannon@example.com");
      expect(forwardedBody.name).toBe("Shannon");
      expect(options.headers["X-Webhook-Secret"]).toBe("test-shared-secret");
      expect(options.headers["User-Agent"]).toBeTruthy();
    });

    it("forwards an empty string for name when firstName is omitted", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", startedAt: FRESH_STARTED_AT() });
      await POST(req);

      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwardedBody = JSON.parse(options.body);
      expect(forwardedBody.name).toBe("");
    });

    it("includes the message from n8n in the response when provided", async () => {
      mockN8nSuccess({ message: "Welcome aboard, courage seeker!" });
      const req = buildRequest({ email: "test@example.com", firstName: "Jane", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      const body = await res.json();
      expect(body.message).toBe("Welcome aboard, courage seeker!");
    });

    it("returns message: null when n8n does not include a message", async () => {
      mockN8nSuccess({});
      const req = buildRequest({ email: "test@example.com", firstName: "Jane", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      const body = await res.json();
      expect(body.message).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // Webhook failure
  // -----------------------------------------------------------------------
  describe("n8n webhook failure", () => {
    it("returns 500 when the n8n webhook responds with a non-ok status", async () => {
      mockN8nFailure();
      const req = buildRequest({ email: "test@example.com", firstName: "Jane", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(500);
    });

    it("returns a descriptive error message on webhook failure", async () => {
      mockN8nFailure();
      const req = buildRequest({ email: "test@example.com", firstName: "Jane", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });
  });

  // -----------------------------------------------------------------------
  // Chaos scenarios
  // -----------------------------------------------------------------------
  describe("chaos scenarios", () => {
    it("falls back to null message when n8n response.json() throws", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => { throw new Error("invalid json"); },
      } as unknown as Response);
      const req = buildRequest({ email: "test@example.com", firstName: "Jane", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.message).toBeNull();
    });

    it("handles network-level fetch rejection", async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
      const req = buildRequest({ email: "test@example.com", startedAt: FRESH_STARTED_AT() });
      await expect(POST(req)).rejects.toThrow("Network error");
    });

    it("handles extremely long email addresses within the length limit", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "a".repeat(200) + "@example.com", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("returns 400 when the email exceeds the max length", async () => {
      const req = buildRequest({ email: "a".repeat(250) + "@example.com", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("handles special characters in firstName", async () => {
      mockN8nSuccess();
      const req = buildRequest({ email: "test@example.com", firstName: "José", startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("handles completely empty body fields", async () => {
      const req = buildRequest({ startedAt: FRESH_STARTED_AT() });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });
});
