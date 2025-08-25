import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";
import ClientLayout from "../components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Church Anniversary & Birthday Helper",
  description: "Manage church member celebrations and automated messaging",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
