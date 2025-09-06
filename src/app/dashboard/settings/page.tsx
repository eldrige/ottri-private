import React from "react";
import SettingsSection1 from "./_components/SettingsSection1";
import SettingsSection2 from "./_components/SettingsSection2";
import SettingsSection3 from "./_components/SettingsSection3";

export default function SettingsPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <SettingsSection1 />
      <SettingsSection2 />
      <SettingsSection3 />
    </div>
  );
}
