import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CATEGORIES,
  getCategoryBySlug,
} from "@/lib/categories/config";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";
import CategoryPageShell from "@/components/CategoryPageShell";
import {
  buildCollectionPageSchema,
  buildCategoryBreadcrumbSchema,
  buildCategoryItemListSchema,
  buildCategoryFAQSchema,
  type CategoryJsonLdSchema,
} from "@/lib/seo/schema";

const manifest: ToolManifestEntry[] = rawManifest as ToolManifestEntry[];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const categoryTools = manifest.filter(
    (t) => t.category.toLowerCase() === category.toolCategory.toLowerCase()
  );

  const title = `${category.name} (${categoryTools.length} Free Tools) | ToolSnippet`;
  const description = `${category.description} Free, fast, private, and browser-based with zero registration.`;
  const url = `https://www.toolsnippet.com/category/${category.slug}`;

  return {
    title,
    description,
    keywords: category.targetKeywords,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.headline} | ToolSnippet`,
      description,
      url,
      siteName: "ToolSnippet",
      type: "website",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.headline} | ToolSnippet`,
      description,
      images: ["/images/og.jpg"],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Filter tools for this category
  const tools = manifest.filter(
    (t) => t.category.toLowerCase() === category.toolCategory.toLowerCase()
  );

  // Compute tool counts per category
  const categoryCounts: Record<string, number> = {};
  for (const tool of manifest) {
    categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
  }

  // Sibling categories for internal linking
  const relatedCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

  // Build JSON-LD schemas
  const collectionSchema = buildCollectionPageSchema(category, tools.length);
  const breadcrumbSchema = buildCategoryBreadcrumbSchema(category);
  const itemListSchema = buildCategoryItemListSchema(category, tools);
  const faqSchema = buildCategoryFAQSchema(category);

  const schemas: CategoryJsonLdSchema[] = [
    collectionSchema,
    breadcrumbSchema,
    itemListSchema,
  ];
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
      <CategoryPageShell
        category={category}
        tools={tools}
        relatedCategories={relatedCategories}
        categoryCounts={categoryCounts}
      />
    </>
  );
}
