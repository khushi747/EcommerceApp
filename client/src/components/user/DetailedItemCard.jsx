import React, { useState, useEffect } from "react";
import { backendUrl } from "../../shared";
import { useParams } from "react-router-dom";

const DetailedItemCard = () => {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [product_id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}product/${product_id}`);
      const data = await response.json();
      setProductDetails(data.product);
      console.log("Product details:", data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card h-90 lg:card-side bg-base-100 shadow-md border border-gray-200">
      {/* Product Image */}
      <figure className="lg:w-1/3 w-full p-4">
        <img
          src={productDetails.imageUrl}
          alt={productDetails.name}
          className="object-cover rounded-md w-full h-60 lg:h-full"
        />
      </figure>

      {/* Product Details */}
      <div className="card-body lg:w-2/3 w-full p-4 space-y-2">
        <h2 className="card-title text-xl font-semibold">
          {productDetails.name}
        </h2>
        <p className="text-gray-600">{productDetails.description}</p>
        <p className="text-lg font-bold text-green-700">
          ₹{productDetails.price}
        </p>
        <p className="text-sm">Available Quantity: {productDetails.quantity}</p>
        <p className="text-sm">Category: {productDetails.category}</p>

        <div className="card-actions justify-end pt-4">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
export default DetailedItemCard;
