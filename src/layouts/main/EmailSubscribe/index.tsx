import React, { useState } from "react";
import Button from "@/components/Button";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const EmailSubscribe: React.FC<PropsWithClassName> = (props) => {
  const [value, setValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubscribe = () => {
    // 值为空、email 格式错误、已订阅时
    if (!value || !validateEmail(value) || subscribed) {
      console.log("invalid email");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={cn("text-center", props.className)}>
      <div
        className={cn(
          /** 375 */
          "font-title font-bold text-[22px] leading-[26px]",
          /** 768 */
          "md:text-4xl md:leading-[48px]",
          /** 1024 */
          "lg:text-[48px] lg:leading-[57px]",
          /** 1440 */
          "xl:text-6xl xl:leading-[76px]"
        )}
      >
        Stay updated with Orderly
      </div>

      <div
        className={cn(
          "flex justify-center",
          /** 375 */
          "mt-[16px]",
          /** 1440 */
          "xl:mt-[24px]"
        )}
      >
        <input
          value={value}
          onChange={(e) => {
            console.log("onChange", e.target.value);
            setValue(e.target.value);
          }}
          placeholder="Your email"
          className={cn(
            "h-[32px] md:h-[40px] w-[180px] md:w-[240px] px-[16px]",
            "backdrop-blur-[20px]",
            "bg-[rgba(209,150,255,0.12)]",
            "border border-[rgba(209,150,255,0.12)] border-r-0",
            "rounded-l-full",
            "outline-none",
            "text-[13px] lg:text-sm text-primary placeholder:text-[rgba(255,255,255,0.16)]"
          )}
        />
        <Button
          className={cn(
            "text-[13px] lg:text-sm",
            "min-w-[97px] lg:min-w-[118px]",
            "h-[32px] md:h-[40px] lg:h-[40px]",
            "px-[16px] md:px-[12px]",
            "rounded-l-none",
            subscribed &&
              "[background:linear-gradient(347.34deg,#1DF6B5_2.55%,#86ED92_88.55%)]"
          )}
          loading={loading}
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default EmailSubscribe;
