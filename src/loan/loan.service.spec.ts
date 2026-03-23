import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  let loanService: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
    }).compile();

    loanService = module.get<LoanService>(LoanService);
  });

  describe('calculateLoanGraphic', () => {
    it('должен вернуть 12 платежей с paymentNumber от 1 до 12', () => {
      const params = {
        loanDate: '2026-03-16',
        principalAmount: 500000,
        annualRate: 17,
        termDays: 365,
        paymentPeriodDays: 30,
      };

      const result = loanService.calculateLoanGraphic(params);

      expect(result).toHaveLength(12);
      expect(result[0].paymentNumber).toBe(1);
      expect(result[result.length - 1].paymentNumber).toBe(12);
    });

    it('должен вернуть корректные даты платежей', () => {
      const params = {
        loanDate: '2026-03-16',
        principalAmount: 500000,
        annualRate: 17,
        termDays: 365,
        paymentPeriodDays: 30,
      };

      const result = loanService.calculateLoanGraphic(params);

      expect(result[0].paymentDate).toBe('2026-04-15');
      expect(result[result.length - 1].paymentDate).toBe('2027-03-11');
    });

    it('должен вернуть равные суммы principal с компенсацией в последнем платеже', () => {
      const params = {
        loanDate: '2026-03-16',
        principalAmount: 500000,
        annualRate: 17,
        termDays: 365,
        paymentPeriodDays: 30,
      };

      const result = loanService.calculateLoanGraphic(params);

      expect(result[0].principal).toBe(41666.66);
      expect(result[11].principal).toBe(41666.74);
      const totalPrincipal = result.reduce((sum, p) => sum + p.principal, 0);
      expect(totalPrincipal).toBeCloseTo(500000);
    });

    it('должен вернуть корректный interest для каждого периода', () => {
      const params = {
        loanDate: '2026-03-16',
        principalAmount: 500000,
        annualRate: 17,
        termDays: 365,
        paymentPeriodDays: 30,
      };

      const result = loanService.calculateLoanGraphic(params);

      expect(result[0].interest).toBe(6986.3);
      expect(result[1].interest).toBe(6986.3);
      expect(result[2].interest).toBe(6986.3);
      expect(result[11].interest).toBe(6986.3);
    });
  });
});
