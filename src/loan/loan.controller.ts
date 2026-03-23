import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanGraphicDto } from './dto/loan-graphic.dto';
import { InvestorGraphicDto } from './dto/investor-graphic.dto';

@Controller()
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('loan-graphic')
  @UsePipes(new ValidationPipe({ transform: true }))
  getLoanGraphic(@Query() params: LoanGraphicDto) {
    return this.loanService.calculateLoanGraphic(params);
  }

  @Get('investor-graphic')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getInvestorGraphic(@Query() params: InvestorGraphicDto) {
    return this.loanService.calculateInvestorGraphic(params);
  }
}
