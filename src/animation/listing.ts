import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scrollTrigger = {
  trigger: ".listing-page",
  endTrigger: "#listing-criteria",
  start: "-200px top",
  // start: "top top",
  // end: "+200px top",
  // end: "top top",
  scrub: 0.5,
  markers: true,
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
  y: -1000,
  ...common,
});

gsap.to(".listing-coin-layout-2", {
  y: -1300,
  ...common,
});

gsap.to(".listing-coin-layout-1", {
  y: -1200,
  ...common,
});

gsap.to(".listing-coin-1", {
  rotateZ: -90,
  ...common,
});

gsap.to(".listing-coin-2", {
  rotateZ: -30,
  ...common,
});

gsap.to(".listing-coin-3", {
  rotateZ: 15,
  ...common,
});

gsap.to(".listing-coin-4", {
  rotateZ: -60,
  ...common,
});

gsap.to(".listing-coin-5", {
  rotateZ: 30,
  ...common,
});

gsap.to(".listing-coin-6", {
  rotateZ: 15,
  ...common,
});

gsap.to(".listing-coin-7", {
  rotateZ: -30,
  ...common,
});
