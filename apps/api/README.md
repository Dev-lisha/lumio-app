# Lumio API

The API is a NestJS service that connects the application to Lumio contracts through `@lumio/sdk`.
See the [repository README](../../README.md) for setup and configuration, and the
[NestJS documentation](https://docs.nestjs.com/) for framework guidance.

## Routes

| Method | Path             | Status                                   | Response                                                                         |
| ------ | ---------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `GET`  | `/health`        | `200` when healthy; `503` when unhealthy | Health status and liveness indicator; see examples below.                        |
| `GET`  | `/metrics`       | `200`                                    | Prometheus text exposition containing process metrics and `http_requests_total`. |
| `GET`  | `/v1/treasury`   | `501`                                    | Treasury scaffold response.                                                      |
| `GET`  | `/v1/governance` | `501`                                    | Governance scaffold response, including an empty tally.                          |
| `GET`  | `/v1/dividends`  | `501`                                    | Dividends scaffold response.                                                     |
| `GET`  | `/docs`          | `200`                                    | Swagger UI.                                                                      |
| `GET`  | `/docs-json`     | `200`                                    | OpenAPI document.                                                                |

The domain routes are placeholders and do not read contract state yet. `/health`, `/metrics`, and
the Swagger endpoints are not URI-versioned.

Run `pnpm --filter @lumio/api test:cov` to generate an API coverage report. Jest currently enforces
a 20% global floor for statements, branches, and lines, and 25% for functions; these are starting
floors to raise as route and infrastructure coverage grows.

### Health responses

Healthy response (`200`):

```json
{
  "status": "ok",
  "service": "lumio-api",
  "time": "2026-01-01T00:00:00.000Z",
  "indicators": {
    "liveness": { "status": "up", "details": "uptime: 123s" }
  }
}
```

Unhealthy response (`503`) uses the global exception envelope:

```json
{
  "statusCode": 503,
  "message": "Http Exception",
  "error": "HttpException",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "path": "/health"
}
```

### Domain scaffold responses

`GET /v1/treasury` (`501`):

```json
{ "contract": "treasury", "status": "not-implemented" }
```

`GET /v1/governance` (`501`):

```json
{
  "contract": "governance",
  "status": "not-implemented",
  "tally": { "yes": 0, "no": 0, "abstain": 0 }
}
```

`GET /v1/dividends` (`501`):

```json
{ "contract": "dividends", "status": "not-implemented" }
```
