import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
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
