import { Link, useNavigate } from "react-router-dom";
import { useUserDetails } from "../../context/user/UserDetailsContext";

const Navbar = () => {
  const { isUserLoggedIn, isAdmin, user, logout } = useUserDetails();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-Commerce App
        </Link>

        <div className="flex items-center space-x-4">
          {!isUserLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span>Welcome, {user?.name}!</span>

              {isAdmin ? (
                <>
                  <Link to="/admin" className="hover:underline">
                    Dashboard
                  </Link>
                  <Link to="/admin/add-item" className="hover:underline">
                    Add Item
                  </Link>
                  <Link to="/admin/profile" className="hover:underline">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/user" className="hover:underline">
                    Home
                  </Link>
                  <Link to="/user/cart" className="hover:underline">
                    Cart
                  </Link>
                  <Link to="/user/orders" className="hover:underline">
                    Orders
                  </Link>
                  <Link to="/user/profile" className="hover:underline">
                    Profile
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
