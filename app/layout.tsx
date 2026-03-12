import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clayton Cuteri | VP of Engineering & AI | CTO | SaaS Leader",
  description:
    "Engineering and AI executive with 8+ years building AI-powered platforms. Experienced in leading cross-functional teams of 25+, scaling cloud infrastructure on AWS, and shipping AI products from zero to scale. Open to CTO and VP of Engineering roles.",
  keywords: [
    "VP of Engineering",
    "CTO",
    "AI leader",
    "engineering executive",
    "AI architect",
    "startup founder",
    "SaaS engineering leader",
    "remote CTO",
    "AI content moderation",
    "RAG pipeline",
    "machine learning engineering leader",
    "Clayton Cuteri",
    "technical executive",
    "AI products",
    "startup exit",
    "cloud architecture",
    "AWS",
    "engineering management",
  ],
  authors: [{ name: "Clayton Cuteri" }],
  creator: "Clayton Cuteri",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Clayton Cuteri | VP of Engineering & AI | CTO",
    description:
      "Engineering and AI executive with 8+ years building AI-powered platforms from zero to scale. Leading teams, shipping AI products, and delivering measurable business results.",
    siteName: "Clayton Cuteri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clayton Cuteri | VP of Engineering & AI | CTO",
    description:
      "Engineering and AI executive building AI-powered platforms from zero to scale.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Clayton Cuteri",
              jobTitle: "VP of Engineering & AI",
              description:
                "Engineering and AI executive with 8+ years building AI-powered platforms. Experienced in leading cross-functional teams, scaling cloud infrastructure, and shipping AI products.",
              url: "https://claytoncuteri.com",
              sameAs: [
                "https://www.linkedin.com/in/clayton-cuteri/",
                "https://github.com/claytoncuteri/",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "RAG Pipelines",
                "Content Moderation",
                "Cloud Architecture",
                "AWS",
                "Engineering Management",
                "Startup Leadership",
                "SaaS",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "University of Central Florida",
              },
              award: "Global Leader of the Year - 2024 Asia Icon Awards",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mount Pleasant",
                addressRegion: "SC",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
