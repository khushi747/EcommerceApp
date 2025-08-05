import { useUserDetails } from "../context/user/UserDetailsContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    isAdmin,
    setIsAdmin,
    checkAuthStatus,
    loading,
    setLoading,
  } = useUserDetails();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
      console.log("Auth status checked from ProtectedRoute");
    };
    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isUserLoggedIn) {
    alert("You need to log in to access this page.");
    // toast.error("You need to log in to access this page."); //not working
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole === "admin" && !isAdmin) {
    console.log(
      "role check from protected route: admin access denied, redirecting to user dashboard (successful loggged in)"
    );
    return <Navigate to="/user" replace />;
  }

  if (requiredRole === "user" && isAdmin) {
    console.log("role check from protected route: admin acess given to user");
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
