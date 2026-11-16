import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import {
  COLOR_BORDER,
  COLOR_DARK,
  COLOR_GRAY,
  COLOR_YELLOW,
  FONT_FAMILY,
  SAFE_LEFT,
  SAFE_TOP,
  timingData,
} from "./constants";

export const Scene3UsefulInfo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene3;
  const { startFrame, triggers } = sceneConfig;

  // Scene-local frames
  const fBadge = triggers.badgeTips2 - startFrame; // 0
  const fChar8 = triggers.character8Enter - startFrame; // 6
  const fPromo = triggers.pillPromo - startFrame; // 52
  const fSimulasi = triggers.pillSimulasi - startFrame; // 68
  const fTipe = triggers.pillTipe - startFrame; // 84

  // Character 8 entrance
  const enter8 = spring({
    frame: frame - fChar8,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Tips 2 Badge spring
  const badgeTips2Spring = spring({
    frame: frame - fBadge,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // Word-by-word kinetic typography springs - synced to voiceover rhythm
  const wKirim = spring({ frame: frame - 22, fps, config: { damping: 14, mass: 0.5 } });
  const wInfo = spring({ frame: frame - 28, fps, config: { damping: 14, mass: 0.5 } });
  const wBerguna = spring({ frame: frame - 34, fps, config: { damping: 11, mass: 0.5 } });

  // Pill springs matching Scene3Catalog slowSpringConfig from src/Otosite/
  const slowSpringConfig = { damping: 16, mass: 1.3, stiffness: 65 };
  const pillPromoSpring = spring({ frame: frame - fPromo, fps, config: slowSpringConfig });
  const pillSimulasiSpring = spring({ frame: frame - fSimulasi, fps, config: slowSpringConfig });
  const pillTipeSpring = spring({ frame: frame - fTipe, fps, config: slowSpringConfig });

  // Outro transition (local frames 112 to 122)
  const sceneExit = interpolate(frame, [112, 122], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = interpolate(frame, [112, 122], [1, 0], {
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
          {/* Badge Tips 2 */}
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
                  transform: `scale(${interpolate(badgeTips2Spring, [0, 1], [0.75, 1])}) translateY(${interpolate(badgeTips2Spring, [0, 1], [20, 0])}px)`,
                  opacity: badgeTips2Spring,
                  letterSpacing: -2,
                }}
              >
                Tips 2
              </div>
            )}
          </div>

          {/* Line 1: Kirim Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginTop: 20,
              marginBottom: 16,
              fontSize: 80,
              fontStyle: "italic",
              fontWeight: 700,
              color: COLOR_DARK,
              letterSpacing: -5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 22 ? wKirim : 0,
                transform: `translateY(${interpolate(wKirim, [0, 1], [20, 0])}px)`,
              }}
            >
              Kirim
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 28 ? wInfo : 0,
                transform: `translateY(${interpolate(wInfo, [0, 1], [20, 0])}px)`,
              }}
            >
              Info 
            </span>
              <span
              style={{
                display: "inline-block",
                opacity: frame >= 28 ? wInfo : 0,
                transform: `translateY(${interpolate(wInfo, [0, 1], [20, 0])}px)`,
              }}
            >
              Berguna
            </span>
          </div>
        </div>

        {/* 3 Interactive Feature Pills (Stacked vertically like Scene3Catalog) */}
        <div
          style={{
            position: "absolute",
            top: 460,
            left: 60,
            width: 460,
            display: "flex",
            flexDirection: "column",
            gap: 45,
            transform: "scale(1.18)",
            transformOrigin: "top left",
          }}
        >
          {/* Pill 1: Promo Terbaru */}
          <div
            style={{
              backgroundColor: "#FFFBEB",
              border: `2px solid ${COLOR_BORDER}`,
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${interpolate(pillPromoSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(pillPromoSpring, [0, 1], [30, 0])}px)`,
              opacity: pillPromoSpring,
              letterSpacing: -1,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: COLOR_YELLOW,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🏷️
            </div>
            <div>
              <div style={{ fontSize: 24, color: COLOR_DARK, letterSpacing: -2 }}>Promo Terbaru</div>
              <div style={{ fontSize: 16, color: COLOR_GRAY, marginTop: 4 }}>Diskon DP & Paket Bunga Rendah</div>
            </div>
          </div>

          {/* Pill 2: Simulasi Kredit */}
          <div
            style={{
              backgroundColor: "#EFF6FF",
              border: `2px solid ${COLOR_BORDER}`,
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${interpolate(pillSimulasiSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(pillSimulasiSpring, [0, 1], [30, 0])}px)`,
              opacity: pillSimulasiSpring,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "#BFDBFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                letterSpacing: -1,
              }}
            >
              📊
            </div>
            <div>
              <div style={{ fontSize: 24, color: COLOR_DARK, letterSpacing: -2 }}>Simulasi Kredit</div>
              <div style={{ fontSize: 16, color: COLOR_GRAY, marginTop: 4 }}>Rincian Cicilan & Tenor Jelas</div>
            </div>
          </div>

          {/* Pill 3: Perbandingan Tipe Mobil */}
          <div
            style={{
              backgroundColor: "#ffd13c8c",
              border: `2px solid ${COLOR_BORDER}`,
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              borderRadius: 24,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${interpolate(pillTipeSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(pillTipeSpring, [0, 1], [30, 0])}px)`,
              opacity: pillTipeSpring,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "#d8ab16da",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                letterSpacing: -1,
              }}
            >
              🚗
            </div>
            <div>
              <div style={{ fontSize: 24, color: COLOR_DARK, letterSpacing: -2 }}>Perbandingan Tipe</div>
              <div style={{ fontSize: 16, color: COLOR_GRAY, marginTop: 4 }}>Komparasi Fitur Antar Varian</div>
            </div>
          </div>
        </div>

        {/* Character 8 */}
        <Character
          characterNumber={8}
          scale={1.7}
          entryProgress={enter8}
          poseVariant="ok"
          style={{
            top: 700,
            right: -50,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
