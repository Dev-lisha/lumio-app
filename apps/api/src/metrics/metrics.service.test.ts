import { MetricsService } from "./metrics.service";

describe("MetricsService", () => {
  it("exposes process metrics in Prometheus text format", () => {
    const output = new MetricsService().getMetrics();

    expect(output).toContain("# TYPE process_cpu_user_seconds_total counter");
    expect(output).toContain("# TYPE process_resident_memory_bytes gauge");
    expect(output).toMatch(/process_uptime_seconds [\d.]+/);
    expect(output).toContain("# TYPE http_requests_total counter");
  });

  it("counts completed requests by method and status", () => {
    const metrics = new MetricsService();

    metrics.recordRequest("GET", 501);
    metrics.recordRequest("GET", 501);
    metrics.recordRequest("POST", 201);

    const output = metrics.getMetrics();

    expect(output).toContain('http_requests_total{method="GET",status_code="501"} 2');
    expect(output).toContain('http_requests_total{method="POST",status_code="201"} 1');
  });
});
