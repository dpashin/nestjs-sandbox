import { IsInt, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class LoanGraphicDto {
  @IsDateString()
  loanDate: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  principalAmount: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  annualRate: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  termDays: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  paymentPeriodDays: number;
}
