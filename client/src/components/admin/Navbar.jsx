// import { useStore } from "../../context/admin/StoreContext";
// import { useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const { isStoreOpen, setIsStoreOpen, toggleStore } = useStore();
//   const navigate = useNavigate();
//   const handleAdminStoreClick = () => {
//     setIsStoreOpen(false);
//     navigate("/admin");
//   };
//   const handleAddNewItemButtonClick = () => {
//     navigate("/admin/add-item");
//   };
//   const handleProfileClick = () => {
//     navigate("/admin/profile");
//   };
//   return (
//     <nav>
//       <div className="navbar bg-base-100 shadow-sm !sticky top-0 z-50">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {" "}
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />{" "}
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a>Item 1</a>
//               </li>

//               <li>
//                 <a>Item 3</a>
//               </li>
//             </ul>
//           </div>
//           <a
//             className="btn btn-ghost text-xl"
//             onClick={() => handleAdminStoreClick()}
//           >
//             Admin Store
//           </a>
//         </div>

//         <div className="flex gap-4 navbar-end">
//           <div
//             className="  cursor-pointer"
//             onClick={() => handleAddNewItemButtonClick()}
//           >
//             <a className="btn">Add new Item</a>
//           </div>
//           <div
//             className="  cursor-pointer"
//             onClick={() => {
//               navigate("/admin");
//               setIsStoreOpen(true);
//             }}
//           >
//             <a className="btn">Visit your store</a>
//           </div>
//           <div className="avatar" onClick={() => handleProfileClick()}>
//             <div className="w-10 rounded-full">
//               <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// components/Navbar.jsx - Example with logout functionality
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
                  <Link to="/admin/inventory" className="hover:underline">
                    Inventory
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
