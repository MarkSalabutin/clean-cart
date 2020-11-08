import { ListProductsEffectType as EffectType } from "../../../../use-cases/listProducts";
import { listChanged } from "../actions";
import ReduxListProductsEffectHandler from "../ReduxListProductsEffectHandler";

describe("ReduxListProductsEffectHandler", () => {
  let reduxListProductsEffectHandler: ReduxListProductsEffectHandler;
  let mockedDispatch: jest.Mock;

  beforeEach(() => {
    mockedDispatch = jest.fn((action: { type: string; payload: any }) => {});
    reduxListProductsEffectHandler = new ReduxListProductsEffectHandler(mockedDispatch);
  });

  it("creates", () => {
    expect(reduxListProductsEffectHandler).toBeDefined();
  });
  it(`should dispatch ${listChanged} action on ${EffectType.LIST_PRODUCTS} effect type`, () => {
    const products = [{ id: "1" }, { id: "2" }];
    reduxListProductsEffectHandler.handle({ type: EffectType.LIST_PRODUCTS, products });
    expect(mockedDispatch).toHaveBeenCalledWith(listChanged(products));
  });

  it("shouldn't dispatch any actions on an unknown effect type", () => {
    reduxListProductsEffectHandler.handle({ type: "UNKNOWN_EFFECT_TYPE" as EffectType, products: [] });
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
});
