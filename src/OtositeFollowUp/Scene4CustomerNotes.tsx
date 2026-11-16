
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import {
  COLOR_BORDER,
  COLOR_CARD_BG,
  COLOR_DARK,
  COLOR_GRAY,
  COLOR_YELLOW,
  COLOR_RED,
  FONT_FAMILY,
  SAFE_LEFT,
  SAFE_TOP,
  timingData,
} from "./constants";

export const Scene4CustomerNotes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene4;
  const { startFrame, triggers } = sceneConfig;

  // Scene-local frame conversion
  const fBadge = triggers.badgeTips3 - startFrame;
  const fChar9 = triggers.character9Enter - startFrame;

  // Field muncul berurutan dengan jeda singkat
  const fField1 = triggers.fieldTipe - startFrame;
  const fField2 = fField1 + 5;
  const fField3 = fField1 + 10;

  // Character 9 entrance
  const enter9 = spring({
    frame: frame - fChar9,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Tips 3 Badge spring
  const badgeTips3Spring = spring({
    frame: frame - fBadge,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // Word-by-word kinetic typography springs
  const wCatat = spring({
    frame: frame - 23,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const wPreferensi = spring({
    frame: frame - 31,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const wCustomer = spring({
    frame: frame - 38,
    fps,
    config: { damping: 11, mass: 0.5 },
  });

  // Customer note card entrance
  const cardSpring = spring({
    frame: frame - fField1,
    fps,
    config: { damping: 16, mass: 0.25 },
  });

  // Note fields springs
  const field1Spring = spring({
    frame: frame - fField1,
    fps,
    config: { damping: 16, mass: 0.25 },
  });

  const field2Spring = spring({
    frame: frame - fField2,
    fps,
    config: { damping: 16, mass: 0.25 },
  });

  const field3Spring = spring({
    frame: frame - fField3,
    fps,
    config: { damping: 16, mass: 0.25 },
  });

  // Bottom supporting text muncul cepat setelah ketiga field mulai masuk
  const bottomTextSpring = spring({
    frame: frame - (fField1 + 16),
    fps,
    config: { damping: 20, mass: 0.2 },
  });

  // Outro transition
  const sceneExit = interpolate(frame, [150, 162], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(frame, [150, 162], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        opacity: sceneOpacity,
        transform: `translateY(${sceneExit}px)`,
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
        {/* Top Typography Header */}
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Badge Tips 3 */}
          <div style={{ marginBottom: 16 }}>
            {frame >= fBadge && (
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: COLOR_YELLOW,
                  color: COLOR_DARK,
                  fontWeight: 700,
                  fontSize: 50,
                  padding: "20px 80px",
                  borderRadius: 50,
                  border: "2.5px solid #000000",
                  boxShadow: "0 6px 0 #000000",
                  transform: `scale(${interpolate(badgeTips3Spring, [0, 1], [0.75, 1])}) translateY(${interpolate(badgeTips3Spring, [0, 1], [20, 0])}px)`,
                  opacity: badgeTips3Spring,
                  letterSpacing: -2,
                }}
              >
                Tips 3
              </div>
            )}
          </div>

          {/* Line 1: Catat Preferensi */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginTop: 25,
              fontStyle: "italic",
              marginBottom: 12,
              fontSize: 70,
              color: COLOR_DARK,
              letterSpacing: -5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 23 ? wCatat : 0,
                transform: `translateY(${interpolate(wCatat, [0, 1], [20, 0])}px)`,
              }}
            >
              Catat
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 23 ? wCatat : 0,
                transform: `translateY(${interpolate(wCatat, [0, 1], [20, 0])}px)`,
              }}
            >
              Kebutuhan
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 31 ? wPreferensi : 0,
                transform: `translateY(${interpolate(wPreferensi, [0, 1], [20, 0])}px)`,
              }}
            >
              Customer
            </span>
          </div>
        </div>

        {/* Digital Customer Profile Note Card */}
        <div
          style={{
            position: "absolute",
            top: 450,
            left: 50,
            width: 480,
            backgroundColor: COLOR_CARD_BG,
            borderRadius: 28,
            border: `2px solid ${COLOR_BORDER}`,
            boxShadow: "0 16px 36px rgba(0,0,0,0.06)",
            padding: "26px 24px",
            transform: `scale(${1.18 * interpolate(cardSpring, [0, 1], [0.92, 1])})`,
            transformOrigin: "top left",
            opacity: cardSpring,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLOR_YELLOW,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              📝
            </div>
            <div>
              <div style={{ fontSize: 23, color: COLOR_DARK, letterSpacing: -2 }}>
                Catatan Customer
              </div>
            </div>
          </div>

          {/* Field 1: Tipe Mobil Impian */}
          <div
            style={{
              transform: `scale(${interpolate(field1Spring, [0, 1], [0.85, 1])})`,
              opacity: field1Spring,
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 18,
              padding: "16px 18px",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 13, color: COLOR_GRAY, fontWeight: 700, textTransform: "uppercase" }}>
              1. Tipe Mobil Impian
            </div>
            <div style={{ fontSize: 20, color: COLOR_DARK, marginTop: 6, letterSpacing: -1 }}>
              SUV 7-Seater Matic
            </div>
          </div>

          {/* Field 2: Budget Customer */}
          <div
            style={{
              transform: `scale(${interpolate(field2Spring, [0, 1], [0.85, 1])})`,
              opacity: field2Spring,
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 18,
              padding: "16px 18px",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 13, color: COLOR_GRAY, fontWeight: 700, textTransform: "uppercase" }}>
              2. Budget Customer
            </div>
            <div style={{ fontSize: 20, color: COLOR_DARK, marginTop: 6, letterSpacing: -1 }}>
              DP 30 Juta • Angsuran 5 Jutaan
            </div>
          </div>

          {/* Field 3: Rencana Beli */}
          <div
            style={{
              transform: `scale(${interpolate(field3Spring, [0, 1], [0.85, 1])})`,
              opacity: field3Spring,
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: 18,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 13, color: COLOR_GRAY, fontWeight: 700, textTransform: "uppercase" }}>
              3. Kapan Rencana Beli
            </div>
            <div style={{ fontSize: 20, color: COLOR_DARK, marginTop: 6, letterSpacing: -1 }}>
              Bulan Depan (Akhir Tahun)
            </div>
          </div>
        </div>

        {/* Bottom Supporting Text */}
        <div
          style={{
            position: "absolute",
            top: 1000,
            left: 5,
            width: 980,
            textAlign: "center",
            fontSize: 50,
            fontWeight: 700,
            letterSpacing: -4,
            color: COLOR_DARK,
            opacity: bottomTextSpring,
            transform: `translateY(${interpolate(bottomTextSpring, [0, 1], [18, 0])}px)`,
          }}
        >
          Biar{" "}
          <span style={{ fontStyle: "italic", color: COLOR_RED }}>komunikasi</span>
          {" "}berikutnya lebih{" "}
          <span style={{ fontStyle: "italic", color: COLOR_RED }}>terarah</span>
          {" "}dan{" "}
          <span style={{ fontStyle: "italic", color: COLOR_RED }}>personal</span>
        </div>

        {/* Character 9 */}
        <Character
          characterNumber={9}
          scale={1.30}
          entryProgress={enter9}
          poseVariant="writing"
          style={{
            top: 510,
            right: -70,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
