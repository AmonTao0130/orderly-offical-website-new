import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onGsapMedia } from "./onGsapMedia";
gsap.registerPlugin(ScrollTrigger);

main();

function main() {
  onGsapMedia(({ isDesktop }) => {
    console.log("onGsapMedia", isDesktop);
    isDesktop && start();
  });
}

function start() {
  const scrollDistance = 700;

  const scrollTrigger = {
    trigger: ".listing-page",
    // endTrigger: "#listing-criteria",
    // start: "-100px top",
    start: "top top",
    end: `+${scrollDistance}px top`,
    // end: "top top",
    scrub: 0.5,
    // markers: true,
  };

  const ease = "power1.inOut";

  const common = {
    // scale: 0.5,
    // opacity: 0,
    ease,
    scrollTrigger,
  };

  // 视差动画
  gsap.to(".listing-coin-layout-3", {
    y: -scrollDistance * 0.8,
    ...common,
  });

  [0.9, 1, 1.1, 0.9, 0.925, 0.95, 1.2].forEach((scale, index) => {
    gsap.to(`.listing-coin-${index + 1}`, {
      y: -scrollDistance * scale,
      ...common,
    });
  });

  [-90, -30, 15, -60, 30, 15, -30].forEach((deg, index) => {
    gsap.to(`.listing-coin-${index + 1}`, {
      rotateZ: deg,
      ...common,
    });
  });
}
