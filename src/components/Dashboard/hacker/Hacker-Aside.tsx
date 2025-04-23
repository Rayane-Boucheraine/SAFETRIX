// src/components/dashboard/Aside.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import { useQuery, QueryKey } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { aside_links, AsideLinkData } from "@/data/data";
import LogoutConfirmationModal from "../LogoutConfirmationModal";
import BaseUrl from "../../BaseUrl";
import Notification, { NotificationItem } from "./Hacker-Notification";

interface UserSubscriptionPlan {
  mcqs: number | null;
  qrocs: number;
}

interface UserSubscription {
  plan: UserSubscriptionPlan | null;
  used_mcqs?: number;
  used_qrocs?: number;
}

interface StreakData {
  current_streak: number;
}

interface XpData {
  xp: number;
}

// import infinite from "../../../public/Icons/infinite.svg";
import logo from "../../../../public/Logo.svg";
// import settings from "../../../public/Aside/settings.svg";
// import Psettings from "../../../public/Aside/Psettings.svg";
// import logout from "../../../public/Aside/logout.svg";
// import menu from "../../../public/Home/Menu.svg";
// import notificationIcon from "../../../public/Icons/notification.svg";

const Aside: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const path = usePathname();
  const router = useRouter();

  const afterDashboard: string = path?.split("/dashboard/")[1] || "";
  const isSettingsActive: boolean = afterDashboard.startsWith("settings");

  const fetchData = async <T,>(url: string): Promise<T | null> => {
    const token = secureLocalStorage.getItem("token");
    if (!token || typeof token !== "string") {
      if (typeof window !== "undefined") {
        router.push("/");
      }
      return null;
    }
    try {
      const response = await BaseUrl.get<{ data: T }>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: unknown) {
      // <--- Changed from 'any' to 'unknown'
      let errorMsg = "An unknown error occurred";
      let statusCode: number | undefined = undefined;

      // Check if it's an AxiosError (if BaseUrl is Axios)
      if (error instanceof AxiosError) {
        errorMsg =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          String(error);
        statusCode = error.response?.status;
      } else if (error instanceof Error) {
        // Check if it's a generic Error
        errorMsg = error.message;
      } else if (typeof error === "string") {
        // Handle if the error is just a string
        errorMsg = error;
      }
      // You could add more checks for other error types if needed

      console.error(
        `Failed to fetch ${url}:`,
        errorMsg,
        ...(statusCode ? [`(Status: ${statusCode})`] : [])
      );

      // Handle specific status code errors like 401 Unauthorized
      if (statusCode === 401 && typeof window !== "undefined") {
        secureLocalStorage.removeItem("token");
        router.push("/");
      }
      return null; // Return null after handling/logging the error
    }
  };

  const queryOptions = {
    enabled: !!secureLocalStorage.getItem("token"),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  };

  const { data: userNotification } = useQuery<NotificationItem[] | null, Error>(
    {
      queryKey: ["userNotification"] as QueryKey,
      queryFn: () => fetchData<NotificationItem[]>("/notification"),
      ...queryOptions,
    }
  );

  const { data: userSubscription } = useQuery<UserSubscription | null, Error>({
    queryKey: ["userSubscription"] as QueryKey,
    queryFn: () => fetchData<UserSubscription>("/user/subscription/me"),
    ...queryOptions, // Only spread once is sufficient unless overriding
  });

  const { data: streakData } = useQuery<StreakData | null, Error>({
    queryKey: ["userStreak"] as QueryKey,
    queryFn: () => fetchData<StreakData>("/user/streak/me"),
    ...queryOptions,
  });

  const { data: xpData } = useQuery<XpData | null, Error>({
    queryKey: ["userXp"] as QueryKey,
    queryFn: () => fetchData<XpData>("/user/xp/me"),
    ...queryOptions,
  });

  const isQcmInfinite: boolean = userSubscription?.plan?.mcqs === null;
  const remainingMcqs: number | null = !isQcmInfinite
    ? Math.max(
        0,
        (userSubscription?.plan?.mcqs ?? 0) - (userSubscription?.used_mcqs ?? 0)
      )
    : null;
  const remainingQrocs: number = Math.max(
    0,
    (userSubscription?.plan?.qrocs ?? 0) - (userSubscription?.used_qrocs ?? 0)
  );
  const currentStreak: number = streakData?.current_streak ?? 0;
  const currentXp: number = xpData?.xp ?? 0;

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLogoutConfirm(false);
    setIsNotificationOpen(false);
  }, [path]);

  const toggleNotification = (): void => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogoutClick = (): void => {
    setShowLogoutConfirm(true);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const confirmLogout = (): void => {
    secureLocalStorage.removeItem("token");
    router.push(`/`);
    setShowLogoutConfirm(false);
  };

  const closeLogoutModal = (): void => {
    setShowLogoutConfirm(false);
  };

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen && isNotificationOpen) {
      setIsNotificationOpen(false);
    }
  };

  return (
    <>
      <aside className="fixed w-[248px] h-screen justify-between flex flex-col pt-[30px] pb-[18px] top-0 left-0 border-r border-r-neutral-200 bg-white shadow-sm z-[50] max-xl:w-full max-xl:flex-row max-xl:items-center max-xl:h-[70px] max-xl:px-[24px] max-xl:py-0 max-xl:shadow-md dark:bg-neutral-900 dark:border-r-neutral-700">
        {isMenuOpen ? (
          <>
            <div className="flex-shrink-0">
              <span className="text-neutral-800 dark:text-neutral-200 font-medium text-base flex items-center gap-1">
                {isQcmInfinite ? (
                  // <Image
                  //   src={infinite}
                  //   alt="Infinite"
                  //   width={18}
                  //   height={10}
                  //   className="w-[18px]"
                  // />
                  <></>
                ) : (
                  remainingMcqs ?? 0
                )}
                <span className="text-pink-500">QCM</span>
              </span>
            </div>
            <div className="flex-shrink-0">
              <span className="text-neutral-800 dark:text-neutral-200 font-medium text-base flex items-center gap-1">
                {remainingQrocs ?? 0}
                <span className="text-pink-500">QROC</span>
              </span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-neutral-800 dark:text-neutral-200 font-medium text-base">
                {currentStreak}
              </span>
              {/* <Image
                src={streak}
                alt="Streak"
                className="w-[13px]"
                width={13}
                height={13}
              /> */}
            </div>
            <div className="flex-shrink-0">
              <span className="text-neutral-800 dark:text-neutral-200 font-medium text-base flex items-center gap-1">
                {currentXp}
                <span className="text-pink-500">XP</span>
              </span>
            </div>
          </>
        ) : (
          <Link href="/dashboard" aria-label="Go to dashboard home">
            <Image
              src={logo}
              alt="MyQCM Logo"
              className="w-[120px] mx-auto max-xl:mx-0 max-xl:w-[90px]"
              priority
              width={120}
              height={40}
            />
          </Link>
        )}

        <div className="flex items-center gap-4 xl:hidden">
          {!isMenuOpen && (
            <button
              onClick={toggleNotification}
              className="cursor-pointer relative p-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              aria-label="Open notifications"
            >
              {(userNotification?.length ?? 0) > 0 && (
                <span className="absolute -top-0 -right-0 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
              {/* <Image
                src={notificationIcon}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              /> */}
            </button>
          )}

          <button
            onClick={toggleMenu}
            className="cursor-pointer p-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} className="text-pink-500" />
            ) : (
              // <Image
              //   src={menu}
              //   alt=""
              //   width={20}
              //   height={20}
              //   className="w-[20px] h-[20px]"
              // />
              <></>
            )}
          </button>
        </div>

        <nav
          className={`flex flex-col gap-3 max-xl:absolute max-xl:top-[70px] max-xl:gap-4 max-xl:left-0 max-xl:w-full max-xl:h-[calc(100vh-70px)] max-xl:pt-[30px] max-xl:pb-[90px] max-xl:bg-white dark:max-xl:bg-neutral-900 max-xl:items-center max-xl:shadow-lg max-xl:transition-transform max-xl:duration-300 max-xl:ease-in-out max-xl:overflow-y-auto max-xl:justify-between ${
            isMenuOpen
              ? "max-xl:translate-x-0"
              : "max-xl:-translate-x-full max-xl:pointer-events-none"
          }`}
          aria-label="Main Navigation"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <ul className="flex flex-col gap-3 w-full items-center xl:items-start px-3">
            {(aside_links as AsideLinkData[]).map((item) => {
              const isHome = item.href === "";
              const currentPathSegment = afterDashboard
                .split("?")[0]
                .split("/")[0];
              const itemHrefSegment = item.href.split("?")[0].split("/")[0];
              const isActive =
                path === `/dashboard${item.href ? "/" + item.href : ""}` ||
                (!isHome &&
                  item.href !== "" &&
                  currentPathSegment === itemHrefSegment) ||
                (isHome && path === "/dashboard");

              return (
                <li key={item.href} className="w-[90%] xl:w-[88%]">
                  <Link
                    href={`/dashboard/${item.href}`}
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors duration-150 max-xl:justify-center text-sm font-medium ${
                      isActive
                        ? "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                    }`}
                    onClick={() => isMenuOpen && setIsMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* <Image
                      src={isActive ? item.hoverIcon : item.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px]"
                    /> */}
                    <span className="max-md:text-base">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-full flex flex-col items-center gap-3 xl:hidden px-3">
            <div className="w-[90%]">
              <Link
                href={`/dashboard/settings`}
                className={`flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors duration-150 max-xl:justify-center text-sm font-medium ${
                  isSettingsActive
                    ? "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                }`}
                onClick={() => isMenuOpen && setIsMenuOpen(false)}
                aria-current={isSettingsActive ? "page" : undefined}
              >
                {/* <Image
                  src={isSettingsActive ? Psettings : settings}
                  alt=""
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                /> */}
                <span className="max-md:text-base">Paramètres</span>
              </Link>
            </div>

            <div className="w-[90%]">
              <button
                className="flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors duration-150 w-full max-xl:justify-center text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/30"
                onClick={handleLogoutClick}
              >
                {/* <Image
                  src={logout}
                  alt=""
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                /> */}
                <span className="max-md:text-base">Déconnexion</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="relative flex flex-col gap-1 px-3 mb-2 max-xl:hidden">
          <div className="w-[90%] xl:w-[88%]">
            <Link
              href={`/dashboard/settings`}
              className={`flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors duration-150 text-sm font-medium ${
                isSettingsActive
                  ? "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              }`}
              aria-current={isSettingsActive ? "page" : undefined}
            >
              {/* <Image
                src={isSettingsActive ? Psettings : settings}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              /> */}
              <span>Paramètres</span>
            </Link>
          </div>

          <div className="w-[90%] xl:w-[88%]">
            <button
              className="flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors duration-150 w-full text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/30"
              onClick={handleLogoutClick}
            >
              {/* <Image
                src={logout}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              /> */}
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <LogoutConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />

      {isNotificationOpen && (
        <Notification
          onClose={toggleNotification}
          notifications={userNotification || []}
        />
      )}
    </>
  );
};

export default Aside;
