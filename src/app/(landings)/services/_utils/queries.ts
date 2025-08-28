import { Service, serviceType } from "@/app/(landings)/services/_utils/types";
import axios from "@/lib/api/axios";

export async function getServices() {
  const { data: services } = await axios.get("/services");
  return services as Service[];
}

export async function getUniqueService(id: string) {
  const { data: service } = await axios.get(`/services/${id}`);
  return service as Service;
}

export async function getServiceAddOns() {
  const { data: servicesAddOns } = await axios.get("/service-addons");
  return servicesAddOns as serviceType[];
}
