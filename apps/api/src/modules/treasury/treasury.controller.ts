import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TreasuryService } from "./treasury.service";

@ApiTags("treasury")
@Controller({ path: "treasury", version: "1" })
export class TreasuryController {
  constructor(private readonly treasury: TreasuryService) {}

  @Get()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @ApiResponse({
    status: HttpStatus.NOT_IMPLEMENTED,
    description: "Treasury summary is not implemented",
    schema: {
      type: "object",
      required: ["contract", "status"],
      properties: {
        contract: { type: "string", enum: ["treasury"] },
        status: { type: "string", enum: ["not-implemented"] },
      },
    },
  })
  summary() {
    return this.treasury.summary();
  }
}
