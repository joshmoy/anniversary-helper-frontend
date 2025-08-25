"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "People", href: "/people", icon: UsersIcon },
  { name: "Upload CSV", href: "/upload", icon: DocumentArrowUpIcon },
  { name: "Messages", href: "/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Celebrations", href: "/celebrations", icon: CalendarDaysIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "256px",
        backgroundColor: "white",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
          padding: "0 16px",
          backgroundColor: "#2563eb",
        }}
      >
        <HeartIcon style={{ height: "32px", width: "32px", color: "white", marginRight: "8px" }} />
        <h1 style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Church Helper</h1>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "24px 16px" }}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "8px",
                textDecoration: "none",
                marginBottom: "8px",
                backgroundColor: isActive ? "#eff6ff" : "transparent",
                color: isActive ? "#1d4ed8" : "#4b5563",
                borderRight: isActive ? "2px solid #2563eb" : "none",
                transition: "all 0.2s",
              }}
            >
              <item.icon style={{ marginRight: "12px", height: "20px", width: "20px" }} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", textAlign: "center" }}>
          Church Anniversary & Birthday Helper
        </p>
        <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>
          v1.0.0
        </p>
      </div>
    </div>
  );
}
