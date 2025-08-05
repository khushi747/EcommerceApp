import { Outlet } from "react-router-dom";
import Navbar from "../Navbar"; // Adjust import path as needed
import { StoreProvider } from "../../../context/admin/StoreContext";

const AdminLayout = () => {
  return (
    <StoreProvider>
      <div>
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </StoreProvider>
  );
};

export default AdminLayout;
