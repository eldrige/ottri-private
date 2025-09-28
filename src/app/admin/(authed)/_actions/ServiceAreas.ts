"use server";
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
    const res = await serverRequest(`service-areas/${serviceAreaId}`, "DELETE");
    return res.data as ServiceArea;
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
  try {
    console.log(newServiceArea);
    const res = await serverRequest(`service-areas`, "POST", {
      ...newServiceArea
    });
    return res.data as ServiceArea;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
