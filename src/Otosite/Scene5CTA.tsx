import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { FONT_FAMILY } from "./constants";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1 Headline springs (local 0 to 55)
  // f503 = local 12: upgrade
  // f518 = local 27: cara
  // f526 = local 35: jualanmu
  // f547 = local 56: sekarang
  const wUpgrade = spring({ frame: frame - 12, fps, config: { damping: 13, mass: 0.5 } });
  const wCara = spring({ frame: frame - 27, fps, config: { damping: 14, mass: 0.5 } });
  const wJualanmu = spring({ frame: frame - 35, fps, config: { damping: 14, mass: 0.5 } });
  const wSekarang = spring({ frame: frame - 56, fps, config: { damping: 14, mass: 0.5 } });

  // Part 2 Headline springs (local 56 to 109)
  // f570 = local 79: bikin website
  // f592 = local 101: sales mobil
  const wBikin = spring({ frame: frame - 79, fps, config: { damping: 13, mass: 0.5 } });
  const wSales = spring({ frame: frame - 101, fps, config: { damping: 13, mass: 0.5 } });

  // Part 3 Ending (Local frame 110 to 155 / global f601-f646):
  // Clean typography: "UPGARDE BERSAMA OTOSITE" as the sole ending element
  const endingSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 140 },
  });

  const isEnding = frame >= 110;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
      }}
    >
      {/* Part 1 & Part 2 */}
      {!isEnding && (
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {frame < 79 ? (
            /* Part 1: upgrade cara jualanmu sekarang */
            <>
              <div
                style={{
                  color: "#1800ac",
                  fontSize: 130,
                  fontStyle: "italic",
                  fontWeight: 700,
                  letterSpacing: -5,
                  padding: "6px 24px",
                  borderRadius: 16,
                  marginBottom: 35,
                  transform: `scale(${interpolate(wUpgrade, [0, 1], [0.8, 1])})`,
                  opacity: wUpgrade,
                }}
              >
                Upgrade
              </div>

              <div
                style={{
                  fontSize: 65,
                  color: "#000000",
                  letterSpacing: -5,
                  marginBottom: 35,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginRight: 12,
                    opacity: wCara,
                    transform: `translateY(${interpolate(wCara, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Cara
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: wJualanmu,
                    transform: `translateY(${interpolate(wJualanmu, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Jualanmu
                </span>
              </div>

              <div
                style={{
                  fontSize: 65,
                  letterSpacing: -5,
                  color: "#000000",
                  opacity: wSekarang,
                  transform: `translateY(${interpolate(wSekarang, [0, 1], [16, 0])}px)`,
                }}
              >
                Sekarang
              </div>
            </>
          ) : (
            /* Part 2: bikin website sales mobil */
            <>
              <div
                style={{
                  fontSize: 75,
                  letterSpacing: -5,
                  color: "#000000",
                  marginBottom: 20,
                  opacity: wBikin,
                  transform: `scale(${interpolate(wBikin, [0, 1], [0.8, 1])}) translateY(${interpolate(wBikin, [0, 1], [20, 0])}px)`,
                }}
              >
                Bikin Website
              </div>

              <div
                style={{
                  fontSize: 100,
                  letterSpacing: -5,
                  fontStyle: "italic",
                  textDecoration: "underline",
                  color: "#ff3133",
                  paintOrder: "stroke fill",
                  opacity: wSales,
                  transform: `scale(${interpolate(wSales, [0, 1], [0.8, 1])}) translateY(${interpolate(wSales, [0, 1], [20, 0])}px)`,
                }}
              >
                Sales Mobil
              </div>
            </>
          )}
        </div>
      )}

      {/* Character 4 */}
      {!isEnding && (
        <div
          style={{
            position: "absolute",
            bottom: 550,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5,
            transform: "scale(1.3)"
          }}
        >
          <Character id={4} height={540} delay={6} motion="idle-breathe" />
        </div>
      )}

      {/* Final Ending */}
      {isEnding && (
        <div
          style={{
            position: "absolute",
            top: 720,
            left: 40,
            right: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 950,
              lineHeight: 1.25,
              letterSpacing: 2,
              color: "#1E293B",
              textTransform: "uppercase",
              textShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              transform: `scale(${interpolate(endingSpring, [0, 1], [0.75, 1])}) translateY(${interpolate(endingSpring, [0, 1], [30, 0])}px)`,
              opacity: endingSpring,
            }}
          >
            UPGRADE BERSAMA OTOSITE
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
