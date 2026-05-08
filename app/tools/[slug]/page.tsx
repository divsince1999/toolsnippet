import { notFound } from "next/navigation";
import ToolPageShell from "@/components/ToolPageShell";
import { buildToolMetadata, getRelatedTools, getToolBySlug, tools } from "@/lib/tools";
import { ToolRegistry } from "@/components/tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const relatedTools = getRelatedTools(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = ToolRegistry[slug];

  if (!ToolComponent) {
    notFound();
  }

  return (
    <ToolPageShell tool={tool} relatedTools={relatedTools}>
      <ToolComponent />
    </ToolPageShell>
  );
}
