import React from "react";
import DiscordIcon from "@icons/DiscordIcon";
import TwitterIcon from "@icons/TwitterIcon";
import MediumIcon from "@icons/MediumIcon";
import LinkedinIcon from "@icons/LinkedinIcon";

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

interface BottomProps {}
const Bottom: React.FC<BottomProps> = (props) => {
  return (
    <div className="flex justify-between">
      <div className="text-sm text-[#8C8C8C]">© 2023 Orderly Network.</div>
      <div className="flex items-center">
        {icons.map((icon) => {
          const Icon = icon.icon;
          return (
            <a
              className="text-primary-54 pl-[16px]"
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
