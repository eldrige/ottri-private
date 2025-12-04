import { JobPositionType } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useJobPositionsQuery() {
  return useQuery({
    queryKey: ["job-positions"],
    queryFn: () =>
      axiosInstance.get<JobPositionType[]>("careers").then((i) => i.data)
  });
}
export function useJobPositionQuery({ id = 1 }: { id: number }) {
  return useQuery({
    queryKey: ["job-position", id],
    queryFn: () =>
      axiosInstance.get<JobPositionType>(`careers/${id}`).then((i) => i.data)
  });
}
