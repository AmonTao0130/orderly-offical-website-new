import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/index";
import ArrowRightTopIcon from "../../icons/ArrowRightTopIcon";

const buttonVariants = cva(
  [
    "inline-flex justify-center items-center text-white font-bold text-sm lg:text-base px-[20px] lg:px-[24px] h-[40px] lg:h-[52px] rounded-full cursor-pointer",
  ],
  {
    variants: {
      type: {
        primary: [
          "[background:linear-gradient(270.23deg,#48BDFF_0.04%,#786CFF_47.76%,#BD00FF_99.64%),rgba(255,255,255,0.98)]",
          "hover:[background:linear-gradient(270.23deg,#B008FF_0.04%,#F041C3_49.84%,#FFB672_99.64%),_rgba(255,255,255,0.98)]",
        ],
        secondary: ["bg-white/[0.08]", "hover:bg-white/[0.3]"],
        outlined: [
          "border-[1px]",
          "border-solid",
          "border-white/[0.8]",
          "hover:bg-white",
          "hover:text-black",
        ],
      },
      // disabled: {
      //   true: ["cursor-not-allowed"],
      // },
    },
    // compoundVariants: [
    //   {
    //     type: "secondary",
    //     disabled: true,
    //     class: ["border-white/[0.04]", "text-white/[0.5]"],
    //   },
    //   {
    //     type: "outlined",
    //     disabled: true,
    //     class: ["border-white/[0.2]", "text-white/[0.5]"],
    //   },
    // ],
    defaultVariants: {
      type: "primary",
      // disabled: false,
    },
  }
);

export interface ButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "onClick" | "disabled"
    >,
    VariantProps<typeof buttonVariants> {
  showArrow?: boolean;
}

const Button: React.FC<ButtonProps & PropsWithChildren> = (props) => {
  const { type, showArrow, disabled, className } = props;

  return (
    <button
      className={cn(
        buttonVariants({ type }),
        disabled &&
          "text-white/[0.5] hover:text-white/[0.5] cursor-not-allowed",
        type === "secondary" &&
          disabled &&
          "border-white/[0.4] hover:bg-white/[0.08] ",
        type === "outlined" &&
          disabled &&
          "border-white/[0.2]  hover:bg-transparent",
        className
      )}
      onClick={props.onClick}
      disabled={disabled!}
    >
      {props.children}
      {showArrow && <ArrowRightTopIcon className="pl-[4px]" />}
    </button>
  );
};

export default React.memo(Button);
