import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "modulo-inverse-calculator",
  name: "Modular Arithmetic & Modulo Inverse Calculator",
  category: "Number",
  shortDescription: "Calculate modular arithmetic, modular exponentiation (a^b mod m), and Extended Euclidean modular multiplicative inverse.",
  heroTitle: "Modular Arithmetic & Modulo Inverse Calculator",
  heroDescription: "Calculate modular arithmetic, modular exponentiation (a^b mod m), and Extended Euclidean modular multiplicative inverse.",
  about: "The Modular Arithmetic & Modulo Inverse Calculator performs modular congruence operations, modular exponentiation (b^e mod m) using fast binary squaring, and computes the Extended Euclidean modular multiplicative inverse.",
  features: [
    "Calculates Modular Multiplicative Inverse (a⁻¹ mod m)",
    "Computes Fast Modular Exponentiation (b^e mod m) for cryptography",
    "Performs Basic Modulo Arithmetic (Addition, Subtraction, Multiplication mod m)",
    "Arbitrary precision BigInt calculation support"
],
  howToUse: [
    "Enter Base Integer (a).",
    "Enter Modulus (m).",
    "Select operation (Modular Inverse, Modular Exponentiation, Modulo).",
    "View the computed integer result."
],
  whyUse: [
    "Compute RSA cryptographic private keys and Diffie-Hellman shared secrets.",
    "Solve competitive programming number theory and congruence equations."
],
  tips: [
    "A modular inverse a⁻¹ mod m exists if and only if a and m are coprime (gcd(a, m) = 1)."
],
  faqs: [
  {
    "question": "What is a modular multiplicative inverse?",
    "answer": "The modular inverse of an integer 'a' modulo 'm' is an integer 'x' such that (a × x) ≡ 1 (mod m). It is the modular equivalent of division."
  },
  {
    "question": "When does a modular inverse exist?",
    "answer": "A modular inverse exists if and only if 'a' and 'm' are coprime (their Greatest Common Divisor gcd(a, m) equals 1)."
  }
]
};
