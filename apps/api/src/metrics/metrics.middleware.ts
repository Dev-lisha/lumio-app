import { Injectable } from "@nestjs/common";
import type { NestMiddleware } from "@nestjs/common";
import { MetricsService } from "./metrics.service";

interface RequestWithMethod {
  method: string;
}

interface ResponseWithFinish {
  statusCode: number;
  once(event: "finish", listener: () => void): unknown;
}

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metrics: MetricsService) {}

  use(request: RequestWithMethod, response: ResponseWithFinish, next: () => void): void {
    response.once("finish", () => {
      this.metrics.recordRequest(request.method, response.statusCode);
    });
    next();
  }
}
