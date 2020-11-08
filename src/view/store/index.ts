import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/reducer";

export const rootReducer = combineReducers({ cart: cartReducer });

export const createStore = () => {
  return configureStore({ reducer: rootReducer });
};
