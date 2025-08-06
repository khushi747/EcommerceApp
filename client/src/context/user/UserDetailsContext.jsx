import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { backendUrl } from "../../shared";
const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check authentication status on app load
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${backendUrl}check-auth`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsUserLoggedIn(true);
        setIsAdmin(data.user.role === "seller");
        setUser(data.user);
        console.log(
          "User details from checkAuthStatus UserDetailsContext useffect (if):",
          response
        );
      } else {
        setIsUserLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        console.log(
          "User details from checkAuthStatus UserDetailsContext useffect (else):",
          response
        );
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsUserLoggedIn(false);
      setIsAdmin(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`${backendUrl}logoutUser`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsUserLoggedIn(false);
      setIsAdmin(false);
      setUser(null);
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  return (
    <UserDetailsContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        isAdmin,
        setIsAdmin,
        user,
        setUser,
        loading,
        setLoading,
        checkAuthStatus,
        logout,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserDetails must be used within UserDetailsProvider");
  }
  return context;
};
