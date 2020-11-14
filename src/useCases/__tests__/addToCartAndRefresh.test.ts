import { Product } from '../../domain/Product';
import AddToCartAndRefreshUseCase from '../addToCartAndRefresh';
import AddToCartUseCase, { AddToCartEffectType, AddToCartRepository } from '../addToCart';
import { ListProductsEffect, ListProductsFlow } from '../listProducts';
import UseCase from '../useCase';

class MockAddToCartRepository implements AddToCartRepository {
  addProducts(products: Product[]): void {}
  getProducts(): Product[] {
    return [];
  }
}

class MockAddToCart extends AddToCartUseCase {
  confirmAddDuplicates(): void {}
  abortAddDuplicates(): void {}
  addProducts(products: Product[]): void {
    this.handleEffect({ type: AddToCartEffectType.NOTIFY_ADDED_TO_CART });
  }

  produceEffect(type: AddToCartEffectType): void {
    this.handleEffect({ type });
  }
}

class MockListProducts extends UseCase<ListProductsEffect> implements ListProductsFlow {
  execute(): void {}
}

describe('AddToCartAndRefresh', () => {
  let addAndRefresh: AddToCartAndRefreshUseCase;
  let addToCart: MockAddToCart;
  let listProducts: MockListProducts;

  beforeEach(() => {
    addToCart = new MockAddToCart(new MockAddToCartRepository());
    listProducts = new MockListProducts();
    addAndRefresh = new AddToCartAndRefreshUseCase(addToCart, listProducts);
  });

  it('creates', () => {
    expect(addAndRefresh).toBeDefined();
  });

  it('should delegate addProducts call to the corresponding use case', () => {
    const products: Product[] = [];
    const spy = jest.spyOn(addToCart, 'addProducts');
    addAndRefresh.addProducts(products);
    expect(spy).toHaveBeenCalledWith(products);
  });

  it('should delegate confirmAddDuplicates call to the corresponding use case', () => {
    const spy = jest.spyOn(addToCart, 'confirmAddDuplicates');
    addAndRefresh.confirmAddDuplicates();
    expect(spy).toHaveBeenCalled();
  });

  it('should delegate abortAddDuplicates call to the corresponding use case', () => {
    const spy = jest.spyOn(addToCart, 'abortAddDuplicates');
    addAndRefresh.abortAddDuplicates();
    expect(spy).toHaveBeenCalled();
  });

  it(`should execute list products on ${AddToCartEffectType.NOTIFY_ADDED_TO_CART}`, () => {
    const spy = jest.spyOn(listProducts, 'execute');
    addAndRefresh.addProducts([]);
    expect(spy).toHaveBeenCalled();
  });

  it(`shouldn't execute list product on not ${AddToCartEffectType.NOTIFY_ADDED_TO_CART}`, () => {
    const spy = jest.spyOn(listProducts, 'execute');
    addToCart.produceEffect(AddToCartEffectType.ABORT_ADDING);
    addToCart.produceEffect(AddToCartEffectType.NOTIFY_PRODUCT_DUPLICATION);
    addToCart.produceEffect(AddToCartEffectType.NOTIFY_NOTHING_TO_ADD);
    expect(spy).not.toHaveBeenCalled();
  });
});
