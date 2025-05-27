import React from "react";
import { Building, Save } from "lucide-react";
import { FormField, SettingsSection, Button } from "./FormComponents";

const ProfileSettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Profile form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SettingsSection
        title="Company Profile"
        description="Manage your organization's basic information"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-lg border-2 border-slate-700/70 bg-slate-800/50 flex items-center justify-center text-slate-400 overflow-hidden">
              <Building size={40} />
            </div>
            <button
              type="button"
              className="mt-2 text-xs text-emerald-400 hover:text-emerald-300"
            >
              Change Logo
            </button>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Company Name"
              type="text"
              placeholder="Enter company name"
              defaultValue="ACME Security"
              required
            />
            <FormField
              label="Display Name"
              type="text"
              placeholder="Enter display name"
              defaultValue="ACME"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Primary Email Address"
            type="email"
            placeholder="Enter email address"
            defaultValue="security@acme.com"
            required
          />
          <FormField
            label="Contact Phone"
            type="tel"
            placeholder="Enter phone number"
            defaultValue="+1 555-123-4567"
          />
          <FormField
            label="Website"
            type="url"
            placeholder="Enter website URL"
            defaultValue="https://acme.com"
            className="md:col-span-2"
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Company Address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Street Address" placeholder="123 Security Ave" />
          <FormField label="City" placeholder="San Francisco" />
          <FormField label="State/Province" placeholder="California" />
          <FormField label="Postal/ZIP Code" placeholder="94103" />
          <FormField
            label="Country"
            placeholder="United States"
            className="md:col-span-2"
          />
        </div>
      </SettingsSection>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileSettings;
