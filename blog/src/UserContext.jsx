// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: false });

  const loginUser = () => {
    setUser((prevState) => ({ ...prevState, isAuthenticated: true }));
  };

  const logoutUser = (callback) => {
    console.log('Logging out...');
    console.log('Before logout:', user);

    // Update the user state to reflect the logout
    setUser((prevState) => ({ ...prevState, isAuthenticated: false }));

    console.log('After logout:', user);

    if (callback) {
      callback();
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
