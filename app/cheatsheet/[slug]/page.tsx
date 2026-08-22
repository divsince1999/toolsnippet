import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CHEATSHEETS,
  getCheatsheetBySlug,
} from "@/lib/cheatsheets/config";
import CheatsheetPageShell from "@/components/CheatsheetPageShell";
import {
  buildCheatsheetArticleSchema,
  buildCheatsheetBreadcrumbSchema,
  buildCheatsheetFAQSchema,
  type CheatsheetJsonLdSchema,
} from "@/lib/seo/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CHEATSHEETS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cheatsheet = getCheatsheetBySlug(slug);
  if (!cheatsheet) return {};

  const title = `${cheatsheet.title} | ToolSnippet Cheat Sheet`;
  const description = `${cheatsheet.description} Includes 1-click syntax copying and interactive developer tool companion.`;
  const url = `https://www.toolsnippet.com/cheatsheet/${cheatsheet.slug}`;

  return {
    title,
    description,
    keywords: cheatsheet.targetKeywords,
    alternates: {
      canonical: `/cheatsheet/${cheatsheet.slug}`,
    },
    openGraph: {
      title: `${cheatsheet.headline} | ToolSnippet`,
      description,
      url,
      siteName: "ToolSnippet",
      type: "article",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: cheatsheet.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cheatsheet.headline} | ToolSnippet`,
      description,
      images: ["/images/og.jpg"],
    },
  };
}

export default async function CheatsheetPage({ params }: Props) {
  const { slug } = await params;
  const cheatsheet = getCheatsheetBySlug(slug);

  if (!cheatsheet) {
    notFound();
  }

  const relatedCheatsheets = CHEATSHEETS.filter(
    (c) => c.slug !== cheatsheet.slug
  ).slice(0, 3);

  // Structured Data
  const articleSchema = buildCheatsheetArticleSchema(cheatsheet);
  const breadcrumbSchema = buildCheatsheetBreadcrumbSchema(cheatsheet);
  const faqSchema = buildCheatsheetFAQSchema(cheatsheet);

  const schemas: CheatsheetJsonLdSchema[] = [articleSchema, breadcrumbSchema];
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
      <CheatsheetPageShell
        cheatsheet={cheatsheet}
        relatedCheatsheets={relatedCheatsheets}
      />
    </>
  );
}
