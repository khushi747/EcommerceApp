import { useProducts } from "../../context/user/ProductsContext";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const { cart } = useProducts();
  const { saveCart } = useProducts();

  return (
    <div>
      <div className="flex flex-col items-center my-4 ">
        <button
          onClick={() => saveCart()}
          className="btn border-2 border-gray-300 bg-white hover:bg-gray-100"
        >
          Save Cart
        </button>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-4">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItemCard key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
