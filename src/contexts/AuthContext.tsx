"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../lib/api";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("auth_user");

        if (token && storedUser) {
          // For now, just trust the token exists and use stored user data
          // In production, you'd verify with the backend
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      }
    } catch (error) {
      console.log("Auth check error:", error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Try real API login
      const response = await apiClient.login(username, password);
      const { token, user: userData } = response;

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    setUser(null);
  };


  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
