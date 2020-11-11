import { AddToCartEffectType as EffectType } from "../../../../useCases/addToCart";
import { productAdded } from "../actions";
import ReduxAddToCartEffectHandler from "../ReduxAddToCartEffectHandler";

describe("ReduxAddToCartEffectHandler", () => {
  let handler: ReduxAddToCartEffectHandler;
  let mockedDispatch: jest.Mock;
  beforeEach(() => {
    mockedDispatch = jest.fn(() => {});
    handler = new ReduxAddToCartEffectHandler(mockedDispatch);
  });
  it("creates", () => {
    expect(handler).toBeDefined();
  });

  it(`should dispatch PRODUCT_ADDED action on ${EffectType.NOTIFY_ADDED_TO_CART} effect type`, () => {
    handler.handle({ type: EffectType.NOTIFY_ADDED_TO_CART });
    expect(mockedDispatch).toHaveBeenCalledWith(productAdded());
  });

  it("shouldn't dispatch any actions on an unknown effect type", () => {
    handler.handle({ type: "UNKNOWN_EFFECT_TYPE" as EffectType });
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
});
