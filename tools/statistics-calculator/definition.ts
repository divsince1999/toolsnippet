import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "statistics-calculator",
  name: "Descriptive Statistics Calculator",
  category: "Number",
  shortDescription: "Compute Mean, Median, Mode, Variance, Standard Deviation, Quartiles, IQR, Range, and Z-Scores from numerical datasets.",
  heroTitle: "Descriptive Statistics Calculator",
  heroDescription: "Compute Mean, Median, Mode, Variance, Standard Deviation, Quartiles, IQR, Range, and Z-Scores from numerical datasets.",
  about: "The Descriptive Statistics Calculator computes key summary statistics from arrays of numbers, providing central tendency, dispersion, quartiles, and outlier detection.",
  features: [
    "Calculates Mean, Median, Mode, and Geometric Mean",
    "Calculates Sample & Population Variance and Standard Deviation",
    "Calculates Min, Max, Range, Sum, Q1, Q3, and Interquartile Range (IQR)",
    "Generates Five-Number Summary"
],
  howToUse: [
    "Paste or type comma, space, or newline-separated numbers into the dataset field.",
    "Select Sample (n-1) or Population (n) variance calculation.",
    "Instantly view the statistical summary and metric breakdown."
],
  whyUse: [
    "Analyze data science benchmarks, latency distributions, and query response times.",
    "Prepare statistical summaries for research papers and financial audits."
],
  tips: [
    "Use Sample standard deviation (divided by n-1) when analyzing a subset or test sample of a larger population."
],
  faqs: [
  {
    "question": "When should I use Sample vs Population Standard Deviation?",
    "answer": "Use Sample Standard Deviation (divided by n - 1, Bessel's correction) when your data is a sample of a larger group. Use Population (divided by n) when you have measured all members of the entire group."
  },
  {
    "question": "What is the Interquartile Range (IQR)?",
    "answer": "The Interquartile Range is the difference between the 75th percentile (Q3) and 25th percentile (Q1), measuring the spread of the middle 50% of your data."
  }
]
};
