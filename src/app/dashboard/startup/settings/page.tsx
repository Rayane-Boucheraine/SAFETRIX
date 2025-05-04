"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Building,
  UserCircle,
  Shield,
  Lock,
  CreditCard,
  Key,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function StartupSettingsPage() {
  const mainGradient =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";
  const themeAccentText = "text-purple-400";

  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    {
      name: "User Profile",
      slug: "Profile",
      icon: UserCircle,
      component: <StaticProfileView />,
    },
    {
      name: "Organization",
      slug: "Organization",
      icon: Building,
      component: <OrganizationSettingsForm />,
    },
    {
      name: "Security",
      slug: "Security",
      icon: Shield,
      component: <SecuritySettings />,
    },
    {
      name: "Notifications",
      slug: "Notifications",
      icon: Mail,
      component: <NotificationsSettings />,
    },
    {
      name: "API & Integrations",
      slug: "API",
      icon: Key,
      component: <APISettings />,
    },
    {
      name: "Billing",
      slug: "Billing",
      icon: CreditCard,
      component: <BillingSettings />,
    },
  ];

  return (
    <div className={`min-h-full p-6 md:p-8 text-slate-200 ${mainGradient}`}>
      <div className="mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-purple-900/40 pb-6 relative isolate">
          <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-gradient-to-br from-black/20 via-transparent to-transparent rounded-full blur-2xl opacity-60"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-purple-800/30 shadow-lg">
              <SettingsIcon
                size={28}
                className={`${themeAccentText} drop-shadow-md`}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                Platform Settings
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Configure your user profile, organization, security, and
                billing.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <nav className="space-y-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`group flex w-full items-center rounded-md py-2 px-3 text-sm font-medium border border-transparent transition-all duration-150 ${
                    activeTab === tab.slug
                      ? "bg-slate-800/70 border-purple-700/40 text-purple-300 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                  }`}
                >
                  <tab.icon
                    size={18}
                    className={`mr-3 flex-shrink-0 ${
                      activeTab === tab.slug
                        ? "text-purple-400"
                        : "text-slate-500 group-hover:text-purple-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Tab Content Area */}
          <div className="lg:col-span-9">
            <div className="min-h-[500px] bg-slate-900/40 backdrop-blur-sm border border-slate-700/40 rounded-lg shadow-inner p-6 animate-fadeIn">
              {tabs.find((tab) => tab.slug === activeTab)?.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== STATIC PROFILE VIEW =====
const StaticProfileView = () => {
  const userData = {
    fullName: "Jane Doe",
    email: "jane.doe@startup.com",
    role: "Admin",
    joined: "March 2021",
    lastLogin: "Today at 9:15 AM",
    avatar: "/avatar.png",
  };

  return (
    <SectionWrapper title="User Profile">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-600 shadow-md mb-4">
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-slate-100">
            {userData.fullName}
          </h3>
          <p className="text-xs text-slate-400">{userData.role}</p>
        </div>
        <div className="md:w-2/3 space-y-4">
          <StaticInput label="Full Name" value={userData.fullName} />
          <StaticInput label="Email Address" value={userData.email} />
          <StaticInput label="Role" value={userData.role} />
          <StaticInput label="Joined On" value={userData.joined} />
          <StaticInput label="Last Login" value={userData.lastLogin} />
        </div>
      </div>
    </SectionWrapper>
  );
};

// ===== READ-ONLY INPUT FIELD =====
const StaticInput = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>
      <div className="bg-slate-800/50 border border-slate-700 rounded-md py-2 px-3 text-slate-200 text-sm shadow-sm select-none">
        {value}
      </div>
    </div>
  );
};

// ===== SECTION WRAPPER =====
const SectionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700/70">
        {title}
      </h2>
      {children}
    </div>
  );
};

// ===== PLACEHOLDER COMPONENTS =====

const OrganizationSettingsForm = () => (
  <SectionWrapper title="Organization Profile">
    <StaticInput label="Organization Name" value="CyberCore Systems" />
    <StaticInput label="Primary Website" value="https://core.cyb" />
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        Logo
      </label>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <span className="text-sm text-slate-400">No logo uploaded yet</span>
      </div>
    </div>
  </SectionWrapper>
);

const SecuritySettings = () => (
  <SectionWrapper title="Security Parameters">
    <div className="space-y-4">
      <SecuritySettingItem
        icon={Lock}
        title="Password Policy"
        description="Current policy: Minimum 12 characters, 1 uppercase, 1 special character."
        buttonText="View Policy"
      />
      <SecuritySettingItem
        icon={ShieldCheck}
        title="Two-Factor Authentication (2FA)"
        description="Enabled for all users since Jan 2024."
        buttonText="Configure 2FA"
      />
      <SecuritySettingItem
        icon={Users}
        title="Session Management"
        description="Max session length: 8 hours | Max concurrent sessions: 3"
        buttonText="Configure Sessions"
      />
    </div>
  </SectionWrapper>
);

const BillingSettings = () => (
  <SectionWrapper title="Billing & Subscription">
    <div className="text-sm">
      <p className="mb-3">
        Current Plan:{" "}
        <span className="font-semibold text-purple-300">
          Enterprise Security Suite
        </span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/50 p-4 rounded border border-slate-700/50">
        <p>
          Payment Method: <span className="text-slate-100">VISA **** 4242</span>
        </p>
        <p>
          Next Invoice: <span className="text-slate-100">Dec 1, 2023</span>
        </p>
        <p>
          Seats Used: <span className="text-slate-100">15 / 20</span>
        </p>
        <p>
          Billing Cycle: <span className="text-slate-100">Monthly</span>
        </p>
      </div>
      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-700/50">
        <button className="text-xs border border-slate-600 text-slate-300 px-3 py-1 rounded hover:bg-slate-700">
          View Invoices
        </button>
        <button className="text-xs bg-purple-700/50 border border-purple-600/50 text-purple-200 px-3 py-1 rounded hover:bg-purple-600/50">
          Manage Subscription
        </button>
      </div>
    </div>
  </SectionWrapper>
);

const NotificationsSettings = () => (
  <SectionWrapper title="Notification Preferences">
    <div className="space-y-4 text-sm max-w-xl">
      <p className="text-slate-400">
        You are currently receiving notifications via:
      </p>
      <StaticInput label="Email" value="jane.doe@startup.com" />
      <StaticInput label="Preferred Language" value="English (en)" />
      <StaticInput label="Timezone" value="UTC+2 (Europe/Berlin)" />
    </div>
  </SectionWrapper>
);

const APISettings = () => (
  <SectionWrapper title="API Keys & Integrations">
    <p className="text-sm text-slate-400 mb-4">
      No API keys have been generated yet.
    </p>
    <button className="text-sm text-purple-400 hover:text-purple-300 border border-purple-700/50 bg-purple-900/30 px-3 py-1 rounded transition-colors">
      Generate New API Key
    </button>
  </SectionWrapper>
);

// ===== REUSABLE COMPONENTS =====

const SecuritySettingItem = ({
  title,
  description,
  icon: Icon,
  buttonText,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  buttonText: string;
}) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-lg p-4 shadow-md flex items-start gap-4 transition-all hover:border-slate-600/80">
    <div className="mt-1 p-2 bg-slate-700/60 border border-slate-600 rounded-md text-purple-400 flex-shrink-0">
      <Icon size={20} />
    </div>
    <div className="flex-grow">
      <h4 className="font-semibold text-slate-100 text-base">{title}</h4>
      <p className="text-xs text-slate-400 mt-1 mb-3">{description}</p>
      <Link
        href="#"
        className="text-xs text-purple-300 border border-purple-700 bg-purple-900/40 hover:bg-purple-800/50 px-3 py-1 rounded inline-block transition-colors font-medium"
      >
        {buttonText}
      </Link>
    </div>
  </div>
);
