import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "amortization-loan-calculator",
  name: "Loan & Mortgage EMI Amortization Calculator",
  category: "Number",
  shortDescription: "Calculate monthly EMI repayments, total interest payable, loan amortization schedules, and principal payoff breakdowns.",
  heroTitle: "Loan & Mortgage EMI Amortization Calculator",
  heroDescription: "Calculate monthly EMI repayments, total interest payable, loan amortization schedules, and principal payoff breakdowns.",
  about: "The Loan & Mortgage EMI Amortization Calculator computes monthly installment payments (EMI) for personal loans, auto loans, and mortgages, generating complete principal vs interest repayment schedules.",
  features: [
    "Calculates Monthly EMI Payment, Total Payment, and Total Interest",
    "Displays Principal vs Interest percentage ratio",
    "Calculates annual and monthly amortization breakdown",
    "Supports loan terms in years or months"
],
  howToUse: [
    "Enter Loan Amount.",
    "Enter Annual Interest Rate (%).",
    "Enter Loan Term in Years.",
    "Instantly view monthly payment and loan payoff totals."
],
  whyUse: [
    "Compare mortgage offers, vehicle financing, and student loan repayment plans."
],
  tips: [
    "Making extra principal payments early in the loan dramatically reduces total lifetime interest."
],
  faqs: [
  {
    "question": "What is a loan amortization schedule?",
    "answer": "An amortization schedule shows each periodic loan payment broken down into interest charges and principal reduction until the balance reaches zero."
  },
  {
    "question": "Why is interest higher in the first years of a mortgage?",
    "answer": "Because interest is calculated on the remaining loan principal. Early payments have a large principal balance, so interest makes up the majority of the monthly payment."
  }
]
};
