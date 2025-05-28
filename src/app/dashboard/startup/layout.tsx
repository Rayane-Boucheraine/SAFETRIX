"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  LayoutGrid,
  ShieldCheck,
  Bug,
  Award,
  Settings,
  GitCompareArrows,
  LogOut,
  Search,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/Logo.svg";

const navItems = [
  { name: "Overview", path: "/dashboard/startup", icon: LayoutGrid },
  { name: "Programs", path: "/dashboard/startup/programs", icon: ShieldCheck },
  { name: "Testing", path: "/dashboard/startup/testing", icon: Search },
  { name: "Reports", path: "/dashboard/startup/reports", icon: Bug },
  { name: "Rewards", path: "/dashboard/startup/rewards", icon: Award },
  {
    name: "Engagement",
    path: "/dashboard/startup/engagement",
    icon: GitCompareArrows,
  },
  { name: "Settings", path: "/dashboard/startup/settings", icon: Settings },
];

export default function StartupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Use the correct green radial gradient
  const gradientBackground =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  return (
    <div className={`flex h-screen overflow-hidden ${gradientBackground}`}>
      <aside
        className={`w-60 text-white p-5 flex flex-col justify-between flex-shrink-0 border-r border-green-900/30 ${gradientBackground} shadow-lg`}
      >
        <div className="flex items-center justify-center pt-4">
          <Link href="/dashboard/startup" className="block relative">
            <Image
              src={logo}
              alt="Platform Logo"
              className="w-14 h-auto relative"
              priority
            />
          </Link>
        </div>

        <nav className="space-y-1.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive =
              pathname === path ||
              (pathname.startsWith(path + "/") &&
                path !== "/dashboard/startup");

            return (
              <Link
                key={path}
                href={path}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200 ease-out relative overflow-hidden ${
                  isActive
                    ? "bg-[#195033]/80 text-emerald-100 font-medium shadow-sm border border-emerald-500/30"
                    : "text-slate-300 hover:bg-[#195033]/70 hover:border-green-800/40 hover:text-white border border-transparent active:scale-[0.98]"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400"></div>
                )}
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "text-emerald-300"
                      : "text-slate-400 group-hover:text-emerald-300 group-hover:scale-110"
                  }`}
                />
                <span className="flex-grow truncate text-[15px]">{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm text-red-400/80 hover:bg-red-400/30 hover:text-red-300 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80 border border-transparent cursor-pointer active:scale-[0.98] text-[15px]"
          >
            <LogOut
              size={18}
              className="transition-all duration-300 group-hover:scale-110"
            />
            Logout
          </button>
        </div>
      </aside>

      <main className={`flex-1 overflow-y-auto isolate ${gradientBackground}`}>
        {children}
      </main>
    </div>
  );
}
