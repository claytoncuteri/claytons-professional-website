import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

/**
 * Site URL used for canonical links and absolute og:image URLs.
 * Set NEXT_PUBLIC_SITE_URL to override (for example on a staging deploy).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url).replace(/\/$/, "");

export const X_HANDLE = "@ClaytonCuteri";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export const DEFAULT_OG_IMAGE = {
  url: "/og/home.png",
  ...OG_IMAGE_SIZE,
  alt: "Clayton Cuteri: Engineering Leader. AI Architect. Startup Builder.",
  type: "image/png",
};

type PageMetaInput = {
  /** <title>; the parent layout's title template still applies. */
  title: string;
  /** og:title and twitter:title (60 characters or fewer). */
  socialTitle: string;
  /** Meta description. */
  description: string;
  /** og:description and twitter:description (70 to 155 characters). Defaults to description. */
  socialDescription?: string;
  /** Path of the page, e.g. "/projects/rag-core". */
  path: string;
  /** Static image in public/og/. Omit when the route has its own opengraph-image file. */
  image?: { url: string; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds the full Open Graph and Twitter metadata for one page.
 * Next.js replaces (not merges) the parent's openGraph object when a page sets one,
 * so every page gets the complete set here: site name, locale, url, type and image.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const description = input.socialDescription ?? input.description;
  const images = input.image ? [{ ...input.image, ...OG_IMAGE_SIZE, type: "image/png" }] : undefined;
  const openGraph: NonNullable<Metadata["openGraph"]> =
    input.type === "article"
      ? {
          type: "article",
          publishedTime: input.publishedTime,
          modifiedTime: input.modifiedTime,
          authors: [SITE_CONFIG.name],
        }
      : { type: "website" };

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      ...openGraph,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      url: input.path,
      title: input.socialTitle,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      creator: X_HANDLE,
      title: input.socialTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/** Cuts text at a word boundary so it fits `max` characters, adding an ellipsis. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}…`;
}

/**
 * og:title for a post: the full title when it fits 60 characters, otherwise its first
 * clause (before ": " or the end of the first sentence), otherwise a clipped title.
 */
export function socialTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  const first = title.split(/:\s|(?<=[.?!])\s/)[0].trim();
  if (first.length >= 15 && first.length <= max) return first;
  return clip(title, max);
}

/** og:description for a post: as many whole sentences of the excerpt as fit in 155 characters. */
export function socialDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  let out = "";
  for (const sentence of text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? []) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  out = out.trim();
  return out.length >= 70 ? out : clip(text, max);
}
