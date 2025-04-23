"use client";

import React from "react";
import Aside from "@/components/Dashboard/hacker/Hacker-Aside";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  const isSessionRoute =
    pathname?.includes("/dashboard/question-bank/session/") ?? false;

  return (
    <main className="">
      <Aside />
      <div
        className={`ml-[248px] max-md:ml-0 ${
          isSessionRoute ? "max-md:mt-0" : "max-md:mt-[70px]"
        } h-screen max-xl:ml-0 bg-[#F7F8FA]`}
      >
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
