import React from "react";
import DiscordIcon from "@/icons/DiscordIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import MediumIcon from "@/icons/MediumIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";

const icons = [
  {
    icon: DiscordIcon,
    url: "https://discord.com/invite/orderlynetwork",
  },
  {
    icon: TwitterIcon,
    url: "https://twitter.com/OrderlyNetwork",
  },
  {
    icon: MediumIcon,
    url: "https://medium.com/@orderlynetwork",
  },
  {
    icon: LinkedinIcon,
    url: "https://www.linkedin.com/company/orderly-network",
  },
];

const Bottom: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        "flex justify-between pt-[20px] pb-[30px]",
        props.className
      )}
    >
      <div className="text-sm text-[#8C8C8C]">© 2023 Orderly Network.</div>
      <div className="flex items-center">
        {icons.map((icon) => {
          const Icon = icon.icon;
          return (
            <a
              className="text-primary-54 hover:text-primary-100 pl-[16px]"
              href={icon.url}
              key={icon.url}
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Bottom;
