import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "sales-tax-vat-calculator",
  name: "Sales Tax, GST & VAT Calculator",
  category: "Number",
  shortDescription: "Calculate tax inclusive and tax exclusive pricing, gross totals, and net breakdown for custom sales tax and VAT rates.",
  heroTitle: "Sales Tax, GST & VAT Calculator",
  heroDescription: "Calculate tax inclusive and tax exclusive pricing, gross totals, and net breakdown for custom sales tax and VAT rates.",
  about: "The Sales Tax, GST & VAT Calculator computes tax-inclusive (gross) and tax-exclusive (net) pricing for retail, e-commerce, and invoices.",
  features: [
    "Calculates Tax Exclusive (Add Tax) and Tax Inclusive (Remove Tax)",
    "Computes exact Net Amount, Tax Amount, and Gross Total",
    "Preset tax rates for USA, UK, EU, Canada, and Australia",
    "Clear invoice breakdown summary"
],
  howToUse: [
    "Select calculation mode: Add Tax (Exclusive) or Remove Tax (Inclusive).",
    "Enter the base price amount.",
    "Enter or select the Tax / VAT rate percentage.",
    "View the calculated tax and final gross/net amounts."
],
  whyUse: [
    "Format freelance invoices and e-commerce receipts.",
    "Calculate VAT refunds and expense reports."
],
  tips: [
    "To extract VAT from a gross amount: Gross / (1 + (VAT / 100))."
],
  faqs: [
  {
    "question": "What is the difference between Tax Inclusive and Tax Exclusive?",
    "answer": "Tax Exclusive means tax is added on top of the base price (Net + Tax = Gross). Tax Inclusive means tax is already included in the displayed sticker price."
  },
  {
    "question": "How do you remove VAT from a total price?",
    "answer": "Divide the total gross price by (1 + Tax Rate / 100). For example, with 20% VAT: Net = Gross / 1.20."
  }
]
};
