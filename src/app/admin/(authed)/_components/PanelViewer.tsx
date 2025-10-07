import React from "react";

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
  return (
    <div className="w-full mt-8 py-2 px-3 flex gap-2 lg:gap-4 rounded-4xl bg-surface-50 overflow-x-hidden">
      {views.map((view) => (
        <button
          key={view.viewName}
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all ${
            activeView === view.viewName
              ? "bg-white px-4"
              : "px-2 text-secondary-700/70"
          }`}
          onClick={(e) => {
            setActiveView(view.viewName);
            (e.target as HTMLElement).scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center"
            });
          }}
        >
          {view.content}
        </button>
      ))}
    </div>
  );
}
