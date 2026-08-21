import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "time-duration-calculator",
  "name": "Time Duration Calculator",
  "category": "Number",
  "shortDescription": "Add, subtract, and convert time durations in hours, minutes, and seconds.",
  "heroTitle": "Calculate time durations easily",
  "heroDescription": "Add or subtract multiple time durations and convert between hours, minutes, and seconds.",
  "about": "Time Duration Calculator helps project managers, video editors, developers, and students sum up work logs, track elapsed time, or convert durations into different units.",
  "howToUse": [
    "Enter one or more time durations in HH:MM:SS format.",
    "Choose to add or subtract them.",
    "View the total in multiple time unit formats."
  ],
  "whyUse": [
    "Accurately sum up work logs or video clip durations.",
    "No spreadsheet needed for simple time math.",
    "Converts result into total seconds, minutes, and hours."
  ],
  "faqs": [
    {
      "question": "What format should I use for durations?",
      "answer": "Enter durations as HH:MM:SS, MM:SS, or just seconds. The tool is flexible."
    },
    {
      "question": "Can I subtract durations?",
      "answer": "Yes, you can mix addition and subtraction in a list of durations."
    }
  ],
  "features": [
    "Add multiple time durations",
    "Subtract durations",
    "Result shown in HH:MM:SS",
    "Result also in total seconds and minutes",
    "Simple HH:MM:SS or MM:SS input"
  ],
  "tips": [
    "Sum up daily work hour logs at the end of the week",
    "Add video clip durations to calculate total video length",
    "Convert a result in seconds to hours by dividing by 3600"
  ]
};
