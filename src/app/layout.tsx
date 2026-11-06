import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import "./globals.css";

const description = site.profile.tagline ?? `${site.profile.name} のリンク集`;

export const metadata: Metadata = {
  title: site.profile.name,
  description,
  openGraph: { title: site.profile.name, description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
