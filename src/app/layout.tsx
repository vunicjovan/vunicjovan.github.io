import type { Metadata } from "next";
import Script from "next/script";
import { profile } from "@/data/portfolio";
import { isPublicProduction, siteDescription, siteTitle, siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: profile.name, url: profile.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  robots: { index: isPublicProduction, follow: isPublicProduction },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        {isPublicProduction && (
          <Script src="https://cloud.umami.is/script.js" data-website-id="63368fe6-d50f-47fd-a84e-a708ccc6a838" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
