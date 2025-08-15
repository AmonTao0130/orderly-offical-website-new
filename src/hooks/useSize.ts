import React, { useState, useEffect, useMemo } from "react";

export function useSize() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // window.innerWidth包含滚动条的宽度，document.body.clientWidth不包含滚动条宽度
    // css媒体查询使用的是包含滚动条的宽度，所以这里用window.innerWidth
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const screen = useMemo(() => {
    if (width >= 1920) {
      return "2xl";
    }
    if (width >= 1440) {
      return "xl";
    }
    if (width >= 1024) {
      return "lg";
    }
    if (width >= 768) {
      return "md";
    }
    if (width >= 375) {
      return "sm";
    }
  }, [width]);

  return { width, screen };
}
