import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";

const BASE = "https://www.verdelab.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${BASE}/servizi/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...servicePages,
  ];
}
