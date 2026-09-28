import { randomUUID } from "node:crypto";
import type { NestMiddleware } from "@nestjs/common";

interface RequestWithId {
  headers: { "x-request-id"?: string | string[] };
}

interface ResponseWithHeaders {
  setHeader(name: string, value: string): unknown;
}

export class RequestIdMiddleware implements NestMiddleware {
  use(request: RequestWithId, response: ResponseWithHeaders, next: () => void): void {
    const inboundId = request.headers["x-request-id"];
    const requestId = typeof inboundId === "string" && inboundId.trim() ? inboundId : randomUUID();

    response.setHeader("X-Request-Id", requestId);
    next();
  }
}
