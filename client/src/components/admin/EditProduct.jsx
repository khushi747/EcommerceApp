import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendUrl } from "../../shared";

const EditProduct = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  // Update formData when productDetails loads
  useEffect(() => {
    if (productDetails?.product) {
      setFormData({
        name: productDetails.product.name,
        description: productDetails.product.description,
        category: productDetails.product.category,
        imageUrl: productDetails.product.imageUrl,
        price: productDetails.product.price,
        quantity: productDetails.product.quantity,
      });
    }
  }, [productDetails]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${backendUrl}getProductDetails/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProductDetails(data);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log("Saving product data:", formData);

      const res = await fetch(`${backendUrl}updateProductDetails/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const result = await res.json();
      alert("Product updated successfully!");

      // Optionally refresh the product details
      await fetchProductDetails();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-2 text-lg">Loading product details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  if (!productDetails || !productDetails.product) {
    return (
      <div className="alert alert-warning max-w-md mx-auto mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span>No product details found.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Product</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a href="/admin">Admin</a>
            </li>
            <li>
              <a href="/admin/inventory">Inventory</a>
            </li>
            <li>Edit Product</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Preview */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Product Preview</h2>
            <figure className="mb-4">
              <img
                src={formData.imageUrl || "/placeholder-image.jpg"}
                alt={formData.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </figure>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {formData.name || "Product Name"}
              </h3>
              <p className="text-gray-600">
                {formData.description || "Product description"}
              </p>
              <div className="flex justify-between items-center">
                <span className="badge badge-outline">
                  {formData.category || "Category"}
                </span>
                <span className="text-lg font-bold">
                  ₹{formData.price}/Unit
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {formData.quantity} units available
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Edit Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Category</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Price (₹)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="button"
                  className="btn btn-outline flex-1 sm:flex-none"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary flex-1 sm:flex-none ${
                    saving ? "loading" : ""
                  }`}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
