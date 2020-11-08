import { Product } from "../../../../domain/Product";
import { Store } from "../../types";
import { selectProductList } from "../selectors";

describe("selectProductList", () => {
  it("should return product list", () => {
    const products: Product[] = [{ id: "1" }, { id: "2" }];
    const state: Store.State = { cart: products };
    expect(selectProductList(state)).toEqual(products);
  });
});
