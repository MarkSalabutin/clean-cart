import { Store } from "../types";

export const selectProductList = (state: Store.State) => state.cart;
