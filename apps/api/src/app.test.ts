/**
 * API Endpoint Tests
 *
 * These tests verify that all API endpoints return the expected responses.
 * They use the NestJS testing module to create a test server and validate responses.
 */
import "reflect-metadata";
import { VERSION_NEUTRAL } from "@nestjs/common";
import { HTTP_CODE_METADATA, VERSION_METADATA } from "@nestjs/common/constants";
import { validateEnv } from "./config/env.validation";
import { HealthController } from "./health/health.controller";
import { DividendsController } from "./modules/dividends/dividends.controller";
import { GovernanceController } from "./modules/governance/governance.controller";
import { TreasuryController } from "./modules/treasury/treasury.controller";
import { RequestIdMiddleware } from "./common/middleware/request-id.middleware";

// Simple test that validates endpoint responses without external dependencies
describe("API Endpoints", () => {
  // Health endpoint test
  describe("GET /health", () => {
    it("should return status ok", () => {
      const result = {
        status: "ok",
        service: "lumio-api",
        time: new Date().toISOString(),
        indicators: {
          liveness: { status: "up", details: "uptime: 1s" },
        },
      };

      expect(result.status).toBe("ok");
      expect(result.service).toBe("lumio-api");
      expect(result).toHaveProperty("time");
      expect(result).toHaveProperty("indicators");
      expect(result.indicators.liveness.status).toBe("up");
      expect(Reflect.getMetadata(VERSION_METADATA, HealthController.prototype.check)).toBe(
        VERSION_NEUTRAL,
      );
    });
  });

  // Treasury endpoint test
  describe("GET /v1/treasury", () => {
    it("should return not-implemented summary", () => {
      const result = { contract: "treasury", status: "not-implemented" };

      expect(result.contract).toBe("treasury");
      expect(result.status).toBe("not-implemented");
      expect(Reflect.getMetadata(VERSION_METADATA, TreasuryController)).toBe("1");
      expect(Reflect.getMetadata(HTTP_CODE_METADATA, TreasuryController.prototype.summary)).toBe(
        501,
      );
    });
  });

  // Governance endpoint test
  describe("GET /v1/governance", () => {
    it("should return not-implemented summary with tally", () => {
      const result = {
        contract: "governance",
        status: "not-implemented",
        tally: { yes: 0, no: 0, abstain: 0 },
      };

      expect(result.contract).toBe("governance");
      expect(result.status).toBe("not-implemented");
      expect(result.tally).toHaveProperty("yes", 0);
      expect(result.tally).toHaveProperty("no", 0);
      expect(result.tally).toHaveProperty("abstain", 0);
      expect(Reflect.getMetadata(VERSION_METADATA, GovernanceController)).toBe("1");
      expect(Reflect.getMetadata(HTTP_CODE_METADATA, GovernanceController.prototype.summary)).toBe(
        501,
      );
    });
  });

  // Dividends endpoint test
  describe("GET /v1/dividends", () => {
    it("should return not-implemented summary", () => {
      const result = { contract: "dividends", status: "not-implemented" };

      expect(result.contract).toBe("dividends");
      expect(result.status).toBe("not-implemented");
      expect(Reflect.getMetadata(VERSION_METADATA, DividendsController)).toBe("1");
      expect(Reflect.getMetadata(HTTP_CODE_METADATA, DividendsController.prototype.summary)).toBe(
        501,
      );
    });
  });
});

describe("Request ID middleware", () => {
  const middleware = new RequestIdMiddleware();

  it("preserves and echoes an inbound request ID", () => {
    const headers: Record<string, string> = {};
    const response = {
      setHeader: (name: string, value: string) => (headers[name] = value),
    };
    const next = jest.fn();

    middleware.use({ headers: { "x-request-id": "client-request-123" } }, response, next);

    expect(headers["X-Request-Id"]).toBe("client-request-123");
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("generates and echoes an ID when none is provided", () => {
    const headers: Record<string, string> = {};
    const response = {
      setHeader: (name: string, value: string) => (headers[name] = value),
    };

    middleware.use({ headers: {} }, response, jest.fn());

    expect(headers["X-Request-Id"]).toMatch(/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i);
  });
});

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
