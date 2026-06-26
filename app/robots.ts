import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://toolsnippet.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/favicon.ico"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
