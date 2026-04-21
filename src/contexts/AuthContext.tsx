"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { authClient } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    username: string,
    email: string,
    password: string,
    accountType: string
  ) => Promise<boolean>;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authClient.login(email, password);
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

  const register = async (
    fullName: string,
    username: string,
    email: string,
    password: string,
    accountType: string
  ): Promise<boolean> => {
    try {
      const response = await authClient.register(fullName, username, email, password, accountType);
      const { token, user: userData } = response;

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
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
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
