import { ToolInfo, ToolFaq } from "@/lib/tools";

// TypeScript interfaces for Schema.org structured data
interface SchemaOrganization {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
}

interface SchemaOffer {
  "@type": "Offer";
  price: number;
  priceCurrency: string;
}

interface SchemaWebApplication {
  "@context": string;
  "@type": "WebApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  browserRequirements?: string;
  offers?: SchemaOffer;
  publisher?: SchemaOrganization;
  isAccessibleForFree: boolean;
}

interface SchemaQuestion {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

interface SchemaFAQPage {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: SchemaQuestion[];
}

interface SchemaBreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

interface SchemaBreadcrumbList {
  "@context": string;
  "@type": "BreadcrumbList";
  itemListElement: SchemaBreadcrumbItem[];
}

/**
 * Builds a WebApplication schema for a tool
 * @param tool - The tool object containing metadata
 * @returns A valid Schema.org WebApplication JSON-LD object
 */
export function buildWebApplicationSchema(tool: ToolInfo): SchemaWebApplication {
  const baseUrl = "https://www.toolsnippet.com";
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: baseUrl,
      logo: `${baseUrl}/images/site-logo.png`,
    },
    isAccessibleForFree: true,
  };
}

/**
 * Builds an FAQPage schema from tool FAQs
 * @param tool - The tool object containing FAQs
 * @returns A valid Schema.org FAQPage JSON-LD object, or null if no FAQs exist
 */
export function buildFAQSchema(tool: ToolInfo): SchemaFAQPage | null {
  if (!tool.faqs || tool.faqs.length === 0) {
    return null;
  }

  const mainEntity: SchemaQuestion[] = tool.faqs.map((faq: ToolFaq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * Builds a BreadcrumbList schema for a tool page
 * @param tool - The tool object containing name and slug
 * @returns A valid Schema.org BreadcrumbList JSON-LD object
 */
export function buildBreadcrumbSchema(tool: ToolInfo): SchemaBreadcrumbList {
  const baseUrl = "https://www.toolsnippet.com";
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${baseUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };
}

/**
 * Combines all schemas into a single array for rendering
 * @param tool - The tool object containing metadata
 * @returns Array of all valid schemas (WebApplication, FAQPage if FAQs exist, BreadcrumbList)
 */
export function buildAllSchemas(tool: ToolInfo): (SchemaWebApplication | SchemaFAQPage | SchemaBreadcrumbList)[] {
  const schemas: (SchemaWebApplication | SchemaFAQPage | SchemaBreadcrumbList)[] = [
    buildWebApplicationSchema(tool),
    buildBreadcrumbSchema(tool),
  ];

  const faqSchema = buildFAQSchema(tool);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return schemas;
}
