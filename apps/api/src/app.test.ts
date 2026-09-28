/**
 * API Endpoint Tests
 *
 * These tests verify that all API endpoints return the expected responses.
 * They use the NestJS testing module to create a test server and validate responses.
 */
import { validateEnv } from "./config/env.validation";

describe("API environment config", () => {
  it("uses default rate limits", () => {
    const config = validateEnv({});

    expect(config.RATE_LIMIT_TTL_MS).toBe(60000);
    expect(config.RATE_LIMIT_LIMIT).toBe(100);
  });

  it("accepts configured rate limits", () => {
    const config = validateEnv({ RATE_LIMIT_TTL_MS: "30000", RATE_LIMIT_LIMIT: "25" });

    expect(config.RATE_LIMIT_TTL_MS).toBe(30000);
    expect(config.RATE_LIMIT_LIMIT).toBe(25);
  });

  it("rejects non-positive or non-integer rate limits", () => {
    expect(() => validateEnv({ RATE_LIMIT_TTL_MS: "0" })).toThrow("RATE_LIMIT_TTL_MS");
    expect(() => validateEnv({ RATE_LIMIT_LIMIT: "1.5" })).toThrow("RATE_LIMIT_LIMIT");
  });
});
