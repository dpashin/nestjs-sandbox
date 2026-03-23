import {
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO для расчета графика выплат инвесторам
 */
export class InvestorGraphicDto {
  /** UUID займа */
  @IsString()
  loanId: string;

  /** Дата выдачи займа (YYYY-MM-DD) */
  @IsDateString()
  loanDate: string;

  /** Сумма основного долга */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  principalAmount: number;

  /** Годовая процентная ставка (%) */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  annualRate: number;

  /** Срок займа в днях */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  termDays: number;

  /** Период платежа в днях */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  paymentPeriodDays: number;
}
