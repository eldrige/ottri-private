import { JobPositionType } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getJobPositions() {
  const { data } = await axiosInstance.get<JobPositionType[]>("careers");
  return data;
}

export function useJobPositionsQuery() {
  return useQuery({
    queryKey: ["job-positions"],
    queryFn: getJobPositions
  });
}
export function useJobPositionQuery({ id = 1 }: { id: number }) {
  return useQuery({
    queryKey: ["job-position", id],
    queryFn: () =>
      axiosInstance.get<JobPositionType>(`careers/${id}`).then((i) => i.data)
  });
}
