import type { Metadata } from "next";
import BlogEditor from "@/app/pages/BlogEditor";

export const metadata: Metadata = {
  title: "Blog Editor | Orderly Network",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <BlogEditor />;
}
