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
    <div className="flex flex-col w-64 bg-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <HeartIcon className="h-8 w-8 text-white mr-2" />
        <h1 className="text-white font-bold text-lg">Church Helper</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-link mb-2 ${
                isActive ? "sidebar-link-active" : "sidebar-link-inactive"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">Church Anniversary & Birthday Helper</p>
        <p className="text-xs text-gray-400 text-center mt-1">v1.0.0</p>
      </div>
    </div>
  );
}
