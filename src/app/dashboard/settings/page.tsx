import React from "react";
import SettingsSection1 from "./_components/SettingsSection1";
import SettingsSection2 from "./_components/SettingsSection2";

export default function SettingsPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <SettingsSection1 />
      <SettingsSection2 />
    </div>
  );
}
