import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSans, plexMono } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  OG_HOME_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
  SNAPSHOT_LINE,
  TITLE_TEMPLATE,
  canonical,
  social,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: SITE_TAGLINE + " " + SNAPSHOT_LINE,
  alternates: { canonical: canonical("/") },
  ...social({
    title: SITE_TITLE,
    description: `${SITE_TAGLINE} ${SNAPSHOT_LINE}`,
    path: "/",
    image: OG_HOME_IMAGE,
    imageAlt: SITE_TITLE,
  }),
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
