import { Plus, Minus } from "lucide-react";

const ItemCard = () => {
  return (
    <div className="card bg-base-100 w-70 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Nike Shoes</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions flex justify-between items-center ">
          {" "}
          <button className="btn btn-primary bg-black border-3px-solid border-black">
            <Minus />
          </button>
          <h2 className="text-lg font-bold"> X {10} Units</h2>
          <button className="btn btn-primary bg-black border-3px-solid border-black">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
