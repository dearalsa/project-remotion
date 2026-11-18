import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character } from "./Character";
import { COLORS, FONT_FAMILY } from "./constants";

// Stabilo
interface MarkerHighlightProps {
  children: React.ReactNode;
  progress: number;
  color?: string;
  height?: string;
  bottom?: string;
  skew?: number;
  rotate?: number;
  paddingX?: number;
}

const MarkerHighlight: React.FC<MarkerHighlightProps> = ({
  children,
  progress,
  color = "rgba(255, 214, 10, 0.65)",
  height = "78%",
  bottom = "6%",
  skew = -10,
  rotate = -1,
  paddingX = 10,
}) => {
  const rawClamped = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweep = Easing.out(Easing.exp)(rawClamped);

  const sweepY = interpolate(rawClamped, [0, 0.3, 1], [0.85, 1.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markerOpacity = interpolate(rawClamped, [0, 0.12, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        zIndex: 1,
        margin: "0 2px",
      }}
    >
      {/* Goresan Stabilo di Belakang Teks */}
      <span
        style={{
          position: "absolute",
          left: -paddingX,
          right: -paddingX,
          bottom,
          height,
          backgroundColor: color,
          borderRadius: "8px 4px 10px 5px",
          transformOrigin: "left center",
          transform: `scaleX(${sweep}) scaleY(${sweepY}) skewX(${skew}deg) rotate(${rotate}deg)`,
          opacity: markerOpacity,
          zIndex: -1,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />
      {children}
    </span>
  );
};

export const Scene2Scarcity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Config spring ultra-smooth (modern damped motion tanpa pantulan kasar)
  const sweepConfig = { damping: 24, stiffness: 105, mass: 0.8 };
  const smoothPopConfig = { damping: 18, stiffness: 140, mass: 0.75 };
  const cardGlideConfig = { damping: 20, stiffness: 130, mass: 0.85 };

  // TIMINGS & SPRINGS SESUAI VO
  const pBadgeText = spring({ frame: frame - 6, fps, config: smoothPopConfig });
  const hTeknik1 = spring({ frame: frame - 10, fps, config: sweepConfig });

  // Kartu Title & "Bikin Mereka Takut Kehabisan" langsung muncul bersamaan dengan mulus
  const wTitle = spring({ frame: frame - 22, fps, config: cardGlideConfig });

  const wFomo = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.7 },
  });

  // Example Card springs
  const pCard = spring({ frame: frame - 105, fps, config: cardGlideConfig });
  const wPromoText = spring({ frame: frame - 116, fps, config: smoothPopConfig });
  const wBesokText = spring({ frame: frame - 130, fps, config: smoothPopConfig });
  const hBesokSweep = spring({ frame: frame - 136, fps, config: sweepConfig });

  // Karakter masuk dengan smooth glide dari bawah
  const charEnter = spring({
    frame: frame - 6,
    fps,
    config: { damping: 18, stiffness: 125, mass: 0.85 },
  });
  const charFloatY = Math.sin(frame * 0.07) * 3.5;

  // Breathing halus pada teks FOMO setelah muncul
  const fomoPulse = frame >= 88 ? 1 + Math.sin((frame - 88) * 0.14) * 0.025 : 1;

  // Outro transition for Scene 2 (f165 to f175)
  const exitProgress = spring({
    frame: frame - 165,
    fps,
    config: { damping: 22, stiffness: 150, mass: 0.65 },
  });
  const sceneExitOpacity = interpolate(frame, [165, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneExitY = interpolate(exitProgress, [0, 1], [0, -35]);
  const sceneExitScale = interpolate(exitProgress, [0, 1], [1, 0.97]);

  // Soft motion blur saat transisi masuk
  const badgeBlur = interpolate(pBadgeText, [0, 0.65, 1], [5, 0, 0], {
    extrapolateRight: "clamp",
  });
  const titleCardBlur = interpolate(wTitle, [0, 0.65, 1], [6, 0, 0], {
    extrapolateRight: "clamp",
  });
  const exampleCardBlur = interpolate(pCard, [0, 0.65, 1], [6, 0, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
        opacity: sceneExitOpacity,
        transform: `translateY(${sceneExitY}px) scale(${sceneExitScale})`,
        willChange: "transform, opacity",
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
        {/* Step Text dengan Sapuan Stabilo (f8) */}
        <div
          style={{
            color: "#ffffff",
            padding: "6px 20px",
            fontSize: 55,
            letterSpacing: -5,
            transform: `translateY(${interpolate(pBadgeText, [0, 1], [20, 0])}px) scale(${interpolate(pBadgeText, [0, 1], [0.9, 1])})`,
            opacity: interpolate(pBadgeText, [0, 0.35, 1], [0, 1, 1], {
              extrapolateRight: "clamp",
            }),
            filter: `blur(${badgeBlur}px)`,
            marginBottom: 18,
            willChange: "transform, opacity, filter",
          }}
        >
          <MarkerHighlight
            progress={hTeknik1}
            color="#ff3133"
            height="100%"
            bottom="2%"
            paddingX={16}
            rotate={-1.5}
          >
            Teknik 01
          </MarkerHighlight>
        </div>

        {/* Scarcity Closing */}
        <div
          style={{
            backgroundColor: COLORS.yellowMuda,
            border: `5px solid ${COLORS.dark}`,
            boxShadow: `0 8px 0 ${COLORS.dark}`,
            borderRadius: 26,
            padding: "22px 36px",
            textAlign: "center",
            width: "88%",
            maxWidth: 840,
            transform: `scale(${interpolate(wTitle, [0, 1], [0.88, 1])}) translateY(${interpolate(wTitle, [0, 1], [28, 0])}px)`,
            opacity: interpolate(wTitle, [0, 0.3, 1], [0, 1, 1], {
              extrapolateRight: "clamp",
            }),
            filter: `blur(${titleCardBlur}px)`,
            marginBottom: 18,
            willChange: "transform, opacity, filter",
          }}
        >
          <div
            style={{
              fontSize: 55,
              color: COLORS.dark,
              letterSpacing: -5,
              lineHeight: 1.15,
            }}
          >
            Scarcity Closing
          </div>

          <div
            style={{
              fontSize: 35,
              color: COLORS.dark,
              marginTop: 10,
              letterSpacing: -3,
            }}
          >
            Bikin Mereka{" "}
            <span style={{ color: COLORS.dark, fontStyle: "italic" }}>
              Takut Kehabisan
            </span>
          </div>
        </div>

        {/* Fomo */}
        {frame >= 75 && (
          <div
            style={{
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `translateY(${interpolate(wFomo, [0, 1], [22, 0]) + 15}px) scale(${interpolate(wFomo, [0, 1], [0.8, 1]) * fomoPulse}) rotate(${interpolate(wFomo, [0, 1], [-5, -1.5])}deg)`,
              opacity: interpolate(wFomo, [0, 0.35, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              willChange: "transform, opacity",
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: COLORS.red,
                letterSpacing: 1.5,
              }}
            >
              ALIAS FOMO!
            </span>
          </div>
        )}

        {/* Example Urgency Card (f105) */}
        {frame >= 100 && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `4px solid ${COLORS.dark}`,
              boxShadow: `0 6px 0 ${COLORS.dark}`,
              borderRadius: 22,
              padding: "20px 28px",
              width: "86%",
              maxWidth: 820,
              transform: `scale(${interpolate(pCard, [0, 1], [0.88, 1])}) translateY(${interpolate(pCard, [0, 1], [28, 0])}px)`,
              opacity: interpolate(pCard, [0, 0.3, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              filter: `blur(${exampleCardBlur}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 30,
              willChange: "transform, opacity, filter",
            }}
          >
            <div
              style={{
                fontSize: 25,
                color: COLORS.dark,
                letterSpacing: 1,
                opacity: interpolate(pCard, [0.2, 1], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Contoh:
            </div>
            <div
              style={{
                fontSize: 30,
                color: COLORS.dark,
                lineHeight: 1.45,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  opacity: interpolate(wPromoText, [0, 0.45, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(wPromoText, [0, 1], [8, 0])}px)`,
                  letterSpacing: -2,
                  marginRight: 6,
                }}
              >
                &ldquo;Promo diskon ini
              </span>
              <span
                style={{
                  display: "inline-block",
                  opacity: interpolate(wBesokText, [0, 0.4, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(wBesokText, [0, 1], [8, 0])}px)`,
                }}
              >
                <MarkerHighlight
                  progress={hBesokSweep}
                  color="rgba(255, 214, 10, 0.75)"
                  height="88%"
                  bottom="2%"
                  paddingX={8}
                  skew={-8}
                >
                  <span style={{ color: COLORS.dark, letterSpacing: -2 }}>
                    cuma berlaku sampai besok
                  </span>
                </MarkerHighlight>
              </span>
              <span
                style={{
                  display: "inline-block",
                  opacity: interpolate(wBesokText, [0, 0.45, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(wBesokText, [0, 1], [8, 0])}px)`,
                  marginLeft: 6,
                }}
              >
                loh pak!&rdquo;
              </span>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 900,
          left: 70,
          right: 0,
          height: 560,
          display: "flex",
          justifyContent: "center",
          transform: "scale(1.1)",
          alignItems: "flex-end",
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "relative",
            transform: `translateY(${interpolate(charEnter, [0, 1], [45, 0]) + charFloatY}px) scale(${interpolate(charEnter, [0, 1], [0.9, 1])})`,
            transformOrigin: "bottom center",
            opacity: interpolate(charEnter, [0, 0.3, 1], [0, 1, 1], {
              extrapolateRight: "clamp",
            }),
            willChange: "transform, opacity",
          }}
        >
          <Character
            assetName="Scene2.png"
            height={530}
            enterFrom="bottom"
            delay={6}
            animationType="shouting"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};