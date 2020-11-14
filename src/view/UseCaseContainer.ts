import AddToCartUseCase from "../useCases/addToCart";
import ListProductsUseCase from "../useCases/listProducts";

export interface UseCaseContainer {
  listProducts: ListProductsUseCase;
  addToCart: AddToCartUseCase;
}
