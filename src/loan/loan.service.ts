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

    // Расчет principal: равными частями с компенсацией в последнем платеже
    const basePrincipal = floorTo2Decimals(principalAmount / numberOfPayments);
    const roundTo2Decimals = (value: number): number => {
      return Math.round(value * 100) / 100;
    };
    const lastPrincipal = roundTo2Decimals(
      principalAmount - basePrincipal * (numberOfPayments - 1),
    );

    const result: LoanGraphicItem[] = [];

    for (let i = 0; i < numberOfPayments; i++) {
      // Расчет даты платежа: loanDate + (i+1) * paymentPeriodDays - 1 день
      const paymentDate = new Date(loanDate);
      paymentDate.setDate(paymentDate.getDate() + (i + 1) * paymentPeriodDays);

      // Форматирование даты в YYYY-MM-DD
      const formattedDate = paymentDate.toISOString().split('T')[0];

      const principal =
        i === numberOfPayments - 1 ? lastPrincipal : basePrincipal;

      result.push({
        paymentNumber: i + 1,
        paymentDate: formattedDate,
        principal: principal,
        interest: floorTo2Decimals(0),
      });
    }

    return result;
  }
}
