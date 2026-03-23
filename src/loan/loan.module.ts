import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { Investment } from '../entities/investment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Investment])],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
