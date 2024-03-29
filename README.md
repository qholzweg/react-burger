# Stellar burger shop
Приложение позволяет собрать бургер из ингредиентов, зарегистрироваться, отправить заказ, смотреть статус всех заказов и историю своих заказов. Учебный проект по программе Яндекс Практикума React-разработчик.
Стек: React, Redux, TypeScript, Websocket, html, css, jest, cypress.

![Stellar burger](http://holzweg.ru/tmp/constructor.png)

## Основной функционал:
- Выбирать из списка ингредиентов нужны и драг-н-дропом переносить их в зону конструктора
- Менять порядок ингредиентов в бургере, удалять ингредиенты
- Смотреть детали каждого ингредиента. По клику детали открываются в модальном окне, url страницы меняется на ID ингредиента, если перейти по этому адресу в отдельном окне откроется отдельная страница ингредиента.
- Список всех заказов на сервере и их статусы, обновляется по WebSocket
- Страница профиля с историей заказов пользователя
- Логин, регистрация, восстановление пароля

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - npm i
- Запустить в development режиме - npm run start

## Ссылка на сайт
https://burger.holzweg.nomoredomains.work/
