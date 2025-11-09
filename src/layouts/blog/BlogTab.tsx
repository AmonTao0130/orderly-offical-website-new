import React, { useMemo } from "react";
import type { PropsWithClassName } from "@/types";
import Tab, { type TabData } from "@/components/Tab";
import { cn } from "@/utils";
import { blogExpandKey } from "@/store";
import { useStore } from "@nanostores/react";

// const titles = [
//   "All",
//   "Product updates",
//   "Educational",
//   "Announcements",
//   "Guides",
//   "Research",
// ];
interface BlogTabProps {
  data: TabData[];
}

const BlogTab: React.FC<BlogTabProps & PropsWithClassName> = (props) => {
  const expandKey = useStore(blogExpandKey) || "All";

  const tabs = useMemo(() => {
    return [{ title: "All", key: "All" }, ...props.data];
  }, []);

  return (
    <div id="blogTab" className="overflow-hidden">
      <Tab
        className={cn(
          /** 375 */
          "mt-[20px]",
          /** 768 */
          "md:mt-[40px]",
          /** 1024 */
          "lg:justify-center"
        )}
        data={tabs}
        expandKey={expandKey}
        onExpand={(key: string) => {
          blogExpandKey.set(key);
        }}
      />
    </div>
  );
};

export default BlogTab;
