import { gsap } from "gsap";

type TOnCallback = ({
  isDesktop,
  isMobile,
}: {
  isDesktop: boolean;
  isMobile: boolean;
}) => void;

export function onGsapMedia(onCallback: TOnCallback) {
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
      onCallback({ isDesktop, isMobile });
    }
  );
}
