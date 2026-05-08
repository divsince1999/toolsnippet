import { tools } from "@/lib/tools";

export async function GET() {
  const baseUrl = "https://toolsnippet.com";
  const currentDate = new Date().toISOString();

  const staticPages = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.8,
    },
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastmod: currentDate,
    changefreq: "monthly",
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...toolPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
