"use client";
import { Button } from "@/components/ui/Button";
import { GlobeIcon, IdCard, LogOut } from "lucide-react";
import React from "react";
import { useGetUserProfile } from "../../_services/queries";
import { useLogoutMutation } from "../../_services/mutations";
import Select from "@/components/ui/Select";

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
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(
    userData?.settings.language || "en"
  );
  const [currentTimeZone, setCurrentTimeZone] = React.useState<string>(
    userData?.settings.timezone || "UTC"
  );
  const [currentCurrency, setCurrentCurrency] = React.useState<string>(
    userData?.settings.currency || "USD"
  );
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
                buttonClassName="border-none w-full gap-2 font-medium"
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
                placeholder="Select Language"
                buttonClassName="border-none w-full gap-2 font-medium"
                accent="secondary"
              />
            </div>
          </label>
          <label className="w-full">
            <h3 className="text-secondary-700 text-caption font-medium">
              Currency
            </h3>
            {/* <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
              <select className="w-full" name="filter" id="">
                <option value="all">{settings.currency}</option>
                <option value="all">USD ($)</option>
                <option value="today">EUR (€)</option>
                <option value="upcoming">GBP (£)</option>
              </select>
            </div> */}
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
                buttonClassName="border-none w-full gap-2 font-medium"
                accent="secondary"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function AccountActions() {
  const { mutateAsync: logout, isPending } = useLogoutMutation();
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          onClick={handleLogout}
          disabled={isPending}
          variant="outline"
          size={"xs"}
          className=" w-full flex items-center py-2 px-4 gap-3 text-secondary-700"
        >
          <LogOut className="size-5" />
          <p className="text-caption">
            {isPending ? "Signing Out..." : "Sign Out"}
          </p>
        </Button>
        <Button
          size={"xs"}
          className=" w-full flex items-center justify-center hover:border-[#DC3545] hover:text-[#DC3545] bg-[#DC3545] py-2 px-4 gap-3"
        >
          <p className="text-caption">Delete Account</p>
        </Button>
      </div>
    </div>
  );
}
