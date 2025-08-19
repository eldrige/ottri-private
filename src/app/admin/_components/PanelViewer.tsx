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
    <div className="w-full mt-8 py-2 px-3 flex lg:gap-4 rounded-4xl bg-surface-50">
      {views.map((view) => (
        <button
          key={view.viewName}
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all ${
            activeView === view.viewName
              ? "bg-white px-4"
              : "px-2 text-secondary-700/70"
          }`}
          onClick={() => setActiveView(view.viewName)}
        >
          {view.content}
        </button>
      ))}
    </div>
  );
}
