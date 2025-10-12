/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverRequest } from "@/lib/serverRequest";

export const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.set("tag", "image");
    formData.set("file", image);
    const res = await serverRequest("system/upload", "POST", formData);
    return { data: res.data as { url: string; filename: string } };
  } catch (err: any) {
    return { error: err.response.data.message };
  }
};
