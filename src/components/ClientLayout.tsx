"use client";

import { useAuth } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Check if current path is login page
  const isLoginPage = pathname === "/login";

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is on login page, show login page without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For all other pages, require authentication and show with sidebar
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
