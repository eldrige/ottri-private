import { useQuery } from "@tanstack/react-query";
import { getServices } from "../_utils/queries";

export function useGetServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices
  });
}
