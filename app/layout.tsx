import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolsnippet.com"),
  title: "ToolSnippet - Free Online Developer Tools",
  description: "Fast, secure, and free online utilities for developers, writers, and digital professionals.",
  keywords: "online tools, developer tools, text tools, data conversion, validation tools, encoding tools, free utilities",
  authors: [{ name: "ToolSnippet" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "ToolSnippet - Free Online Developer Tools",
    description: "Fast, secure, and free online utilities for developers, writers, and digital professionals.",
    url: "https://toolsnippet.com",
    siteName: "ToolSnippet",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "ToolSnippet - Free Online Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ToolSnippet - Free Online Developer Tools",
    description: "Fast, secure, and free online utilities for developers, writers, and digital professionals.",
    site: "@toolsnippet",
    creator: "@toolsnippet",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "ToolSnippet - Free Online Developer Tools",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className={`${poppins.className} min-h-full flex flex-col font-sans`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
