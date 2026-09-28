import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  VERSION_NEUTRAL,
  Version,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";
import { HealthService } from "./health.service";

/** Health check endpoint with proper readiness probe functionality. */
@ApiTags("health")
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get("health")
  @SkipThrottle()
  @ApiOkResponse({
    description: "API health status",
    schema: {
      type: "object",
      required: ["status", "service", "time", "indicators"],
      properties: {
        status: { type: "string", enum: ["ok"] },
        service: { type: "string", example: "lumio-api" },
        time: { type: "string", format: "date-time" },
        indicators: {
          type: "object",
          required: ["liveness"],
          properties: {
            liveness: {
              type: "object",
              required: ["status", "details"],
              properties: {
                status: { type: "string", enum: ["up", "down"] },
                details: { type: "string" },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: "Health check failed",
    schema: {
      type: "object",
      required: ["statusCode", "message", "error", "timestamp", "path"],
      properties: {
        statusCode: { type: "integer", example: 503 },
        message: { type: "string" },
        error: { type: "string" },
        timestamp: { type: "string", format: "date-time" },
        path: { type: "string", example: "/health" },
      },
    },
  })
  @Version(VERSION_NEUTRAL)
  check() {
    const healthStatus = this.healthService.performHealthCheck();

    if (healthStatus.status === "unhealthy") {
      throw new HttpException(healthStatus, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return healthStatus;
  }
}
