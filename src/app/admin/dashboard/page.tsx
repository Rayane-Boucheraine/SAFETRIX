"use client";

import Image from "next/image";
import logo from "../../../../public/Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminDashboardPage = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/admin/dashboard">
            <Image src={logo} alt="logo" className="w-[40px]" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/admin/dashboard"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/admin/dashboard" ? "font-bold" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/admin/users"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/admin/users" ? "font-bold" : ""
              }`}
            >
              Users
            </Link>
            <Link
              href="/admin/settings"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/admin/settings" ? "font-bold" : ""
              }`}
            >
              Settings
            </Link>
          </nav>

          {/* Admin Profile */}
          <div className="flex items-center space-x-4">
            <span className="text-[#191919]">Admin</span>
            <div className="w-10 h-10 bg-[#0ACF83] rounded-full flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6">
          <h2 className="text-[#191919] font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/admin/dashboard"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/admin/dashboard" ? "font-bold" : ""
                }`}
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/admin/users" ? "font-bold" : ""
                }`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/admin/settings" ? "font-bold" : ""
                }`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#191919] mb-6">Overview</h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-[#191919] font-bold">Total Users</h3>
              <p className="text-[#0ACF83] text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-[#191919] font-bold">Active Projects</h3>
              <p className="text-[#0ACF83] text-2xl font-bold">56</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-[#191919] font-bold">Revenue</h3>
              <p className="text-[#0ACF83] text-2xl font-bold">$12,345</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-[#191919] font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="text-[#191919]">User A - Signed up</li>
              <li className="text-[#191919]">Project B - Completed</li>
              <li className="text-[#191919]">User C - Updated profile</li>
            </ul>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-[#191919]">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminDashboardPage;
