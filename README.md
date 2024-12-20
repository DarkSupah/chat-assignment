# chat-assignment

Тестовое задание по чату на основе matrix-js-sdk

## Установка проекта
В проекте используется yarn как менеджер зависимостей

Если он не установлен, установите
```sh
npm -g yarn
````

Для установки зависимостей
```sh
yarn
```

### Запуск проекта

```sh
yarn dev
```

### Сборка

```sh
yarn build
```

### Линтер

```sh
yarn lint
```


### Docker
Установите образ через
```sh
docker build -t chat-assignment .
```
Запустите контейнер через
```sh
docker run -it -p 8080:80 --name chat-assignment chat-assignment
```

Проект будет доступен по адресу http://localhost:8080