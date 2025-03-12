"use client";

import Image from "next/image";
import logo from "../../../public/Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const path = usePathname();
  // const [role, setRole] = (useState < "hacker") | "startup" | (null > null);
  const role = "startup"

  // useEffect(() => {
  //   const fetchRole = async () => {
  //     try {
  //       const response = await fetch("/api/get-role");
  //       const data = await response.json();

  //       if (response.ok) {
  //         setRole(data.role); // Set the user's role
  //       } else {
  //         console.error("Error fetching role:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching role:", error);
  //     }
  //   };

  //   fetchRole();
  // }, []);

  if (!role) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/dashboard">
            <Image src={logo} alt="logo" className="w-[30px]" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/dashboard" ? "font-bold" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/projects"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/dashboard/projects" ? "font-bold" : ""
              }`}
            >
              Projects
            </Link>
            <Link
              href="/dashboard/profile"
              className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                path === "/dashboard/profile" ? "font-bold" : ""
              }`}
            >
              Profile
            </Link>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <span className="text-[#191919]">John Doe</span>
            <div className="w-10 h-10 bg-[#0ACF83] rounded-full flex items-center justify-center text-white">
              JD
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
                href="/dashboard"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/dashboard" ? "font-bold" : ""
                }`}
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/projects"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/dashboard/projects" ? "font-bold" : ""
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/dashboard/profile" ? "font-bold" : ""
                }`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className={`text-[#191919] hover:text-[#0ACF83] transition duration-300 ${
                  path === "/dashboard/settings" ? "font-bold" : ""
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

          {/* Role-Specific Content */}
          {role === "hacker" ? (
            <>
              {/* Hacker Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Completed Tasks</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Active Projects</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">5</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Earnings</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">$1,200</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-[#191919] font-bold mb-4">
                  Recent Activity
                </h2>
                <ul className="space-y-3">
                  <li className="text-[#191919]">Task A - Completed</li>
                  <li className="text-[#191919]">Task B - In Progress</li>
                  <li className="text-[#191919]">Task C - Assigned</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Startup Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Total Projects</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Active Tasks</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">15</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[#191919] font-bold">Yearly Revenue</h3>
                  <p className="text-[#0ACF83] text-2xl font-bold">$500K</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-[#191919] font-bold mb-4">
                  Recent Activity
                </h2>
                <ul className="space-y-3">
                  <li className="text-[#191919]">Project A - Task completed</li>
                  <li className="text-[#191919]">
                    Project B - New task assigned
                  </li>
                  <li className="text-[#191919]">Project C - Task updated</li>
                </ul>
              </div>
            </>
          )}
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

export default DashboardPage;
