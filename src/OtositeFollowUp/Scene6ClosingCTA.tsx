import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import {
  COLOR_BORDER,
  COLOR_CARD_BG,
  COLOR_DARK,
  COLOR_GRAY,
  COLOR_YELLOW,
  FONT_FAMILY,
  SAFE_LEFT,
  SAFE_TOP,
  timingData,
} from "./constants";

export const Scene6ClosingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene6;
  const { startFrame, triggers } = sceneConfig;

  // Scene-local frame conversion
  const fChar11 = triggers.character11Enter - startFrame; // 4
  const fCtaPart2 = triggers.ctaPart2 - startFrame; // 63
  const fDomain = triggers.domainPill - startFrame; // 72
  const fPhone = triggers.phoneBadge - startFrame; // 96
  const fVoEnd = triggers.voEnd - startFrame; // 106

  const isPart2 = frame >= fCtaPart2;

  // Character 11 entrance
  const enter11 = spring({
    frame: frame - fChar11,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Word-by-word kinetic typography springs (Part 6A) - synced to voiceover rhythm
  const wYuk = spring({ frame: frame - 0, fps, config: { damping: 14, mass: 0.5 } });
  const wTingkatkan = spring({ frame: frame - 2, fps, config: { damping: 14, mass: 0.5 } });

  const wPenjualan = spring({ frame: frame - 16, fps, config: { damping: 11, mass: 0.5 } });
  const wMobil = spring({ frame: frame - 26, fps, config: { damping: 11, mass: 0.5 } });

  const wDengan = spring({ frame: frame - 33, fps, config: { damping: 14, mass: 0.5 } });
  const wOtositeCta = spring({ frame: frame - 39, fps, config: { damping: 11, mass: 0.5 } });

  // Word-by-word kinetic typography springs (Part 6B) - synced to voiceover rhythm
  const wKunjungi = spring({ frame: frame - 63, fps, config: { damping: 14, mass: 0.5 } });
  const wDomain = spring({ frame: frame - 72, fps, config: { damping: 11, mass: 0.5 } });
  const wSekarang = spring({ frame: frame - 89, fps, config: { damping: 11, mass: 0.5 } });

  // CTA Card spring
  const ctaCardSpring = spring({
    frame: frame - fCtaPart2,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  // Domain pop
  const domainSpring = spring({
    frame: frame - fDomain,
    fps,
    config: { damping: 11, mass: 0.5 },
  });

  // Phone WhatsApp pop
  const phoneSpring = spring({
    frame: frame - fPhone,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // Subtle breathing pulse for hold phase (frame >= 106)
  const breathing = interpolate(Math.sin((frame / 15) * Math.PI), [-1, 1], [0.985, 1.015]);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: SAFE_TOP,
          left: SAFE_LEFT,
          width: 960,
          height: 1300,
        }}
      >
        {!isPart2 ? (
          /* PART 6A: Yuk Tingkatkan Penjualan Mobil Kamu Dengan Otosite! */
          <>
            {/* Top Typography Header */}
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              {/* Line 1: Yuk, Tingkatkan */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                  fontSize: 56,
                  fontWeight: 800,
                  color: COLOR_DARK,
                  letterSpacing: -2,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 0 ? wYuk : 0,
                    transform: `translateY(${interpolate(wYuk, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Yuk,
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 2 ? wTingkatkan : 0,
                    transform: `translateY(${interpolate(wTingkatkan, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Tingkatkan
                </span>
              </div>

              {/* Line 2 (Punch): Penjualan Mobil */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 80,
                    fontWeight: 950,
                    color: COLOR_YELLOW,
                    WebkitTextStroke: "3.5px #000000",
                    paintOrder: "stroke fill",
                    filter: "drop-shadow(0 6px 0 #000000)",
                    letterSpacing: -2,
                    opacity: frame >= 16 ? wPenjualan : 0,
                    transform: `scale(${interpolate(wPenjualan, [0, 1], [0.75, 1])}) translateY(${interpolate(wPenjualan, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Penjualan
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 80,
                    fontWeight: 950,
                    color: COLOR_YELLOW,
                    WebkitTextStroke: "3.5px #000000",
                    paintOrder: "stroke fill",
                    filter: "drop-shadow(0 6px 0 #000000)",
                    letterSpacing: -2,
                    opacity: frame >= 26 ? wMobil : 0,
                    transform: `scale(${interpolate(wMobil, [0, 1], [0.75, 1])}) translateY(${interpolate(wMobil, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Mobil
                </span>
              </div>

              {/* Line 3: Dengan Otosite! */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 55,
                    fontWeight: 800,
                    color: COLOR_DARK,
                    letterSpacing: -2,
                    opacity: frame >= 33 ? wDengan : 0,
                    transform: `translateY(${interpolate(wDengan, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Dengan
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 75,
                    fontWeight: 950,
                    fontStyle: "italic",
                    color: "#1800ac",
                    letterSpacing: -2,
                    opacity: frame >= 39 ? wOtositeCta : 0,
                    transform: `scale(${interpolate(wOtositeCta, [0, 1], [0.75, 1])}) translateY(${interpolate(wOtositeCta, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Otosite!
                </span>
              </div>
            </div>

            {/* Character 11 (Center Proud) */}
            <Character
              characterNumber={11}
              scale={1.05}
              entryProgress={enter11}
              poseVariant="eureka"
              style={{
                top: 460,
                left: 310,
              }}
            />
          </>
        ) : (
          /* PART 6B: Kunjungi otosite.id Sekarang! + Phone Contact */
          <>
            {/* Main CTA Card */}
            <div
              style={{
                position: "absolute",
                top: 140,
                left: 50,
                right: 50,
                backgroundColor: COLOR_CARD_BG,
                borderRadius: 36,
                border: `3px solid ${COLOR_BORDER}`,
                boxShadow: "0 24px 50px rgba(0,0,0,0.08)",
                padding: "45px 36px",
                textAlign: "center",
                transform: `scale(${ctaCardSpring * (frame >= fVoEnd ? breathing : 1)})`,
                opacity: ctaCardSpring,
                zIndex: 10,
              }}
            >
              {/* Small Headline: Kunjungi */}
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 48,
                    fontWeight: 700,
                    color: COLOR_GRAY,
                    letterSpacing: -1,
                    opacity: frame >= 63 ? wKunjungi : 0,
                    transform: `translateY(${interpolate(wKunjungi, [0, 1], [18, 0])}px)`,
                  }}
                >
                  Kunjungi
                </span>
              </div>

              {/* Huge Brand Website: otosite.id */}
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 90,
                    fontWeight: 950,
                    fontStyle: "italic",
                    color: "#1800ac",
                    letterSpacing: -4,
                    textDecoration: "underline",
                    opacity: frame >= 72 ? wDomain : 0,
                    transform: `scale(${interpolate(domainSpring, [0, 1], [0.8, 1]) * interpolate(wDomain, [0, 1], [0.75, 1])}) translateY(${interpolate(wDomain, [0, 1], [24, 0])}px)`,
                  }}
                >
                  otosite.id
                </span>
              </div>

              {/* Action Urgency: Sekarang! */}
              <div style={{ marginBottom: 36 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 60,
                    fontWeight: 950,
                    fontStyle: "italic",
                    color: "#FF3133",
                    letterSpacing: -2,
                    opacity: frame >= 89 ? wSekarang : 0,
                    transform: `scale(${interpolate(wSekarang, [0, 1], [0.8, 1])}) translateY(${interpolate(wSekarang, [0, 1], [20, 0])}px)`,
                  }}
                >
                  Sekarang!
                </span>
              </div>

              <div
                style={{
                  height: 2,
                  backgroundColor: "#E2E8F0",
                  width: "80%",
                  margin: "0 auto 30px auto",
                }}
              />

              {/* WhatsApp Call to Action Pill */}
              <div
                style={{
                  transform: `scale(${phoneSpring})`,
                  opacity: phoneSpring,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: "#F0FDF4",
                  border: "2.5px solid #10B981",
                  borderRadius: 999,
                  padding: "16px 36px",
                  boxShadow: "0 10px 24px rgba(16, 185, 129, 0.12)",
                }}
              >
                <span style={{ fontSize: 32 }}>💬</span>
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: COLOR_DARK,
                    letterSpacing: -0.5,
                  }}
                >
                  +62 877-5667-6669
                </span>
              </div>
            </div>

            {/* Character 11 (Standing next to CTA Card) */}
            <Character
              characterNumber={11}
              scale={0.92}
              entryProgress={1}
              poseVariant="idle"
              style={{
                top: 730,
                left: 350,
              }}
            />
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
