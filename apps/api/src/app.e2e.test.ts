import type { INestApplication } from "@nestjs/common";
import { VersioningType } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "./app.module";

describe("API e2e", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("serves the unversioned health check", async () => {
    const response = await request(app.getHttpServer()).get("/health").expect(200);

    expect(response.body).toMatchObject({ status: "ok", service: "lumio-api" });
    expect(response.body.indicators.liveness.status).toBe("up");
  });

  it("serves the versioned domain routes with their not-implemented responses", async () => {
    const treasury = await request(app.getHttpServer()).get("/v1/treasury").expect(501);
    const governance = await request(app.getHttpServer()).get("/v1/governance").expect(501);
    const dividends = await request(app.getHttpServer()).get("/v1/dividends").expect(501);

    expect(treasury.body).toEqual({ contract: "treasury", status: "not-implemented" });
    expect(governance.body).toEqual({
      contract: "governance",
      status: "not-implemented",
      tally: { yes: 0, no: 0, abstain: 0 },
    });
    expect(dividends.body).toEqual({ contract: "dividends", status: "not-implemented" });
  });

  it("serves process and HTTP request metrics at the unversioned path", async () => {
    const response = await request(app.getHttpServer()).get("/metrics").expect(200);

    expect(response.headers["content-type"]).toContain("text/plain");
    expect(response.text).toContain("# TYPE process_cpu_user_seconds_total counter");
    expect(response.text).toContain("# TYPE http_requests_total counter");
    expect(response.text).toMatch(/http_requests_total\{method="GET",status_code="501"\} [1-9]/);
  });
});
