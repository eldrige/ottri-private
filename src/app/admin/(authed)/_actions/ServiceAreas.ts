"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { ServiceArea } from "../../types";

export async function deleteServiceAreas({
  serviceAreaIds
}: {
  serviceAreaIds: number[];
}) {
  console.log({ serviceAreaIds });
  try {
    const res = await Promise.all(
      serviceAreaIds.map((id) => serverRequest(`service-areas/${id}`, "DELETE"))
    );
    return res.map((i) => i.data) as ServiceArea[];
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function createServiceAreas({
  newServiceAreas
}: {
  newServiceAreas: Pick<
    ServiceArea,
    "location" | "name" | "popular" | "nickName"
  >[];
}) {
  try {
    console.log(newServiceAreas);
    const res = await Promise.all(
      newServiceAreas.map((newSA) =>
        serverRequest(`service-areas`, "POST", newSA)
      )
    );
    return res.map((i) => i.data) as ServiceArea[];
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function updateServiceAreas({
  serviceAreasData: serviceAreaData
}: {
  serviceAreasData: Partial<
    Pick<ServiceArea, "id" | "location" | "name" | "popular" | "nickName">
  >[];
}) {
  try {
    const res = await Promise.all(
      serviceAreaData.map(({ id, ...sa }) =>
        serverRequest(`service-areas/${id}`, "PATCH", sa)
      )
    );

    return res.map((i) => i.data) as ServiceArea[];
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
