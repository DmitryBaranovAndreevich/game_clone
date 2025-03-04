# Dough Matter

![Dough Matter Logo](packages/client/src/assets/images/image.png)

В далёкой галактике случилась катастрофа — Безумный Крекер превратил все звёзды в гигантские печеньки! Эти сладкие угрозы теперь угрожают уничтожить всю вселенную. Вы — пилот боевого космического корабля и единственная надежда на спасение галактики. Ваша миссия — уничтожить космические печеньки, пока они не поглотили весь космос!

## Технологии

- TypeScript
- JavaScript
- React
- React-Router
- Redux
- Canvas API
- Fullscreen API
- Ant Design

## Как запускать?

#ssr
==>
1. cd ./packages/client/
2. yarn link
3. cd ../server
4. yarn link client
   ==> выполните эти действия 1 раз и проверьте , что в server/node_modules появилась ссылка на папку client
5. Убедитесь что у вас установлен `node` и `docker`
6. Выполните команду `yarn bootstrap`
8. docker-compose up -d из директории server и потом  yarn dev

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

1. выполнить на клиенте yarn build & yarn build:ssr
2. выполнить на сервере yarn build

И чтобы посмотреть что получилось

node dis/index

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## [Документация](docs/README.md)

## [Видео](https://disk.yandex.ru/i/-EaLT-6sdRyHmQ)

## ssr
