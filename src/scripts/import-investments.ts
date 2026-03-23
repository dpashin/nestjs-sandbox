import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';
import { Investment } from '../entities/investment.entity';

interface InvestmentData {
  investorId: string;
  investmentAmount: number;
  state: string;
  loanId: string;
  investorStrategyRate: number;
}

async function importInvestments(filePath: string): Promise<void> {
  if (!filePath) {
    console.error('Укажите путь к JSON файлу');
    console.log(
      'Пример: npm run import:investments -- ./local/investments.json',
    );
    process.exit(1);
  }

  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Файл не найден: ${fullPath}`);
    process.exit(1);
  }

  console.log(`Импорт инвестиций из ${fullPath}`);

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const investments: InvestmentData[] = JSON.parse(
    fileContent,
  ) as InvestmentData[];

  console.log(`Загружено записей: ${investments.length}`);

  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'postgres',
    models: [Investment],
    logging: false,
  });

  await sequelize.authenticate();
  console.log('Подключение к БД установлено');

  await sequelize.sync();

  const result = await Investment.bulkCreate(investments as any, {
    ignoreDuplicates: true,
  });

  const skipped = investments.length - result.length;
  console.log(`Добавлено: ${result.length}`);
  console.log(`Пропущено (дубликаты): ${skipped}`);

  await sequelize.close();
  console.log('Импорт завершён');
}

const args = process.argv.slice(2);
void importInvestments(args[0]);
