import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ product }) => {
  const { name, price, quantity, imageUrl, _id } = product;
  const navigate = useNavigate();
  const handleEdit = (_id) => {
    navigate(`/admin/edit-product/${_id}`);
  };
  return (
    <div className="card bg-base-100   w-70 shadow-sm">
      <figure className="h-48">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body h-30 p-2">
        <h2 className="card-title">{name}</h2>
        {/* <p className="overflow-hidden">{description}</p>{" "} */}
        <div className="flex justify-between items-center">
          <div className="card-actions flex flex-col justify-between  ">
            {" "}
            <h2 className="text-lg  ">{quantity} Units</h2>
            <h2 className="text-lg "> Rs.{price}/Unit </h2>
          </div>
          <div>
            {" "}
            <button className="btn bg-gray-200" onClick={() => handleEdit(_id)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
