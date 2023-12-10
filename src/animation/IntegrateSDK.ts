import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const { orderBookTop, orderEntryTop } = getTops();

main();

function main() {
  gsapMedia();
}

function gsapMedia() {
  // https://gsap.com/docs/v3/GSAP/gsap.matchMedia()
  const mm = gsap.matchMedia();
  const breakPoint = 768;

  mm.add(
    {
      // set up any number of conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
      isMobile: `(max-width: ${
        breakPoint - 1
      }px) and (prefers-reduced-motion: no-preference)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions as any;
      initPosition(isMobile);
      // const tl = gsap.timeline();
      // tl.add([firstTimeline(isMobile), timeline(isMobile)]);
      quarterTimeline(isMobile);
      restTimeline(isMobile);
    }
  );
}

function restTimeline(isMobile: boolean) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#IntegrateSDK",
      scrub: 1,
      // 距离顶部 20% 的时候开始触发动画
      start: "top 15%",
      // 距离开始位置滚动 2000px 才停止
      end: "+=2000",
      // markers: true,
      pin: true,
      fastScrollEnd: true,
    },
    ease: "power1.out",
    // ease: "linear",
  });

  tl.to("#IntegrateSDKBg", { y: 0, opacity: 1, duration: 2 })
    .to(
      "#IntegrateSDKText",
      isMobile
        ? { x: 0, opacity: 1, duration: 2 }
        : { y: 0, opacity: 1, duration: 2 },
      "<"
    )

    .to(
      "#IntegrateSDKOrderBook",
      { top: orderBookTop, opacity: 1, duration: 2 },
      "<"
    )
    .to(
      "#IntegrateSDKOrderEntry",
      {
        top: orderEntryTop,
        opacity: 1,
        duration: 2,
      },
      "<25%"
    )
    // 背景覆盖
    .to(
      "#IntegrateSDKImage2",
      {
        clipPath: "polygon(-20% -20%, 120% 0%, 135% 135%, -20% 120%)",
        duration: 2,
      },
      "+=0.5"
    )
    .to(
      "#IntegrateSDKText",
      isMobile
        ? { x: -200, opacity: 0, duration: 1 }
        : { y: -200, opacity: 0, duration: 1 },
      "<"
    )

    .to(
      "#IntegrateSDKText2",
      isMobile
        ? { x: 0, opacity: 1, duration: 1 }
        : { top: 0, opacity: 1, duration: 1 },
      "<"
    )
    .to("#IntegrateSDKText2", { duration: 0.5 });
  return tl;
}

// 走完整个动画的四分之一
function quarterTimeline(isMobile: boolean) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#IntegrateSDK",
      scrub: 1,
      start: "top 100%",
      end: "top 15%",
      // markers: true,
    },
    // ease: "power1.out",
    ease: "linear",
  });

  tl.to("#IntegrateSDKBg", {
    y: -75, // [-100, 0]
    opacity: 0.25,
    duration: 2,
  })
    .to(
      "#IntegrateSDKText",
      isMobile
        ? {
            x: 75, // [100, 0]
            opacity: 0.25,
            duration: 2,
          }
        : {
            y: 75, // [100, 0]
            opacity: 0.25,
            duration: 2,
          },
      "<"
    )
    .to(
      "#IntegrateSDKOrderBook",
      {
        top: -250 - (-250 - orderBookTop) / 2, // [-200, orderBookTop(-50)]  -200-((-200-(-50))/4)
        opacity: 0.25,
        duration: 2,
      },
      "<25%"
    );
  // .to(
  //   "#IntegrateSDKOrderEntry",
  //   {
  //     top: -150 - (-150 - orderEntryTop) / 4, // [-150, orderEntryTop(-22)]
  //     opacity: 0.25,
  //   },
  //   "<25%"
  // );
  return tl;
}

/** 设置动画的初始位置 */
function initPosition(isMobile: boolean) {
  gsap.set("#IntegrateSDKBg", { opacity: 0, y: -100 });
  gsap.set(
    "#IntegrateSDKText",
    isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 100 }
  );
  gsap.set("#IntegrateSDKOrderBook", { opacity: 0, top: -250 });
  gsap.set("#IntegrateSDKOrderEntry", { opacity: 0, top: -150 });

  gsap.set(
    "#IntegrateSDKText2",
    isMobile ? { opacity: 0, x: 100 } : { opacity: 0, bottom: -100 }
  );
  gsap.set("#IntegrateSDKImage2", {
    clipPath: "polygon(120% -20%, 120% 0%, 135% 135%, 120% 120%)",
  });
}

function getNumber(value: string) {
  return Number(value.replace("px", ""));
}

/** 在动画开始之前，获取元素的位置，这样就不需要根据不同分辨率设置不同的值 */
function getTops() {
  const IntegrateSDKOrderBook = document.getElementById(
    "IntegrateSDKOrderBook"
  );
  const IntegrateSDKOrderEntry = document.getElementById(
    "IntegrateSDKOrderEntry"
  );
  const orderBookTop = getNumber(
    window.getComputedStyle(IntegrateSDKOrderBook!)?.top || "0"
  );
  const orderEntryTop = getNumber(
    window.getComputedStyle(IntegrateSDKOrderEntry!)?.top || "0"
  );

  return { orderBookTop, orderEntryTop };
}

// function getTl1(orderBookTop: number, orderEntryTop: number) {
//   const tl1 = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#IntegrateSDK",
//       scrub: 1.5,
//       start: "top 20%",
//       // 距离开始 2000px 距离才停止
//       end: "+=2000",
//       markers: true,
//       pin: true,
//     },
//     ease: "power1.out",
//   });

//   tl1
//     .to("#IntegrateSDKBg", { y: 0, opacity: 1, duration: 100 })
//     .to(
//       "#IntegrateSDKText",
//       screenWidth < Screen.md
//         ? { x: 0, opacity: 1, duration: 100 }
//         : { y: 0, opacity: 1, duration: 100 },
//       "<"
//     )

//     .to(
//       "#IntegrateSDKOrderBook",
//       { top: orderBookTop, opacity: 1, duration: 200 },
//       "<25%"
//     )
//     .to(
//       "#IntegrateSDKOrderEntry",
//       {
//         top: orderEntryTop,
//         opacity: 1,
//         duration: 200,
//       },
//       "<25%"
//     );
//   return tl1;
// }

// function getTl2() {
//   const tl2 = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#IntegrateSDK",
//       scrub: 1.5,
//       // pin: true,
//       // start: "top 20%",
//       start: (self: any) => self.previous().end,
//       end: "top 5%",
//       // invalidateOnRefresh: true,
//       // markers: true,
//     },
//     ease: "power1.out",
//   });

//   tl2
//     .to("#IntegrateSDKImage2", {
//       clipPath: "polygon(-20% -15%, 120% 0%, 135% 135%, -20% 120%)",
//     })
//     .to(
//       "#IntegrateSDKText",
//       screenWidth < Screen.md
//         ? { x: -200, opacity: 0 }
//         : { y: -200, opacity: 0 },
//       "<"
//     )

//     .to(
//       "#IntegrateSDKText2",
//       screenWidth < Screen.md ? { x: 0, opacity: 1 } : { top: 0, opacity: 1 },
//       "<"
//     );

//   return tl2;
// }

// animateBg();
// animateOrderBook(orderBookTop);
// animateOrderEntry(orderEntryTop);
// animateText();
// animateSDKImage2();

// const commonTrigger = {
//   trigger: "#IntegrateSDK",
//   scrub: 1.5,
//   // ease: "power1.out",
//   // pin: true,
// };

// function animateBg() {
//   gsap.set("#IntegrateSDKBg", { opacity: 0, y: -100 });
//   gsap.to("#IntegrateSDKBg", {
//     scrollTrigger: {
//       ...commonTrigger,
//       start: "top 60%",
//       end: "top 30%",
//       ...commonTrigger,
//       // markers: {
//       //   startColor: "red",
//       //   endColor: "red",
//       // },
//     },
//     y: 0,
//     opacity: 1,
//     // duration: 1.5,
//     // ease: "power1.out",
//   });
// }

// function animateOrderBook(orderBookTop: string | number) {
//   gsap.set("#IntegrateSDKOrderBook", { opacity: 0, top: -200 });
//   gsap.to("#IntegrateSDKOrderBook", {
//     scrollTrigger: {
//       ...commonTrigger,
//       start: "top 55%",
//       end: "top 40%",
//       // markers: {
//       //   startColor: "green",
//       //   endColor: "green",
//       //   indent: 150,
//       // },
//     },
//     top: orderBookTop,
//     opacity: 1,
//   });
// }

// function animateOrderEntry(orderEntryTop: string | number) {
//   gsap.set("#IntegrateSDKOrderEntry", { opacity: 0, top: -150 });
//   gsap.to("#IntegrateSDKOrderEntry", {
//     scrollTrigger: {
//       ...commonTrigger,
//       start: "top 50%",
//       end: "top 30%",
//       // pin: true,
//       // markers: {
//       //   startColor: "white",
//       //   endColor: "white",
//       //   indent: 300,
//       // },
//     },
//     top: orderEntryTop,
//     opacity: 1,
//   });
// }

// function animateText() {
//   gsap.set("#IntegrateSDKText", { opacity: 0, y: -100 });
//   gsap.to("#IntegrateSDKText", {
//     scrollTrigger: {
//       ...commonTrigger,
//       start: "top 60%",
//       end: "top 35%",
//     },
//     y: 0,
//     opacity: 1,
//   });
// }

// function animateSDKImage2() {
//   gsap.set("#IntegrateSDKImage2", {
//     clipPath: "polygon(120% -20%, 100% -20%, 100% 120%, 120% 120%)",
//   });

//   gsap.to("#IntegrateSDKImage2", {
//     // scrollTrigger: {
//     //   ...commonTrigger,
//     //   start: "top 50%",
//     //   end: "top 40%",
//     // },
//     duration: 1,
//     ease: "linear",
//     clipPath: "polygon(0% -20%, 120% -20%, 120% 120%, -20% 100%)",
//   });
// }
