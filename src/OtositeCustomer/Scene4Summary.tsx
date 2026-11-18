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

export const Scene4Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Config spring responsif & ultra-smooth (tanpa delay lama)
  const sweepConfig = { damping: 20, stiffness: 135, mass: 0.7 };
  const smoothPopConfig = { damping: 16, stiffness: 170, mass: 0.65 };
  const cardGlideConfig = { damping: 17, stiffness: 160, mass: 0.7 };

  // TIMINGS CEPAT & MENGALIR TANPA DELAY LAMA 
  // Badge Teknik 03 (f2) & Stabilo Merah (f5)
  const pBadgeText = spring({ frame: frame - 2, fps, config: smoothPopConfig });
  const hTeknik3 = spring({ frame: frame - 5, fps, config: sweepConfig });

  // Kartu Summary Closing & Subjudul langsung tampil bersamaan (f14)
  const wTitle = spring({ frame: frame - 14, fps, config: cardGlideConfig });

  // Teks "Biar mereka sadar kalau produk ini udah paling pas buat kebutuhannya" (f28)
  const wSadarText = spring({ frame: frame - 28, fps, config: smoothPopConfig });
  const hPalingPasSweep = spring({ frame: frame - 36, fps, config: sweepConfig });

  // Checklist Card & Item 1-3 muncul beruntun dengan cepat (f48 -> f56 -> f68 -> f80)
  const pCard = spring({ frame: frame - 48, fps, config: cardGlideConfig });
  const wItem1 = spring({ frame: frame - 56, fps, config: smoothPopConfig });
  const wItem2 = spring({ frame: frame - 68, fps, config: smoothPopConfig });
  const wItem3 = spring({ frame: frame - 80, fps, config: smoothPopConfig });
  const hItem3Sweep = spring({ frame: frame - 86, fps, config: sweepConfig });

  // Karakter masuk dengan smooth glide dari bawah
  const charEnter = spring({
    frame: frame - 6,
    fps,
    config: { damping: 18, stiffness: 125, mass: 0.85 },
  });
  const charFloatY = Math.sin(frame * 0.07) * 3.5;

  // Outro transition for Scene 4 (f225 to f235)
  const exitProgress = spring({
    frame: frame - 225,
    fps,
    config: { damping: 22, stiffness: 150, mass: 0.65 },
  });
  const sceneExitOpacity = interpolate(frame, [225, 235], [1, 0], {
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
  const checklistCardBlur = interpolate(pCard, [0, 0.65, 1], [6, 0, 0], {
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
          top: 290,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Step Text dengan Sapuan Stabilo Merah */}
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
            marginBottom: 14,
            willChange: "transform, opacity, filter",
          }}
        >
          <MarkerHighlight
            progress={hTeknik3}
            color="#ff3133"
            height="100%"
            bottom="2%"
            paddingX={16}
            rotate={-1.5}
          >
            Teknik 03
          </MarkerHighlight>
        </div>

        {/* Summary Closing Card */}
        <div
          style={{
            backgroundColor: COLORS.yellowMuda,
            border: `5px solid ${COLORS.dark}`,
            boxShadow: `0 8px 0 ${COLORS.dark}`,
            borderRadius: 26,
            padding: "20px 36px",
            textAlign: "center",
            width: "88%",
            maxWidth: 840,
            transform: `scale(${interpolate(wTitle, [0, 1], [0.88, 1])}) translateY(${interpolate(wTitle, [0, 1], [26, 0])}px)`,
            opacity: interpolate(wTitle, [0, 0.3, 1], [0, 1, 1], {
              extrapolateRight: "clamp",
            }),
            filter: `blur(${titleCardBlur}px)`,
            marginBottom: 14,
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
            Summary Closing
          </div>

          <div
            style={{
              fontSize: 34,
              color: COLORS.dark,
              marginTop: 8,
              letterSpacing: -3,
            }}
          >
            Sebut Ulang{" "}
            <span style={{ color: COLORS.dark, fontStyle: "italic" }}>
              Semua Keuntungannya!
            </span>
          </div>
        </div>

        {/* Teks Tambahan: "Biar mereka sadar kalau produk ini udah paling pas buat kebutuhannya" */}
        {frame >= 26 && (
          <div
            style={{
              width: "88%",
              maxWidth: 840,
              textAlign: "center",
              padding: "4px 16px",
              fontSize: 40,
              color: COLORS.dark,
              letterSpacing: -4,
              lineHeight: 1.35,
              transform: `translateY(${interpolate(wSadarText, [0, 1], [18, 0])}px) scale(${interpolate(wSadarText, [0, 1], [0.9, 1])})`,
              opacity: interpolate(wSadarText, [0, 0.35, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              marginBottom: 25,
              marginTop: 30,
              willChange: "transform, opacity",
            }}
          >
            Biar mereka sadar kalau produk ini{" "}
            <MarkerHighlight
              progress={hPalingPasSweep}
              color="rgba(255, 214, 10, 0.8)"
              height="88%"
              bottom="2%"
              paddingX={8}
              skew={-8}
            >
              <span style={{ color: COLORS.red, fontWeight: 700 }}>
                udah paling pas
              </span>
            </MarkerHighlight>{" "}
            buat kebutuhannya!
          </div>
        )}

        {/* Checklist Card */}
        {frame >= 46 && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `4px solid ${COLORS.dark}`,
              boxShadow: `0 6px 0 ${COLORS.dark}`,
              borderRadius: 22,
              padding: "16px 24px",
              width: "88%",
              maxWidth: 840,
              marginTop: 10, 
              transform: `scale(${interpolate(pCard, [0, 1], [0.88, 1])}) translateY(${interpolate(pCard, [0, 1], [26, 0])}px)`,
              opacity: interpolate(pCard, [0, 0.3, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              filter: `blur(${checklistCardBlur}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              willChange: "transform, opacity, filter",
            }}
          >
            <div
              style={{
                fontSize: 30,
                color: COLORS.blue,
                letterSpacing: -2,
                paddingBottom: 6,
              }}
            >
              Checklist Rekap Manfaat:
            </div>

            {/* Checklist Item 1 */}
            {frame >= 54 && (
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
                  transform: `translateX(${interpolate(wItem1, [0, 1], [-20, 0])}px) scale(${interpolate(wItem1, [0, 1], [0.92, 1])})`,
                  opacity: interpolate(wItem1, [0, 0.35, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
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
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 30,
                    color: COLORS.dark,
                    letterSpacing: -2,
                  }}
                >
                  Spesifikasi Sesuai Kebutuhan
                </div>
              </div>
            )}

            {/* Checklist Item 2 (f68) */}
            {frame >= 66 && (
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
                  transform: `translateX(${interpolate(wItem2, [0, 1], [-20, 0])}px) scale(${interpolate(wItem2, [0, 1], [0.92, 1])})`,
                  opacity: interpolate(wItem2, [0, 0.35, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
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
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 30,
                    color: COLORS.dark,
                    letterSpacing: -2,
                  }}
                >
                  Penawaran Harga Paling Pas
                </div>
              </div>
            )}

            {/* Checklist Item 3 */}
            {frame >= 78 && (
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
                  transform: `translateX(${interpolate(wItem3, [0, 1], [-20, 0])}px) scale(${interpolate(wItem3, [0, 1], [0.92, 1])})`,
                  opacity: interpolate(wItem3, [0, 0.35, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
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
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 30,
                    color: COLORS.dark,
                    letterSpacing: -2,
                  }}
                >
                  <MarkerHighlight
                    progress={hItem3Sweep}
                    color="rgba(255, 214, 10, 0.78)"
                    height="85%"
                    bottom="4%"
                    paddingX={8}
                    skew={-8}
                  >
                    <span>Bonus & Garansi Lengkap</span>
                  </MarkerHighlight>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 950,
          left: 0,
          right: 0,
          height: 560,
          display: "flex",
          justifyContent: "center",
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
            assetName="Scene4.png"
            height={480}
            enterFrom="bottom"
            delay={6}
            animationType="discussion"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};