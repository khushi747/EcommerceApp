import { ShoppingCart, PackageCheck } from "lucide-react";
import { useUserDetails } from "../../context/user/UserDetailsContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isUserLoggedIn, setIsUserLoggedIn, isAdmin, setIsAdmin } =
    useUserDetails();
  const navigate = useNavigate();

  const handleAdminStoreClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      alert("You are not authorized to access the admin store.");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleMyOrdersClick = () => {
    if (isUserLoggedIn) {
      navigate("/orders");
    } else {
      alert("Please log in to view your orders.");
    }
  };

  const handleSignUpClick = () => {
    navigate("/user/signup");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm !sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost text-xl"
            onClick={() => handleAdminStoreClick()}
          >
            Admin Store
          </a>
        </div>

        <div className="flex gap-4 navbar-end">
          <div className="cursor-pointer" onClick={() => handleCartClick()}>
            <a className="btn">
              <ShoppingCart />
            </a>
          </div>

          {isUserLoggedIn && (
            <div
              className="cursor-pointer"
              onClick={() => handleMyOrdersClick()}
            >
              <a className="btn">
                <PackageCheck />
              </a>
            </div>
          )}
          {!isUserLoggedIn && (
            <div
              className="  cursor-pointer"
              onClick={() => handleSignUpClick()}
            >
              <a className="btn">SignUp</a>
            </div>
          )}
          {isUserLoggedIn && (
            <div className="avatar" onClick={() => handleProfileClick()}>
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
