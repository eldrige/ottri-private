"use client";
import { Button } from "@/components/ui/Button";
import { GlobeIcon, IdCard, LogOut } from "lucide-react";
import React from "react";
import { useGetUserProfile } from "../../_services/queries";
import { useLogoutMutation } from "../../_services/mutations";

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
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
              <select className="w-full" name="filter" id="">
                <option value="all">{settings.language}</option>
                <option value="today">Spanish</option>
                <option value="upcoming">French</option>
              </select>
            </div>
          </label>
          <label className="w-full text-caption">
            <h3 className="text-secondary-700 text-caption font-medium">
              Time Zone
            </h3>
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
              <select className="w-full" name="filter" id="">
                <option value="all">{settings.timezone}</option>
                <option value="all">EasternTime (EST)</option>
                <option value="today">CentralTime (CST)</option>
                <option value="upcoming">PacificTime (PST)</option>
              </select>
            </div>
          </label>
          <label className="w-full">
            <h3 className="text-secondary-700 text-caption font-medium">
              Currency
            </h3>
            <div className="flex w-full text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
              <select className="w-full" name="filter" id="">
                <option value="all">{settings.currency}</option>
                <option value="all">USD ($)</option>
                <option value="today">EUR (€)</option>
                <option value="upcoming">GBP (£)</option>
              </select>
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
