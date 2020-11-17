import { Product } from '../../../../domain/Product';
import { CartService } from '../../../../services/cartService';
import InMemoryCartService from '../../../../services/inMemoryCartService';
import CartServiceToListProductsRepository from '../CartServiceToListProductsRepository';

describe('CartServiceToListProductsRepository', () => {
  let listProductsRepository: CartServiceToListProductsRepository;
  let cartService: CartService;

  beforeEach(() => {
    cartService = new InMemoryCartService();
    listProductsRepository = new CartServiceToListProductsRepository(cartService);
  });

  it('creates', () => {
    expect(listProductsRepository).toBeDefined();
  });

  it('should return an empty product list', () => {
    expect(listProductsRepository.getProducts()).toEqual([]);
  });

  it('delegates getProducts call to the given service', () => {
    const spy = jest.spyOn(cartService, 'getProducts');
    listProductsRepository.getProducts();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('returns products that the given service returns', () => {
    const products: Product[] = [{ id: '1' }, { id: '2' }];
    jest.spyOn(cartService, 'getProducts').mockReturnValue(products);
    const output = listProductsRepository.getProducts();

    expect(output).toEqual(products);
  });
});
