import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Character } from "./Character";
import { COLORS, FONT_FAMILY } from "./constants";

interface Custom3DIconItem {
  id: string;
  fileName: string;
  x?: number;
  right?: number;
  y: number;
  size: number;
  enterFrame: number;
  exitFrame: number;
  baseTilt: number;
  floatPhase: number;
}

const SCENE3_3D_ICONS_CONFIG: Custom3DIconItem[] = [
  {
    id: "s3-mata-duitan",
    fileName: "3d-icon-mata-duitan.png",
    x: 150,
    y: 1150,
    size: 165,
    enterFrame: 96, 
    exitFrame: 220,
    baseTilt: -10,
    floatPhase: 0.4,
  },
  {
    id: "s3-ide-cemerlang",
    fileName: "3d-icon-ide-cemerlang.png",
    right: 150,
    y: 1000,
    size: 165,
    enterFrame: 102, 
    exitFrame: 220,
    baseTilt: 10,
    floatPhase: 2.6,
  },
];

// Komponen Animasi 3d
const Floating3DSticker: React.FC<{ item: Custom3DIconItem }> = ({ item }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < item.enterFrame - 5 || frame > item.exitFrame + 20) {
    return null;
  }

  const inSpring = spring({
    frame: frame - item.enterFrame,
    fps,
    config: { damping: 12, stiffness: 185, mass: 0.55 },
  });

  const outSpring = spring({
    frame: frame - item.exitFrame,
    fps,
    config: { damping: 16, stiffness: 170, mass: 0.5 },
  });

  const t = frame * 0.05 + item.floatPhase;
  const floatY = Math.sin(t) * 14;
  const floatX = Math.cos(t * 0.7) * 6;
  const floatRotate = Math.sin(t * 0.85) * 7;

  const scale =
    interpolate(inSpring, [0, 1], [0.1, 1]) *
    interpolate(outSpring, [0, 1], [1, 0.3]);

  const entryY = interpolate(inSpring, [0, 1], [65, 0]);
  const exitY = interpolate(outSpring, [0, 1], [0, 40]);

  const entryRot = interpolate(
    inSpring,
    [0, 1],
    [item.baseTilt * 2.2, item.baseTilt]
  );
  const opacity =
    interpolate(inSpring, [0, 0.3, 1], [0, 1, 1]) *
    interpolate(outSpring, [0, 0.7, 1], [1, 0, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: item.y,
        ...(item.x !== undefined ? { left: item.x } : {}),
        ...(item.right !== undefined ? { right: item.right } : {}),
        width: item.size,
        height: item.size,
        opacity,
        transform: `translate3d(${floatX}px, ${entryY + exitY + floatY}px, 0) scale(${scale}) rotate(${entryRot + floatRotate}deg)`,
        filter: "drop-shadow(0 16px 24px rgba(0, 0, 0, 0.22))",
        willChange: "transform, opacity",
        zIndex: 6,
      }}
    >
      <Img
        src={staticFile(`assets/character/${item.fileName}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

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

export const Scene3Assumptive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Config spring responsif & sangat smooth (tanpa delay lambat)
  const sweepConfig = { damping: 20, stiffness: 135, mass: 0.7 };
  const smoothPopConfig = { damping: 16, stiffness: 170, mass: 0.65 };
  const cardGlideConfig = { damping: 17, stiffness: 160, mass: 0.7 };

  // TIMINGS CEPAT & MENGALIR TANPA DELAY LAMA 
  // Badge Teknik 02 (f2) & Stabilo (f5)
  const pBadgeText = spring({ frame: frame - 2, fps, config: smoothPopConfig });
  const hTeknik2 = spring({ frame: frame - 5, fps, config: sweepConfig });

  // Kartu Assumptive Closing langsung menyusul (f14)
  const wTitle = spring({ frame: frame - 14, fps, config: cardGlideConfig });

  // Teks "Jangan Tanya..." langsung muncul setelah kartu (f28)
  const wDontText = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, stiffness: 175, mass: 0.65 },
  });

  // Coretan silang (X) langsung menggores (f38 & f42)
  const xStroke1 = spring({
    frame: frame - 38,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.55 },
  });
  const xStroke2 = spring({
    frame: frame - 42,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.55 },
  });

  // Efek Bergetar "Salah Jawaban" tepat saat silang selesai (f42 - f60)
  const shakeDecay = interpolate(frame, [42, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const errorShakeX =
    frame >= 42 && frame <= 60 ? Math.sin((frame - 42) * 2.6) * 14 * shakeDecay : 0;
  const errorShakeY =
    frame >= 42 && frame <= 60 ? Math.cos((frame - 42) * 3.2) * 4 * shakeDecay : 0;
  const errorShakeRot =
    frame >= 42 && frame <= 60 ? Math.sin((frame - 42) * 2.6) * 3.5 * shakeDecay : 0;

  // Header "Langsung Kasih Pilihan:" langsung masuk setelah getaran selesai (f62)
  const wChoiceHeader = spring({ frame: frame - 62, fps, config: smoothPopConfig });

  // Kotak 1: Mau dikirim Hari Ini? (f74) + Stabilo (f79)
  const box1Spring = spring({ frame: frame - 74, fps, config: cardGlideConfig });
  const hHariIniSweep = spring({ frame: frame - 79, fps, config: sweepConfig });

  // Kotak 2: Atau dikirim Besok? (f88) + Stabilo (f93)
  const box2Spring = spring({ frame: frame - 88, fps, config: cardGlideConfig });
  const hBesokSweep = spring({ frame: frame - 93, fps, config: sweepConfig });

  // Urutan Muncul Cepat: Character (f90) -> Mata Duitan (f96) -> Ide Cemerlang (f102)
  const charEnter = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, stiffness: 155, mass: 0.7 },
  });

  const walkSpeed = Math.max(0, frame - 90) * 0.22;
  const walkBobY = Math.abs(Math.sin(walkSpeed)) * -12;
  const walkStrideX = Math.sin(walkSpeed * 0.5) * 14;
  const walkWobbleRot = Math.cos(walkSpeed * 0.5) * 2.2;
  const walkSlideInX = interpolate(charEnter, [0, 1], [-55, 0]);

  // Outro transition for Scene 3 (f220 to f230)
  const exitProgress = spring({
    frame: frame - 220,
    fps,
    config: { damping: 22, stiffness: 150, mass: 0.65 },
  });
  const sceneExitOpacity = interpolate(frame, [220, 230], [1, 0], {
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
  const box1Blur = interpolate(box1Spring, [0, 0.65, 1], [6, 0, 0], {
    extrapolateRight: "clamp",
  });
  const box2Blur = interpolate(box2Spring, [0, 0.65, 1], [6, 0, 0], {
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
      {SCENE3_3D_ICONS_CONFIG.map((item) => (
        <Floating3DSticker key={item.id} item={item} />
      ))}

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
        {/* Step Text dengan Sapuan Stabilo Merah (f2) */}
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
            progress={hTeknik2}
            color="#ff3133"
            height="100%"
            bottom="2%"
            paddingX={16}
            rotate={-1.5}
          >
            Teknik 02
          </MarkerHighlight>
        </div>

        {/* Assumptive Closing Card (f14) */}
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
            transform: `scale(${interpolate(wTitle, [0, 1], [0.88, 1])}) translateX(${interpolate(wTitle, [0, 1], [-24, 0])}px) translateY(${interpolate(wTitle, [0, 1], [24, 0])}px) rotate(${interpolate(wTitle, [0, 1], [-1.5, 0])}deg)`,
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
            Assumptive Closing
          </div>

          <div
            style={{
              fontSize: 35,
              color: COLORS.dark,
              marginTop: 10,
              letterSpacing: -3,
            }}
          >
            Asumsikan Mereka{" "}
            <span style={{ color: COLORS.dark }}>
              Pasti Beli!
            </span>
          </div>
        </div>

        {/* Kalimat Larangan (Langsung muncul cepat di f26) */}
        {frame >= 26 && (
          <div
            style={{
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translate3d(${errorShakeX}px, ${interpolate(wDontText, [0, 1], [22, 0]) + 10 + errorShakeY}px, 0) scale(${interpolate(wDontText, [0, 1], [0.82, 1])}) rotate(${interpolate(wDontText, [0, 1], [4, -1.2]) + errorShakeRot}deg)`,
              opacity: interpolate(wDontText, [0, 0.35, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              willChange: "transform, opacity",
            }}
          >
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                marginTop: 35,
                color: COLORS.red,
                letterSpacing: -2,
                position: "relative",
                display: "inline-block",
              }}
            >
              Jangan Tanya &ldquo;Mau beli gak?&rdquo;

              {/* Coretan Tanda Silang (X) */}
              {frame >= 36 && (
                <span
                  style={{
                    position: "absolute",
                    left: "-4%",
                    right: "-4%",
                    top: "50%",
                    height: 0,
                    pointerEvents: "none",
                  }}
                >
                  {/* Garis Silang Pertama (\) */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: -4,
                      height: 7,
                      backgroundColor: "#ff3133",
                      borderRadius: 99,
                      boxShadow: "0 2px 0 rgba(0,0,0,0.18)",
                      transformOrigin: "center center",
                      transform: `rotate(9deg) scaleX(${Easing.out(Easing.exp)(
                        interpolate(xStroke1, [0, 1], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                      )})`,
                    }}
                  />
                  {/* Garis Silang Kedua (/) */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: -4,
                      height: 7,
                      backgroundColor: "#ff3133",
                      borderRadius: 99,
                      boxShadow: "0 2px 0 rgba(0,0,0,0.18)",
                      transformOrigin: "center center",
                      transform: `rotate(-9deg) scaleX(${Easing.out(Easing.exp)(
                        interpolate(xStroke2, [0, 1], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                      )})`,
                    }}
                  />
                </span>
              )}
            </span>
          </div>
        )}

        {/* Bagian Pilihan: Header + 2 Kotak Berdampingan (Langsung muncul di f60) */}
        {frame >= 60 && (
          <div
            style={{
              width: "88%",
              maxWidth: 840,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: 22,
            }}
          >
            {/* Sub-header Pilihan */}
            <div
              style={{
                fontSize: 35,
                marginTop: 25,
                color: COLORS.dark,
                letterSpacing: -1,
                opacity: interpolate(wChoiceHeader, [0, 0.4, 1], [0, 1, 1], {
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(wChoiceHeader, [0, 1], [14, 0])}px)`,
              }}
            >
              Langsung Kasih Pilihan:
            </div>

            {/* 2 Kotak Pilihan Terpisah */}
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 20,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {/* Kotak 1: Mau dikirim Hari Ini? (f74) */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.55)",
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 22,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 6,
                  transform: `scale(${interpolate(box1Spring, [0, 1], [0.84, 1])}) translateX(${interpolate(box1Spring, [0, 1], [-22, 0])}px) translateY(${interpolate(box1Spring, [0, 1], [24, 0])}px) rotate(${interpolate(box1Spring, [0, 1], [-3, -1])}deg)`,
                  opacity: interpolate(box1Spring, [0, 0.3, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
                  filter: `blur(${box1Blur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div
                  style={{
                    fontSize: 25,
                    color: COLORS.dark,
                    letterSpacing: -2,
                    lineHeight: 1.15,
                  }}
                >
                  &ldquo;Mau dikirim
                </div>
                <div
                  style={{
                    fontSize: 33,
                    color: COLORS.dark,
                    lineHeight: 1.25,
                  }}
                >
                  <MarkerHighlight
                    progress={hHariIniSweep}
                    color="rgba(255, 214, 10, 0.78)"
                    height="88%"
                    bottom="4%"
                    paddingX={10}
                    skew={-8}
                  >
                    <span
                      style={{
                        color: COLORS.dark,
                        fontWeight: 600,
                        letterSpacing: -3,
                      }}
                    >
                      Hari Ini?&rdquo;
                    </span>
                  </MarkerHighlight>
                </div>
              </div>

              {/* Kotak 2: Atau Besok? */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.69)",
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 22,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 6,
                  transform: `scale(${interpolate(box2Spring, [0, 1], [0.84, 1])}) translateX(${interpolate(box2Spring, [0, 1], [22, 0])}px) translateY(${interpolate(box2Spring, [0, 1], [24, 0])}px) rotate(${interpolate(box2Spring, [0, 1], [3, 1])}deg)`,
                  opacity: interpolate(box2Spring, [0, 0.3, 1], [0, 1, 1], {
                    extrapolateRight: "clamp",
                  }),
                  filter: `blur(${box2Blur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div
                  style={{
                    fontSize: 25,
                    color: COLORS.dark,
                    letterSpacing: -1.5,
                    lineHeight: 1.15,
                  }}
                >
                  &ldquo;Atau dikirim
                </div>
                <div
                  style={{
                    fontSize: 33,
                    color: COLORS.dark,
                    lineHeight: 1.25,
                  }}
                >
                  <MarkerHighlight
                    progress={hBesokSweep}
                    color="rgba(255, 214, 10, 0.85)"
                    height="88%"
                    bottom="4%"
                    paddingX={10}
                    skew={-8}
                  >
                    <span
                      style={{
                        color: COLORS.dark,
                        fontWeight: 600,
                        letterSpacing: -3,
                      }}
                    >
                      Besok?&rdquo;
                    </span>
                  </MarkerHighlight>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Character */}
      {frame >= 88 && (
        <div
          style={{
            position: "absolute",
            top: 950,
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
              transform: `translateX(${walkSlideInX + walkStrideX}px) translateY(${interpolate(charEnter, [0, 1], [45, 0]) + walkBobY}px) scale(${interpolate(charEnter, [0, 1], [0.9, 1])}) rotate(${walkWobbleRot}deg)`,
              transformOrigin: "bottom center",
              opacity: interpolate(charEnter, [0, 0.3, 1], [0, 1, 1], {
                extrapolateRight: "clamp",
              }),
              willChange: "transform, opacity",
            }}
          >
            <Character
              assetName="Scene3.png"
              height={530}
              enterFrom="none"
              delay={0}
              animationType="cool_thumbs"
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};