import axios from "@/lib/axios";
import { Article } from "@/lib/types";

export async function getPublishedArticles() {
  const response = await axios.get("/articles/published");
  return response.data as Article[];
}
