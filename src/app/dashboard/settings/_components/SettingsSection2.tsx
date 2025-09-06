"use client";
import ToggleSwitchOff from "@/components/icons/ToggleSwitchOff";
import ToggleSwitchOn from "@/components/icons/ToggleSwitchOn";
import { BellIcon, Shield } from "lucide-react";
import React, { useState } from "react";

export default function SettingsSection2() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <NotificationSettings />
      <PrivacySecuritySettings />
    </section>
  );
}

function NotificationSettings() {
  const [toggle, setToggle] = useState<{
    bookingReminders: boolean;
    promotionalEmails: boolean;
  }>({
    bookingReminders: false,
    promotionalEmails: true
  });
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2 pb-1">
          <BellIcon className="size-6 text-secondary-700" />
          <h3 className="font-medium text-lg/0 text-secondary-700">
            Notifications
          </h3>
        </div>
        <p className="text-caption text-secondary-800 font-normal text-wrap">
          Choose what notifications you want to receive
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-body font-medium text-secondary-700">
              Booking Reminders
            </h3>
            <p className="text-caption text-secondary-800 font-normal text-wrap">
              Get notified about upcoming appointments
            </p>
          </div>
          <button
            className="cursor-pointer transform transition-all ease-in-out duration-200"
            onClick={() =>
              setToggle({
                ...toggle,
                bookingReminders: !toggle.bookingReminders
              })
            }
          >
            {toggle.bookingReminders ? <ToggleSwitchOn /> : <ToggleSwitchOff />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-body font-medium text-secondary-700">
              Promotional Emails
            </h3>
            <p className="text-caption text-secondary-800 font-normal text-wrap">
              Special offers and service updates
            </p>
          </div>
          <button
            className="cursor-pointer transform transition-all ease-in-out duration-200"
            onClick={() =>
              setToggle({
                ...toggle,
                promotionalEmails: !toggle.promotionalEmails
              })
            }
          >
            {toggle.promotionalEmails ? (
              <ToggleSwitchOn />
            ) : (
              <ToggleSwitchOff />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacySecuritySettings() {
  const [toggle, setToggle] = useState({
    twoFactorAuth: false,
    locationSharing: false
  });
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2 pb-1">
          <Shield className="size-6 text-secondary-700" />
          <h3 className="font-medium text-lg/0 text-secondary-700">
            Privacy & Security
          </h3>
        </div>
        <p className="text-secondary-800 text-caption font-normal text-wrap">
          Manage your privacy and security setting
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-body font-medium text-secondary-700">
              Two-factor Authentication
            </h3>
            <p className="text-caption text-secondary-800  font-normal text-wrap">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            className="cursor-pointer transform transition-all ease-in-out duration-200"
            onClick={() =>
              setToggle({
                ...toggle,
                twoFactorAuth: !toggle.twoFactorAuth
              })
            }
          >
            {toggle.twoFactorAuth ? <ToggleSwitchOn /> : <ToggleSwitchOff />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-body font-medium text-secondary-700">
              Location Sharing
            </h3>
            <p className="text-caption text-secondary-800  font-normal text-wrap">
              Allow cleaners to see your location for navigation
            </p>
          </div>
          <button
            className="cursor-pointer transform transition-all ease-in-out duration-200"
            onClick={() =>
              setToggle({
                ...toggle,
                locationSharing: !toggle.locationSharing
              })
            }
          >
            {toggle.locationSharing ? <ToggleSwitchOn /> : <ToggleSwitchOff />}
          </button>
        </div>
      </div>
    </div>
  );
}
