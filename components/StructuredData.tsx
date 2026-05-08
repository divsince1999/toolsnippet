import { ToolInfo } from "@/lib/tools";

interface StructuredDataProps {
  tool: ToolInfo;
}

export default function StructuredData({ tool }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      ...tool.whyUse,
      ...tool.howToUse
    ],
    screenshot: `https://toolsnippet.com/tools/${tool.slug}/screenshot`,
    url: `https://toolsnippet.com/tools/${tool.slug}`,
    author: {
      "@type": "Organization",
      name: "ToolSnippet"
    },
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: "https://toolsnippet.com"
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "100"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
