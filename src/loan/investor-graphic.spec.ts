import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { LoanService } from './loan.service';
import { Investment } from '../entities/investment.entity';

describe('LoanService - calculateInvestorGraphic', () => {
  let loanService: LoanService;
  let mockInvestmentRepo: any;

  const mockInvestors = [
    {
      investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
      investmentAmount: 297.66,
      state: 'confirmed',
      loanId: 'badb5ad9-544d-4dee-8d01-61da46bf8570',
      investorStrategyRate: 0.14,
    },
    {
      investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
      investmentAmount: 1140.59,
      state: 'confirmed',
      loanId: 'badb5ad9-544d-4dee-8d01-61da46bf8570',
      investorStrategyRate: 0.17,
    },
  ];

  beforeEach(async () => {
    mockInvestmentRepo = {
      findAll: jest.fn().mockResolvedValue(mockInvestors),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getModelToken(Investment),
          useValue: mockInvestmentRepo,
        },
      ],
    }).compile();

    loanService = module.get<LoanService>(LoanService);
  });

  it('должен вернуть 24 записи (12 периодов × 2 инвестора)', async () => {
    const params = {
      loanId: 'badb5ad9-544d-4dee-8d01-61da46bf8570',
      loanDate: '2026-03-16',
      principalAmount: 500000,
      annualRate: 17,
      termDays: 365,
      paymentPeriodDays: 30,
    };

    const result = await loanService.calculateInvestorGraphic(params);

    expect(result).toHaveLength(24);
    expect(result[0].percentStrategyRate).toBe(14);
    expect(result[1].percentStrategyRate).toBe(17);
  });

  it('должен вернуть корректные данные для каждого периода и инвестора', async () => {
    const params = {
      loanId: 'badb5ad9-544d-4dee-8d01-61da46bf8570',
      loanDate: '2026-03-16',
      principalAmount: 500000,
      annualRate: 17,
      termDays: 365,
      paymentPeriodDays: 30,
    };

    const result = await loanService.calculateInvestorGraphic(params);

    const expected = [
      {
        paymentNumber: 1,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-04-15',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 1,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-04-15',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 2,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-05-15',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 2,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-05-15',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 3,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-06-14',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 3,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-06-14',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 4,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-07-14',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 4,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-07-14',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 5,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-08-13',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 5,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-08-13',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 6,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-09-12',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 6,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-09-12',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 7,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-10-12',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 7,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-10-12',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 8,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-11-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 8,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-11-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 9,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2026-12-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 9,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2026-12-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 10,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2027-01-10',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 10,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2027-01-10',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 11,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2027-02-09',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 11,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2027-02-09',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
      {
        paymentNumber: 12,
        investorId: '8d60c19e-ea9b-47d0-a696-0bc690d574b9',
        paymentDate: '2027-03-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 14,
      },
      {
        paymentNumber: 12,
        investorId: '82f18ee2-113d-4f38-a5d1-01e83c4ff570',
        paymentDate: '2027-03-11',
        principal: 0,
        percentLoan: 0,
        percentStrategyRate: 17,
      },
    ];

    expect(result).toEqual(expected);
  });
});
