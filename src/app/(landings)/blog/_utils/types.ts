export interface Article {
  id: number;
  isFeatured: boolean;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  readingTime: number;
  publicationDate: string;
  tags: string[];
  publisherId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: "published" | "scheduled" | "draft";
}
