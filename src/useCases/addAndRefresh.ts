import { Product } from '../domain/Product';
import { AddToCartEffect, AddToCartEffectType, AddToCartFlow } from './addToCart';
import { EffectHandler } from './EffectHandler';
import { ListProductsFlow } from './listProducts';
import UseCase from './useCase';

export default class AddAndRefresh
  extends UseCase<AddToCartEffect>
  implements AddToCartFlow, EffectHandler<AddToCartEffect> {
  constructor(private readonly addToCart: AddToCartFlow, private readonly listProducts: ListProductsFlow) {
    super();
    this.addToCart.addEffectHandler(this);
  }

  handle(effect: AddToCartEffect): void {
    if (effect.type === AddToCartEffectType.NOTIFY_ADDED_TO_CART) {
      this.listProducts.execute();
    }
  }

  confirmAddDuplicates(): void {
    this.addToCart.confirmAddDuplicates();
  }
  abortAddDuplicates(): void {
    this.addToCart.abortAddDuplicates();
  }

  addProducts(products: Product[]): void {
    this.addToCart.addProducts(products);
  }
}
