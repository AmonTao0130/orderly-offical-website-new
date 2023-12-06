import React, { useEffect, useState } from "react";
import type { PropsWithClassName } from "@/types";
import Tab, { type TabData } from "@/components/Tab";
import { cn } from "@/utils";
import { blogExpandKey } from "@/store";
import { useStore } from "@nanostores/react";
import { getCategories } from "@/strapi/services";

// const titles = [
//   "All",
//   "Product updates",
//   "Educational",
//   "Announcements",
//   "Guides",
//   "Research",
// ];

// const tabData = titles.map((title) => ({ title, key: title }));

interface BlogTabProps {
  data: TabData[];
}

const BlogTab: React.FC<BlogTabProps & PropsWithClassName> = (props) => {
  const expandKey = useStore(blogExpandKey) || "All";
  // const [tabData, setTabData] = useState<TabData[]>([]);

  // const getData = async () => {
  //   const categories = await getCategories();
  //   const list = categories
  //     .map((category) => {
  //       const { name, slug } = category.attributes;
  //       return {
  //         title: name,
  //         key: slug,
  //       };
  //     })
  //     .filter((item) => !!item.key);
  //   setTabData([{ title: "All", key: "All" }, ...list]);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

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
        data={props.data}
        expandKey={expandKey}
        onExpand={(key: string) => {
          blogExpandKey.set(key);
        }}
      />
    </div>
  );
};

export default BlogTab;
