import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserDetails } from "../../context/user/UserDetailsContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../shared";
const Login = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setIsUserLoggedIn, isAdmin, setIsAdmin, setUser } =
    useUserDetails();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(isAdmin ? "/admin" : "/user");
    }
  }, [isUserLoggedIn, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${backendUrl}loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        const { user } = data;

        // Update context state
        setIsUserLoggedIn(true);
        setIsAdmin(user.role === "seller");
        setUser(user);
        toast.success("Login successful!");
        // Store token in localStorage as backup
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Navigate based on role
        if (user.role === "seller") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[82vh] items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
