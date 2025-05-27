import React from "react";
import {  CreditCard, Key, Save } from "lucide-react";
import {
  SettingsSection,
  Button,
} from "./FormComponents";

const AdditionalSettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Additional settings submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SettingsSection
        title="API & Integrations"
        description="Manage API keys and integrations with third-party services"
      >
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <div className="flex items-start gap-3">
              <Key size={20} className="text-emerald-400 flex-shrink-0 mt-1" />
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-slate-200 mb-1">
                  API Access
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Generate API keys to integrate with your applications and
                  services
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" type="button">
                    Generate API Key
                  </Button>
                  <Button variant="secondary" size="sm" type="button">
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-medium text-slate-200 mb-3">
              Active Integrations
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-300">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Slack</p>
                    <p className="text-xs text-slate-400">
                      Sends notifications to #security channel
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" type="button">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-300">J</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Jira</p>
                    <p className="text-xs text-slate-400">
                      Creates tickets for reported vulnerabilities
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" type="button">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Language & Region">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Language
            </label>
            <select className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent shadow-sm">
              <option value="en">English (US)</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Timezone
            </label>
            <select className="w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent shadow-sm">
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
              <option value="CET">CET (Central European Time)</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Billing & Subscription">
        <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50">
          <div className="flex items-start gap-3">
            <CreditCard
              size={20}
              className="text-emerald-400 flex-shrink-0 mt-1"
            />
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-slate-200 mb-1">
                Current Plan
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                You are currently on the{" "}
                <span className="text-emerald-400 font-medium">
                  Enterprise Security Suite
                </span>{" "}
                plan
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Billing Cycle:</span>
                  <span className="text-slate-200">Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Invoice:</span>
                  <span className="text-slate-200">Dec 1, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Method:</span>
                  <span className="text-slate-200">VISA **** 4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seats Used:</span>
                  <span className="text-slate-200">15 / 20</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-700/50">
                <Button variant="secondary" size="sm" type="button">
                  View Invoices
                </Button>
                <Button variant="primary" size="sm" type="button">
                  Manage Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          <Save size={16} className="mr-2" />
          Save All Settings
        </Button>
      </div>
    </form>
  );
};

export default AdditionalSettings;
