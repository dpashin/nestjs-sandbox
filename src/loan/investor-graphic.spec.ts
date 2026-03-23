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
  });
});
