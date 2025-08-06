import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/user/ProductsContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, price, description, imageUrl, _id } = product;
  const { cart, setCart, products } = useProducts();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Adding product ${id} to cart`);
    const productToAdd = products.find((item) => item._id === id);
    const isProductInCart = cart.find((item) => item._id === id);
    if (isProductInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...productToAdd, quantity: 1 }]);
    }
    toast.success("Product added to cart!");
  };

  return (
    <div className="card bg-base-100 w-80 shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
      <figure
        onClick={() => {
          handleProductClick(_id);
        }}
        className="px-4 pt-4"
      >
        <img
          src={imageUrl}
          alt={name}
          className="rounded-xl h-48 object-cover cursor-pointer"
        />
      </figure>
      <div className="card-body px-4 pt-2 pb-4 text-left">
        <h2
          onClick={() => {
            handleProductClick(_id);
          }}
          className="cursor-pointer card-title text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200     hover:underline"
        >
          {name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="card-actions mt-4 flex justify-between">
          <span className="text-lg font-bold text-black">₹{price}</span>
          <button
            className="btn btn-outline btn-sm w-1/2"
            onClick={() => {
              handleAddToCart(_id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
