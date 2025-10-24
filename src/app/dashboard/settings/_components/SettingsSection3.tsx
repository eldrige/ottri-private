"use client";
import { Button } from "@/components/ui/Button";
import { GlobeIcon, IdCard, LogOut } from "lucide-react";
import React, { useState } from "react";
import { useGetUserProfile } from "../../_services/queries";
import {
  useLogoutMutation,
  useUpdateSettingMutation
} from "../../_services/mutations";
import Select from "@/components/ui/Select";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function SettingsSection3() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <LanguageSettings />
      <AccountActions />
    </section>
  );
}

function LanguageSettings() {
  const { data: userData } = useGetUserProfile();
  const { mutateAsync: updateSettings, isPending: isUpdating } =
    useUpdateSettingMutation();

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    userData?.settings.language || "en"
  );
  const [currentTimeZone, setCurrentTimeZone] = useState<string>(
    userData?.settings.timezone || "UTC"
  );
  const [currentCurrency, setCurrentCurrency] = useState<string>(
    userData?.settings.currency || "USD"
  );

  // toggles - update immediately when toggled

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" }
  ];
  const timeZonesOptions = [
    { value: "UTC", label: "Universal Time (UTC)" },
    { value: "EST", label: "Eastern Time (EST)" },
    { value: "CST", label: "Central Time (CST)" },
    { value: "PST", label: "Pacific Time (PST)" }
  ];
  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" }
  ];
  if (!userData) return null;
  const settings = userData?.settings;

  const handleSave = async () => {
    try {
      await updateSettings({
        language: currentLanguage,
        timezone: currentTimeZone,
        currency: currentCurrency,
        userId: String(userData.id)
      });
      // server will refetch user profile via onSuccess in mutation
    } catch (err) {
      console.error("Save settings failed", err);
    }
  };

  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2">
          <GlobeIcon className="size-6 text-secondary-700" />
          <h3 className="font-medium text-lg/0 text-secondary-700">
            Preferences
          </h3>
        </div>
        <p className="text-caption text-secondary-800  font-normal text-wrap">
          Customize your app experience
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col items-center gap-6 justify-between">
          <label className="w-full">
            <h3 className="text-secondary-700 text-caption font-medium">
              Language
            </h3>
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-2 py-2 rounded-lg">
              <Select
                className="flex w-full"
                options={languageOptions}
                value={
                  settings.language
                    ? languageOptions.find((i) => i.value === currentLanguage)
                    : languageOptions[0]
                }
                onChange={(option) => {
                  setCurrentLanguage(option.value);
                }}
                placeholder="Select Language"
                buttonClassName="border-none w-full gap-2"
                accent="secondary"
              />
            </div>
          </label>
          <label className="w-full text-caption">
            <h3 className="text-secondary-700 text-caption font-medium">
              Time Zone
            </h3>
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-2 py-2 rounded-lg">
              <Select
                className="flex w-full"
                options={timeZonesOptions}
                value={
                  settings.timezone
                    ? timeZonesOptions.find((i) => i.value === currentTimeZone)
                    : timeZonesOptions[0]
                }
                onChange={(option) => {
                  setCurrentTimeZone(option.value);
                }}
                placeholder="Select Timezone"
                buttonClassName="border-none w-full gap-2"
                accent="secondary"
              />
            </div>
          </label>
          <label className="w-full">
            <h3 className="text-secondary-700 text-caption font-medium">
              Currency
            </h3>
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-2 py-2 rounded-lg">
              <Select
                className="flex w-full"
                options={currencyOptions}
                value={
                  settings.currency
                    ? currencyOptions.find((i) => i.value === currentCurrency)
                    : currencyOptions[0]
                }
                onChange={(option) => {
                  setCurrentCurrency(option.value);
                }}
                placeholder="Select Currency"
                buttonClassName="border-none w-full gap-2"
                accent="secondary"
              />
            </div>
          </label>

          <div className="w-full flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              size="xs"
              variant={"secondary"}
              className=" text-[14px] text-white"
            >
              {isUpdating ? "Saving..." : "Save settings"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountActions() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogoutMutation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    // TODO: Implement delete account mutation
    console.log("Delete account");
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col text-lg font-semibold">
      <div>
        <div className="flex items-center gap-2">
          <IdCard className="size-8 stroke-1 rounded-full text-secondary-700" />
          <h3 className="font-medium text-lg/0 text-secondary-700">
            Account Actions
          </h3>
        </div>
        <p className="text-caption text-secondary-800  font-normal text-wrap">
          Manage your account
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Button
          onClick={() => setShowLogoutModal(true)}
          disabled={isLoggingOut}
          variant="outline"
          size={"xs"}
          className=" w-full flex items-center py-2 px-4 gap-3 text-secondary-700"
        >
          <LogOut className="size-5" />
          <p className="text-caption">Sign Out</p>
        </Button>
        <Button
          onClick={() => setShowDeleteModal(true)}
          size={"xs"}
          variant="destructive"
          className=" w-full flex items-center justify-center py-2 px-4 gap-3"
        >
          <p className="text-caption">Delete Account</p>
        </Button>
      </div>
      {showLogoutModal && (
        <ConfirmModal
          open={showLogoutModal}
          title="Confirm Sign Out"
          description="Are you sure you want to sign out of your account?"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          loading={isLoggingOut}
          confirmText="Sign Out"
          accent="distructive"
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          open={showDeleteModal}
          title="Delete Account"
          description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          loading={false}
          confirmText="Delete"
          accent="distructive"
        />
      )}
    </div>
  );
}
