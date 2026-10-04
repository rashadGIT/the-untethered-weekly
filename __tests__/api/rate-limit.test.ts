/**
 * @jest-environment node
 *
 * Unit tests for app/api/_lib/rate-limit.ts
 */

const mockLimit = jest.fn();

jest.mock("@upstash/ratelimit", () => {
  return {
    Ratelimit: Object.assign(
      jest.fn().mockImplementation(() => ({
        limit: mockLimit,
      })),
      {
        slidingWindow: jest.fn(),
      }
    ),
  };
});

jest.mock("@upstash/redis", () => ({
  Redis: jest.fn(),
}));

describe("rate-limit", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe("getClientIp", () => {
    it("returns the first IP from a comma-separated x-forwarded-for header", async () => {
      const { getClientIp } = await import("../../app/api/_lib/rate-limit");
      const req = new Request("http://localhost/api/test", {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
      });
      expect(getClientIp(req)).toBe("1.2.3.4");
    });

    it("returns 'unknown' when the header is missing", async () => {
      const { getClientIp } = await import("../../app/api/_lib/rate-limit");
      const req = new Request("http://localhost/api/test");
      expect(getClientIp(req)).toBe("unknown");
    });
  });

  describe("isRateLimited", () => {
    it("returns false and warns when Upstash env vars are missing", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const { isRateLimited } = await import("../../app/api/_lib/rate-limit");
      const result = await isRateLimited("test-route", "1.2.3.4");

      expect(result).toBe(false);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Upstash not configured")
      );
      warnSpy.mockRestore();
    });

    it("returns false when the underlying limiter reports success", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
      mockLimit.mockResolvedValue({ success: true });

      const { isRateLimited } = await import("../../app/api/_lib/rate-limit");
      const result = await isRateLimited("test-route", "1.2.3.4");

      expect(result).toBe(false);
    });

    it("returns true when the underlying limiter reports failure", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
      mockLimit.mockResolvedValue({ success: false });

      const { isRateLimited } = await import("../../app/api/_lib/rate-limit");
      const result = await isRateLimited("test-route", "1.2.3.4");

      expect(result).toBe(true);
    });

    it("scopes the rate limit key by both route and IP", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
      mockLimit.mockResolvedValue({ success: true });

      const { isRateLimited } = await import("../../app/api/_lib/rate-limit");
      await isRateLimited("fearx-apply", "9.9.9.9");

      expect(mockLimit).toHaveBeenCalledWith("fearx-apply:9.9.9.9");
    });
  });
});
