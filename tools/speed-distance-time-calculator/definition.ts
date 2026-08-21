import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "speed-distance-time-calculator",
  name: "Speed, Distance & Travel Pace Tool",
  category: "Number",
  shortDescription: "Calculate speed, elapsed travel time, total distance, and running pace across km/h, mph, m/s, knots, and min/km.",
  heroTitle: "Speed, Distance & Travel Pace Tool",
  heroDescription: "Calculate speed, elapsed travel time, total distance, and running pace across km/h, mph, m/s, knots, and min/km.",
  about: "The Speed, Distance & Travel Pace Tool solves for any missing variable in motion equations (Speed = Distance / Time) and converts velocities across metric, imperial, nautical, and running pace units.",
  features: [
    "Calculate Speed, Distance, or Time with 1 click",
    "Supports km/h, mph, m/s, knots, and ft/s",
    "Computes running pace in minutes/kilometer and minutes/mile",
    "Detailed step-by-step formula breakdown"
],
  howToUse: [
    "Select the parameter you want to calculate (Speed, Distance, or Time).",
    "Enter the two known values.",
    "Instantly view the calculated result across multiple speed and pace units."
],
  whyUse: [
    "Plan road trips, flight travel times, and vehicle logistics.",
    "Calculate target running and marathon training paces."
],
  tips: [
    "1 knot equals 1 nautical mile per hour (1.852 km/h or 1.15078 mph)."
],
  faqs: [
  {
    "question": "How do you calculate speed from distance and time?",
    "answer": "Speed = Distance / Time. Ensure both units match (e.g., kilometers and hours produce km/h; miles and hours produce mph)."
  },
  {
    "question": "What is running pace?",
    "answer": "Pace is the inverse of speed, measuring the time required to travel one unit of distance (e.g., minutes per kilometer or minutes per mile)."
  }
]
};
