import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { COLORS, FONT_FAMILY } from "./constants";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TIMINGS CEPAT TANPA DELAY LAMA 
  // Baris pertama langsung muncul di awal (f2)
  const wQuestionLine1 = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.5 },
  });

  // Baris kedua langsung menyusul cepat (f12)
  const wQuestionLine2 = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.5 },
  });

  // Card & Tombol FOLLOW OTOSITE langsung muncul tanpa jeda lama (f22 & f24)
  const pCtaCard = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.5 },
  });
  const wFollowBtn = spring({
    frame: frame - 24,
    fps,
    config: { damping: 11, stiffness: 180, mass: 0.5 },
  });

  // Gerakan dinamis tombol FOLLOW OTOSITE! (Pulse + Wiggle + Float + Pointing Finger)
  const ctaPulse = 1 + Math.sin(frame * 0.25) * 0.055;
  const ctaWiggleRot = Math.sin(frame * 0.2) * 2.5 + Math.cos(frame * 0.35) * 1.2;
  const ctaFloatY = Math.cos(frame * 0.18) * 6;
  const fingerPokeX = Math.sin(frame * 0.38) * 9;

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
          top: 310,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Question Header Card (f2 & f12) */}
        <div
          style={{
            borderRadius: 26,
            padding: "18px 36px",
            textAlign: "center",
            width: "88%",
            maxWidth: 840,
            transform: `scale(${interpolate(wQuestionLine1, [0, 1], [0.85, 1])}) translateY(${interpolate(wQuestionLine1, [0, 1], [20, 0])}px)`,
            opacity: wQuestionLine1,
            marginBottom: 14,
            marginTop: 30,
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: -5,
              color: COLORS.dark,
              marginBottom: 6,
            }}
          >
            Mau Tips Jitu Lainnya
          </div>
          {frame >= 10 && (
            <div
              style={{
                fontSize: 65,
                fontWeight: 700,
                color: COLORS.blue,
                letterSpacing: -5,
                lineHeight: 1.2,
                opacity: wQuestionLine2,
                transform: `translateY(${interpolate(wQuestionLine2, [0, 1], [15, 0])}px)`,
              }}
            >
              Biar Makin Jago Closing?
            </div>
          )}
        </div>

        {/* CTA */}
        {frame >= 20 && (
          <div
            style={{
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
            {/* Glowing & Moving Action Button (f24) */}
            {frame >= 22 && (
              <div
                style={{
                  backgroundColor: COLORS.red,
                  color: "#ffffff",
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 18,
                  padding: "16px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `translateY(${ctaFloatY}px) scale(${interpolate(wFollowBtn, [0, 1], [0.8, 1]) * ctaPulse}) rotate(${ctaWiggleRot}deg)`,
                  opacity: wFollowBtn,
                  willChange: "transform, opacity",
                }}
              >
                <span
                  style={{
                    fontSize: 55,
                    display: "inline-block",
                    transform: `translateX(${fingerPokeX}px)`,
                  }}
                >
                  👉🏻
                </span>
                <span
                  style={{
                    fontSize: 55,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  FOLLOW OTOSITE!
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 800,
          transform: "scale(1.4)",
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
          assetName="Scene5.png"
          height={530}
          enterFrom="bottom"
          delay={2}
          animationType="jumping_joy"
        />
      </div>
    </AbsoluteFill>
  );
};