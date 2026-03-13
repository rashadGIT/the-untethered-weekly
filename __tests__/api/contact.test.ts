/**
 * @jest-environment node
 *
 * Contract tests for app/api/contact/route.ts
 */

import { POST } from "../../app/api/contact/route";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const VALID_PAYLOAD = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "555-123-4567",
  message: "I would love to learn more about your coaching programs.",
};

function buildRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockWebhookSuccess(responseBody: Record<string, unknown> = {}) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => responseBody,
  } as Response);
}

function mockWebhookFailure() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
    json: async () => ({}),
  } as Response);
}

function mockWebhookNetworkError() {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("POST /api/contact", () => {
  beforeEach(() => jest.clearAllMocks());

  // -----------------------------------------------------------------------
  // Validation
  // -----------------------------------------------------------------------
  describe("input validation", () => {
    it("returns 400 when name is missing", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, name: undefined });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when name is an empty string", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, name: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

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

    it("returns 400 when message is missing", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, message: undefined });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when message is an empty string", async () => {
      const req = buildRequest({ ...VALID_PAYLOAD, message: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("does NOT return 400 when phone is missing (phone is optional)", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ name: "Jane", email: "jane@example.com", message: "Hello" });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });
  });

  // -----------------------------------------------------------------------
  // Happy path
  // -----------------------------------------------------------------------
  describe("successful submission", () => {
    it("returns 200 with { success: true } on a valid request", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("forwards name, email, phone, and message to the n8n webhook", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      await POST(req);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwarded = JSON.parse(options.body);
      expect(forwarded.name).toBe("Jane Smith");
      expect(forwarded.email).toBe("jane@example.com");
      expect(forwarded.phone).toBe("555-123-4567");
      expect(forwarded.message).toBe(VALID_PAYLOAD.message);
    });

    it("forwards empty string for phone when phone is omitted", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ name: "Jane", email: "jane@example.com", message: "Hi" });
      await POST(req);

      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const forwarded = JSON.parse(options.body);
      expect(forwarded.phone).toBe("");
    });

    it("makes a POST request with JSON content-type to the n8n webhook", async () => {
      mockWebhookSuccess();
      const req = buildRequest(VALID_PAYLOAD);
      await POST(req);

      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toContain("n8n.cloud");
      expect(options.method).toBe("POST");
      expect(options.headers["Content-Type"]).toBe("application/json");
    });

    it("uses the message from n8n in the response when provided", async () => {
      mockWebhookSuccess({ message: "We got your message!" });
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      const body = await res.json();
      expect(body.message).toBe("We got your message!");
    });

    it("uses the fallback message when n8n does not include one", async () => {
      mockWebhookSuccess({});
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      const body = await res.json();
      expect(body.message).toMatch(/48 hours/i);
    });
  });

  // -----------------------------------------------------------------------
  // Webhook failures
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
    it("handles n8n returning malformed JSON gracefully (json() throws)", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => { throw new Error("invalid json"); },
      } as unknown as Response);

      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      // Should fall back to default message, not crash
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.message).toMatch(/48 hours/i);
    });

    it("handles network-level fetch rejection (no connection)", async () => {
      mockWebhookNetworkError();
      const req = buildRequest(VALID_PAYLOAD);
      await expect(POST(req)).rejects.toThrow("Network error");
    });

    it("handles extremely long message values", async () => {
      mockWebhookSuccess();
      const req = buildRequest({ ...VALID_PAYLOAD, message: "A".repeat(10_000) });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("handles special characters and unicode in all fields", async () => {
      mockWebhookSuccess();
      const req = buildRequest({
        name: "Ñoño O'Brien <script>alert(1)</script>",
        email: "test+tag@example.co.uk",
        message: "こんにちは 🎉 & 'quotes' \"dquotes\"",
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("handles n8n responding with an unexpected 2xx status (e.g. 201)", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      } as Response);
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("handles n8n returning null message", async () => {
      mockWebhookSuccess({ message: null });
      const req = buildRequest(VALID_PAYLOAD);
      const res = await POST(req);
      const body = await res.json();
      // null is falsy so falls back to default
      expect(body.message).toMatch(/48 hours/i);
    });

    it("handles simultaneous missing name and email", async () => {
      const req = buildRequest({ message: "Just a message" });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("handles completely empty body", async () => {
      const req = buildRequest({});
      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });
});
