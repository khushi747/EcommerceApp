import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../src/components/admin/AdminDashboard.jsx";
import AddItemPage from "../src/components/admin/pages/AddItemPage.jsx";
import AdminProfile from "../src/components/admin/AdminProfile.jsx";
import AdminLayout from "../src/components/admin/pages/AdminLayout.jsx";
import UserDashboard from "../src/components/user/UserDashboard.jsx";
import UserLayout from "../src/components/user/pages/UserLayout.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import Cart from "./components/user/Cart.jsx";
import Login from "../src/components/user/Login.jsx";
import Signup from "../src/components/user/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StoreContent from "./components/admin/StoreContent.jsx";
import EditProduct from "./components/admin/EditProduct.jsx";
import DetailedItemCard from "./components/user/DetailedItemCard.jsx";
import { UserDetailsProvider } from "./context/user/UserDetailsContext.jsx";
import { ProductsProvider } from "./context/user/ProductsContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserDetailsProvider>
      <ProductsProvider>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route
                path="product/:product_id"
                element={<DetailedItemCard />}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="inventory" element={<StoreContent />} />
              <Route path="add-item" element={<AddItemPage />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>

            {/* Protected User Routes */}
            <Route
              path="/user"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Cart />} />
              <Route
                path="product/:product_id"
                element={<DetailedItemCard />}
              />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<UserLayout />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </UserDetailsProvider>
  );
}

export default App;
