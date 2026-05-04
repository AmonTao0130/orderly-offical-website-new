import { NextResponse } from "next/server";
import { getAllPageArticles, PublicationStateEnum } from "@/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = await getAllPageArticles({
    publicationState: PublicationStateEnum.PREVIEW,
  });
  const slugs = articles
    .map((article) => article.attributes.slug)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return NextResponse.json(
    { slugs },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
