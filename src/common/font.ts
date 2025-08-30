import localFont from "next/font/local";
import { Bebas_Neue } from "next/font/google";

const satoshi = localFont({
  src: "./fonts/Satoshi.ttf",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export { satoshi, bebasNeue };
