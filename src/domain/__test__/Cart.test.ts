import Cart from "../Cart";

describe("Cart", () => {
  it("creates", () => {
    const cart = new Cart([]);
    expect(cart).toBeDefined();
  });

  it("get intersection should return no intersection", () => {
    const cart = new Cart([]);
    expect(cart.getIntersection([])).toEqual([]);
  });

  it("should return intersection", () => {
    const product1 = { id: "1" };
    const product2 = { id: "2" };
    const product3 = { id: "3" };
    const cart = new Cart([product1, product2]);

    expect(cart.getIntersection([product1, product3])).toEqual([product1]);
  });
});
