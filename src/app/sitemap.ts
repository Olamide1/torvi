import type { MetadataRoute } from "next";
import { allPSEOPages } from "@/lib/pseo/pages";
import { howToGuidePages } from "@/lib/pseo/clusters/how-to-guides";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://torvi.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const pseoRoutes: MetadataRoute.Sitemap = allPSEOPages.map((page) => {
    let urlPath: string;
    if (page.pageType === "role_page") {
      urlPath = `/for/${page.slug}`;
    } else if (page.pageType === "guide_page" || page.pageType === "resource_page") {
      urlPath = `/resources/${page.slug}`;
    } else {
      urlPath = `/templates/${page.slug}`;
    }

    return {
      url: `${BASE_URL}${urlPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: Math.min(page.priorityScore / 100, 0.9),
    };
  });

  const howToRoutes: MetadataRoute.Sitemap = howToGuidePages.map((page) => ({
    url: `${BASE_URL}/how-to/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: Math.min(page.priorityScore / 100, 0.9),
  }));

  return [...staticRoutes, ...pseoRoutes, ...howToRoutes];
}
