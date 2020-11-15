import AddToCartUseCase from './useCases/addToCart';
import ListProductsUseCase from './useCases/listProducts';
import { createStore } from './view/store';
import AddToCartInMemoryRepository from './view/store/cart/AddToCartInMemoryRepository';
import ListProductsInMemoryRepository from './view/store/cart/ListProductsInMemoryRepository';
import ReduxListProductsEffectHandler from './view/store/cart/ReduxListProductsEffectHandler';
import { UseCaseContainer } from './view/UseCaseContainer';
import ReduxAddToCartEffectHandler from './view/store/cart/ReduxAddToCartEffectHandler';
import { render } from './view';
import AddToCartAndRefreshUseCase from './useCases/addToCartAndRefresh';

const store = createStore();

const addToCartRepository = new AddToCartInMemoryRepository();
const listProductsRepository = new ListProductsInMemoryRepository();

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
