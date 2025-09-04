import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Conversation Visualizer",
  description: "A modern, responsive Next.js application for visualizing ChatGPT conversations in an interactive 3D space using Three.js and React Three Fiber.",
  keywords: ["ChatGPT", "conversation", "visualization", "3D", "Three.js", "React", "Next.js", "data visualization", "interactive"],
  authors: [{ name: "Sanjula Herath" }],
  creator: "Sanjula Herath",
  publisher: "Sanjula Herath",
  openGraph: {
    title: "3D Conversation Visualizer",
    description: "Transform your ChatGPT conversations into interactive 3D word clouds. Modern, responsive design with real-time 3D visualization.",
    type: "website",
    locale: "en_US",
    siteName: "3D Conversation Visualizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Conversation Visualizer",
    description: "Transform your ChatGPT conversations into interactive 3D word clouds. Modern, responsive design with real-time 3D visualization.",
    creator: "@sanjulaweb3",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
