import ListProductsRepositoryImpl from "../ListProductsInMemoryRepository";

describe("ListProductsRepository", () => {
  let listProductsRepository: ListProductsRepositoryImpl;

  beforeEach(() => {
    listProductsRepository = new ListProductsRepositoryImpl();
  });

  it("creates", () => {
    expect(listProductsRepository).toBeDefined();
  });

  it("should return an empty product list", () => {
    expect(listProductsRepository.getProducts()).toEqual([]);
  });
});
