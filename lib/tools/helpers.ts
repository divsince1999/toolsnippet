import type { Metadata } from "next";
import type { ToolDefinition } from "@/lib/tools/types";

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  return {
    title: `${tool.name} - Free Online Tool | ToolSnippet`,
    description: tool.shortDescription,
    alternates: {
      canonical: tool.seo?.canonicalOverride || `/tools/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: tool.heroTitle,
      description: tool.heroDescription,
      url: `https://www.toolsnippet.com/tools/${tool.slug}`,
      siteName: "ToolSnippet",
      type: "website",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.heroTitle,
      description: tool.heroDescription,
      images: ["/images/og.jpg"],
    },
  };
}

export function findToolBySlug(toolsList: ToolDefinition[], slug: string): ToolDefinition | undefined {
  return toolsList.find((t) => t.slug === slug);
}

export function findRelatedTools(toolsList: ToolDefinition[], slug: string, limit = 3): ToolDefinition[] {
  const tool = toolsList.find((t) => t.slug === slug);
  if (!tool) return [];
  return toolsList
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .slice(0, limit);
}
