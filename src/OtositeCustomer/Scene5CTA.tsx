import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { COLORS, FONT_FAMILY } from "./constants";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word-by-word kinetic springs matching VO:
  // "Mau tips jitu lainnya (f10) biar makin jago closing? (f36)"
  const pBadge = spring({ frame: frame - 8, fps, config: { damping: 14, mass: 0.5 } });
  const wQuestionLine1 = spring({ frame: frame - 16, fps, config: { damping: 13, mass: 0.5 } });
  const wQuestionLine2 = spring({ frame: frame - 36, fps, config: { damping: 13, mass: 0.5 } });

  // "Langsung aja (f78) follow Otosite sekarang! (f95)"
  const pCtaCard = spring({ frame: frame - 78, fps, config: { damping: 14, mass: 0.5 } });
  const wFollowBtn = spring({ frame: frame - 95, fps, config: { damping: 12, mass: 0.5 } });
  const wCtaSub = spring({ frame: frame - 115, fps, config: { damping: 14, mass: 0.5 } });

  const ctaPulse = 1 + Math.sin(frame * 0.22) * 0.04;
  const starSpin = frame * 2.5;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
      }}
    >
      {/* ============================================================ */}
      {/* SECTION A: UPPER KINETIC TYPOGRAPHY & CTA HERO CARD          */}
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
        {/* Top Category Pill (f8) */}
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
          TIPS SALES OTOMOTIF
        </div>

        {/* Question Header Card (f16 & f36) */}
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
            transform: `scale(${interpolate(wQuestionLine1, [0, 1], [0.85, 1])}) translateY(${interpolate(wQuestionLine1, [0, 1], [20, 0])}px)`,
            opacity: wQuestionLine1,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.dark,
              marginBottom: 6,
            }}
          >
            Mau Tips Jitu Lainnya...
          </div>
          {frame >= 32 && (
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: COLORS.blue,
                letterSpacing: -1,
                lineHeight: 1.2,
                opacity: wQuestionLine2,
                transform: `translateY(${interpolate(wQuestionLine2, [0, 1], [15, 0])}px)`,
              }}
            >
              Biar Makin Jago Closing? 🚀
            </div>
          )}
        </div>

        {/* CTA Hero Card (f78) */}
        {frame >= 74 && (
          <div
            style={{
              backgroundColor: COLORS.yellow,
              border: `5px solid ${COLORS.dark}`,
              boxShadow: `0 8px 0 ${COLORS.dark}`,
              borderRadius: 24,
              padding: "18px 28px",
              width: "88%",
              maxWidth: 840,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              transform: `scale(${interpolate(pCtaCard, [0, 1], [0.85, 1])}) translateY(${interpolate(pCtaCard, [0, 1], [20, 0])}px)`,
              opacity: pCtaCard,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.blue,
                letterSpacing: 1.5,
              }}
            >
              LANGSUNG AJA
            </div>

            {/* Glowing Action Button (f95) */}
            {frame >= 90 && (
              <div
                style={{
                  backgroundColor: COLORS.red,
                  color: COLORS.yellowMuda,
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 18,
                  padding: "16px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `scale(${interpolate(wFollowBtn, [0, 1], [0.8, 1]) * ctaPulse})`,
                  opacity: wFollowBtn,
                }}
              >
                <span style={{ fontSize: 30 }}>👉</span>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  FOLLOW OTOSITE!
                </span>
                <span style={{ fontSize: 30 }}>✨</span>
              </div>
            )}

            {frame >= 110 && (
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.dark,
                  opacity: wCtaSub,
                }}
              >
                Solusi Website & Tips Sales No. 1
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION B: GROUNDED CELEBRATING CHARACTER                    */}
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
        <div style={{ position: "relative" }}>
          {/* Confetti & star accents */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 50,
              fontSize: 32,
              color: COLORS.red,
              transform: `rotate(${starSpin}deg)`,
              zIndex: 8,
            }}
          >
            ⭐
          </div>
          <div
            style={{
              position: "absolute",
              right: 50,
              top: 40,
              fontSize: 34,
              color: COLORS.yellowTua,
              transform: `rotate(${-starSpin}deg)`,
              zIndex: 8,
            }}
          >
            ✨
          </div>

          <Character
            assetName="Scene5.png"
            height={530}
            enterFrom="bottom"
            delay={6}
            animationType="jumping_joy"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
