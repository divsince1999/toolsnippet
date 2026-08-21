import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "passive-to-active-voice-detector",
  "name": "Passive Voice Detector & Writing Assistant",
  "category": "Text",
  "shortDescription": "Detect passive voice verb phrases in text and get actionable suggestions to convert them to active voice.",
  "heroTitle": "Free Passive Voice Detector & Writing Assistant",
  "heroDescription": "Identify passive voice sentences, auxiliary verbs, and past participles to make your writing clear, concise, and direct.",
  "about": "The Passive Voice Detector scans text for passive verb patterns (such as 'is done by', 'was created', 'have been tested'). Active voice makes writing more direct and engaging for readers, which is vital for blog posts, documentation, and marketing copy.",
  "howToUse": [
    "Paste your text, essay, or documentation draft.",
    "Review the highlighted passive verb phrases found in the copy.",
    "Check passive voice density percentage (aim for under 10%).",
    "Apply suggestions to place the subject/actor before the action verb."
  ],
  "whyUse": [
    "Make business and technical documentation punchy and readable.",
    "Spot weak phrasing and hidden subjects instantly.",
    "Improve Hemingway-style clarity scores.",
    "100% private in-browser analysis."
  ],
  "faqs": [
    {
      "question": "Why should I avoid passive voice?",
      "answer": "Passive voice tends to make sentences longer and less direct by placing the object before the actor (e.g. 'The code was written by Jane' vs. active 'Jane wrote the code')."
    },
    {
      "question": "Is passive voice always bad?",
      "answer": "No, passive voice is appropriate when the actor is unknown, irrelevant, or when emphasizing the result over the actor (e.g., 'The package was delivered'). Aim for <10% passive voice overall."
    }
  ]
};
