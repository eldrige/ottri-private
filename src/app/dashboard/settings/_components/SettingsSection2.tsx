import ToggleSwitchOff from "@/components/icons/ToggleSwitchOff";
import ToggleSwitchOn from "@/components/icons/ToggleSwitchOn";
import { BellIcon, Shield } from "lucide-react";
import React from "react";

export default function SettingsSection2() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <NotificationSettings />
      <PrivacySecuritySettings />
    </section>
  );
}

function NotificationSettings() {
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2">
          <BellIcon className="size-6 text-secondary-700" />
          <h2 className="text-secondary-700">Notifications</h2>
        </div>
        <p className="text-secondary-800 text-caption font-normal text-wrap">
          Choose what notifications you want to receive
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-secondary-700">Booking Reminders</h2>
            <p className="text-secondary-800 text-caption font-normal text-wrap">
              Get notified about upcoming appointments
            </p>
          </div>
          <div>
            <ToggleSwitchOff />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-secondary-700">Promotional Emails</h2>
            <p className="text-secondary-800 text-caption font-normal text-wrap">
              Special offers and service updates
            </p>
          </div>
          <div>
            <ToggleSwitchOn />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacySecuritySettings() {
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2">
          <Shield className="size-6 text-secondary-700" />
          <h2 className="text-secondary-700">Privacy & Security</h2>
        </div>
        <p className="text-secondary-800 text-caption font-normal text-wrap">
          Manage your privacy and security setting
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-secondary-700">Two-factor Authentication</h2>
            <p className="text-secondary-800 text-caption font-normal text-wrap">
              Add an extra layer of security to your account
            </p>
          </div>
          <div>
            <ToggleSwitchOn />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-secondary-700">Location Sharing</h2>
            <p className="text-secondary-800 text-caption font-normal text-wrap">
              Allow cleaners to see your location for navigation
            </p>
          </div>
          <div>
            <ToggleSwitchOff />
          </div>
        </div>
      </div>
    </div>
  );
}
