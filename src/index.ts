import AddToCart from "./use-cases/addToCart";
import ListProducts from "./use-cases/listProducts";
import { createStore } from "./view/store";
import AddToCartInMemoryRepository from "./view/store/cart/AddToCartInMemoryRepository";
import ListProductsInMemoryRepository from "./view/store/cart/ListProductsInMemoryRepository";
import ReduxListProductsEffectHandler from "./view/store/cart/ReduxListProductsEffectHandler";
import { UseCaseContainer } from "./view/UseCaseContainer";
import ReduxAddToCartEffectHandler from "./view/store/cart/ReduxAddToCartEffectHandler";
import { render } from "./view";

const store = createStore();

const addToCartEffectHandler = new ReduxAddToCartEffectHandler(store.dispatch);
const addToCartRepository = new AddToCartInMemoryRepository();

const addToCart = new AddToCart(addToCartEffectHandler, addToCartRepository);

const listProductsEffectHandler = new ReduxListProductsEffectHandler(store.dispatch);
const listProductsRepository = new ListProductsInMemoryRepository();

const listProducts = new ListProducts(listProductsEffectHandler, listProductsRepository);

const useCases: UseCaseContainer = {
  listProducts,
  addToCart,
};

render(useCases, store);
