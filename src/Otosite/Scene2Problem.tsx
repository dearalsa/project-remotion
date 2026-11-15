import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { FONT_FAMILY } from "./constants";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word timings relative to local scene start (scene starts at global frame 98)
  // f110 = local 12: calon
  // f122 = local 24: pembeli
  // f130 = local 32: bisa
  // f139 = local 41: jadi
  // f150 = local 52: kurang
  // f168 = local 70: percaya
  const wCalon = spring({ frame: frame - 12, fps, config: { damping: 14, mass: 0.5 } });
  const wPembeli = spring({ frame: frame - 24, fps, config: { damping: 14, mass: 0.5 } });
  const wBisa = spring({ frame: frame - 32, fps, config: { damping: 14, mass: 0.5 } });
  const wJadi = spring({ frame: frame - 41, fps, config: { damping: 14, mass: 0.5 } });
  const wKurang = spring({ frame: frame - 52, fps, config: { damping: 11, mass: 0.5 } });
  const wPercaya = spring({ frame: frame - 68, fps, config: { damping: 11, mass: 0.5 } });

  // Trust meter card entrance
  const cardSpring = spring({ frame: frame - 36, fps, config: { damping: 13 } });

  // Progress bar dropping smoothly from 100% to 15% (Turun drastis)
  const trustProgress = interpolate(frame, [46, 76], [100, 15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barColor = interpolateColors(trustProgress, [25, 75], ["#EF4444", "#FFD33C"]);

  // Thought bubble
  const qSpring = spring({ frame: frame - 55, fps, config: { damping: 12 } });

  // Outro transition (local frames 96 to 106)
  const sceneExit = interpolate(frame, [96, 106], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitTranslate = interpolate(frame, [96, 106], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        opacity: sceneExit,
        transform: `translateY(${exitTranslate}px)`,
        pointerEvents: "none",
      }}
    >
      {/* 1. Kinetic Headline (Top Center, y ≈ 350px) */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Line 1: calon pembeli bisa jadi */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: -5,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wCalon,
              transform: `translateY(${interpolate(wCalon, [0, 1], [24, 0])}px)`,
            }}
          >
            Calon
          </span>
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wPembeli,
              transform: `translateY(${interpolate(wPembeli, [0, 1], [24, 0])}px)`,
            }}
          >
            Pembeli
          </span>
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wBisa,
              transform: `translateY(${interpolate(wBisa, [0, 1], [24, 0])}px)`,
            }}
          >
            Bisa
          </span>
          <span
            style={{
              display: "inline-block",
              opacity: wJadi,
              transform: `translateY(${interpolate(wJadi, [0, 1], [24, 0])}px)`,
            }}
          >
            Jadi
          </span>
        </div>

        {/* Line 2: kurang percaya (Yellow fill + black stroke) */}
        <div
          style={{
            fontSize: 95,
            fontWeight: 950,
            lineHeight: 1.1,
            color: "#ff3133",
            letterSpacing: -0.5,
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#ff3133",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: -5,
              marginBottom: 20,
              paintOrder: "stroke fill",
              transform: `scale(${interpolate(wKurang, [0, 1], [0.75, 1])}) translateY(${interpolate(wKurang, [0, 1], [30, 0])}px)`,
              opacity: wKurang,
            }}
          >
            Kurang
          </span>
          <span
            style={{
              display: "inline-block",
              color: "#ff3133",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: -5,
              paintOrder: "stroke fill",
              transform: `scale(${interpolate(wPercaya, [0, 1], [0.75, 1])}) translateY(${interpolate(wPercaya, [0, 1], [30, 0])}px)`,
              opacity: wPercaya,
            }}
          >
            Percaya
          </span>
        </div>
      </div>

      {/* 2. Trust Meter Card (Center, y ≈ 620px) */}
      <div
        style={{
          position: "absolute",
          top: 620,
          left: 220,
          width: 640,
          height: 145,
          backgroundColor: "#FFFFFF",
          borderRadius: 36,
          border: "2px solid #000000",
          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          gap: 20,
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          zIndex: 8,
        }}
      >
        {/* Content */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: "#000000",
                letterSpacing: -1,
                fontWeight: 600,
              }}
            >
              Kepercayaan Pembeli
            </div>
            {/* Animasi Angka Persentase yang berubah mengikuti Bar */}
            <div
              style={{
                fontSize: 34,
                fontWeight: 300,
                letterSpacing: -3,
                color: barColor, // Warna teks ikut berubah jadi merah saat drop
                fontVariantNumeric: "tabular-nums", // Menjaga posisi angka agar tidak lompat-lompat
                lineHeight: 1,
              }}
            >
              {Math.round(trustProgress)}%
            </div>
          </div>

          {/* Meter Track */}
          <div
            style={{
              width: "100%",
              height: 24,
              backgroundColor: "#E2E8F0",
              borderRadius: 12,
              border: "2px solid #CBD5E1",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${trustProgress}%`,
                height: "100%",
                backgroundColor: barColor,
                borderRadius: 10,
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Character 2 (Concerned/Walking) with Drop Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 450,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
          transform: "scale(1.3)"
        }}
      >
        {/* Thought Bubble with Question Mark */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 430,
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "2px solid #000000",
            width: 56,
            height: 56,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.16)",
            transform: `scale(${qSpring}) translateY(${Math.sin(frame / 6) * 5}px)`,
            opacity: qSpring,
            zIndex: 12,
          }}
        >
          -_-
        </div>

        <Character id={2} height={540} delay={4} enterFrom="left" motion="idle-breathe" />
      </div>
    </AbsoluteFill>
  );
};