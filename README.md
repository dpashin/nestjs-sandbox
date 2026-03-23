## Import investments data

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

