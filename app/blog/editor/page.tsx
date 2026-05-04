import type { Metadata } from "next";
import BlogPreview from "@/app/pages/BlogPreview";

export const metadata: Metadata = {
  title: "Blog Editor | Orderly Network",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <BlogPreview />;
}
