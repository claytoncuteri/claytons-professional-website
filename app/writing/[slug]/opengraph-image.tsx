import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/db";
import { OG_IMAGE_SIZE } from "@/lib/seo";

// Article preview card: the post's own title on the site's brand template.
// Posts are created in the admin dashboard and have no image of their own, so the card is drawn
// on request. Fonts are static TTF copies of the site's Outfit (700) and DM Sans (500) from
// Google Fonts (SIL Open Font License), because ImageResponse cannot use next/font or variable fonts.

// Drawn per request (like the page itself), so an edited title shows up straight away.
export const dynamic = "force-dynamic";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return [
    {
      id: "card",
      size: OG_IMAGE_SIZE,
      contentType: "image/png",
      alt: post ? `Article by Clayton Cuteri: ${post.title}` : "Writing by Clayton Cuteri",
    },
  ];
}

const asset = (...p: string[]) => readFile(path.join(process.cwd(), ...p));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post && post.published ? post.title : "Writing on AI, engineering and leadership";
  const category = post && post.published ? post.category : "Writing";

  const [outfit, dmSans, headshot] = await Promise.all([
    asset("assets", "og-fonts", "Outfit-Bold.ttf"),
    asset("assets", "og-fonts", "DMSans-Medium.ttf"),
    asset("public", "headshot.jpg"),
  ]);
  const photo = `data:image/jpeg;base64,${headshot.toString("base64")}`;
  // Long titles split at their first ": " or sentence end into a headline and a supporting line.
  const match = title.length > 50 ? title.match(/^(.{12,60}?)(?::\s|(?<=[.?!])\s)(.+)$/) : null;
  const headline = match ? match[1] : title;
  const subline = match ? match[2] : "";
  const headlineSize = headline.length > 60 ? 60 : headline.length > 40 ? 70 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 70px",
          background: "#FAFAFA",
          backgroundImage:
            "linear-gradient(rgba(0,113,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          fontFamily: "DM Sans",
          color: "#1D1D1F",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0071E3",
          }}
        >
          {`Writing · ${category}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1060 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Outfit",
              fontSize: headlineSize,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          >
            {headline}
          </div>
          {subline ? (
            <div style={{ display: "flex", marginTop: 24, fontSize: 36, lineHeight: 1.3, color: "#6E6E73" }}>
              {subline}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={photo}
              width={72}
              height={72}
              alt=""
              style={{ borderRadius: 999, objectFit: "cover", border: "3px solid #FFFFFF" }}
            />
            <div style={{ display: "flex", marginLeft: 20, fontFamily: "Outfit", fontSize: 30 }}>
              Clayton Cuteri
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6E6E73" }}>claytoncuteri.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: outfit, weight: 700, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 500, style: "normal" },
      ],
    }
  );
}
