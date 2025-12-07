"use client";
import { clientAxios } from "@/lib/axios";

export const uploadDocument = async (doc: File) => {
  const formData = new FormData();
  formData.set("tag", "other");
  formData.set("file", doc);
  const res = await clientAxios.post("system/upload", formData);
  return { data: res.data as { url: string; filename: string } };
};
