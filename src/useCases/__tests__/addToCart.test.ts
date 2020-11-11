import AddToCart, { AddToCartEffectHandler, AddToCartEffect, AddToCartRepository } from "../addToCart";
import { Product } from "../../domain/Product";

class MockRepository implements AddToCartRepository {
  products: Product[] = [];

  addProducts(products: Product[]) {
    this.products = this.products.concat(products);
  }

  getProducts() {
    return this.products;
  }
}

class MockEffectHandler implements AddToCartEffectHandler {
  handle(effect: AddToCartEffect): void {}
}

describe("addToCart use case", () => {
  let effectHandler: AddToCartEffectHandler;
  let effectHandlerSpy: jest.SpyInstance;
  let addToCart: AddToCart;
  let repository: MockRepository;

  beforeEach(() => {
    effectHandler = new MockEffectHandler();
    effectHandlerSpy = jest.spyOn(effectHandler, "handle");
    repository = new MockRepository();
    addToCart = new AddToCart(repository);
    addToCart.addEffectHandler(effectHandler);
  });

  it("creates", () => {
    expect(addToCart).toBeDefined();
  });

  it("adds a product", () => {
    addToCart.addProducts([{ id: "1" }]);
    expect(effectHandlerSpy).toHaveBeenCalledWith({
      type: "NOTIFY_ADDED_TO_CART",
    });
  });

  it("emits nothing to add effect if an empty products list has been received", () => {
    addToCart.addProducts([]);
    expect(effectHandlerSpy).toHaveBeenCalledWith({
      type: "NOTIFY_NOTHING_TO_ADD",
    });
  });

  it("shouldn't save product if there're no products to save", () => {
    addToCart.addProducts([]);
    expect(repository.products).toEqual([]);
  });

  it("saves product", () => {
    const product: Product = { id: "1" };
    addToCart.addProducts([product]);

    expect(repository.products).toEqual([product]);
  });

  it("saves multiple products", () => {
    const product1: Product = { id: "1" };
    const product2: Product = { id: "2" };

    addToCart.addProducts([product1]);
    addToCart.addProducts([product2]);

    expect(repository.products).toEqual([product1, product2]);
  });

  it("repository should be empty after initialization", () => {
    expect(repository.products).toEqual([]);
  });

  it("effectHandler shouldn't have been called after initialization", () => {
    expect(effectHandlerSpy).not.toHaveBeenCalled();
  });

  describe("add duplicates", () => {
    const product: Product = { id: "1" };

    beforeEach(() => {
      repository.products = [product];
    });

    it("should notify products duplication", () => {
      addToCart.addProducts([product]);

      expect(effectHandlerSpy).toHaveBeenCalledTimes(1);
      expect(effectHandlerSpy).toHaveBeenCalledWith({
        type: "NOTIFY_PRODUCT_DUPLICATION",
        payload: {
          products: [product],
        },
      });
    });

    it("confirm adding duplicates", () => {
      addToCart.addProducts([product]);
      effectHandlerSpy.mockClear();
      addToCart.confirmAddDuplicates();
      expect(effectHandlerSpy).toHaveBeenCalledWith({
        type: "NOTIFY_ADDED_TO_CART",
      });
    });

    it("confirm adding duplicates products saves", () => {
      addToCart.addProducts([product]);
      addToCart.confirmAddDuplicates();
      expect(repository.getProducts()).toEqual([product, product]);
    });

    it("confirm add duplicates shouldn't emit any effects if there're no duplicates", () => {
      addToCart.confirmAddDuplicates();
      expect(effectHandlerSpy).not.toHaveBeenCalled();
    });

    it("abort add duplicates", () => {
      addToCart.addProducts([product]);
      effectHandlerSpy.mockClear();
      addToCart.abortAddDuplicates();
      expect(effectHandlerSpy).toHaveBeenCalledWith({
        type: "ABORT_ADDING",
      });
    });

    it("abort add duplicates shouldn't save products", () => {
      addToCart.addProducts([product]);
      addToCart.abortAddDuplicates();
      expect(repository.products).toEqual([product]);
    });

    it("abort add duplicates shouldn't emit any effects if there're no duplicates", () => {
      addToCart.abortAddDuplicates();
      expect(effectHandlerSpy).not.toHaveBeenCalled();
    });

    it("should do nothing on addProducts if awaiting duplication resolvance", () => {
      addToCart.addProducts([product]);
      effectHandlerSpy.mockClear();
      addToCart.addProducts([product]);
      expect(repository.products).toEqual([product]);
      expect(effectHandlerSpy).not.toHaveBeenCalled();
    });

    it("should be able to add after confirm adding duplicates", () => {
      addToCart.addProducts([product]);
      addToCart.confirmAddDuplicates();
      effectHandlerSpy.mockClear();
      const product2: Product = { id: "2" };
      addToCart.addProducts([product2]);
      expect(repository.getProducts()).toEqual([product, product, product2]);
      expect(effectHandlerSpy).toHaveBeenCalledWith({
        type: "NOTIFY_ADDED_TO_CART",
      });
    });

    it("should be able to add after abort adding duplicates", () => {
      addToCart.addProducts([product]);
      addToCart.abortAddDuplicates();
      effectHandlerSpy.mockClear();
      const product2: Product = { id: "2" };
      addToCart.addProducts([product2]);
      expect(repository.getProducts()).toEqual([product, product2]);
      expect(effectHandlerSpy).toHaveBeenCalledWith({
        type: "NOTIFY_ADDED_TO_CART",
      });
    });

    it("should save confirmed products", () => {
      addToCart.addProducts([product]);
      addToCart.addProducts([{ id: "2" }]);
      addToCart.confirmAddDuplicates();
      expect(repository.getProducts()).toEqual([product, product]);
    });
  });
});
