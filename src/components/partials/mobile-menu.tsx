"use client";

import StaggeredMenu from "@/components/ui/staggered-menu";

const menuItems = [
  { label: "Home", ariaLabel: "", link: "#hero" },
  { label: "About", ariaLabel: "", link: "#about" },
  { label: "Projects", ariaLabel: "", link: "#projects" },
  { label: "Services", ariaLabel: "", link: "#services" },
  { label: "Contact", ariaLabel: "", link: "#contact" },
];

export default function MobileMenu() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={menuItems}
        displayItemNumbering={true}
        menuButtonColor="#f0f0f0"
        colors={["#9eefa7", "#27ff40"]}
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
}
