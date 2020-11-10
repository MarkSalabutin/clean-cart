import ListProducts, {
  ListProductsRepository,
  ListProductsEffectHandler,
  ListProductsEffect as Effect,
  ListProductsEffectType as EffectType,
} from "../listProducts";
import { Product } from "../../domain/Product";

class MockRepository implements ListProductsRepository {
  products: Product[] = [];

  getProducts(): Product[] {
    return this.products;
  }
}

class MockEffectHandler implements ListProductsEffectHandler {
  handle(effect: Effect): void {}
}

describe("list products use case", () => {
  let effectHandler: ListProductsEffectHandler;
  let listProducts: ListProducts;
  let repository: MockRepository;
  let effectHandlerSpy: jest.SpyInstance<void, [effect: Effect]>;

  beforeEach(() => {
    effectHandler = new MockEffectHandler();
    effectHandlerSpy = jest.spyOn(effectHandler, "handle");
    repository = new MockRepository();
    listProducts = new ListProducts(effectHandler, repository);
  });

  it("creates", () => {
    expect(listProducts).toBeDefined();
  });

  it("should emit LIST_PRODUCTS effect with empty products", () => {
    listProducts.execute();

    expect(effectHandlerSpy).toHaveBeenCalledTimes(1);
    expect(effectHandlerSpy).toHaveBeenCalledWith({
      type: EffectType.LIST_PRODUCTS,
      products: [],
    });
  });

  it("should emit LIST_PRODUCTS effect with saved products", () => {
    const product1 = { id: "1" };
    const product2 = { id: "2" };

    repository.products = [product1, product2];
    listProducts.execute();

    expect(effectHandlerSpy).toHaveBeenCalledTimes(1);
    expect(effectHandlerSpy).toHaveBeenCalledWith({
      type: EffectType.LIST_PRODUCTS,
      products: [product1, product2],
    });
  });

  it("shouldn't emit any effects after initialization", () => {
    expect(effectHandlerSpy).not.toHaveBeenCalled();
  });

  it("should emit error effect on repository failure", () => {
    jest.spyOn(repository, "getProducts").mockImplementation(() => {
      throw Error();
    });

    listProducts.execute();

    expect(effectHandlerSpy).toHaveBeenCalledTimes(1);
    expect(effectHandlerSpy).toHaveBeenCalledWith({
      type: "NOTIFY_LIST_PRODUCTS_FAILED",
      products: [],
    });
  });
});
