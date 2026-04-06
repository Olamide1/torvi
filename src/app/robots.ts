import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://torvilearning.online";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/hub", "/mission", "/auth", "/api", "/forbidden"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
