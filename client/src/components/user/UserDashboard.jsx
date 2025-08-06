import ItemCard from "./ItemCard";
import {  useEffect } from "react";
import { backendUrl } from "../../shared";
import { useProducts } from "../../context/user/ProductsContext";
const UserDashboard = () => {
  const { products, setProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${backendUrl}getProducts`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("Fetched products:", data);
    setProducts(data.products);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product) => (
        <ItemCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default UserDashboard;
