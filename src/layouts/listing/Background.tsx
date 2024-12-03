import React from "react";
import bg375 from "./img/bg/375.png";
import bg768 from "./img/bg/768.png";
import bg1024 from "./img/bg/1024.png";
import bg1440 from "./img/bg/1440.png";

interface BackgroundProps {}
const Background: React.FC<BackgroundProps> = (props) => {
  return (
    <div className="absolute top-0 left-0 mix-blend-screen object-cover">
      <picture>
        <source srcSet={bg1440.src} media="(min-width: 1440px)" />
        <source srcSet={bg1024.src} media="(min-width: 1024px)" />
        <source srcSet={bg768.src} media="(min-width: 768px)" />
        <source srcSet={bg375.src} media="(min-width: 375px)" />

        <img src={bg1024.src} alt="listing header background" />
      </picture>
    </div>
  );
};

export default Background;
