import React from "react";
import DiscordIcon from "@/icons/DiscordIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import MediumIcon from "@/icons/MediumIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";
import TelegramIcon from "@/icons/TelegramIcon";

const icons = [
  {
    icon: DiscordIcon,
    url: Hyperlink.Community.Discord,
  },
  {
    icon: TelegramIcon,
    url: Hyperlink.Community.Telegram,
    target: "_blank",
  },
  {
    icon: TwitterIcon,
    url: Hyperlink.Community.Twitter,
  },
  {
    icon: MediumIcon,
    url: Hyperlink.Community.Medium,
  },
  {
    icon: LinkedinIcon,
    url: Hyperlink.Community.Linkedin,
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
      <div className="text-sm text-[#8C8C8C]">© 2024 Orderly Network.</div>
      <div className="flex items-center">
        {icons.map((icon) => {
          const Icon = icon.icon;
          return (
            <a
              className="text-primary-54 hover:text-primary-100 pl-[16px]"
              href={icon.url}
              target={icon.target}
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
