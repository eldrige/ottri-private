import React from "react";
import { Switch } from "@headlessui/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";

export default function ZoneSettingsPanel() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 mt-4">
      <div className="p-6 border rounded-lg shadow border-black/10">
        <h3 className="text-lg font-medium">Global Zone Settings</h3>
        <div className="mt-8 space-y-6">
          {[
            {
              title: "Real-time Restrictions",
              subtitle: "Block bookings outside service areas"
            },
            {
              title: "Override Permissions",
              subtitle: "Allow admin to override restrictions"
            },
            {
              title: "Customer Notifications",
              subtitle: "Notify customers when outside service area"
            },
            {
              title: "Auto-suggest Alternatives",
              subtitle: "Suggest nearby service zones"
            }
          ].map((setting) => (
            <div
              key={setting.title}
              className="flex items-center justify-between gap-1"
            >
              <div className="space-y-2">
                <p className="font-medium">{setting.title}</p>
                <p className="text-sm text-secondary-700/70">
                  {setting.subtitle}
                </p>
              </div>
              <Switch className="group flex h-4.5 w-8 rounded-full bg-[#858A8B4D] p-0.5 data-checked:bg-secondary-700">
                <span
                  aria-hidden="true"
                  className="inline-block transition bg-white rounded-full size-3.5 group-data-checked:translate-x-3.5"
                />
              </Switch>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border rounded-lg shadow border-black/10">
        <h3 className="text-lg font-medium">Zone Management</h3>
        <div className="mt-8">
          <p className="font-medium">Add ZIP Code to Zone</p>
          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Enter Zipcode"
                className="px-4 py-2 text-sm"
              />
            </div>
            <Select
              placeholder="Select Zone"
              className="flex-1 text-sm text-nowrap"
              buttonClassName="py-2 border-transparent"
              options={[]}
            />
            <Button size={"2xs"} variant={"secondary"}>
              Add
            </Button>
          </div>
          <div className="mt-6">
            <p className="font-medium">Default Restrictions</p>
            <div className="mt-4 space-y-3">
              <Input
                label="Maximum Distance"
                value={15}
                className="px-4 py-2 text-sm"
                labelClassName="text-secondary-700/70"
              />
              <Input
                label="Maximum Distance"
                value={15}
                className="px-4 py-2 text-sm"
                labelClassName="text-secondary-700/70"
              />
            </div>
          </div>
          <Button size={"2xs"} variant={"secondary"} className="w-full mt-6">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
