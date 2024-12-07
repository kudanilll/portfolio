"use client";

import { useState, useEffect } from "react";

export function useResponsiveString(
  desktopString: string,
  mobileString: string
) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? mobileString : desktopString;
}
