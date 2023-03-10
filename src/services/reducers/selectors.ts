import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TIngredient } from "../../utils/types"

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurger = (state: RootState) => state.burger;
export const selectOrder = (state: RootState) => state.order;

export const selectIngredient = createSelector([selectIngredients, (state:RootState, id:string) => id], (ingredients, id):TIngredient | undefined => ingredients.all.find((item: TIngredient) => item._id === id));