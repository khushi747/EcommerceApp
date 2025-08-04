import React from "react";
import { createContext, useState, useContext } from "react";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserDetailsContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn, isAdmin, setIsAdmin }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  return context;
};
