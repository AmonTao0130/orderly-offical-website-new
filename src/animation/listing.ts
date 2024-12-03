import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 视差动画
gsap.to(".listing-coin-layout-3", {
  y: -400,
  // ease: "power1.inOut",
  ease: "none",
  scrollTrigger: {
    trigger: "#listing-page",
    endTrigger: "#listing-criteria",
    start: "top top",
    end: "+100px top",
    scrub: 0.5,
    markers: true,
  },
});

gsap.to(".listing-coin-layout-2", {
  y: -600,
  ease: "none",
  scrollTrigger: {
    trigger: "#listing-page",
    endTrigger: "#listing-criteria",
    start: "top top",
    end: "+100px top",
    scrub: 0.5,
    markers: true,
  },
});

gsap.to(".listing-coin-layout-1", {
  y: -900,
  ease: "none",
  scrollTrigger: {
    trigger: "#listing-page",
    endTrigger: "#listing-criteria",
    start: "top top",
    end: "+100px top",
    scrub: 0.5,
    markers: true,
  },
});

gsap.to("#listing-header", {
  y: 250,
  ease: "none",
  //ease: "power1.inOut",
  scrollTrigger: {
    trigger: "#listing-page",
    endTrigger: "#listing-criteria",
    start: "top top",
    end: "+100px top",
    // scrub: 0.5,
    scrub: true,
    markers: true,
  },
});

// gsap.to(".listing-coin-layout-2", {
//   y: -600,
//   ease: "power1.inOut",
//   scrollTrigger: {
//     trigger: "#listing-page",
//     start: "top top",
//     // end: "bottom top",
//     end: "25% top",
//     scrub: true,
//     markers: true,
//   },
// });

// gsap.to(".listing-coin-layout-1", {
//   y: -600,
//   ease: "power1.inOut",
//   scrollTrigger: {
//     trigger: "#listing-page",
//     start: "top top",
//     // end: "bottom top",
//     end: "25% top",
//     scrub: true,
//     markers: true,
//   },
// });
