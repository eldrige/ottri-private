"use client";
import { clientAxios } from "@/lib/axios";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.set("tag", "image");
  formData.set("file", image);
  const res = await clientAxios.post("system/upload", formData);
  console.log({ res });
  return { data: res.data as { url: string; filename: string } };
};
