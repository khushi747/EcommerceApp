import { Outlet } from "react-router-dom";
import Navbar from "../Navbar"; // Adjust import path as needed

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
