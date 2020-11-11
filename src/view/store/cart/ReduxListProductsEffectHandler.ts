import { ListProductsEffect, ListProductsEffectHandler, ListProductsEffectType as EffectType } from "../../../useCases/listProducts";
import { Store } from "../types";
import { listChanged } from "./actions";

export default class ReduxListProductsEffectHandler implements ListProductsEffectHandler {
  constructor(private readonly dispatch: Store.Dispatch) {}

  handle(effect: ListProductsEffect): void {
    if (effect.type === EffectType.LIST_PRODUCTS) {
      this.dispatch(listChanged(effect.products));
    }
  }
}
