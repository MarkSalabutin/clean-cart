import { Product } from "./Product";

export default class Cart {
  private productsMap: Map<string, Product> = new Map();
  constructor(private readonly products: Product[]) {
    this.populateMap(products);
  }

  private populateMap(products: Product[]) {
    products.forEach((product) => {
      this.productsMap.set(product.id, product);
    });
  }

  getIntersection(products: Product[]): Product[] {
    return products.filter((product: Product) => {
      return this.productsMap.has(product.id);
    });
  }
}
