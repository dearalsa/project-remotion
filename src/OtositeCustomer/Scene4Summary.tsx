import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { COLORS, FONT_FAMILY } from "./constants";

export const Scene4Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word-by-word kinetic springs matching VO:
  // "Tiga, (f8) Summary Closing (f22). Sebutin ulang semua keuntungannya (f65)..."
  const pBadge = spring({ frame: frame - 8, fps, config: { damping: 14, mass: 0.5 } });
  const wTitle = spring({ frame: frame - 22, fps, config: { damping: 13, mass: 0.5 } });
  const wSubtitle = spring({ frame: frame - 45, fps, config: { damping: 14, mass: 0.5 } });

  // Checklist Card & Staggered Items
  const pCard = spring({ frame: frame - 65, fps, config: { damping: 14, mass: 0.5 } });
  const wItem1 = spring({ frame: frame - 105, fps, config: { damping: 12, mass: 0.5 } });
  const wItem2 = spring({ frame: frame - 145, fps, config: { damping: 12, mass: 0.5 } });
  const wItem3 = spring({ frame: frame - 180, fps, config: { damping: 12, mass: 0.5 } });

  // Outro transition for Scene 4 (f225 to f235)
  const sceneExitOpacity = interpolate(frame, [225, 235], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneExitY = interpolate(frame, [225, 235], [0, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
        opacity: sceneExitOpacity,
        transform: `translateY(${sceneExitY}px)`,
      }}
    >
      {/* ============================================================ */}
      {/* SECTION A: UPPER KINETIC TYPOGRAPHY & CHECKLIST CARD         */}
      {/* ============================================================ */}
      <div
        style={{
          position: "absolute",
          top: 310,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Step Pill (f8) */}
        <div
          style={{
            backgroundColor: COLORS.blue,
            color: COLORS.yellowMuda,
            padding: "10px 32px",
            borderRadius: 999,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
            border: `3px solid ${COLORS.dark}`,
            boxShadow: `0 4px 0 ${COLORS.dark}`,
            transform: `scale(${interpolate(pBadge, [0, 1], [0.8, 1])})`,
            opacity: pBadge,
            marginBottom: 14,
          }}
        >
          TEKNIK 03
        </div>

        {/* Title Card (f22) */}
        <div
          style={{
            backgroundColor: COLORS.yellowMuda,
            border: `5px solid ${COLORS.dark}`,
            boxShadow: `0 8px 0 ${COLORS.dark}`,
            borderRadius: 26,
            padding: "18px 36px",
            textAlign: "center",
            width: "88%",
            maxWidth: 840,
            transform: `scale(${interpolate(wTitle, [0, 1], [0.85, 1])}) translateY(${interpolate(wTitle, [0, 1], [20, 0])}px)`,
            opacity: wTitle,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: COLORS.dark,
              letterSpacing: -1,
              lineHeight: 1.15,
            }}
          >
            Summary Closing
          </div>
          {frame >= 40 && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.blue,
                marginTop: 6,
                opacity: wSubtitle,
                transform: `translateY(${interpolate(wSubtitle, [0, 1], [15, 0])}px)`,
              }}
            >
              Sebut Ulang Semua Keuntungannya!
            </div>
          )}
        </div>

        {/* Checklist Card (f65) */}
        {frame >= 60 && (
          <div
            style={{
              backgroundColor: COLORS.yellow,
              border: `5px solid ${COLORS.dark}`,
              boxShadow: `0 8px 0 ${COLORS.dark}`,
              borderRadius: 22,
              padding: "16px 24px",
              width: "88%",
              maxWidth: 840,
              transform: `scale(${interpolate(pCard, [0, 1], [0.85, 1])}) translateY(${interpolate(pCard, [0, 1], [20, 0])}px)`,
              opacity: pCard,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.blue,
                letterSpacing: 1,
                borderBottom: `2px dashed ${COLORS.dark}`,
                paddingBottom: 6,
              }}
            >
              CHECKLIST REKAP MANFAAT:
            </div>

            {/* Checklist Item 1 (f105) */}
            {frame >= 100 && (
              <div
                style={{
                  backgroundColor: COLORS.yellowMuda,
                  border: `3px solid ${COLORS.dark}`,
                  boxShadow: `0 3px 0 ${COLORS.dark}`,
                  borderRadius: 14,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `translateX(${interpolate(wItem1, [0, 1], [-20, 0])}px) scale(${interpolate(wItem1, [0, 1], [0.9, 1])})`,
                  opacity: wItem1,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.blue,
                    color: COLORS.yellowMuda,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 900,
                    flexShrink: 0,
                    border: `2px solid ${COLORS.dark}`,
                  }}
                >
                  ✓
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.dark }}>
                  1. Spesifikasi Sesuai Kebutuhan
                </div>
              </div>
            )}

            {/* Checklist Item 2 (f145) */}
            {frame >= 140 && (
              <div
                style={{
                  backgroundColor: COLORS.yellowMuda,
                  border: `3px solid ${COLORS.dark}`,
                  boxShadow: `0 3px 0 ${COLORS.dark}`,
                  borderRadius: 14,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `translateX(${interpolate(wItem2, [0, 1], [-20, 0])}px) scale(${interpolate(wItem2, [0, 1], [0.9, 1])})`,
                  opacity: wItem2,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.blue,
                    color: COLORS.yellowMuda,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 900,
                    flexShrink: 0,
                    border: `2px solid ${COLORS.dark}`,
                  }}
                >
                  ✓
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.dark }}>
                  2. Penawaran Harga Paling Pas
                </div>
              </div>
            )}

            {/* Checklist Item 3 (f180) */}
            {frame >= 175 && (
              <div
                style={{
                  backgroundColor: COLORS.yellowMuda,
                  border: `3px solid ${COLORS.dark}`,
                  boxShadow: `0 3px 0 ${COLORS.dark}`,
                  borderRadius: 14,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `translateX(${interpolate(wItem3, [0, 1], [-20, 0])}px) scale(${interpolate(wItem3, [0, 1], [0.9, 1])})`,
                  opacity: wItem3,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.red,
                    color: COLORS.yellowMuda,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 900,
                    flexShrink: 0,
                    border: `2px solid ${COLORS.dark}`,
                  }}
                >
                  ✓
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.dark }}>
                  3. Bonus & Garansi Lengkap!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION B: GROUNDED CONVERSATION CHARACTER                   */}
      {/* ============================================================ */}
      <div
        style={{
          position: "absolute",
          top: 900,
          left: 0,
          right: 0,
          height: 560,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          zIndex: 5,
        }}
      >
        <Character
          assetName="Scene4.png"
          height={480}
          enterFrom="bottom"
          delay={6}
          animationType="discussion"
        />
      </div>
    </AbsoluteFill>
  );
};
