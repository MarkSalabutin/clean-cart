import { Product } from "../../../../domain/Product";
import { listChanged } from "../actions";
import { cartReducer, INITIAL_STATE } from "../reducer";

describe("cartReducer", () => {
  it("should return initial state on an unknown action", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual(INITIAL_STATE);
  });

  it(`should add products on ${listChanged} action`, () => {
    const products: Product[] = [{ id: "1" }, { id: "2" }];
    expect(cartReducer(INITIAL_STATE, listChanged(products))).toEqual(products);
  });
});
