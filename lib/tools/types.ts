export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolInfo = {
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
};
