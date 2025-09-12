import { axiosInstance } from "@/lib/axios";
import { Article } from "./types";

export async function getPublishedArticles() {
  const response = await axiosInstance.get("/articles/published");
  return response.data as Article[];
}

export async function getArticleById(id: string) {
  const response = await axiosInstance.get(`/articles/${id}`);
  return response.data as Article;
}
