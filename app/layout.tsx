import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSans, plexMono } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_NAME, SITE_TAGLINE, canonical } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://token-perks.com"),
  title: {
    default: "Token Perks: Best AI Deals & Catches, Verified Sep 2026",
    template: "%s | Token Perks",
  },
  description:
    "The best AI offers with the catches, upfront. Prices, renewals, and limits verified Sep 6 2026 — re-verify at official terms before paying.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Token Perks: Best AI Deals & Catches, Verified Sep 2026",
    description:
      "The best AI offers with the catches, upfront. Prices verified Sep 6 2026 — compare true cost per task.",
    url: canonical("/"),
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — The best AI offers. The catches, upfront.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Perks: Best AI Deals & Catches, Verified Sep 2026",
    description: "The best AI offers. The catches, upfront.",
    images: ["/og-default.png"],
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
