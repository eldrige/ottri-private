"use client";
import ToggleSwitchOff from "@/components/icons/ToggleSwitchOff";
import ToggleSwitchOn from "@/components/icons/ToggleSwitchOn";
import { BellIcon, Shield } from "lucide-react";
import React, { useState } from "react";
import { useGetUserProfile } from "../../_services/queries";
import { useUpdateSettingMutation } from "../../_services/mutations";

export default function SettingsSection2() {
  const { data: userData } = useGetUserProfile();
  if (!userData) return null;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <NotificationSettings
        bookingReminders={userData.settings.bookingReminder}
        promotionalEmails={userData.settings.promotionalEmails}
        userId={String(userData.id)}
      />
      <PrivacySecuritySettings
        twoFactorAuth={userData.settings.twoFactorAuth}
        locationSharing={userData.settings.shareMyLocation}
        userId={String(userData.id)}
      />
    </section>
  );
}
function NotificationSettings({
  bookingReminders,
  promotionalEmails,
  userId
}: {
  bookingReminders: boolean;
  promotionalEmails: boolean;
  userId: string;
}) {
  const { mutateAsync: updateSettings, isPending: isUpdating } =
    useUpdateSettingMutation();

  const [toggle, setToggle] = useState<{
    bookingReminders: boolean;
    promotionalEmails: boolean;
  }>({
    bookingReminders: bookingReminders ?? false,
    promotionalEmails: promotionalEmails ?? false
  });

  const togglePromotionalEmails = async (value: boolean) => {
    setToggle((prev) => ({ ...prev, promotionalEmails: value }));
    try {
      await updateSettings({
        promotionalEmails: value,
        userId: String(userId)
      });
    } catch (err) {
      console.error("Update email notification failed", err);
    }
  };

  const toggleBookingReminders = async (value: boolean) => {
    setToggle((prev) => ({ ...prev, bookingReminders: value }));
    try {
      await updateSettings({
        bookingReminder: value,
        userId: String(userId)
      });
    } catch (err) {
      console.error("Update sms notification failed", err);
    }
  };

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
            onClick={() => {
              toggleBookingReminders(!toggle.bookingReminders);
            }}
            disabled={isUpdating}
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
            onClick={() => {
              togglePromotionalEmails(!toggle.promotionalEmails);
            }}
            disabled={isUpdating}
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

function PrivacySecuritySettings({
  twoFactorAuth,
  locationSharing,
  userId
}: {
  twoFactorAuth: boolean;
  locationSharing: boolean;
  userId: string;
}) {
  const [toggle, setToggle] = useState({
    twoFactorAuth,
    locationSharing
  });

  const { mutateAsync: updateSettings, isPending: isUpdating } =
    useUpdateSettingMutation();
  const toggleTwoFactorAuth = async (value: boolean) => {
    setToggle((prev) => ({ ...prev, twoFactorAuth: value }));
    try {
      await updateSettings({
        twoFactorAuth: value,
        userId
      });
    } catch (err) {
      console.error("Update two-factor authentication failed", err);
    }
  };

  const toggleLocationSharing = async (value: boolean) => {
    setToggle((prev) => ({ ...prev, locationSharing: value }));
    try {
      await updateSettings({
        shareMyLocation: value,
        userId
      });
    } catch (err) {
      console.error("Update location sharing failed", err);
    }
  };

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
            disabled={isUpdating}
            onClick={() => toggleTwoFactorAuth(!toggle.twoFactorAuth)}
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
            disabled={isUpdating}
            onClick={() => toggleLocationSharing(!toggle.locationSharing)}
          >
            {toggle.locationSharing ? <ToggleSwitchOn /> : <ToggleSwitchOff />}
          </button>
        </div>
      </div>
    </div>
  );
}
