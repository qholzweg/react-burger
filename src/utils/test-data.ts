import { TIngredient, TOrder, TOrdersData } from "../services/types/types";

export const bunIngredient: TIngredient = {
  "_id": "60d3b41abdacab0026a733c6",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0,
  _uid: expect.anything()
}
export const bun2Ingredient: TIngredient = {
  "_id": "60d3b41abdacab0026a733c7",
  "name": "Флюоресцентная булка R2-D3",
  "type": "bun",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
  "__v": 0,
  _uid: expect.anything()
}
export const mainIngredient: TIngredient = {
  "_id": "60d3b41abdacab0026a733c9",
  "name": "Мясо бессмертных моллюсков Protostomia",
  "type": "main",
  "proteins": 433,
  "fat": 244,
  "carbohydrates": 33,
  "calories": 420,
  "price": 1337,
  "image": "https://code.s3.yandex.net/react/code/meat-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
  "__v": 0,
  _uid: expect.anything()
}
export const sauceIngredient: TIngredient = {
  "_id": "60d3b41abdacab0026a733ce",
  "name": "Соус традиционный галактический",
  "type": "sauce",
  "proteins": 42,
  "fat": 24,
  "carbohydrates": 42,
  "calories": 99,
  "price": 15,
  "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
  "__v": 0,
  _uid: expect.anything()
}
export const order: TOrder = {
  "_id": "641da997936b17001be72cde",
  "ingredients": [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733c6"
  ],
  "owner": "63d59fc1936b17001be54da3",
  "status": "done",
  "name": "Бессмертный краторный бургер",
  "createdAt": "2023-03-24T13:45:59.604Z",
  "updatedAt": "2023-03-24T13:46:00.012Z",
  "number": 45786,
  "__v": 0,
}
export const ordersData:TOrdersData = {
  orders: [order],
  total: 10,
  totalToday:2
}
export const XHRHeaders = {
  "cache": "no-cache",
  "credentials": "same-origin",
  "headers": { "Content-Type": "application/json" },
  "method": "GET",
  "mode": "cors",
  "redirect": "follow",
  "referrerPolicy": "no-referrer"
}
export const authHeaders = {
  "Authorization": "Bearer undefined",
  "Content-Type": "application/json",
}