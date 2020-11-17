import { Product } from '../../domain/Product';
import InMemoryCartService from '../inMemoryCartService';

describe('cart service', () => {
  let cartService: InMemoryCartService;

  beforeEach(() => {
    cartService = new InMemoryCartService();
  });

  it('creates', () => {
    expect(cartService).toBeDefined();
  });

  it('returns empty product list after initialization', () => {
    expect(cartService.getProducts()).toEqual([]);
  });

  it('allows to add products', () => {
    const product: Product = { id: '1' };

    cartService.addProducts([product]);
    expect(cartService.getProducts()).toEqual([product]);
  });

  it('returns all products that were added before', () => {
    const products: Product[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

    cartService.addProducts(products);

    expect(cartService.getProducts()).toEqual(products);
  });

  it('returns all products that were added before in multiple batches', () => {
    const products: Product[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

    cartService.addProducts([products[0]]);
    cartService.addProducts([products[1]]);
    cartService.addProducts([products[2]]);

    expect(cartService.getProducts()).toEqual(products);
  });

  it('does not delete products after getProducts is performed', () => {
    const products: Product[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

    cartService.addProducts([products[0]]);

    cartService.getProducts();

    cartService.addProducts([products[1]]);

    cartService.getProducts();

    cartService.addProducts([products[2]]);

    expect(cartService.getProducts()).toEqual(products);
  });

  it('allows to add the same product multiple times', () => {
    const product: Product = { id: '1' };

    cartService.addProducts([product, product]);
    cartService.addProducts([product]);

    expect(cartService.getProducts()).toEqual([product, product, product]);
  });
});
