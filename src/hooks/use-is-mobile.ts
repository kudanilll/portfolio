import { useEffect, useState } from "react";

/**
 * Checks if the current viewport width is below the mobile breakpoint (768px).
 * Safe for SSR (returns false on server).
 */
export function isMobileViewport(breakpoint: number = 768): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < breakpoint;
}

/**
 * React hook to reactively track mobile viewport status.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileViewport(breakpoint));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
