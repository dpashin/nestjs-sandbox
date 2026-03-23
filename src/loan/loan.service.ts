import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoanGraphicDto } from './dto/loan-graphic.dto';
import { InvestorGraphicDto } from './dto/investor-graphic.dto';
import { Investment } from '../entities/investment.entity';

export interface LoanGraphicItem {
  paymentNumber: number;
  paymentDate: string;
  principal: number;
  interest: number;
}

export interface InvestorGraphicItem {
  paymentNumber: number;
  investorId: string;
  paymentDate: string;
  principal: number;
  percentLoan: number;
  percentStrategyRate: number;
}

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Investment)
    private investmentModel: typeof Investment,
  ) {}

  async calculateInvestorGraphic(
    params: InvestorGraphicDto,
  ): Promise<InvestorGraphicItem[]> {
    const { loanId, loanDate, termDays, paymentPeriodDays } = params;

    const numberOfPayments = Math.floor(termDays / paymentPeriodDays);

    const investors = await this.investmentModel.findAll({
      where: { loanId },
    });

    if (investors.length === 0) {
      throw new NotFoundException(`No investments found for loanId: ${loanId}`);
    }

    const result: InvestorGraphicItem[] = [];

    for (let i = 0; i < numberOfPayments; i++) {
      const paymentDate = new Date(loanDate);
      paymentDate.setDate(paymentDate.getDate() + (i + 1) * paymentPeriodDays);
      const formattedDate = paymentDate.toISOString().split('T')[0];

      for (const investor of investors) {
        const strategyRatePercent = Number(investor.investorStrategyRate) * 100;
        result.push({
          paymentNumber: i + 1,
          investorId: investor.investorId,
          paymentDate: formattedDate,
          principal: 0,
          percentLoan: 0,
          percentStrategyRate: Math.round(strategyRatePercent * 100) / 100,
        });
      }
    }

    return result;
  }

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

      const daysInPeriod = paymentPeriodDays;
      const dailyRate = annualRate / 100 / 365;
      const interest = roundTo2Decimals(
        principalAmount * dailyRate * daysInPeriod,
      );

      result.push({
        paymentNumber: i + 1,
        paymentDate: formattedDate,
        principal: principal,
        interest: interest,
      });
    }

    return result;
  }
}
