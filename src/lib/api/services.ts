import { Service } from "../types";
import api from "./axios";

export async function fetchServices() {
  const { data } = (await api.get("/services")) as { data: Service[] };
  return data;
}
