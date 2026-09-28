import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GovernanceService } from "./governance.service";

@ApiTags("governance")
@Controller({ path: "governance", version: "1" })
export class GovernanceController {
  constructor(private readonly governance: GovernanceService) {}

  @Get()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @ApiResponse({
    status: HttpStatus.NOT_IMPLEMENTED,
    description: "Governance summary and proposal tally are not implemented",
    schema: {
      type: "object",
      required: ["contract", "status", "tally"],
      properties: {
        contract: { type: "string", enum: ["governance"] },
        status: { type: "string", enum: ["not-implemented"] },
        tally: {
          type: "object",
          required: ["yes", "no", "abstain"],
          properties: {
            yes: { type: "integer", example: 0 },
            no: { type: "integer", example: 0 },
            abstain: { type: "integer", example: 0 },
          },
        },
      },
    },
  })
  summary() {
    return this.governance.summary();
  }
}
