import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { UserDetailsProvider } from "../../../context/user/UserDetailsContext";
const UserLayout = () => {
  return (
    <UserDetailsProvider>
      <div>
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </UserDetailsProvider>
  );
};
export default UserLayout;
