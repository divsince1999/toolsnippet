import { ToolInfo, ToolFaq } from "@/lib/tools";
import type { CategoryConfig } from "@/lib/categories/config";
import { getCategoryByToolCategory } from "@/lib/categories/config";
import type { ToolManifestEntry } from "@/lib/tools/types";
import type { CheatsheetConfig } from "@/lib/cheatsheets/config";

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

interface SchemaCollectionPage {
  "@context": string;
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  publisher: SchemaOrganization;
}

interface SchemaItemList {
  "@context": string;
  "@type": "ItemList";
  name: string;
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
    description: string;
  }[];
}

interface SchemaTechArticle {
  "@context": string;
  "@type": "TechArticle";
  headline: string;
  description: string;
  url: string;
  inLanguage: string;
  author: SchemaOrganization;
  publisher: SchemaOrganization;
}

export type CategoryJsonLdSchema =
  | SchemaCollectionPage
  | SchemaBreadcrumbList
  | SchemaItemList
  | SchemaFAQPage;

export type CheatsheetJsonLdSchema =
  | SchemaTechArticle
  | SchemaBreadcrumbList
  | SchemaFAQPage;

const baseUrl = "https://www.toolsnippet.com";

/**
 * Builds a WebApplication schema for a tool
 */
export function buildWebApplicationSchema(tool: ToolInfo): SchemaWebApplication {
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
 * Builds a 4-tier BreadcrumbList schema for a tool page:
 * Home > Categories > [Category Name] > [Tool Name]
 */
export function buildBreadcrumbSchema(tool: ToolInfo): SchemaBreadcrumbList {
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;
  const categoryConfig = getCategoryByToolCategory(tool.category);

  const breadcrumbs: SchemaBreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Categories",
      item: `${baseUrl}/category`,
    },
  ];

  if (categoryConfig) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 3,
      name: categoryConfig.name,
      item: `${baseUrl}/category/${categoryConfig.slug}`,
    });
    breadcrumbs.push({
      "@type": "ListItem",
      position: 4,
      name: tool.name,
      item: toolUrl,
    });
  } else {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 3,
      name: "Tools",
      item: `${baseUrl}/tools`,
    });
    breadcrumbs.push({
      "@type": "ListItem",
      position: 4,
      name: tool.name,
      item: toolUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}

/**
 * Builds CollectionPage schema for category hub
 */
export function buildCollectionPageSchema(
  category: CategoryConfig,
  toolCount: number
): SchemaCollectionPage {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Free Online Utilities`,
    description: category.description,
    url: `${baseUrl}/category/${category.slug}`,
    numberOfItems: toolCount,
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: baseUrl,
      logo: `${baseUrl}/images/site-logo.png`,
    },
  };
}

/**
 * Builds BreadcrumbList schema for category hub:
 * Home > Categories > [Category Name]
 */
export function buildCategoryBreadcrumbSchema(
  category: CategoryConfig
): SchemaBreadcrumbList {
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
        name: "Categories",
        item: `${baseUrl}/category`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${baseUrl}/category/${category.slug}`,
      },
    ],
  };
}

/**
 * Builds BreadcrumbList schema for the All Categories Index:
 * Home > Categories
 */
export function buildAllCategoriesBreadcrumbSchema(): SchemaBreadcrumbList {
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
        name: "Categories",
        item: `${baseUrl}/category`,
      },
    ],
  };
}

/**
 * Builds ItemList schema for top tools in a category
 */
export function buildCategoryItemListSchema(
  category: CategoryConfig,
  tools: ToolManifestEntry[]
): SchemaItemList {
  const topTools = tools.slice(0, 15);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Top ${category.name} Tools`,
    itemListElement: topTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${baseUrl}/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  };
}

/**
 * Builds FAQPage schema for category hub
 */
export function buildCategoryFAQSchema(
  category: CategoryConfig
): SchemaFAQPage | null {
  if (!category.faqs || category.faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Combines all schemas into a single array for rendering on tool pages
 */
export function buildAllSchemas(
  tool: ToolInfo
): (SchemaWebApplication | SchemaFAQPage | SchemaBreadcrumbList)[] {
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

/**
 * Builds TechArticle schema for a cheat sheet reference guide
 */
export function buildCheatsheetArticleSchema(
  cheatsheet: CheatsheetConfig
): SchemaTechArticle {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: cheatsheet.headline,
    description: cheatsheet.description,
    url: `${baseUrl}/cheatsheet/${cheatsheet.slug}`,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: baseUrl,
      logo: `${baseUrl}/images/site-logo.png`,
    },
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: baseUrl,
      logo: `${baseUrl}/images/site-logo.png`,
    },
  };
}

/**
 * Builds BreadcrumbList schema for a cheat sheet:
 * Home > Cheat Sheets > [Cheat Sheet Title]
 */
export function buildCheatsheetBreadcrumbSchema(
  cheatsheet: CheatsheetConfig
): SchemaBreadcrumbList {
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
        name: "Cheat Sheets",
        item: `${baseUrl}/cheatsheet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cheatsheet.title,
        item: `${baseUrl}/cheatsheet/${cheatsheet.slug}`,
      },
    ],
  };
}

/**
 * Builds BreadcrumbList schema for All Cheat Sheets Index:
 * Home > Cheat Sheets
 */
export function buildAllCheatsheetsBreadcrumbSchema(): SchemaBreadcrumbList {
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
        name: "Cheat Sheets",
        item: `${baseUrl}/cheatsheet`,
      },
    ],
  };
}

/**
 * Builds FAQPage schema for a cheat sheet
 */
export function buildCheatsheetFAQSchema(
  cheatsheet: CheatsheetConfig
): SchemaFAQPage | null {
  if (!cheatsheet.faqs || cheatsheet.faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cheatsheet.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

