"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  Bug,
  Trophy,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/Logo.svg";

const navItems = [
  { name: "Dashboard", path: "/dashboard/hacker", icon: LayoutDashboard },
  { name: "Reports", path: "/dashboard/hacker/reports", icon: Bug },
  { name: "Programs", path: "/dashboard/hacker/programs", icon: ShieldCheck },
  { name: "Rewards", path: "/dashboard/hacker/rewards", icon: Trophy },
  { name: "Profile", path: "/dashboard/hacker/profile", icon: Settings },
];

export default function HackerLayout({
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

  const gradientBackground =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  return (
    <div className={`flex h-screen overflow-hidden ${gradientBackground}`}>
      <aside
        className={`
          w-64 text-white p-6 max-md:hidden flex flex-col flex-shrink-0
          border-r border-slate-700/50 shadow-xl
        `}
      >
        <div className="flex-shrink-0 flex items-center justify-center mb-12 pt-4">
          <Link href="/dashboard/hacker" className="block group">
            <Image
              src={logo}
              alt="Platform Logo"
              className="w-12 h-auto transition-transform duration-300 ease-out group-hover:scale-[1.03]" // Simpler hover
              priority
            />
          </Link>
        </div>

        <div className="flex flex-col flex-grow">
          <nav className="flex flex-col justify-center flex-grow space-y-2.5 pb-28">
            {navItems.map(({ name, path, icon: Icon }) => {
              const isActive =
                pathname === path ||
                (path !== "/dashboard/hacker" && pathname.startsWith(path));

              return (
                <Link
                  key={path}
                  href={path}
                  className={`
                    group flex items-center gap-3.5 px-4 py-2.5 rounded-md /* Standard padding/rounding */
                    transition-all duration-200 ease-in-out /* Faster transition */
                    transform focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-opacity-75
                    ${
                      isActive
                        ?
                          "bg-emerald-800/80 text-white font-medium scale-[1.02] shadow-sm"
                        : 
                          "text-gray-300 hover:bg-slate-700/50 hover:text-white active:scale-[0.99]"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="tracking-normal font-normal">{name}</span>{" "}
                </Link>
              );
            })}
          </nav>

          <div className="flex-shrink-0 mt-auto">
            <button
              onClick={handleLogout}
              className="
                  group flex items-center cursor-pointer gap-3.5 px-4 py-2.5 rounded-md /* Match nav style */
                  text-red-400/90 hover:bg-red-900/40 hover:text-red-300 /* Simple bg hover */
                  transition-colors duration-200 ease-in-out w-full text-left
                  active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                  "
            >
              <LogOut
                size={20}
                className="transition-transform duration-200 group-hover:scale-105"
              />
              <span className="tracking-normal font-normal">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 p-8 overflow-y-auto text-slate-200`}>
        {children}
      </main>
    </div>
  );
}
