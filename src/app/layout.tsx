import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Church Anniversary & Birthday Helper",
  description: "Manage church member celebrations and automated messaging",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#f3f4f6" }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: "auto" }}>{children}</main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
