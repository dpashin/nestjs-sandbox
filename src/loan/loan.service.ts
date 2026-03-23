import { Injectable } from '@nestjs/common';
import { LoanGraphicDto } from './dto/loan-graphic.dto';

export interface LoanGraphicItem {
  paymentNumber: number;
  paymentDate: string;
  principal: number;
  interest: number;
}

@Injectable()
export class LoanService {
  calculateLoanGraphic(params: LoanGraphicDto): LoanGraphicItem[] {
    const {
      loanDate,
      principalAmount,
      annualRate,
      termDays,
      paymentPeriodDays,
    } = params;

    // Количество платежных периодов
    const numberOfPayments = Math.floor(termDays / paymentPeriodDays);

    // Округление вниз до 2 знаков
    const floorTo2Decimals = (value: number): number => {
      return Math.floor(value * 100) / 100;
    };

    const result: LoanGraphicItem[] = [];

    for (let i = 0; i < numberOfPayments; i++) {
      // Расчет даты платежа: loanDate + (i+1) * paymentPeriodDays - 1 день
      const paymentDate = new Date(loanDate);
      paymentDate.setDate(paymentDate.getDate() + (i + 1) * paymentPeriodDays);

      // Форматирование даты в YYYY-MM-DD
      const formattedDate = paymentDate.toISOString().split('T')[0];

      // Заглушки для principal и interest (будут рассчитаны позже)
      result.push({
        paymentNumber: i + 1,
        paymentDate: formattedDate,
        principal: floorTo2Decimals(0),
        interest: floorTo2Decimals(0),
      });
    }

    return result;
  }
}
