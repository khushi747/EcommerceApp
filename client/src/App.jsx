import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../src/components/admin/AdminDashboard.jsx";
import AddItemPage from "../src/components/admin/pages/AddItemPage.jsx";
import AdminProfile from "../src/components/admin/pages/ProfilePage.jsx";
import AdminLayout from "../src/components/admin/pages/AdminLayout.jsx";
import UserDashboard from "../src/components/user/UserDashboard.jsx";
import UserLayout from "../src/components/user/pages/UserLayout.jsx";
import UserProfile from "../src/components/user/pages/UserProfile.jsx";
import Cart from "../src/components/user/pages/Cart.jsx";
import Login from "../src/components/user/Login.jsx";
import Signup from "../src/components/user/Signup.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<UserDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-item" element={<AddItemPage />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* User */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
