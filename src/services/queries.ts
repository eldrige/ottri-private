import { JobPositionType } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useJobPositionQuery() {
  return useQuery({
    queryKey: ["job-position"],
    queryFn: () =>
      axiosInstance.get<JobPositionType>("careers/1").then((i) => i.data)
  });
}
