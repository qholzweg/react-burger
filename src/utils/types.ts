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
  readonly __v: number;
}
export type TOrder = {
  readonly order: {
    number: string
  }
}
export type TUser = {
  password?: string;
  readonly email: string;
  readonly name: string;
};


export type TBurgerContent = {
  bun: TIngredient;
  filling: TIngredient[];
}

export type TResponse<TDataType = {}> = TDataType & 
 {
  success: boolean;
  message?: string;
}