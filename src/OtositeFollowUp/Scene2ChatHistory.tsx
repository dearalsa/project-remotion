
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character } from "./Character";
import {
  COLOR_BORDER,
  COLOR_CARD_BG,
  COLOR_DARK,
  COLOR_GRAY,
  COLOR_RED,
  COLOR_YELLOW,
  FONT_FAMILY,
  SAFE_LEFT,
  SAFE_TOP,
  timingData,
} from "./constants";

export const Scene2ChatHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene2;
  const { startFrame, triggers } = sceneConfig;

  // Scene-local frame conversion
  const fBadgeTips1 = triggers.badgeTips1 - startFrame;
  const fChar7 = triggers.character7Enter - startFrame;
  const fTanpaSpam = triggers.tanpaSpam - startFrame;
  const fFollowUp = triggers.followUpTeratur - startFrame;

  // Transition between Part 1 and Part 2
  const transitionStart = 82;
  const transitionEnd = 102;

  const part1Opacity = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const part2Opacity = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const part1Y = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, -18],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const part2Y = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [18, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Character entrance
  const enter12 = spring({
    frame: frame - 26,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Tips 1 + Heading entrance together
  const tips1Intro = spring({
    frame: frame - fBadgeTips1,
    fps,
    config: { damping: 18, mass: 0.7 },
  });

  // Chat List entrance
  const chatListIntro = spring({
    frame: frame - 48,
    fps,
    config: { damping: 20, mass: 0.8 },
  });

  // Individual chat entrance - staggered
  const item1Spring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 18, mass: 0.7 },
  });

  const item2Spring = spring({
    frame: frame - 68,
    fps,
    config: { damping: 18, mass: 0.7 },
  });

  const item3Spring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 18, mass: 0.7 },
  });

  // Part 2 heading
  const headingIntro = spring({
    frame: frame - 90,
    fps,
    config: { damping: 18, mass: 0.7 },
  });

  // Badge dan kartu langsung mengikuti transisi
  // Semua elemen perbandingan muncul bersamaan
  const comparisonStart = 92;

  const comparisonIntro = spring({
    frame: frame - comparisonStart,
    fps,
    config: { damping: 20, mass: 0.45 },
  });

  // Outro
  const sceneExit = interpolate(frame, [198, 208], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(frame, [198, 208], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth chat item animation
  const chatItemStyle = (progress: number) => ({
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [22, 0])}px)`,
  });

  // Shared animation for comparison elements
  const comparisonStyle = {
    opacity: comparisonIntro,
    transform: `translateY(${interpolate(
      comparisonIntro,
      [0, 1],
      [22, 0]
    )}px)`,
  };

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
  
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: part1Opacity,
            transform: `translateY(${part1Y}px)`,
          }}
        >
          {/* Top Typography Header */}
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            {/* Tips 1 */}
            <div style={{ marginBottom: 35 }}>
              {frame >= fBadgeTips1 && (
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
                    transform: `translateY(${interpolate(
                      tips1Intro,
                      [0, 1],
                      [35, 0]
                    )}px)`,
                    opacity: tips1Intro,
                    letterSpacing: -2,
                  }}
                >
                  Tips 1
                </div>
              )}
            </div>

            {/* Cek Riwayat Chat */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                fontSize: 80,
                fontWeight: 700,
                color: COLOR_DARK,
                letterSpacing: -5,
                fontStyle: "italic",
              }}
            >
              {["Cek", "Riwayat", "Chat"].map((word) => (
                <span
                  key={word}
                  style={{
                    display: "inline-block",
                    opacity: tips1Intro,
                    transform: `translateY(${interpolate(
                      tips1Intro,
                      [0, 1],
                      [35, 0]
                    )}px)`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div
            style={{
              position: "absolute",
              top: 550,
              left: 50,
              width: 500,
              backgroundColor: COLOR_CARD_BG,
              borderRadius: 28,
              border: `2px solid ${COLOR_BORDER}`,
              boxShadow: "0 16px 36px rgba(0,0,0,0.06)",
              letterSpacing: -1,
              padding: "24px 20px",
              transform: `translateY(${interpolate(
                chatListIntro,
                [0, 1],
                [45, 0]
              )}px) scale(1.2)`,
              transformOrigin: "top left",
              opacity: chatListIntro,
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: COLOR_DARK,
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Riwayat Chat Lama</span>
              <span style={{ fontSize: 14, color: COLOR_GRAY }}>
                3 Percakapan
              </span>
            </div>

            {/* Chat item 1 */}
            <div
              style={{
                ...chatItemStyle(item1Spring),
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 18,
                padding: "14px 18px",
                letterSpacing: -1,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 18 }}>Pak Mahen</span>
                <span style={{ fontSize: 13, color: COLOR_GRAY }}>
                  7 hari lalu
                </span>
              </div>
              <div style={{ fontSize: 15, color: COLOR_GRAY }}>
                "Tanya simulasi angsuran 5 tahun"
              </div>
            </div>

            {/* Chat item 2 */}
            <div
              style={{
                ...chatItemStyle(item2Spring),
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 18,
                letterSpacing: -1,
                padding: "14px 18px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 18 }}>Ibu Susi</span>
                <span style={{ fontSize: 13, color: COLOR_GRAY }}>
                  10 hari lalu
                </span>
              </div>
              <div style={{ fontSize: 15, color: COLOR_GRAY }}>
                "Minat warna putih, ada diskon?"
              </div>
            </div>

            {/* Chat item 3 */}
            <div
              style={{
                ...chatItemStyle(item3Spring),
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 18,
                letterSpacing: -1,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 18 }}>Pak Reno</span>
                <span style={{ fontSize: 13, color: COLOR_GRAY }}>
                  14 hari lalu
                </span>
              </div>
              <div style={{ fontSize: 15, color: COLOR_GRAY }}>
                "Rencana ambil bulan depan sih"
              </div>
            </div>
          </div>

          {/* Character 12 */}
          <img
            src={staticFile("assets/character/12.png")}
            alt="Character 12"
            style={{
              position: "absolute",
              top: 800,
              right: -1,
              width: 350,
              transform: "scale(1.3)",
              height: "auto",
              objectFit: "contain",
              opacity: enter12,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: part2Opacity,
            transform: `translateY(${part2Y}px)`,
          }}
        >
          {/* Top Typography Header */}
          <div
            style={{
              position: "absolute",
              top: 120,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            {/* Hubungi Di Waktu Yang Pas */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                marginBottom: 40,
                fontSize: 55,
                color: COLOR_DARK,
                letterSpacing: -5,
                opacity: headingIntro,
                transform: `translateY(${interpolate(
                  headingIntro,
                  [0, 1],
                  [22, 0]
                )}px)`,
              }}
            >
              <span>Hubungi</span>
              <span>Di Waktu</span>
              <span>Yang Pas</span>
            </div>

            {/* Contrast Badges */}
            <div
              style={{
                position: "absolute",
                top: 115,
                left: 40,
                right: 40,
                display: "flex",
                gap: 24,
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              {/* Tanpa Spamming */}
              <div
                style={{
                  ...comparisonStyle,
                  flex: 1,
                  minWidth: 0,
                  height: 60,
                  boxSizing: "border-box",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FEE2E2",
                  border: "2px solid #EF4444",
                  padding: "35px 12px",
                  borderRadius: 20,
                  letterSpacing: -2,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    color: COLOR_DARK,
                  }}
                >
                  Tanpa
                </span>
                <span
                  style={{
                    fontSize: 38,
                    letterSpacing: -2,
                    color: COLOR_RED,
                    fontStyle: "italic",
                  }}
                >
                  Spamming
                </span>
              </div>

              {/* Follow-Up Teratur */}
              <div
                style={{
                  ...comparisonStyle,
                  flex: 1,
                  minWidth: 0,
                  height: 60,
                  boxSizing: "border-box",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D1FAE5",
                  border: "2px solid #10B981",
                  padding: "35px 12px",
                  borderRadius: 20,
                  letterSpacing: -2,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontSize: 38,
                    fontStyle: "italic",
                    color: "#10B981",
                  }}
                >
                  Follow-Up
                </span>
                <span
                  style={{
                    fontSize: 38,
                    letterSpacing: -2,
                    color: "#10B981",
                  }}
                >
                  Teratur
                </span>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div
            style={{
              position: "absolute",
              top: 345,
              left: 40,
              right: 40,
              display: "flex",
              alignItems: "stretch",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {/* Left: Spam Card */}
            <div
              style={{
                ...comparisonStyle,
                flex: 1,
                minWidth: 0,
                minHeight: 245,
                boxSizing: "border-box",
                backgroundColor: "#FFF5F5",
                border: "2px solid #FEB2B2",
                borderRadius: 28,
                padding: "30px 24px",
                boxShadow: "0 14px 30px rgba(255, 49, 51, 0.08)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>

              <div
                style={{
                  width: "100%",
                  fontSize: 30,
                  letterSpacing: -2,
                  color: COLOR_RED,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                Spam Broadcast
              </div>

              <div
                style={{
                  width: "100%",
                  fontSize: 18,
                  color: COLOR_DARK,
                  lineHeight: 2.5,
                  letterSpacing: -1,
                  textAlign: "center",
                }}
              >
                Kirim promo tiap hari tanpa izin
              </div>

              <div
                style={{
                  marginTop: "auto",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 14px",
                  backgroundColor: "rgba(255, 49, 51, 0.12)",
                  borderRadius: 12,
                  fontSize: 18,
                  letterSpacing: -1,
                  color: COLOR_RED,
                  textAlign: "center",
                }}
              >
                Akibat: Kontak Diblokir
              </div>
            </div>

            {/* Right: Follow-Up Teratur */}
            <div
              style={{
                ...comparisonStyle,
                flex: 1,
                minWidth: 0,
                minHeight: 245,
                boxSizing: "border-box",
                backgroundColor: "#F0FDF4",
                border: "2px solid #86EFAC",
                borderRadius: 28,
                padding: "30px 24px",
                boxShadow: "0 14px 30px rgba(16, 185, 129, 0.08)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>

              <div
                style={{
                  width: "100%",
                  fontSize: 30,
                  letterSpacing: -2,
                  color: "#10B981",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                Follow-Up Teratur
              </div>

              <div
                style={{
                  width: "100%",
                  fontSize: 18,
                  color: COLOR_DARK,
                  letterSpacing: -1,
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                Komunikasi rutin dan ramah
              </div>

              <div
                style={{
                  marginTop: "auto",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 14px",
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  borderRadius: 12,
                  fontSize: 18,
                  letterSpacing: -1,
                  color: "#10B981",
                  textAlign: "center",
                }}
              >
                Hasil: Hubungan Terjaga
              </div>
            </div>
          </div>

          {/* Character 7 */}
          <Character
            characterNumber={7}
            scale={1.5}
            entryProgress={1}
            poseVariant="idle"
            style={{
              top: 810,
              left: 300,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
