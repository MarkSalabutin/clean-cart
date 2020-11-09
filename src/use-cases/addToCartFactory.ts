import AddToCart, { AddToCartEffectHandler, AddToCartRepository } from "./addToCart";
import { AddToCartUseCase, AddToCartUseCaseFactory } from "./cart";

export class AddToCartFactory implements AddToCartUseCaseFactory {

  constructor(private readonly repository: AddToCartRepository) {}

  create(effectHandler: AddToCartEffectHandler): AddToCartUseCase {
    return new AddToCart(effectHandler, this.repository)
  }
}