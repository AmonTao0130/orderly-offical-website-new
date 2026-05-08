import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface AnimatedNumberProps {
  value: number;
  format: (value: number) => string;
  duration?: number;
}

export function AnimatedNumber({ value, format, duration = 2000 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(format(0));
  const prevValue = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const startValue = prevValue.current;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = startValue + (value - startValue) * eased;

      setDisplay(format(current));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = value;
      }
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [value, format, duration]);

  return <>{display}</>;
}
