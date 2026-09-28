import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  performHealthCheck(): {
    status: "ok" | "unhealthy";
    service: string;
    time: string;
    indicators: Record<string, unknown>;
  } {
    // TODO: Add dependency checks when the database layer is implemented.
    const indicators = {
      liveness: this.checkLiveness(),
      // database: this.checkDatabase(),
    };
    const allHealthy = Object.values(indicators).every((indicator) => indicator.status === "up");

    return {
      status: allHealthy ? "ok" : "unhealthy",
      service: "lumio-api",
      time: new Date().toISOString(),
      indicators,
    };
  }

  private checkLiveness(): { status: "up" | "down"; details?: string } {
    try {
      const uptime = process.uptime();
      return uptime > 0
        ? { status: "up", details: `uptime: ${uptime}s` }
        : { status: "down", details: "process uptime is 0" };
    } catch (error) {
      return { status: "down", details: `liveness check failed: ${(error as Error).message}` };
    }
  }
}
