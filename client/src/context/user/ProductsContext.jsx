import React from "react";
import { createContext, useState, useContext } from "react";
import { backendUrl } from "../../shared";
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const saveCart = async () => {
    const response = await fetch(`${backendUrl}saveCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(cart),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Cart saved successfully:", data);
    } else {
      console.error("Error saving cart:", data);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, cart, setCart, saveCart }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
