/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { ServiceArea } from "../../types";

export async function deleteServiceArea({
  serviceAreaId
}: {
  serviceAreaId: number;
}) {
  console.log({ serviceAreaId });
  try {
    await serverRequest(`service-areas/${serviceAreaId}`, "DELETE");
    return serviceAreaId;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function createServiceArea({
  newServiceArea
}: {
  newServiceArea: Pick<
    ServiceArea,
    "location" | "name" | "popular" | "nickName"
  >;
}) {
  console.log({ newServiceArea });
  try {
    const serviceArea = await serverRequest(`service-areas`, "POST");
    return serviceArea.data as ServiceArea;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
