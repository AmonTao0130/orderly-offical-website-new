import React from "react";
import type { PropsWithClassName } from "@/types";
import Tab from "@/components/Tab";
import { cn } from "@/utils";
import { ecosystemTabExpandKey } from "@/store";
import { useStore } from "@nanostores/react";

const titles = ["All", "Builder", "Product", "Ecosystem"];

const tabData = titles.map((title) => ({ title, key: title }));

const EcosystemTab: React.FC<PropsWithClassName> = (props) => {
  const expandKey = useStore(ecosystemTabExpandKey) || "All";
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
    <div className="overflow-hidden">
      <Tab
        className={cn(
          "justify-center",
          /** 375 */
          "mt-[14px]",
          /** 768 */
          "md:mt-[46px]",
          /** 1024 */
          "lg:mt-[42px]",
          /** 1440 */
          "xl:mt-[40px]"
        )}
        data={tabData}
        expandKey={expandKey}
        onExpand={(key: string) => {
          ecosystemTabExpandKey.set(key);
        }}
      />
    </div>
  );
};

export default EcosystemTab;
