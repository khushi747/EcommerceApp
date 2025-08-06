import { Plus, Minus } from "lucide-react";
import { useProducts } from "../../context/user/ProductsContext";
const CartItemCard = ({ item }) => {
  const { name, price, quantity, imageUrl, description, _id } = item;
  const { cart, setCart } = useProducts();
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
      return;
    }
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    console.log(updatedCart);
    setCart(updatedCart);
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
        <span className="text-lg font-bold text-black">₹{price}</span>

        <div className="card-actions mt-4 flex justify-between items-center ">
          <button
            onClick={() => handleQuantityChange(_id, quantity - 1)}
            className="btn btn-outline btn-sm w-1/4"
          >
            <Minus />
          </button>
          <span className="text-lg text-gray-900 font-bold"> {quantity}</span>
          <button
            onClick={() => handleQuantityChange(_id, quantity + 1)}
            className="btn btn-outline btn-sm w-1/4"
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
