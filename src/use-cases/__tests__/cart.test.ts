import { Product } from "../../domain/Product";
import { AddToCartEffect, AddToCartEffectHandler, AddToCartEffectType } from "../addToCart";
import { AddToCartFactory } from "../addToCartFactory";
import { AddToCartUseCase, AddToCartUseCaseFactory, Cart, ListProductsUseCase, ListProductsUseCaseFactory } from "../cart";
import { MockAddToCartEffectHandler, MockAddToCartRepository } from "../testDoubles/addToCart";

describe("card use case", () => {

  let proxiedAddToCartEffectHandler: MockAddToCartEffectHandler;
  let addToCartUseCase: MockAddToCartUseCase;
  let addToCartUseCaseFactory: MockAddToCartUseCaseFactory;     
  let listProductsUseCase: MockListProductsUseCase;
  let listProductsUseCaseFactory: MockListProductsUseCaseFactory;
  let useCase: Cart

  const makeProduct = (id: string = "1"): Product => { 
    return { id }
  }

  beforeEach(() => {
    proxiedAddToCartEffectHandler = new MockAddToCartEffectHandler()
    addToCartUseCase = new MockAddToCartUseCase(new MockAddToCartEffectHandler());
    addToCartUseCaseFactory = new MockAddToCartUseCaseFactory(addToCartUseCase);       
    listProductsUseCase = new MockListProductsUseCase()
    listProductsUseCaseFactory = new MockListProductsUseCaseFactory(listProductsUseCase);
    useCase = new Cart(addToCartUseCaseFactory, proxiedAddToCartEffectHandler, listProductsUseCaseFactory)
  });

  it(`creates`, () => {
    expect(useCase).toBeDefined()
  })

  it(`forward addProduct to the addToCart use case`, () => {    
    const addToCartUseCaseSpy = jest.spyOn(addToCartUseCase, "addProducts");    
    const product = makeProduct();
    useCase.addProduct(product);
    expect(addToCartUseCaseSpy).toHaveBeenCalledWith([product]);
  });

  it(`requests list products to execute on addToCard ${AddToCartEffectType.NOTIFY_ADDED_TO_CART} effect`, () => {    
    const listProductsUseCaseSpy = jest.spyOn(listProductsUseCase, "execute")

    const addToCartFactory = new AddToCartFactory(new MockAddToCartRepository())
    const useCase = new Cart(addToCartFactory, proxiedAddToCartEffectHandler, listProductsUseCaseFactory)
    useCase.addProduct(makeProduct())
    expect(listProductsUseCaseSpy).toHaveBeenCalled();
  })

  it(`does not requests list products to execute on addProduct without receiving ${AddToCartEffectType.NOTIFY_ADDED_TO_CART} effect`, () => {    
    const listProductsUseCaseSpy = jest.spyOn(listProductsUseCase, "execute")

    const addToCartFactory = new AddToCartFactory(new MockAddToCartRepository())
    const useCase = new Cart(addToCartFactory, proxiedAddToCartEffectHandler, listProductsUseCaseFactory)
    const product = makeProduct()
    useCase.addProduct(product)

    listProductsUseCaseSpy.mockClear()
    useCase.addProduct(product)
    expect(listProductsUseCaseSpy).not.toHaveBeenCalled();
  })

  it(`proxifies add cart effects`, () => {
    addToCartUseCase.produce({ type: AddToCartEffectType.NOTIFY_ADDED_TO_CART })
    addToCartUseCase.produce({ type: AddToCartEffectType.ABORT_ADDING })
    addToCartUseCase.produce({ type: AddToCartEffectType.NOTIFY_NOTHING_TO_ADD })
    addToCartUseCase.produce({ type: AddToCartEffectType.NOTIFY_PRODUCT_DUPLICATION })

    expect(proxiedAddToCartEffectHandler.handledEffects).toEqual([
      { type: AddToCartEffectType.NOTIFY_ADDED_TO_CART },
      { type: AddToCartEffectType.ABORT_ADDING },
      { type: AddToCartEffectType.NOTIFY_NOTHING_TO_ADD },
      { type: AddToCartEffectType.NOTIFY_PRODUCT_DUPLICATION }
    ])    
  })
});

class MockAddToCartUseCase implements AddToCartUseCase {
  constructor(public effectHandler: AddToCartEffectHandler) {}
  setEffectHandler(handler: AddToCartEffectHandler) {
    this.effectHandler = handler
  }
  addProducts(products: Product[]): void {}
  produce(effect: AddToCartEffect) {
    this.effectHandler.handle(effect)
  }
}

class MockListProductsUseCase implements ListProductsUseCase {
  execute(): void {    
  }
}

class MockAddToCartUseCaseFactory implements AddToCartUseCaseFactory {
  constructor(private useCase: MockAddToCartUseCase) {}
  create(effectHandler: AddToCartEffectHandler): AddToCartUseCase {
    let useCase = this.useCase
    useCase.setEffectHandler(effectHandler)
    return useCase
  }
}

class MockListProductsUseCaseFactory implements ListProductsUseCaseFactory {
  constructor(private useCase: ListProductsUseCase) {}
  setUseCase(useCase: ListProductsUseCase) {
    this.useCase = useCase
  }
  create(): ListProductsUseCase {
    return this.useCase
  }  
}