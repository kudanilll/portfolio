export type Work = {
  id: number;
  title: string;
  category: string;
  href: string;
  image: string;
  hoverImage: string;
  hoverBackground: string;
  description: {
    en: string;
    id: string;
  };
};

export const works: Work[] = [
  {
    id: 1,
    title: "Nielcode",
    category: "Web platform",
    href: "https://nielcode.com",
    image: "/assets/images/nielcode-1.webp",
    hoverImage: "/assets/images/nielcode-2.webp",
    hoverBackground: "#183d2c",
    description: {
      en: "A platform for hiring website and application development services.",
      id: "Platform untuk menyewa jasa pembuatan website dan aplikasi.",
    },
  },
  {
    id: 2,
    title: "Kunime",
    category: "Mobile app",
    href: "https://github.com/kudanilll/kunime",
    image: "/assets/images/kunime.webp",
    hoverImage: "/assets/images/background.webp",
    hoverBackground: "#24152d",
    description: {
      en: "An anime streaming app made for Indonesian viewers.",
      id: "Aplikasi streaming anime untuk penonton Indonesia.",
    },
  },
  {
    id: 3,
    title: "Kupass",
    category: "Android app",
    href: "https://github.com/kudanilll/kupass",
    image: "/assets/images/kupass.webp",
    hoverImage: "/assets/images/background.webp",
    hoverBackground: "#182f22",
    description: {
      en: "An open-source password manager built for Android.",
      id: "Manajer kata sandi open-source untuk Android.",
    },
  },
  {
    id: 4,
    title: "Favget",
    category: "Backend service",
    href: "https://github.com/kudanilll/favget",
    image: "/assets/images/favget-1.webp",
    hoverImage: "/assets/images/favget-2.webp",
    hoverBackground: "#17293b",
    description: {
      en: "A fast favicon delivery service with global caching.",
      id: "Layanan favicon cepat dengan caching global.",
    },
  },
];
