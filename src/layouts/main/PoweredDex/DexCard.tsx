import React from "react";
import { cn } from "@/utils";

interface LogoProps {
  src: string;
  alt: string;
  isHovered?: boolean;
}

const logoGradientBorderStyles = {
  background: 'linear-gradient(89.97deg, rgba(255, 255, 255, 0.36) 0.03%, rgba(255, 255, 255, 0.072) 61%, rgba(255, 255, 255, 0.216) 99.97%)',
  padding: '1px'
};

const Logo: React.FC<LogoProps> = ({ src, alt, isHovered = false }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "rounded-[60px]",
        /** 375 */
        "w-[32px] h-[32px]",
        /** 768 */
        "md:w-[64px] md:h-[64px]",
        "flex-shrink-0"
      )}
      style={logoGradientBorderStyles}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "rounded-[60px]",
          "w-full h-full",
          "transition-colors ease-in-out duration-200"
        )}
        style={{
          backgroundColor: isHovered ? '#1B2028' : '#000000'
        }}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "object-contain",
            /** 375 */
            "w-[20px] h-[20px]",
            /** 768 */
            "md:w-[36px] md:h-[36px]"
          )}
        />
      </div>
    </div>
  );
};

interface DexCardProps {
  name: string;
  src: string;
  url?: string;
  className?: string;
}

// TODO: the border ark should be as wide as the other border
const gradientBorderStyles = {
  background: 'linear-gradient(148.71deg, rgba(255, 255, 255, 0.3) -5.6%, rgba(255, 255, 255, 0.1) 54.71%, rgba(255, 255, 255, 0.3) 109.05%)',
  padding: '1.2px',
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "exclude",
};

const gradientBorderHoverStyles = {
  background: 'linear-gradient(168.24deg, #7000FF 0.21%, #300F59 57.71%, #D4BFFF 101.58%)',
  padding: '1.2px',
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "exclude",
  zIndex: 5,
};

const containerHoverStyles = {
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), radial-gradient(114.23% 155.23% at 50% 120.86%, #644DC5 0%, rgba(0, 0, 0, 0) 60.62%)'
};

const DexCard: React.FC<DexCardProps> = ({ name, src, url }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={cn(
        "relative group",
        /** 375 */
        "w-[calc(50%-8px)] h-[64px]",
        /** 768 */
        "md:w-[calc(50%-12px)] md:h-[104px]",
        /** 1024 */
        "lg:w-[calc(33.333%-16px)] lg:h-[104px]",
        /** 1440 */
        "xl:w-[300px] xl:h-[104px]",
 
        url ? "cursor-pointer" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={gradientBorderStyles}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity ease-out duration-200"
        style={{ ...gradientBorderHoverStyles, opacity: isHovered ? 1 : 0 }}
      />
      <div
        className={cn(
          "relative flex items-center justify-center w-full h-full",
          "rounded-2xl",
          "transition-all ease-in-out duration-200",
          /** 375 */
          "p-3",
          /** 768 */
          "md:p-4",
          /** 1024 */
          "lg:p-5",
          /** 1440 */
          "xl:p-6"
        )}
        style={{ backgroundColor: '#0000004D' }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity ease-in-out duration-200"
          style={{ ...containerHoverStyles, opacity: isHovered ? 1 : 0 }}
        />
        <div className="relative flex items-center gap-[8px] md:gap-[20px]">
          <Logo src={src} alt={name} isHovered={isHovered} />
          <span
            className={cn(
              "text-primary font-display font-semibold",
              /** 375 */
              "text-xs leading-[12px]",
              /** 768 */
              "md:text-2xl md:leading-[24px]"
            )}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DexCard;
