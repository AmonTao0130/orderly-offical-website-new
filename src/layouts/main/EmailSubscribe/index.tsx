import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import axios from "axios";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const EmailSubscribe: React.FC<PropsWithClassName> = (props) => {
  const [value, setValue] = useState("");
  const [subscribed, setSubscribed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 清空输入框时取消订阅状态
  useEffect(() => {
    if (!value) {
      setSubscribed(false);
    }
    setErrorMsg("");
  }, [value]);

  const onSubscribe = () => {
    // email 格式错误
    if (!value || !validateEmail(value)) {
      console.log("invalid email");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    axios
      .post("/api/subscribe", {
        // "jame@orderly.network"
        email: value,
      })
      .then((res) => {
        setSubscribed(true);
      })
      .catch((err) => {
        setErrorMsg("Something went wrong, please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={cn(props.className)}>
      <div
        className={cn(
          "text-center",
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

      <div className="flex justify-center">
        <div>
          <div
            className={cn(
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
                "text-[13px] lg:text-sm text-primary placeholder:text-[rgba(255,255,255,0.16)]",
                errorMsg && "border-[rgba(255,99,144,1)]"
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
                  "[background:linear-gradient(347.34deg,#1DF6B5_2.55%,#86ED92_88.55%)] hover:![background:linear-gradient(347.34deg,#1DF6B5_2.55%,#86ED92_88.55%)] cursor-default",
                errorMsg &&
                  "[background:rgba(255,99,144,1)] hover:[background:rgba(255,99,144,1)] text-primary-36 cursor-default"
              )}
              loading={loading}
              onClick={subscribed ? undefined : onSubscribe}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
          {errorMsg && (
            <div
              className={cn(
                "flex items-center gap-x-1 mt-[4px]",
                "text-left text-[rgba(255,99,144,1)]"
              )}
            >
              <div className="w-[6px] h-[6px] rounded-full bg-[rgba(255,99,144,1)]"></div>
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSubscribe;
