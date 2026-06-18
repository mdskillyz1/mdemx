import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MDemx Web Design & Digital Systems",
    short_name: "MDemx",
    description: "MDemx web design, development, SEO, automation, and digital systems in London.",
    start_url: "/",
    display: "standalone",
    background_color: "#08110d",
    theme_color: "#08110d",
    icons: [
      {
        src: "/icon-512.png?v=mdemx-3",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png?v=mdemx-3",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
