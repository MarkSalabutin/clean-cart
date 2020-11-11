import AddToCart from "./useCases/addToCart";
import ListProducts from "./useCases/listProducts";
import { createStore } from "./view/store";
import AddToCartInMemoryRepository from "./view/store/cart/AddToCartInMemoryRepository";
import ListProductsInMemoryRepository from "./view/store/cart/ListProductsInMemoryRepository";
import ReduxListProductsEffectHandler from "./view/store/cart/ReduxListProductsEffectHandler";
import { UseCaseContainer } from "./view/UseCaseContainer";
import ReduxAddToCartEffectHandler from "./view/store/cart/ReduxAddToCartEffectHandler";
import { render } from "./view";

const store = createStore();

const addToCartRepository = new AddToCartInMemoryRepository();
const listProductsRepository = new ListProductsInMemoryRepository();

const addToCartUseCase = new AddToCart(addToCartRepository);
addToCartUseCase.addEffectHandler(new ReduxAddToCartEffectHandler(store.dispatch));

const listProductsUseCase = new ListProducts(listProductsRepository);
listProductsUseCase.addEffectHandler(new ReduxListProductsEffectHandler(store.dispatch));

const useCases: UseCaseContainer = {
  listProducts: listProductsUseCase,
  addToCart: addToCartUseCase,
};

render(useCases, store);
