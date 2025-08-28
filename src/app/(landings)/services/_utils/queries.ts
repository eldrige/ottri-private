import { Service } from "@/app/(landings)/services/_utils/types";
import axios from "@/lib/api/axios";

export async function fetchServices() {
  const { data: services } = await axios.get("/services");
  return services as Service[];
}

export async function fetchUniqueService(id: string) {
  const { data: service } = await axios.get(`/services/${id}`);
  return service as Service;
}
