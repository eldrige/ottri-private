import { Service, serviceType } from "@/app/(landings)/services/_utils/types";
import { axiosInstance } from "@/lib/axios";

export async function getServices() {
  const { data: services } = await axiosInstance.get("/services");
  return services as Service[];
}

export async function getUniqueService(id: string) {
  const { data: service } = await axiosInstance.get(`/services/${id}`);
  return service as Service;
}

export async function getServiceAddOns() {
  const { data: servicesAddOns } = await axiosInstance.get("/service-addons");
  return servicesAddOns as serviceType[];
}
