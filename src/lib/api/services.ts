import { Service } from "@/app/(landings)/services/_utils/types";
import axios from "./axios";

export async function fetchServices() {
  const { data: services } = await axios.get("/services");
  return services as Service[];
}
