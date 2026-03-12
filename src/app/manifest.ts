import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BD TECHNYX",
    short_name: "TECHNYX",
    description:
      "BD TECHNYX is a futuristic digital innovation powerhouse focused on marketing intelligence, design systems, and product engineering.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1224",
    theme_color: "#0b1224",
    icons: [
      {
        src: "/file.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/globe.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
