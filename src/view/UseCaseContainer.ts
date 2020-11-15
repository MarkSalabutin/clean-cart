import { AddToCartFlow } from "../useCases/addToCart";
import { ListProductsFlow } from "../useCases/listProducts";

export interface UseCaseContainer {
  listProducts: ListProductsFlow;
  addToCart: AddToCartFlow;
  addToCartAndRefresh: AddToCartFlow;
}
