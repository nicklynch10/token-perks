import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSans, plexMono } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_NAME, SITE_TAGLINE, canonical } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://token-perks.com"),
  title: {
    default: "Token Perks — AI offer prices, limits, and effective cost per task",
    template: "%s | Token Perks",
  },
  description:
    "AI offers compared on price, annual effective cost, estimated cost per task, limits, and renewal terms. Snapshot verified Sep 6 2026 — re-verify at official terms before paying.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Token Perks — AI offer prices, limits, and effective cost per task",
    description:
      "AI offers compared on price, annual effective cost, and estimated cost per task. Snapshot Sep 6 2026.",
    url: canonical("/"),
    type: "website",
    images: [
      {
        url: "/img/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — AI subscription offers, compared on effective cost per task",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Perks — AI offer prices, limits, and effective cost per task",
    description:
      "AI offers compared on price, annual effective cost, and estimated cost per task. Snapshot Sep 6 2026.",
    images: ["/img/og/og-home.png"],
  },
  icons: {
    icon: [{ url: "/img/og/avatar-512.png" }, { url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/img/og/avatar-512.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full ${fraunces.variable} ${instrumentSans.variable} ${plexMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Token Perks feed"
          href="/feed.xml"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <SiteHeader siteName={SITE_NAME} tagline={SITE_TAGLINE} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
