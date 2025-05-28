"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import ProfileSettings from "@/components/Dashboard/startup/settings/ProfileSettings";

export default function SettingsPage() {
  const gradientBg =
    "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#195033_6.63%,#080808_100%)]";

  return (
    <div className={`min-h-full p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-emerald-800/30 to-slate-900 rounded-xl border border-emerald-600/60 shadow-lg">
            <SettingsIcon size={24} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-200">
              Startup Profile Management
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Manage your startup profile and company information
            </p>
          </div>
        </div>
        <div className="bg-slate-900/70 backdrop-blur-md border border-green-900/30 shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center border-b border-slate-700/50">
            <div className="px-6 py-4 text-sm font-medium text-emerald-400 relative">
              Profile Settings
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></span>
            </div>
          </div>

          <div className="p-6">
            <ProfileSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
