import type { Metadata } from "next";
import Blog from "@/app/pages/Blog";

export const metadata: Metadata = {
  title: "Blog | Orderly Network",
  description:
    "Insights, updates, and deep dives from the Orderly team — announcements, product launches, ecosystem spotlights, and thought leadership on omnichain perp infrastructure.",
  alternates: {
    canonical: "https://orderly.network/blog",
  },
  openGraph: {
    title: "Blog | Orderly Network",
    description:
      "Insights, updates, and deep dives from the Orderly team — announcements, product launches, ecosystem spotlights, and thought leadership on omnichain perp infrastructure.",
    url: "https://orderly.network/blog",
  },
};

export default function Page() {
  return <Blog />;
}
