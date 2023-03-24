export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  __v: number;
}

export type TOrderStatus = {
  status?: "done" | "pending" | "cancelled" | "created"
}

export type TOrder = TOrderStatus & {
  number: number;
  name?: string;
  ingredients: string[];
  _id?: string,
  createdAt: string;
  updatedAt: string;
}

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export type TUser = {
  password?: string;
  readonly email: string;
  readonly name: string;
};

export type TBurgerContent = {
  bun: TIngredient | null;
  filling: TIngredient[];
}

export type TResponse<TDataType = {}> = TDataType &
{
  success: boolean;
  message?: string;
}

export enum TWebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}
export enum TXHRMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH'
}