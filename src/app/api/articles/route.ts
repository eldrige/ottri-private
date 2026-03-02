import { serverRequest } from "@/lib/serverRequest";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await serverRequest("/articles", "GET");
    return NextResponse.json(articles.data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
