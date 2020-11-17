import AddToCartUseCase from './useCases/addToCart';
import ListProductsUseCase from './useCases/listProducts';
import { createStore } from './view/store';
import CartServiceToAddToCartRepository from './view/store/cart/CartServiceToAddToCartRepository';
import CartServiceToListProductsRepository from './view/store/cart/CartServiceToListProductsRepository';
import ReduxListProductsEffectHandler from './view/store/cart/ReduxListProductsEffectHandler';
import { UseCaseContainer } from './view/UseCaseContainer';
import ReduxAddToCartEffectHandler from './view/store/cart/ReduxAddToCartEffectHandler';
import { render } from './view';
import AddToCartAndRefreshUseCase from './useCases/addToCartAndRefresh';
import InMemoryCartService from './services/inMemoryCartService';

const store = createStore();

const cartService = new InMemoryCartService();
const addToCartRepository = new CartServiceToAddToCartRepository(cartService);
const listProductsRepository = new CartServiceToListProductsRepository(cartService);

const addToCartUseCase = new AddToCartUseCase(addToCartRepository);
addToCartUseCase.addEffectHandler(new ReduxAddToCartEffectHandler(store.dispatch));

const listProductsUseCase = new ListProductsUseCase(listProductsRepository);
listProductsUseCase.addEffectHandler(new ReduxListProductsEffectHandler(store.dispatch));

const addToCartAndRefreshUseCase = new AddToCartAndRefreshUseCase(addToCartUseCase, listProductsUseCase);

const useCases: UseCaseContainer = {
  listProducts: listProductsUseCase,
  addToCart: addToCartUseCase,
  addToCartAndRefresh: addToCartAndRefreshUseCase,
};

render(useCases, store);
