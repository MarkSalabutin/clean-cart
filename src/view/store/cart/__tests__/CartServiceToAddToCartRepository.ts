import { Product } from '../../../../domain/Product';
import { CartService } from '../../../../services/cartService';
import InMemoryCartService from '../../../../services/inMemoryCartService';
import CartServiceToAddToCartRepository from '../CartServiceToAddToCartRepository';

describe('CartServiceToAddToCartRepository', () => {
  let addToCartRepository: CartServiceToAddToCartRepository;
  let cartService: CartService;

  beforeEach(() => {
    cartService = new InMemoryCartService();
    addToCartRepository = new CartServiceToAddToCartRepository(cartService);
  });

  it('creates', () => {
    expect(addToCartRepository).toBeDefined();
  });

  it('delegates getProducts call to the given service', () => {
    const spy = jest.spyOn(cartService, 'getProducts');

    addToCartRepository.getProducts();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('returns products that were returned by the given service', () => {
    const products: Product[] = [
      { id: '1' }, { id: '2' }, { id: '3' },
    ];

    jest.spyOn(cartService, 'getProducts').mockReturnValue(products);

    const output = addToCartRepository.getProducts();

    expect(output).toEqual(products);
  });

  it('delegates addProducts call to the given service', () => {
    const spy = jest.spyOn(cartService, 'addProducts');
    const products: Product[] = [
      { id: '1' }, { id: '2' }, { id: '3' },
    ];

    addToCartRepository.addProducts(products);
    expect(spy).toHaveBeenCalledWith(products);
  });
});
