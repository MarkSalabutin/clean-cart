import AddToCart from "../useCases/addToCart";
import ListProducts from "../useCases/listProducts";

export interface UseCaseContainer {
  listProducts: ListProducts;
  addToCart: AddToCart;
}
