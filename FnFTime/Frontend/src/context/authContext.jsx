import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(sessionStorage.getItem("user")) || null
    );
  
    const login = async (email, password) => {
      try {
        const response = await axios.post('http://localhost:7777/login', { email, password });
        const { token, userId, role } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userRole", role);
        await fetchCurrentUser(userId);
        return role;
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    };

  const fetchCurrentUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7777/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      setCurrentUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
    useEffect(() => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
