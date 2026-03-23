import { IsString, IsNumber, IsDateString } from 'class-validator';

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
  @IsNumber()
  principalAmount: number;

  /** Годовая процентная ставка (%) */
  @IsNumber()
  annualRate: number;

  /** Срок займа в днях */
  @IsNumber()
  termDays: number;

  /** Период платежа в днях */
  @IsNumber()
  paymentPeriodDays: number;
}
