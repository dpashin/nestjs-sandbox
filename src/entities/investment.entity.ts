import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'investments',
  indexes: [
    {
      name: 'investor_loan_unique',
      unique: true,
      fields: ['investorId', 'loanId'],
    },
  ],
})
export class Investment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ type: DataType.UUID })
  investorId: string;

  @Column({ type: DataType.DECIMAL(12, 2) })
  investmentAmount: number;

  @Column
  state: string;

  @Column({ type: DataType.UUID })
  loanId: string;

  @Column({ type: DataType.DECIMAL(5, 4) })
  investorStrategyRate: number;
}
