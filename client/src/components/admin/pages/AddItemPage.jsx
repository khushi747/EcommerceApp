import React, { useState } from "react";
const AddItemPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted item:", formData);
    // Send to backend or reset form here
  };

  return (
    <div>
      <div className="flex p-2 items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            🛒 Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Mouse"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 499"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write a short description about the item..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
