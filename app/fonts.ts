import localFont from "next/font/local";

/**
 * Ledger identity type system (docs/design-round3.md §1), self-hosted.
 * Files staged in app/fonts/ with these exact names.
 */
export const fraunces = localFont({
  src: "./fonts/fraunces-latin-var.woff2",
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const instrumentSans = localFont({
  src: "./fonts/instrument-sans-latin-var.woff2",
  variable: "--font-instrument-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-400.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-600.woff2", weight: "600" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});
