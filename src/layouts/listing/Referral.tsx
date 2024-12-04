import { type FC, type PropsWithChildren } from "react";
import Title from "./Title";
import { cn } from "@/utils";
import referralBonus from "./img/referral_bonus.png";

const Referral: FC = () => {
  const titleCls = "isting-text-gradient text-[20px] lg:text-[24px]";
  const contentCls = cn(
    "text-primary-80 mt-[12px]",
    "text-[14px] leading-[21px]"
  );

  const operatorCls = cn(
    "flex items-center justify-center",
    "text-[30px] leading-[30px] ",
    "md:text-[44px] md:leading-[44px]"
  );

  return (
    <div>
      <Title>
        Referral Bonus Program
        <div
          className={cn(
            "mt-[12px] text-primary-54",
            "text-[12px] md:text-[16px] lg:text-[20px]"
          )}
        >
          Earn Rewards for Every Successful Referral on Orderly
        </div>
      </Title>

      <div
        className={cn("flex flex-col md:flex-row items-stretch", "gap-[20px]")}
      >
        <div className={cn("flex flex-1 flex-col", "gap-[12px]")}>
          <Block className="h-full">
            <div className={titleCls}>Fixed Bonus</div>
            <div className={contentCls}>
              Receive $2,000 for every successful referral.
            </div>
          </Block>
          <div className={cn(operatorCls)}>+</div>
          <Block className="h-full">
            <div className={titleCls}>Variable Bonus</div>
            <div className={contentCls}>
              Receive 30% of the project’s marketing budget as a referral bonus
              (up to a maximum of $10,000).
            </div>
            <div className={cn(contentCls, "text-primary-54")}>
              *ALL of the marketing budget provided by the project will be
              distributed to users.
            </div>
          </Block>
        </div>

        <div className={cn(operatorCls, "w-full md:w-[24px]")}>=</div>

        <div className="flex flex-1 justify-center">
          <Block
            className={cn(
              "flex flex-col items-center justify-center text-center",
              "[background:linear-gradient(180deg,rgba(27,0,44,0.1728)0%,rgba(139,15,216,0.54)100%)]"
            )}
          >
            <img
              src={referralBonus.src}
              alt="Total Referral Bonus"
              className={cn(
                "mx-auto",
                "w-[120px] h-[120px]",
                "lg:w-[160px] lg:h-[160px]"
              )}
            />
            <div className={cn(titleCls, "mt-[12px]")}>
              Total Referral Bonus
            </div>
            <div
              className={cn(
                contentCls,
                "mt-[12px] text-primary-54 md:px-[28px] lg:px-[50px] xl:px-[65px]"
              )}
            >
              Example: If a project allocates $10,000 for its marketing budget,
              the referrer can earn $2,000 (Fixed) plus $3,000 (Variable).
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
};

type BlockProps = PropsWithChildren<{ className?: string }>;
const Block: React.FC<BlockProps> = (props) => {
  return (
    <div
      className={cn(
        "rounded-[12px] px-[20px] py-[40px]",
        "border border-primary-20",
        "[background:linear-gradient(341.71deg,rgba(255,255,255,0.08)_3.76%,rgba(255,255,255,0)_53.22%)]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Referral;
