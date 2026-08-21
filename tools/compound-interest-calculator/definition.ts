import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "compound-interest-calculator",
  name: "Compound Interest & Investment Growth Calculator",
  category: "Number",
  shortDescription: "Calculate compound interest, future investment balance, monthly contributions, and total interest earned over time.",
  heroTitle: "Compound Interest & Investment Growth Calculator",
  heroDescription: "Calculate compound interest, future investment balance, monthly contributions, and total interest earned over time.",
  about: "The Compound Interest Calculator determines how savings and investment portfolios grow over time using the compound interest formula with optional recurring monthly deposits.",
  features: [
    "Calculates Future Balance, Total Principal, and Total Interest Earned",
    "Supports Annually, Semi-Annually, Quarterly, Monthly, and Daily compounding",
    "Includes optional monthly contribution deposits",
    "Visual annual growth breakdown"
],
  howToUse: [
    "Enter Initial Principal investment amount.",
    "Enter Annual Interest Rate (%).",
    "Enter Investment Term (Years).",
    "Select Compounding Frequency and optional Monthly Contribution.",
    "View future portfolio value and total profit earned."
],
  whyUse: [
    "Plan retirement funds, stock index investing (S&P 500), and high-yield savings growth.",
    "Compare the exponential impact of starting early vs waiting."
],
  tips: [
    "The Rule of 72 estimates how many years it takes for an investment to double: 72 / Interest Rate."
],
  faqs: [
  {
    "question": "How does compound interest work?",
    "answer": "Compound interest calculates interest on both the initial principal and the accumulated interest from previous compounding periods, creating exponential growth."
  },
  {
    "question": "What is the Rule of 72?",
    "answer": "The Rule of 72 is a quick mental math shortcut: divide 72 by your annual interest rate to estimate how many years it will take for your investment to double."
  }
]
};
