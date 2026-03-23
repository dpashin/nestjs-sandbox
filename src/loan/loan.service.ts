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
    const { loanDate, principalAmount, annualRate, termDays, paymentPeriodDays } = params;

    // Количество платежных периодов
    const numberOfPayments = Math.ceil(termDays / paymentPeriodDays);

    // Округление вниз до 2 знаков
    const floorTo2Decimals = (value: number): number => {
      return Math.floor(value * 100) / 100;
    };

    // Расчет даты первого платежа: дата займа + 1 день
    const firstPaymentDate = new Date(loanDate);
    firstPaymentDate.setDate(firstPaymentDate.getDate() + 1);

    const result: LoanGraphicItem[] = [];

    for (let i = 0; i < numberOfPayments; i++) {
      // Расчет даты платежа
      const paymentDate = new Date(firstPaymentDate);
      paymentDate.setDate(firstPaymentDate.getDate() + i * paymentPeriodDays);

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
