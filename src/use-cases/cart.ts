import { Product } from "../domain/Product";
import { AddToCartEffect, AddToCartEffectHandler, AddToCartEffectType } from "./addToCart";


export interface AddToCartUseCase {
  addProducts(products: Product[]): void
}

export interface AddToCartUseCaseFactory {
  create(effectHandler: AddToCartEffectHandler): AddToCartUseCase
}

export interface ListProductsUseCase {
  execute(): void
}

export interface ListProductsUseCaseFactory {
  create(): ListProductsUseCase
}

export class Cart implements AddToCartEffectHandler {

  private readonly addToCart: AddToCartUseCase

  constructor(
    private readonly addToCartFactory: AddToCartUseCaseFactory,
    private readonly addToCartEffectHandler: AddToCartEffectHandler,
    private readonly listProductsFactory: ListProductsUseCaseFactory
  ) {
    this.addToCart = this.addToCartFactory.create(this)
  }

  addProduct(product: Product) {
    this.addToCart.addProducts([product])
  }

  handle(effect: AddToCartEffect): void {
    this.addToCartEffectHandler.handle(effect)
    if (effect.type == AddToCartEffectType.NOTIFY_ADDED_TO_CART) {
      const listProducts = this.listProductsFactory.create()
      listProducts.execute()
    }
  }
}