import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex h-[82vh] items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 🔽 Role Dropdown */}
          <select
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>Select Role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already a user?{" "}
          <Link to="/user/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
