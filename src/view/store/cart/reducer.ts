import { createReducer } from "@reduxjs/toolkit";
import { Product } from "../../../domain/Product";
import { listChanged } from "./actions";

type State = Product[];

export const INITIAL_STATE: State = [];

export const cartReducer = createReducer<State>(INITIAL_STATE, (builder) => {
  return builder.addCase(listChanged, (state, action) => action.payload);
});
