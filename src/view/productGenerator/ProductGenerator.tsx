import React from 'react';
import { useAddToCartAndRefresh } from './useAddToCartAndRefresh';

const ProductGenerator: React.FC = () => {
  const addToCartAndRefresh = useAddToCartAndRefresh();

  const generateProduct = () => {
    return { id: Date.now().toString() };
  };

  const handleClick = () => {
    addToCartAndRefresh.addProducts([generateProduct()]);
  };

  return (
    <button type="button" onClick={handleClick}>
      Generate Product
    </button>
  );
};

export default ProductGenerator;
