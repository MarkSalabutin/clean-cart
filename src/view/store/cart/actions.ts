import { createAction } from "@reduxjs/toolkit";
import { Product } from "../../../domain/Product";

export const listChanged = createAction<Product[]>("LIST_CHANGED");
export const productAdded = createAction("PRODUCT_ADDED");
