"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../api/services";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices
  });
}
