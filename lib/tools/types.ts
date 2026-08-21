export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolSeo = {
  keywords?: string[];
  canonicalOverride?: string;
};

export type ToolDefinition = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  about: string;
  howToUse: string[];
  whyUse: string[];
  faqs: ToolFaq[];
  features?: string[];
  tips?: string[];
  tags?: string[];
  icon?: string;
  seo?: ToolSeo;
};

export type ToolInfo = ToolDefinition;

export type ToolManifestEntry = Pick<
  ToolDefinition,
  "slug" | "name" | "category" | "shortDescription" | "tags" | "icon"
>;
