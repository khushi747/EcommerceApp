const ItemCard = () => {
  return (
    <div className="card bg-base-100 w-80 shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
      <figure className="px-4 pt-4">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Nike Air Max"
          className="rounded-xl h-48 object-cover"
        />
      </figure>
      <div className="card-body px-4 pt-2 pb-4 text-left">
        <h2 className="card-title text-lg font-semibold text-gray-800">
          Nike Air Max 270
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          Lightweight, breathable, and stylish – perfect for daily wear or
          workouts.
        </p>

         <div className="card-actions mt-4 flex justify-between">
          <span className="text-lg font-bold text-green-600">₹4,999</span>
          <button className="btn btn-outline btn-sm w-1/2">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
