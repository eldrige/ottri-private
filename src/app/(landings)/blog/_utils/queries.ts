import { axiosInstance } from "@/lib/axios";
import { Article } from "./types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getPublishedArticles() {
  try {
    const response = await axiosInstance.get(`/articles`);
    return response.data as Article[];
  } catch (err) {
    console.error("Error fetching published articles", err);
    return [];
  }
}

export function useGetArticleQuery() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      axios.get(`/api/articles`).then((i) => {
        return i.data;
      }) as Promise<Article[]>
  });
}

export async function getArticleById(id: string) {
  const response = await axiosInstance.get(`/articles/${id}`);
  return response.data as Article;
}
