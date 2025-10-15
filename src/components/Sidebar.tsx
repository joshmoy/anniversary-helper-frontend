"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import HeartLogoIcon from "./icons/HeartLogoIcon";
import DashboardIcon from "./icons/DashboardIcon";
import PeopleIcon from "./icons/PeopleIcon";
import UploadDataIcon from "./icons/UploadDataIcon";
import MessagesIcon from "./icons/MessagesIcon";
import CelebrationsIcon from "./icons/CelebrationsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import LogoutIcon from "./icons/LogoutIcon";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "People/Contacts", href: "/dashboard/people", icon: PeopleIcon },
  { name: "Import Data", href: "/dashboard/upload", icon: UploadDataIcon },
  { name: "Messages & Reminders", href: "/dashboard/messages", icon: MessagesIcon },
  { name: "Celebrations", href: "/dashboard/celebrations", icon: CelebrationsIcon },
  { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col w-64 bg-sidebar-bg h-screen">
      {/* Logo and Welcome Section */}
      <div className="flex flex-col gap-2 px-6 py-8 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <HeartLogoIcon width={18} height={16} color="#ffffff" />
          <h1 className="text-sidebar-text font-semibold text-base tracking-tight">
            Anniversary Helper
          </h1>
        </div>
        <p className="text-sidebar-text-muted text-sm tracking-tight">Welcome!</p>
      </div>

      {/* Organization Account Label */}
      <div className="px-6 pt-4 pb-2">
        <p className="text-sidebar-text-label text-xs capitalize leading-4">
          Organization Account
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-[10px] transition-colors ${
                isActive
                  ? "bg-sidebar-active text-sidebar-text"
                  : "text-sidebar-text-muted hover:bg-sidebar-active/50"
              }`}
            >
              <Icon width={20} height={20} color={isActive ? "#ffffff" : "#ede9fe"} />
              <span className="text-base tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sidebar-text-muted hover:text-sidebar-text rounded-lg transition-colors"
        >
          <LogoutIcon width={16} height={16} color="#ede9fe" />
          <span className="text-sm font-medium tracking-tight">Logout</span>
        </button>
      </div>
    </div>
  );
}