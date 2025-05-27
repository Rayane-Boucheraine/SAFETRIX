import React from "react";
import { Shield, Key, Save } from "lucide-react";
import {
  FormField,
  CheckboxField,
  SettingsSection,
  Button,
} from "./FormComponents";

const SecuritySettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Security settings submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SettingsSection title="Password Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
          />
          <div className="md:col-span-1"></div>
          <FormField
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <FormField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>

        <div className="mt-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-start gap-2">
            <Shield
              size={18}
              className="text-emerald-400 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm text-slate-300">
              <p className="mb-2">
                Password must meet the following requirements:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                <li>At least 12 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
                <li>Not be the same as your previous 5 passwords</li>
              </ul>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      >
        <CheckboxField
          id="enable-2fa"
          label="Enable Two-Factor Authentication"
          description="Require a verification code in addition to your password when signing in"
          defaultChecked={false}
        />

        <div className="mt-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-start gap-3">
            <Key size={20} className="text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-slate-200 mb-1">
                Recovery Keys
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Recovery keys allow you to access your account if you lose your
                two-factor authentication device.
              </p>
              <Button variant="secondary" size="sm" type="button">
                Generate Recovery Keys
              </Button>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Session Management">
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Active Sessions
              </p>
              <p className="text-xs text-slate-400">
                Current session: San Francisco, CA (Chrome on macOS)
              </p>
            </div>
            <Button variant="danger" size="sm" type="button">
              End All Other Sessions
            </Button>
          </div>

          <CheckboxField
            id="session-auto-logout"
            label="Auto Logout"
            description="Automatically log out after 8 hours of inactivity"
            defaultChecked={true}
          />
        </div>
      </SettingsSection>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          <Save size={16} className="mr-2" />
          Save Security Settings
        </Button>
      </div>
    </form>
  );
};

export default SecuritySettings;
