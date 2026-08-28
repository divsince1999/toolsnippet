import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "css-to-tailwind",
  name: "CSS to Tailwind Converter",
  category: "Design",
  shortDescription: "Convert standard CSS declaration rules and stylesheets into Tailwind CSS utility classes instantly.",
  heroTitle: "Online CSS to Tailwind CSS Converter",
  heroDescription: "Transform vanilla CSS declarations, inline styles, and CSS classes into clean, modern Tailwind CSS utility classes in real-time.",
  about: "ToolSnippet's CSS to Tailwind Converter allows frontend engineers to migrate legacy CSS rules and UI components to Tailwind CSS utility syntax. It automatically maps box models, flexbox, grid layouts, typography, border radius, box shadows, and color properties to idiomatic Tailwind classes.",
  howToUse: [
    "Paste your CSS rules, selector blocks, or inline declarations into the input editor.",
    "View the converted Tailwind utility class string and sample HTML component in real-time.",
    "Click the quick preset buttons (Card, Button, Flex Container, Hero Banner) to test sample CSS layouts.",
    "Copy the generated Tailwind class list or HTML element with 1-click.",
  ],
  whyUse: [
    "Instant Migration: Speed up codebase migrations from CSS Modules, SCSS, or Styled Components to Tailwind CSS.",
    "Arbitrary Value Support: Automatically creates Tailwind arbitrary brackets (e.g. w-[345px], bg-[#4f46e5]) for custom measurements.",
    "100% Client-Side: Runs entirely in your browser with zero network requests.",
  ],
  faqs: [
    {
      question: "How does the CSS to Tailwind conversion work?",
      answer: "The tool parses CSS property-value pairs and matches them against Tailwind's standard design tokens (spacing, flexbox, typography, colors, borders). If a value is custom, it uses Tailwind arbitrary value syntax like w-[350px] or p-[18px].",
    },
    {
      question: "Can I convert full CSS rule blocks with selectors?",
      answer: "Yes. You can paste individual CSS declarations (e.g. 'display: flex; margin: 16px;') or entire class blocks like '.btn { padding: 8px 16px; border-radius: 8px; }'.",
    },
  ],
  features: [
    "Comprehensive property mapping (Flexbox, Grid, Box Model, Typography, Borders, Shadows)",
    "Support for Tailwind standard utilities and arbitrary values",
    "Live HTML / JSX preview of converted styles",
    "Sample UI presets (Buttons, Cards, Flex Navbars, Hero sections)",
    "1-click copy for class list and HTML code",
  ],
  tips: [
    "Use this tool when refactoring legacy React or Vue components to Tailwind CSS.",
    "Arbitrary values like p-[23px] can easily be refactored to standard spacing tokens (p-6) once converted.",
  ],
};
