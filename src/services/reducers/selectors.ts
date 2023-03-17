import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TIngredient } from "../types/types"

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurger = (state: RootState) => state.burger;
export const selectOrder = (state: RootState) => state.order;
export const selectFeed = (state: RootState) => state.feed;
export const selectHistory = (state: RootState) => state.history;
export const selectUser = (state: RootState) => state.user

export const selectIngredient = createSelector([selectIngredients, (state:RootState, id:string) => id], (ingredients, id):TIngredient | undefined => ingredients.all.find((item: TIngredient) => item._id === id));