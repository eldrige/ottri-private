"use client";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { Filter, Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import StaffOverviewView from "./_panels/StaffOverviewView";
import JobAssignmentView from "./_panels/JobAssignmentView";
import PerformanceView from "./_panels/PerformanceView";
import { useCleanersQuery } from "../_services/queries";
import AddCleaner from "./_components/AddCleaner";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";
import ErrorComponent from "@/app/_components/ErrorComponent";

const filterOptions = [
  { label: "All Cleaners", value: "all-cleaners" },
  { label: "Archived Cleaners", value: "archive" }
];

export default function StaffJobsPage() {
  const { searchParams, setSearchParam } = useClientSearchParams();
  const isArchive = searchParams.get("archive");
  const cleanersQuery = useCleanersQuery({ archive: !!isArchive });

  const [activeView, setActiveView] = useState<string>("staff-overview");
  const [addCleaner, setAddCleaner] = useState(false);

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Staff & Jobs</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6 lg:mt-0">
        <div className="flex items-center text-sm bg-gray-50 rounded-lg pl-4">
          <Filter className="size-4" />
          <Select
            options={filterOptions}
            value={filterOptions[0]}
            onChange={(option) => {
              if (option.value === "archive") setSearchParam("archive", "true");
              else setSearchParam("archive", "");
            }}
            placeholder="All Cleaners"
            buttonClassName="border-none gap-2 font-medium"
            accent="secondary"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <Button
            onClick={() => setAddCleaner(true)}
            size={"2xs"}
            variant={"secondary"}
            className="flex gap-2 items-center text-base justify-center"
          >
            <PlusIcon className="size-5" /> Add Cleaner
          </Button>
          {addCleaner && <AddCleaner onClose={() => setAddCleaner(false)} />}
        </div>
      </div>

      <hr className="my-4 text-black/10 lg:hidden" />

      <PanelViewer
        views={[
          { viewName: "staff-overview", content: "Staff Overview" },
          { viewName: "job-assignment", content: "Job Assignment" },
          { viewName: "performance", content: "Performance" }
        ]}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="mt-8">
        {cleanersQuery.isLoading ? (
          <Loader2 className="animate-spin size-6 mx-auto" />
        ) : cleanersQuery.isError ? (
          <ErrorComponent
            error={cleanersQuery.error}
            reset={cleanersQuery.refetch}
          />
        ) : !cleanersQuery.data ? null : activeView === "staff-overview" ? (
          <StaffOverviewView cleaners={cleanersQuery.data} />
        ) : activeView === "job-assignment" ? (
          <JobAssignmentView />
        ) : activeView === "performance" ? (
          <PerformanceView />
        ) : (
          <>Not Found</>
        )}
      </div>
    </main>
  );
}
