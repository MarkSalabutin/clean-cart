import { Product } from "../../../../domain/Product";
import AddToCartInMemoryRepository from "../AddToCartInMemoryRepository";

describe("AddToCartInMemoryRepository", () => {
  let addToCartRepository: AddToCartInMemoryRepository;

  beforeEach(() => {
    addToCartRepository = new AddToCartInMemoryRepository();
  });
  it("creates", () => {
    expect(addToCartRepository).toBeDefined();
  });

  it("should return empty product list", () => {
    expect(addToCartRepository.getProducts()).toEqual([]);
  });

  it("should add product", () => {
    const product: Product = { id: "1" };
    addToCartRepository.addProducts([product]);
    expect(addToCartRepository.getProducts()).toEqual([product]);
  });

  it("should add multiple products in a row", () => {
    const product1: Product = { id: "1" };
    const product2: Product = { id: "2" };
    addToCartRepository.addProducts([product1]);
    addToCartRepository.addProducts([product2]);
    expect(addToCartRepository.getProducts()).toEqual([product1, product2]);
  });

  it("should be able to add same products multiple times", () => {
    const product1: Product = { id: "1" };
    addToCartRepository.addProducts([product1]);
    addToCartRepository.addProducts([product1]);
    expect(addToCartRepository.getProducts()).toEqual([product1, product1]);
  });
});
