import { ToolInfo } from "@/lib/tools";

interface StructuredDataProps {
  tool: ToolInfo;
}

export default function StructuredData({ tool }: StructuredDataProps) {
  const softwareSchema = {
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
    screenshot: "https://toolsnippet.com/images/site-logo.png",
    url: `https://toolsnippet.com/tools/${tool.slug}`,
    author: {
      "@type": "Organization",
      name: "ToolSnippet"
    },
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: "https://toolsnippet.com",
      logo: {
        "@type": "ImageObject",
        "url": "https://toolsnippet.com/images/site-logo.png"
      }
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([softwareSchema, faqSchema], null, 2)
      }}
    />
  );
}
