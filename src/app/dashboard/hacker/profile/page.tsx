import { User } from "lucide-react";
import ProfileForm from "@/components/Dashboard/hacker/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User size={24} className="text-purple-400" />
        <h1 className="text-2xl font-bold text-slate-200">Profile Settings</h1>
        <span className="inline-block w-24 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
      </div>

      <p className="text-slate-300 mb-8">
        Manage your hacker identity and personal information in the secure
        environment.
      </p>

      <ProfileForm />
    </div>
  );
}
