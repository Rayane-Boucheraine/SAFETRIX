// components/admin/AdminSidebar.tsx
"use client"; // Needed if you add client-side interactivity like logout button later

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  // UserGroupIcon,
  CodeBracketIcon,
  ArrowLeftOnRectangleIcon, // For logout example
} from "@heroicons/react/24/outline"; // Using Heroicons for icons

function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: ChartBarIcon },
  {
    name: "Startups",
    href: "/admin/users/startups",
    icon: BuildingOffice2Icon,
  },
  { name: "Hackers", href: "/admin/users/hackers", icon: CodeBracketIcon },
  // Add more admin sections as needed (e.g., Reports, Settings)
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    // TODO: Implement Logout Logic
    // - Make API call to /api/auth/logout
    // - Clear any local auth state if using Context
    // - Redirect to login: router.push('/auth/signin/admin');
    console.log("Logout clicked - Implement logout action");
    alert("Implement Logout");
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        {/* Replace with your Admin Logo/Title */}
        <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              pathname.startsWith(item.href) // Basic active state check
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
              "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
            )}
          >
            <item.icon
              className={classNames(
                pathname.startsWith(item.href)
                  ? "text-gray-200"
                  : "text-gray-500 group-hover:text-gray-300",
                "mr-3 flex-shrink-0 h-5 w-5"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button (Optional) */}
      <div className="mt-auto p-2 border-t border-gray-700">
        <button
          onClick={handleLogout} // Placeholder action
          className="group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-150"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// Remember to install Heroicons: npm install @heroicons/react
