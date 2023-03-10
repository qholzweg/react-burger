export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: string;
  readonly fat: string;
  readonly carbohydrates: string;
  readonly calories: string;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}
export type TOrder = {
    number?: string
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