import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanGraphicDto } from './dto/loan-graphic.dto';

@Controller('loan-graphic')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getLoanGraphic(@Query() params: LoanGraphicDto) {
    return this.loanService.calculateLoanGraphic(params);
  }
}
