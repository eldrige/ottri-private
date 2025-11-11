import React from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";

interface PanelViewerProps {
  views: {
    viewName: string;
    content: React.ReactNode | string;
  }[];
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function PanelViewer({
  views,
  activeView,
  setActiveView
}: PanelViewerProps) {
  const activeIndex = views.findIndex((view) => view.viewName === activeView);

  return (
    <div className="w-full mt-8 py-2 px-3 rounded-4xl bg-surface-50 overflow-x-hidden">
      <TabGroup
        selectedIndex={activeIndex}
        onChange={(index) => setActiveView(views[index].viewName)}
      >
        <TabList className="flex gap-2 lg:gap-4 w-full">
          {views.map((view) => (
            <Tab
              key={view.viewName}
              className={({ selected, focus }) =>
                `flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all focus:outline-none ${
                  selected ? "bg-white px-4" : "px-2 text-secondary-700/70"
                } ${focus ? "ring-2 ring-blue-500 ring-offset-2" : ""}`
              }
              onClick={(e) => {
                (e.target as HTMLElement).scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center"
                });
              }}
            >
              {view.content}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
