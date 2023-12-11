import React, { useState } from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import LinkIcon from "@/icons/LinkIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import FacebookIcon from "@/icons/FacebookIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import DiscordIcon from "@/icons/DiscordIcon";
import MediumIcon from "@/icons/MediumIcon";
import { Hyperlink } from "@/utils/constant";
import { copyContent } from "@/utils";

const Footer: React.FC<PropsWithClassName> = (props) => {
  const [copy, setCopy] = useState(false);
  const [hover, setHover] = useState(false);

  async function onLink() {
    try {
      await copyContent(window.location.href);
      setCopy(true);
    } catch (err) {}
  }

  return (
    <div
      className={cn(
        "border-[1px] border-solid border-primary-20 rounded-[16px] ",
        /** 375 */
        "hidden",
        /** 768 */
        "md:block md:mt-[40px]",
        /** 1024 */
        "lg:mt-[45px]",
        /** 1440 */
        "xl:mt-[80.5px]",
        props.className
      )}
    >
      <div className="flex justify-between py-[32px]">
        <div
          className={cn(
            "flex flex-1 flex-col items-center",
            "border-r-[1px] border-r-[solid border-r-primary-20"
          )}
        >
          <div className="text-xl leading-[27.32px]">Share this</div>
          <div className="flex justify-between items-center text-primary-50 mt-[12px] cursor-pointer">
            <LinkIcon
              className={cn(
                " transition-[color] duration-300",
                hover && copy ? "text-[#24AD8F]" : "text-primary-50"
              )}
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setCopy(false);
                setHover(false);
              }}
              onClick={onLink}
            />
            {/* <TwitterIcon size={24} />
            <FacebookIcon />
            <LinkedinIcon size={24} /> */}
          </div>
        </div>

        <div className="flex flex-1  flex-col items-center">
          <div className="text-xl leading-[27.32px]">
            Join the Orderly community
          </div>
          <div className="w-[168px] flex justify-between items-center text-primary-50 mt-[12px]">
            <a href={Hyperlink.Community.Discord}>
              <DiscordIcon size={24} />
            </a>
            <a href={Hyperlink.Community.Twitter}>
              <TwitterIcon size={24} />
            </a>
            <a href={Hyperlink.Community.Medium}>
              <MediumIcon size={24} />
            </a>
            <a href={Hyperlink.Community.Linkedin}>
              <LinkedinIcon size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
