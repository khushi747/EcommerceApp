import React from "react";
import { createContext, useState, useContext } from "react";
const StoreContext = createContext();
 
export const StoreProvider = ({ children }) => {
  const [productsInMyInventory, setProductsInMyInventory] = useState([]);

  
  return (
    <StoreContext.Provider value={{ productsInMyInventory, setProductsInMyInventory }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
