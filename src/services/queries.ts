import { JobPositionType } from "@/app/admin/types";
import { clientAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getJobPositions() {
  const { data } = await clientAxios.get<JobPositionType[]>("careers");
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
      clientAxios.get<JobPositionType>(`careers/${id}`).then((i) => i.data)
  });
}
