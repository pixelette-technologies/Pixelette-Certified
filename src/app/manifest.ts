import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixelette Certified",
    short_name: "Pixelette Certified",
    description:
      "UK-based ISO certification and compliance consultancy. ISO 27001, Cyber Essentials, GDPR, vCISO, AI Governance.",
    start_url: "/",
    display: "standalone",
    background_color: "#044143",
    theme_color: "#044143",
    icons: [
      {
        src: "/logos/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
