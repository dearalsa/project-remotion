import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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

  // Tips 4 badge spring
  const badgeTips4Spring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // Word-by-word kinetic typography springs
  const wMau = spring({ frame: frame - 7, fps, config: { damping: 14, mass: 0.5 } });
  const wLebih = spring({ frame: frame - 9, fps, config: { damping: 14, mass: 0.5 } });
  const wGampang = spring({ frame: frame - 14, fps, config: { damping: 14, mass: 0.5 } });
  const wPakai = spring({ frame: frame - 18, fps, config: { damping: 14, mass: 0.5 } });
  const wWebsite = spring({ frame: frame - 22, fps, config: { damping: 11, mass: 0.5 } });
  const wSales = spring({ frame: frame - 30, fps, config: { damping: 14, mass: 0.5 } });
  const wMobil = spring({ frame: frame - 34, fps, config: { damping: 14, mass: 0.5 } });
  const wDari = spring({ frame: frame - 38, fps, config: { damping: 14, mass: 0.5 } });
  const wOtosite = spring({ frame: frame - 42, fps, config: { damping: 11, mass: 0.5 } });

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
            top: 50,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Badge Tips 4 */}
          <div style={{ marginBottom: 10 }}>
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
                transform: `scale(${interpolate(badgeTips4Spring, [0, 1], [0.75, 1])}) translateY(${interpolate(badgeTips4Spring, [0, 1], [20, 0])}px)`,
                opacity: badgeTips4Spring,
                letterSpacing: -2,
              }}
            >
              Tips 4
            </div>
          </div>

          {/* Line 1: Pakai Website Sales dari Otosite */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
              marginTop: 25,
              fontSize: 60,
              color: COLOR_DARK,
              letterSpacing: -5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 7 ? wMau : 0,
                transform: `translateY(${interpolate(wMau, [0, 1], [20, 0])}px)`,
              }}
            >
              Pakai
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 9 ? wLebih : 0,
                transform: `translateY(${interpolate(wLebih, [0, 1], [20, 0])}px)`,
              }}
            >
              Website
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 14 ? wGampang : 0,
                transform: `translateY(${interpolate(wGampang, [0, 1], [20, 0])}px)`,
              }}
            >
              Sales
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: frame >= 18 ? wPakai : 0,
                transform: `translateY(${interpolate(wPakai, [0, 1], [20, 0])}px)`,
              }}
            >
              dari
            </span>
            <span
              style={{
                display: "inline-block",
                fontSize: 70,
                fontWeight: 950,
                fontStyle: "italic",
                textDecoration: "underline",
                color: "#1800ac",
                letterSpacing: -5,
                opacity: frame >= 22 ? wWebsite : 0,
                transform: `scale(${interpolate(wWebsite, [0, 1], [0.75, 1])}) translateY(${interpolate(wWebsite, [0, 1], [28, 0])}px)`,
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
            top: 350,
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
              🔒 otosite.id
            </div>
          </div>

         {/* Website Video */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 626,
            overflow: "hidden",
          }}
        >
          <OffthreadVideo
            src={staticFile("assets/Video Scroll Otosite.mp4")}
            muted
            style={{
              width: "100%",
              height: "auto",
              transform: `translateY(${interpolate(
                frame,
                [fPhone, fPhone + 90],
                [0, -120],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              )}px)`,
            }}
          />
        </div>
        </div>

        {/* Left Side: 3 Feature Badges Floating */}
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 40,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 35,
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
              letterSpacing: -2,
            }}
          >
            <div style={{ fontSize: 32 }}>🚗</div>
            <div>
              <div style={{ fontSize: 27, color: COLOR_DARK }}>Katalog Lengkap</div>
            </div>
          </div>

          {/* Feature 2: Promo */}
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
              letterSpacing: -2,
            }}
          >
            <div style={{ fontSize: 32 }}>🏷️</div>
            <div>
              <div style={{ fontSize: 27, color: COLOR_DARK }}>Cek Promo Kapan Aja</div>
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
              letterSpacing: -2,
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32 }}>💬</div>
            <div>
              <div style={{ fontSize: 27, color: "#10B981" }}>Terhubung Langsung Dengan WhatsApp</div>
            </div>
          </div>
        </div>

        {/* Character 10 */}
        <Character
          characterNumber={10}
          scale={1.2}
          entryProgress={enter10}
          poseVariant="speaking"
          style={{
            top: 770,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
