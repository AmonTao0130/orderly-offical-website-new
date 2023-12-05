import React from "react";
import type { PropsWithClassName } from "@/types";
import Tab from "@/components/Tab";
import { cn } from "@/utils";
import { blogExpandKey } from "@/store";
import { useStore } from "@nanostores/react";
import Content from "@/components/Content";

const titles = [
  "All",
  "Product updates",
  "Educational",
  "Announcements",
  "Guides",
  "Research",
];

const tabData = titles.map((title) => ({ title, key: title }));

const BlogTab: React.FC<PropsWithClassName> = (props) => {
  const expandKey = useStore(blogExpandKey) || titles[0];

  return (
    <Content id="blogTab" className="overflow-hidden">
      <Tab
        className={cn(
          /** 375 */
          "mt-[20px]",
          /** 768 */
          "md:mt-[40px]",
          /** 1024 */
          "lg:justify-center"
        )}
        data={tabData}
        expandKey={expandKey}
        onExpand={(key) => {
          blogExpandKey.set(key);
        }}
      />
    </Content>
  );
};

export default BlogTab;
