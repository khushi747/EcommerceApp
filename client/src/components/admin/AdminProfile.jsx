import React from "react";
import { useUserDetails } from "../../context/user/UserDetailsContext";
import { backendUrl } from "../../shared";
const AdminProfile = () => {
  const { isUserLoggedIn, isAdmin, setIsUserLoggedIn, setIsAdmin } =
    useUserDetails();
  const admin = {
    name: "John Doe",
    email: "admin@example.com",
    role: "Store Owner",
    storeName: "Doe's Electronics",
    phone: "+91-9876543210",
    joined: "2023-01-15",
    profileImage:
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  };

  const handleLogoutClick = () => {
    // Logic for logging out the user
    fetch(`${backendUrl}logoutUser`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (response.ok) {
          setIsUserLoggedIn(false);
          setIsAdmin(false);
          console.log("User logged out");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={admin.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border shadow"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {admin.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {admin.email}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {admin.phone}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Role:</span>{" "}
              {admin.role}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Store Name:</span>{" "}
              {admin.storeName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Joined:</span>{" "}
              {admin.joined}
            </p>
          </div>
          <div className="  cursor-pointer" onClick={() => handleLogoutClick()}>
            <a className="btn">Log out</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
