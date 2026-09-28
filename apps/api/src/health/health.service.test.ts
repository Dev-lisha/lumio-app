import { HealthService } from "./health.service";

describe("HealthService", () => {
  afterEach(() => jest.restoreAllMocks());

  it("reports a healthy liveness check", () => {
    const result = new HealthService().performHealthCheck();

    expect(result.status).toBe("ok");
    expect(result.service).toBe("lumio-api");
    expect(result.indicators).toHaveProperty("liveness.status", "up");
  });

  it("reports an unhealthy liveness check", () => {
    jest.spyOn(process, "uptime").mockReturnValue(0);

    const result = new HealthService().performHealthCheck();

    expect(result.status).toBe("unhealthy");
    expect(result.indicators).toHaveProperty("liveness.status", "down");
  });
});
