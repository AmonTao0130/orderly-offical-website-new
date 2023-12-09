import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Screen } from "@/utils/constant";
gsap.registerPlugin(ScrollTrigger);

const screenWidth = window.innerWidth;

main();

function timeline(orderBookTop: number, orderEntryTop: number) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#IntegrateSDK",
      scrub: 1,
      start: "top 20%",
      // 距离开始位置滚动 2000px 才停止
      end: "+=2000",
      markers: true,
      pin: true,
      fastScrollEnd: true,
    },
    ease: "power1.out",
  });

  tl.to("#IntegrateSDKBg", { y: 0, opacity: 1, duration: 2 })
    .to(
      "#IntegrateSDKText",
      screenWidth < Screen.md
        ? { x: 0, opacity: 1, duration: 2 }
        : { y: 0, opacity: 1, duration: 2 },
      "<"
    )

    .to(
      "#IntegrateSDKOrderBook",
      { top: orderBookTop, opacity: 1, duration: 2 },
      "<25%"
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
      screenWidth < Screen.md
        ? { x: -200, opacity: 0, duration: 1 }
        : { y: -200, opacity: 0, duration: 1 },
      "<"
    )

    .to(
      "#IntegrateSDKText2",
      screenWidth < Screen.md
        ? { x: 0, opacity: 1, duration: 1 }
        : { top: 0, opacity: 1, duration: 1 },
      "<"
    )
    .to("#IntegrateSDKText2", { duration: 0.5 });
}

function main() {
  const { orderBookTop, orderEntryTop } = getTops();
  console.log("orderBookTop", orderBookTop);

  initPosition();
  timeline(orderBookTop, orderEntryTop);

  // TODO：在滚到 IntegrateSDK的位置刷新时，布局不会居中
  // const tl = gsap.timeline();
  // tl.add([getTl1(orderBookTop, orderEntryTop), getTl2()]);

  // tl.add(getTl1(orderBookTop, orderEntryTop));
  // tl.add(getTl2());

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#IntegrateSDK",
  //     scrub: 1,
  //     // pin: true,
  //     start: "top center",
  //     end: "bottom top",
  //     markers: true,
  //   },
  //   ease: "power1.out",
  //   paused: true,
  // });

  // tl.to("#IntegrateSDKBg", { y: 0, opacity: 1 });
  // tl.to("#IntegrateSDKText", { y: 0, opacity: 1 }, "<");

  // tl.to("#IntegrateSDKOrderBook", { top: orderBookTop, opacity: 1 }, "<25%");
  // tl.to("#IntegrateSDKOrderEntry", { top: orderEntryTop, opacity: 1 }, "<25%");
  // tl.to("#IntegrateSDKImage2", {
  //   clipPath: "polygon(-20% -15%, 120% 0%, 120% 120%, -20% 120%)",
  //   scrollTrigger: {
  //     pin: true,
  //   },
  // });

  // tl.to("#IntegrateSDKText", { y: -200, opacity: 0 }, "<");

  // tl.to("#IntegrateSDKText2", { top: 0, opacity: 1 }, "<");
}

/** 设置动画的初始位置 */
function initPosition() {
  gsap.set("#IntegrateSDKBg", { opacity: 0, y: -100 });
  gsap.set("#IntegrateSDKOrderBook", { opacity: 0, top: -200 });
  gsap.set("#IntegrateSDKOrderEntry", { opacity: 0, top: -150 });
  gsap.set(
    "#IntegrateSDKText",
    screenWidth < Screen.md ? { opacity: 0, x: 100 } : { opacity: 0, y: 100 }
  );
  gsap.set(
    "#IntegrateSDKText2",
    screenWidth < Screen.md
      ? { opacity: 0, x: 100 }
      : { opacity: 0, bottom: -100 }
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

function getTl1(orderBookTop: number, orderEntryTop: number) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#IntegrateSDK",
      scrub: 1.5,
      start: "top 20%",
      // 距离开始 2000px 距离才停止
      end: "+=2000",
      markers: true,
      pin: true,
    },
    ease: "power1.out",
  });

  tl1
    .to("#IntegrateSDKBg", { y: 0, opacity: 1, duration: 100 })
    .to(
      "#IntegrateSDKText",
      screenWidth < Screen.md
        ? { x: 0, opacity: 1, duration: 100 }
        : { y: 0, opacity: 1, duration: 100 },
      "<"
    )

    .to(
      "#IntegrateSDKOrderBook",
      { top: orderBookTop, opacity: 1, duration: 200 },
      "<25%"
    )
    .to(
      "#IntegrateSDKOrderEntry",
      {
        top: orderEntryTop,
        opacity: 1,
        duration: 200,
      },
      "<25%"
    );
  return tl1;
}

function getTl2() {
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#IntegrateSDK",
      scrub: 1.5,
      // pin: true,
      // start: "top 20%",
      start: (self: any) => self.previous().end,
      end: "top 5%",
      // invalidateOnRefresh: true,
      // markers: true,
    },
    ease: "power1.out",
  });

  tl2
    .to("#IntegrateSDKImage2", {
      clipPath: "polygon(-20% -15%, 120% 0%, 135% 135%, -20% 120%)",
    })
    .to(
      "#IntegrateSDKText",
      screenWidth < Screen.md
        ? { x: -200, opacity: 0 }
        : { y: -200, opacity: 0 },
      "<"
    )

    .to(
      "#IntegrateSDKText2",
      screenWidth < Screen.md ? { x: 0, opacity: 1 } : { top: 0, opacity: 1 },
      "<"
    );

  return tl2;
}

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
