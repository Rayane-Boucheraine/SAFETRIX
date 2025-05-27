import React from "react";
import { Bell,  Save } from "lucide-react";
import { CheckboxField, SettingsSection, Button } from "./FormComponents";

const NotificationSettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Notification settings submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SettingsSection
        title="Email Notifications"
        description="Configure which email notifications you want to receive"
      >
        <div className="space-y-3">
          <CheckboxField
            id="email-new-reports"
            label="New Reports"
            description="Receive notifications when new vulnerability reports are submitted"
            defaultChecked={true}
          />
          <CheckboxField
            id="email-status-changes"
            label="Status Changes"
            description="Receive notifications when report statuses are updated"
            defaultChecked={true}
          />
          <CheckboxField
            id="email-critical-alerts"
            label="Critical Vulnerability Alerts"
            description="Immediate notifications for critical severity reports"
            defaultChecked={true}
          />
          <CheckboxField
            id="email-weekly-digest"
            label="Weekly Activity Digest"
            description="Get a summary of all activity from the past week"
            defaultChecked={true}
          />
          <CheckboxField
            id="email-monthly-reports"
            label="Monthly Reports"
            description="Receive detailed monthly reports about your security program"
            defaultChecked={false}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="In-App Notifications"
        description="Configure which notifications appear in the platform dashboard"
      >
        <div className="space-y-3">
          <CheckboxField
            id="app-new-reports"
            label="New Reports"
            description="Show notifications when new reports are submitted"
            defaultChecked={true}
          />
          <CheckboxField
            id="app-researcher-messages"
            label="Researcher Messages"
            description="Show notifications for new messages from researchers"
            defaultChecked={true}
          />
          <CheckboxField
            id="app-system-updates"
            label="System Updates"
            description="Show notifications about platform updates and maintenance"
            defaultChecked={false}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Team Notifications"
        description="Configure how your team members receive notifications"
      >
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-3 text-sm text-slate-300 mb-4">
            <Bell size={18} className="text-emerald-400" />
            <p>
              Team notification settings can be managed in the
              <a
                href="#"
                className="text-emerald-400 hover:text-emerald-300 mx-1"
              >
                Team Settings
              </a>
              section
            </p>
          </div>
        </div>
      </SettingsSection>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          <Save size={16} className="mr-2" />
          Save Preferences
        </Button>
      </div>
    </form>
  );
};

export default NotificationSettings;
