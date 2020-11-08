import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../domain/Product";
import { selectProductList } from "../store/cart/selectors";
import { useListProducts } from "./useListProducts";

const ProductList: React.FC = () => {
  const listProducts = useListProducts();
  const products: Product[] = useSelector(selectProductList);

  useEffect(() => {
    listProducts.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length === 0) {
    return <h1>There're no products in the cart</h1>;
  }

  return (
    <>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </>
  );
};

export default ProductList;
