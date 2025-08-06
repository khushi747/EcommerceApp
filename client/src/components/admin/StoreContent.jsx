import { useEffect } from "react";
import ItemCard from "./ItemCard";
import { backendUrl } from "../../shared";
import { useStore } from "../../context/admin/StoreContext";
const StoreContent = () => {
  const { productsInMyInventory, setProductsInMyInventory } = useStore();
  
  useEffect(() => {
    getProductsInMyInventory();
  }, []);

  const getProductsInMyInventory = async () => {
    const response = await fetch(`${backendUrl}getProductsInMyInventory`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching products:", errorData);
      return;
    }
    const data = await response.json();
    console.log("Fetched products:", data);
    setProductsInMyInventory(data.products);
  };
  return (
    <div>
      <div className="flex  justify-end pt-2 pr-6"></div>
      <div className="flex w-full items-center justify-around p-4 gap-4 flex-wrap">
        {productsInMyInventory.map((product) => (
          <ItemCard key={product._id} product={product} />
        ))}
      </div>{" "}
    </div>
  );
};

export default StoreContent;
