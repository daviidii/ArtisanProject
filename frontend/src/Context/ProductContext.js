import { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const setProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <ProductContext.Provider
      value={{
        setProduct,
        selectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
