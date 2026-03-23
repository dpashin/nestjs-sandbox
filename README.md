ущ# Запуск 

1. docker-compose up --build

2. Запустить пример c графиком платежей:

GET http://localhost:3000/loan-graphic?loanDate=2026-03-16&principalAmount=500000&annualRate=17&termDays=365&paymentPeriodDays=30

ответ:
```json
[
    {"paymentNumber":1,"paymentDate":"2026-04-15","principal":41666.66,"interest":6986.3},
    {"paymentNumber":2,"paymentDate":"2026-05-15","principal":41666.66,"interest":6986.3},
    {"paymentNumber":3,"paymentDate":"2026-06-14","principal":41666.66,"interest":6986.3},
    {"paymentNumber":4,"paymentDate":"2026-07-14","principal":41666.66,"interest":6986.3},
    {"paymentNumber":5,"paymentDate":"2026-08-13","principal":41666.66,"interest":6986.3},
    {"paymentNumber":6,"paymentDate":"2026-09-12","principal":41666.66,"interest":6986.3},
    {"paymentNumber":7,"paymentDate":"2026-10-12","principal":41666.66,"interest":6986.3},
    {"paymentNumber":8,"paymentDate":"2026-11-11","principal":41666.66,"interest":6986.3},
    {"paymentNumber":9,"paymentDate":"2026-12-11","principal":41666.66,"interest":6986.3},
    {"paymentNumber":10,"paymentDate":"2027-01-10","principal":41666.66,"interest":6986.3},
    {"paymentNumber":11,"paymentDate":"2027-02-09","principal":41666.66,"interest":6986.3},
    {"paymentNumber":12,"paymentDate":"2027-03-11","principal":41666.74,"interest":6986.3}
]
```

3. Загрузить данные из файла c примером (см. ниже)

4. График платежей инвесторов:

GET http://localhost:3000/investor-graphic?loanId=badb5ad9-544d-4dee-8d01-61da46bf8570&loanDate=2026-03-16&principalAmount=500000&annualRate=17&termDays=365&paymentPeriodDays=30

Пока получаем частично заполненный ответ (реализовать не успел).

```
[
  {
    "paymentNumber": 1,
    "paymentDate": "2026-04-15",
    "principal": 0,
    "percentLoan": 0,
    "percentStrategyRate": null
  },
  {
    "paymentNumber": 1,
    "paymentDate": "2026-04-15",
    "principal": 0,
    "percentLoan": 0,
    "percentStrategyRate": null
  },
  ...
```


## Как загрузить в базу данные из файла

```bash
# Locally
npm run import:investments -- ./examples/investments_with_strategy_rate.json

# In Docker
docker-compose exec app npm run import:investments -- /app/examples/investments_with_strategy_rate.json
```

Output example:

```
Импорт инвестиций из ./examples/investments_with_strategy_rate.json
Загружено записей: 1692
Добавлено: 1500
Пропущено (дубликаты): 192
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# TODO

- Добить расчет по инвесторам
	- как подтягивать данные из json
	- логика расчетов
- Материализация расчетов, веб должен доставить уже подготовленные данные, а не считать на лету
- нелогичное апи - второй запрос использует базу, первый берет входные параметры
- смена state confirmed => "график построен"
- пересмотреть нормализацию базы: ключи, индексы, state
- fix варнинга при импорте
    ```
    (sequelize) Warning: Model "Investment" is declaring public class fields for attribute(s): "investorId", "investmentAmount", "state", "loanId", "investorStrategyRate".
    These class fields are shadowing Sequelize's attribute getters & setters.
    See https://sequelize.org/main/manual/model-basics.html#caveat-with-public-class-fields
    ```