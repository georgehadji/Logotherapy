import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { location, therapist } from "./site";
import { greekUpper } from "./format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (...p: string[]) => join(process.cwd(), ...p);

/**
 * Fonts are read from disk rather than fetched: the build must not depend on
 * network access, and Satori has no fallback that can draw Greek glyphs, so
 * a missing file would render blank boxes.
 */
const manropeBold = readFileSync(asset("assets", "fonts", "manrope-700.ttf"));
const manrope = readFileSync(asset("assets", "fonts", "manrope-400.ttf"));
/* The card's headline follows the page's: Libertinus Serif, not Manrope. */
const libertinusBold = readFileSync(asset("assets", "fonts", "libertinus-serif-700.ttf"));

// Mirrors app/globals.css. Satori cannot read CSS custom properties.
const PAPER = "#faf6f2";
const BLUSH = "#fdeae2";
const INK = "#291f19";
const INK_2 = "#4b4038";
const INK_3 = "#645850";
const LINE = "#e0d9d2";
const ACCENT = "#9c4535";

export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const isHome = title === therapist.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: PAPER,
          fontFamily: "Manrope",
        }}
      >
        {/* A soft blush disc off the right edge: the site's one tinted surface, no photograph needed. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -260,
            width: 760,
            height: 760,
            borderRadius: 9999,
            backgroundColor: BLUSH,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 68,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: ACCENT, display: "flex" }} />
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.4, color: INK }}>{therapist.brand}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Libertinus Serif",
                fontSize: title.length > 46 ? 58 : 76,
                fontWeight: 700,
                lineHeight: 1.12,
                color: INK,
                maxWidth: 940,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>

            <div style={{ marginTop: 18, fontSize: 19, letterSpacing: 2.6, color: INK_3 }}>{greekUpper(eyebrow)}</div>

            {subtitle && (
              <div style={{ marginTop: 20, fontSize: 26, lineHeight: 1.4, color: INK_2, maxWidth: 820 }}>{subtitle}</div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${LINE}`,
              paddingTop: 26,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: INK }}>{isHome ? therapist.title : therapist.brand}</div>
              <div style={{ fontSize: 21, color: INK_3, marginTop: 6 }}>
                {isHome ? location.line : `${therapist.name} · ${therapist.title}`}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: ACCENT }}>{therapist.phoneDisplay}</div>
              <div style={{ fontSize: 20, color: INK_3, marginTop: 6 }}>{`${location.area}, ${location.region}`}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope, style: "normal", weight: 400 },
        { name: "Manrope", data: manropeBold, style: "normal", weight: 700 },
        { name: "Libertinus Serif", data: libertinusBold, style: "normal", weight: 700 },
      ],
    }
  );
}
