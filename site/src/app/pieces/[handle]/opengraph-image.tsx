import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PIECES, pieceByHandle, startingPrice, formatPrice } from "@/lib/catalog/data";
import { PHOTO, PIECE_PHOTOS } from "@/lib/catalog/photos";

export const alt = "American Jewelry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PIECES.map((p) => ({ handle: p.handle }));
}

/** The social card: the photograph on the left, the name and the house on the right, in the house type. */
export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = pieceByHandle(handle);
  const key = (p && PIECE_PHOTOS[p.handle]?.[0]) ?? "hero-box";
  const photo = PHOTO[key];
  const [img, font] = await Promise.all([
    readFile(join(process.cwd(), "public", photo.src)),
    readFile(join(process.cwd(), "assets", "EBGaramond-400.woff")).catch(() => null),
  ]);
  const src = `data:image/jpeg;base64,${img.toString("base64")}`;
  const low = p ? startingPrice(p) : null;
  const manMade = p?.versions.some((v) => v.origin === "man-made");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#141414", fontFamily: font ? "Garamond" : "serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={630} height={630} style={{ width: 630, height: 630, objectFit: "cover" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 48px" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.26em", textTransform: "uppercase" }}>American Jewelry</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 54, lineHeight: 1.05 }}>{p ? p.name.replace(/^No\. \d+ · /, "") : "A house of fine jewelry"}</div>
            <div style={{ display: "flex", fontSize: 24, color: "#4a4a4a", lineHeight: 1.4 }}>
              {p ? (manMade ? "Man-made diamond" : p.oneOfOne ? "One of one" : "Natural diamond and solid gold") : "Brentwood and Mt. Juliet, Tennessee"}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#63676e" }}>
            <span>{low === null ? "Price on request" : `From ${formatPrice(low)}`}</span>
            <span>Designed in Tennessee</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Garamond", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
