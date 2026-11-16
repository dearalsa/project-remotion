import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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

export const Scene5OtositeWeb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene5;
  const { startFrame, triggers } = sceneConfig;

  // Scene-local frame conversion
  const fChar10 = triggers.character10Enter - startFrame; // 9
  const fPhone = triggers.phoneMockup - startFrame; // 24
  const fKatalog = triggers.featKatalog - startFrame; // 87
  const fSimulasi = triggers.featSimulasi - startFrame; // 120
  const fWhatsApp = triggers.featWhatsApp - startFrame; // 149

  // Character 10 entrance
  const enter10 = spring({
    frame: frame - fChar10,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Word-by-word kinetic typography springs - synced to voiceover rhythm
  // Line 1: Mau Lebih Gampang?
  const wMau = spring({ frame: frame - 7, fps, config: { damping: 14, mass: 0.5 } });
  const wLebih = spring({ frame: frame - 9, fps, config: { damping: 14, mass: 0.5 } });
  const wGampang = spring({ frame: frame - 14, fps, config: { damping: 14, mass: 0.5 } });

  // Line 2: Pakai Website Sales Mobil
  const wPakai = spring({ frame: frame - 26, fps, config: { damping: 14, mass: 0.5 } });
  const wWebsite = spring({ frame: frame - 30, fps, config: { damping: 14, mass: 0.5 } });
  const wSales = spring({ frame: frame - 34, fps, config: { damping: 14, mass: 0.5 } });
  const wMobil = spring({ frame: frame - 42, fps, config: { damping: 14, mass: 0.5 } });

  // Line 3: Dari Otosite
  const wDari = spring({ frame: frame - 51, fps, config: { damping: 14, mass: 0.5 } });
  const wOtosite = spring({ frame: frame - 58, fps, config: { damping: 11, mass: 0.5 } });

  // Phone Mockup spring
  const phoneSpring = spring({
    frame: frame - fPhone,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  // Feature pills springs
  const feat1Spring = spring({ frame: frame - fKatalog, fps, config: { damping: 12, mass: 0.5 } });
  const feat2Spring = spring({ frame: frame - fSimulasi, fps, config: { damping: 12, mass: 0.5 } });
  const feat3Spring = spring({ frame: frame - fWhatsApp, fps, config: { damping: 12, mass: 0.5 } });

  // Outro transition (local frames 174 to 186)
  const sceneExit = interpolate(frame, [174, 186], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = interpolate(frame, [174, 186], [1, 0], {
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
            top: 25,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Line 1: Mau Lebih Gampang? */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
              fontSize: 52,
              fontWeight: 700,
              color: COLOR_DARK,
              letterSpacing: -2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 7 ? wMau : 0,
                transform: `translateY(${interpolate(wMau, [0, 1], [20, 0])}px)`,
              }}
            >
              Mau
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 9 ? wLebih : 0,
                transform: `translateY(${interpolate(wLebih, [0, 1], [20, 0])}px)`,
              }}
            >
              Lebih
            </span>
            <span
              style={{
                display: "inline-block",
                fontStyle: "italic",
                opacity: frame >= 14 ? wGampang : 0,
                transform: `translateY(${interpolate(wGampang, [0, 1], [20, 0])}px)`,
              }}
            >
              Gampang?
            </span>
          </div>

          {/* Line 2: Pakai Website Sales Mobil */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
              fontSize: 56,
              fontWeight: 800,
              color: COLOR_DARK,
              letterSpacing: -2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 26 ? wPakai : 0,
                transform: `translateY(${interpolate(wPakai, [0, 1], [20, 0])}px)`,
              }}
            >
              Pakai
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 30 ? wWebsite : 0,
                transform: `translateY(${interpolate(wWebsite, [0, 1], [20, 0])}px)`,
              }}
            >
              Website
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 34 ? wSales : 0,
                transform: `translateY(${interpolate(wSales, [0, 1], [20, 0])}px)`,
              }}
            >
              Sales
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 42 ? wMobil : 0,
                transform: `translateY(${interpolate(wMobil, [0, 1], [20, 0])}px)`,
              }}
            >
              Mobil
            </span>
          </div>

          {/* Line 3 (Brand Hero): Dari Otosite */}
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
                fontSize: 60,
                fontWeight: 800,
                color: COLOR_DARK,
                letterSpacing: -2,
                opacity: frame >= 51 ? wDari : 0,
                transform: `translateY(${interpolate(wDari, [0, 1], [20, 0])}px)`,
              }}
            >
              Dari
            </span>
            <span
              style={{
                display: "inline-block",
                fontSize: 95,
                fontWeight: 950,
                fontStyle: "italic",
                color: "#1800ac",
                letterSpacing: -3,
                opacity: frame >= 58 ? wOtosite : 0,
                transform: `scale(${interpolate(wOtosite, [0, 1], [0.75, 1])}) translateY(${interpolate(wOtosite, [0, 1], [28, 0])}px)`,
              }}
            >
              Otosite
            </span>
          </div>
        </div>

        {/* Center-Right: Mockup Smartphone with Otosite Website */}
        <div
          style={{
            position: "absolute",
            top: 310,
            right: 40,
            width: 440,
            height: 680,
            backgroundColor: COLOR_CARD_BG,
            borderRadius: 36,
            border: `2px solid ${COLOR_BORDER}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
            transform: `scale(${phoneSpring}) translateY(${(1 - phoneSpring) * 60}px)`,
          }}
        >
          {/* Browser / Website header */}
          <div
            style={{
              height: 54,
              backgroundColor: "#F1F5F9",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              gap: 8,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLOR_YELLOW }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#10B981" }} />
            <div
              style={{
                marginLeft: 10,
                flex: 1,
                height: 30,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 13,
                color: COLOR_GRAY,
                fontWeight: 600,
              }}
            >
              🔒 salesmobil.otosite.id
            </div>
          </div>

          {/* Website Image */}
          <div style={{ position: "relative", width: "100%", height: 626, overflow: "hidden" }}>
            <Img
              src={staticFile("assets/Website Otosite.png")}
              style={{
                width: "100%",
                height: "auto",
                transform: `translateY(${interpolate(frame, [fPhone, fPhone + 90], [0, -120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            />
          </div>
        </div>

        {/* Left Side: 3 Feature Badges Floating */}
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 40,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 10,
          }}
        >
          {/* Feature 1: Katalog Lengkap */}
          <div
            style={{
              transform: `scale(${interpolate(feat1Spring, [0, 1], [0.8, 1])}) translateY(${interpolate(feat1Spring, [0, 1], [30, 0])}px)`,
              opacity: feat1Spring,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLOR_BORDER}`,
              borderRadius: 22,
              padding: "18px 20px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32 }}>🚗</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: COLOR_DARK }}>Katalog Lengkap</div>
              <div style={{ fontSize: 14, color: COLOR_GRAY, marginTop: 2 }}>Spesifikasi, foto & warna</div>
            </div>
          </div>

          {/* Feature 2: Form Simulasi Kredit */}
          <div
            style={{
              transform: `scale(${interpolate(feat2Spring, [0, 1], [0.8, 1])}) translateY(${interpolate(feat2Spring, [0, 1], [30, 0])}px)`,
              opacity: feat2Spring,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLOR_BORDER}`,
              borderRadius: 22,
              padding: "18px 20px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32 }}>🧮</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: COLOR_DARK }}>Simulasi Kredit</div>
              <div style={{ fontSize: 14, color: COLOR_GRAY, marginTop: 2 }}>Hitung DP & cicilan otomatis</div>
            </div>
          </div>

          {/* Feature 3: Terhubung Langsung WhatsApp */}
          <div
            style={{
              transform: `scale(${interpolate(feat3Spring, [0, 1], [0.8, 1])}) translateY(${interpolate(feat3Spring, [0, 1], [30, 0])}px)`,
              opacity: feat3Spring,
              backgroundColor: "#F0FDF4",
              border: "2px solid #86EFAC",
              borderRadius: 22,
              padding: "18px 20px",
              boxShadow: "0 10px 24px rgba(16, 185, 129, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32 }}>💬</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#10B981" }}>Langsung Ke WhatsApp</div>
              <div style={{ fontSize: 14, color: COLOR_DARK, marginTop: 2 }}>Prospek masuk langsung ke HP</div>
            </div>
          </div>
        </div>

        {/* Character 10 (Confident / Thumbs Up, Bottom Left) */}
        <Character
          characterNumber={10}
          scale={0.88}
          entryProgress={enter10}
          poseVariant="speaking"
          style={{
            top: 710,
            left: 80,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
