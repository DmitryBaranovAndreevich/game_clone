# Dough Matter

![Dough Matter Logo](packages/client/src/assets/images/image.png)

В далёкой галактике случилась катастрофа — Безумный Крекер превратил все звёзды в гигантские печеньки! Эти сладкие угрозы теперь угрожают уничтожить всю вселенную. Вы — пилот боевого космического корабля и единственная надежда на спасение галактики. Ваша миссия — уничтожить космические печеньки, пока они не поглотили весь космос! 

## Технологии

* TypeScript 
* JavaScript
* React
* React-Router
* Redux
* Canvas API
* Fullscreen API
* Ant Design

## Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap`
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`


## Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## [Документация](docs/README.md)
