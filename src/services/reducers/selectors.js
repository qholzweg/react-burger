import { createSelector } from "@reduxjs/toolkit";

export const selectIngredients = (state) => state.ingredients;
export const selectDetails = (state) => state.details;
export const selectBurger = (state) => state.burger;
export const selectOrder = (state) => state.order;

export const selectIngredient = createSelector([selectIngredients, (state, id) => id], (ingredients, id) => ingredients.all.find(item => item._id === id));