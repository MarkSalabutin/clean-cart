import { AddToCartEffect, AddToCartEffectHandler, AddToCartEffectType as EffectType } from "../../../use-cases/addToCart";
import { Store } from "../types";
import { productAdded } from "./actions";

export default class ReduxAddToCartEffectHandler implements AddToCartEffectHandler {
  constructor(private readonly dispatch: Store.Dispatch) {}
  handle(effect: AddToCartEffect): void {
    if (effect.type === EffectType.NOTIFY_ADDED_TO_CART) {
      this.dispatch(productAdded());
    }
  }
}
