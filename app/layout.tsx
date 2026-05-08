import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "ToolSnippet - Free Online Developer Tools",
    description: "Fast, secure, and free online utilities for developers, writers, and digital professionals.",
    url: "https://toolsnippet.com",
    siteName: "ToolSnippet",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://toolsnippet.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ToolSnippet - Free Online Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolSnippet - Free Online Developer Tools",
    description: "Fast, secure, and free online utilities for developers, writers, and digital professionals.",
    site: "@toolsnippet",
    creator: "@toolsnippet",
    images: [
      {
        url: "https://toolsnippet.com/twitter-image.jpg",
        width: 1200,
        height: 600,
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
    >
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
