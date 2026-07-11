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
  metadataBase: new URL("https://www.toolsnippet.com"),
  title: "Free Online Developer & Text Tools | ToolSnippet",
  description: "Free online text, JSON, Base64, URL, regex, encoding, decoding, formatting and developer tools. Fast, secure and works entirely in your browser.",
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
  applicationName: "ToolSnippet",
  alternates: {
    canonical: "https://www.toolsnippet.com",
  },
  category: "Developer Tools",
  creator: "ToolSnippet",
  publisher: "ToolSnippet",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Free Online Developer & Text Tools | ToolSnippet",
    description: "Free online text, JSON, Base64, URL, regex, encoding, decoding, formatting and developer tools. Fast, secure and works entirely in your browser.",
    url: "https://www.toolsnippet.com",
    siteName: "ToolSnippet",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Developer & Text Tools | ToolSnippet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer & Text Tools | ToolSnippet",
    description: "Free online text, JSON, Base64, URL, regex, encoding, decoding, formatting and developer tools. Fast, secure and works entirely in your browser.",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Developer & Text Tools | ToolSnippet",
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
