import AddToCart from "../use-cases/addToCart";
import ListProducts from "../use-cases/listProducts";

export interface UseCaseContainer {
  listProducts: ListProducts;
  addToCart: AddToCart;
}
