"use client";

import { useState, useEffect } from "react";

interface ResponsiveComponentsProps {
  desktopComponents: React.ReactNode;
  mobileComponents: React.ReactNode;
}

export function ResponsiveComponents({
  desktopComponents,
  mobileComponents,
}: ResponsiveComponentsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? mobileComponents : desktopComponents;
}
