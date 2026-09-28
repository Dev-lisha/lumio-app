import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DividendsService } from "./dividends.service";

@ApiTags("dividends")
@Controller({ path: "dividends", version: "1" })
export class DividendsController {
  constructor(private readonly dividends: DividendsService) {}

  @Get()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @ApiResponse({
    status: HttpStatus.NOT_IMPLEMENTED,
    description: "Dividend summary is not implemented",
    schema: {
      type: "object",
      required: ["contract", "status"],
      properties: {
        contract: { type: "string", enum: ["dividends"] },
        status: { type: "string", enum: ["not-implemented"] },
      },
    },
  })
  summary() {
    return this.dividends.summary();
  }
}
