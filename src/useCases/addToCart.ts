import { Product } from '../domain/Product';
import Cart from '../domain/Cart';
import { EffectHandler } from './EffectHandler';
import UseCase from './useCase';

export enum AddToCartEffectType {
  ABORT_ADDING = 'ABORT_ADDING',
  NOTIFY_NOTHING_TO_ADD = 'NOTIFY_NOTHING_TO_ADD',
  NOTIFY_ADDED_TO_CART = 'NOTIFY_ADDED_TO_CART',
  NOTIFY_PRODUCT_DUPLICATION = 'NOTIFY_PRODUCT_DUPLICATION',
}

export interface AddToCartEffect {
  type: AddToCartEffectType;
  payload?: any;
}

export type AddToCartEffectHandler = EffectHandler<AddToCartEffect>;

export interface AddToCartRepository {
  addProducts(products: Product[]): void;
  getProducts(): Product[];
}

export interface AddToCartFlow extends UseCase<AddToCartEffect> {
  confirmAddDuplicates(): void;
  abortAddDuplicates(): void;
  addProducts(products: Product[]): void;
}

export default class AddToCartUseCase extends UseCase<AddToCartEffect> implements AddToCartFlow {
  private productsToAdd: Product[] = [];
  private awaitingDuplicationResolvance: boolean = false;

  constructor(private readonly repository: AddToCartRepository) {
    super();
  }

  public confirmAddDuplicates() {
    if (this.awaitingDuplicationResolvance) {
      this.commitAddingProducts();
      this.awaitingDuplicationResolvance = false;
    }
  }

  public abortAddDuplicates() {
    if (this.awaitingDuplicationResolvance) {
      this.handleEffect({
        type: AddToCartEffectType.ABORT_ADDING,
      });
      this.awaitingDuplicationResolvance = false;
    }
  }

  public addProducts(products: Product[]) {
    if (this.awaitingDuplicationResolvance) {
      return;
    }

    this.productsToAdd = products;
    if (this.productListIsEmpty(products)) {
      this.handleEffect({ type: AddToCartEffectType.NOTIFY_NOTHING_TO_ADD });
    } else {
      this.addNonEmptyProductList();
    }
  }

  private addNonEmptyProductList() {
    const duplicates = this.getDuplicates();
    if (duplicates.length === 0) {
      this.commitAddingProducts();
    } else {
      this.handleProductsDuplication(duplicates);
    }
  }

  private handleProductsDuplication(duplicates: Product[]) {
    this.awaitingDuplicationResolvance = true;
    this.notifyProductsDuplication(duplicates);
  }

  private productListIsEmpty(products: Product[]): boolean {
    return products.length === 0;
  }

  private getDuplicates() {
    const cart = new Cart(this.repository.getProducts());
    const duplicates = cart.getIntersection(this.productsToAdd);
    return duplicates;
  }

  private commitAddingProducts() {
    this.repository.addProducts(this.productsToAdd);
    this.notifyAddedToCart();
  }

  private notifyAddedToCart() {
    this.handleEffect({ type: AddToCartEffectType.NOTIFY_ADDED_TO_CART });
  }

  private notifyProductsDuplication(duplicates: Product[]) {
    this.handleEffect({
      type: AddToCartEffectType.NOTIFY_PRODUCT_DUPLICATION,
      payload: { products: duplicates },
    });
  }
}
