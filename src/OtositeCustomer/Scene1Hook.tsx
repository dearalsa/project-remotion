import React from "react";
import {
  AbsoluteFill,
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

const CUSTOM_3D_ICONS_CONFIG: Custom3DIconItem[] = [
  // Karakter 1
  {
    id: "p1-tengil",
    fileName: "3d-icon-emot-tengil.png",
    x: 120,
    y: 970,
    size: 200,
    enterFrame: 6,
    exitFrame: 84,
    baseTilt: -10,
    floatPhase: 0,
  },
  {
    id: "p1-tanda-tanya",
    fileName: "3d-icon-tanda-tanya.png",
    right: 115,
    y: 700,
    size: 250,
    enterFrame: 46,
    exitFrame: 84,
    baseTilt: 12,
    floatPhase: 2.1,
  },

  // Karakter 2
  {
    id: "p2-ghost",
    fileName: "3d-icon-ghost.png",
    x: 95,
    y: 820,
    size: 200,
    enterFrame: 88,
    exitFrame: 138,
    baseTilt: -12,
    floatPhase: 0.5,
  },
  {
    id: "p2-patah-hati",
    fileName: "3d-icon-patah-hati.png",
    right: 110,
    y: 830,
    size: 190,
    enterFrame: 92,
    exitFrame: 138,
    baseTilt: 12,
    floatPhase: 1.8,
  },
  {
    id: "p2-panic",
    fileName: "3d-icon-panic.png",
    x: 160,
    y: 1110,
    size: 150,
    enterFrame: 96,
    exitFrame: 138,
    baseTilt: 8,
    floatPhase: 3.2,
  },
  {
    id: "p2-tidak-senang",
    fileName: "3d-icon-tidak-senang.png",
    right: 120,
    y: 1110,
    size: 150,
    enterFrame: 100,
    exitFrame: 138,
    baseTilt: -20,
    floatPhase: 4.5,
  },

  // Karakter 3
  {
    id: "p3-keren",
    fileName: "3d-icon-keren.png",
    x: 100,
    y: 850,
    size: 175,
    enterFrame: 144,
    exitFrame: 235,
    baseTilt: -10,
    floatPhase: 1.2,
  },
  {
    id: "p3-excited",
    fileName: "3d-icon-excited.png",
    right: 75,
    y: 960,
    size: 175,
    enterFrame: 186,
    exitFrame: 235,
    baseTilt: 10,
    floatPhase: 3.7,
  },
];

// KOMPONEN ANIMASI FLOATING 3D PNG 
const Floating3DSticker: React.FC<{ item: Custom3DIconItem }> = ({ item }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Jangan render jika belum waktunya tampil atau sudah selesai keluar
  if (frame < item.enterFrame - 5 || frame > item.exitFrame + 20) {
    return null;
  }

  // Spring Pop-Up Masuk 
  const inSpring = spring({
    frame: frame - item.enterFrame,
    fps,
    config: { damping: 11, stiffness: 160, mass: 0.65 },
  });

  // Spring Keluar (Mengecil halus)
  const outSpring = spring({
    frame: frame - item.exitFrame,
    fps,
    config: { damping: 15, stiffness: 170, mass: 0.5 },
  });

  // Gerakan mengambang organik 3D (naik-turun & goyang halus)
  const t = frame * 0.05 + item.floatPhase;
  const floatY = Math.sin(t) * 14;
  const floatX = Math.cos(t * 0.7) * 6;
  const floatRotate = Math.sin(t * 0.85) * 7;

  // Gabungan animasi masuk + keluar + mengambang
  const scale =
    interpolate(inSpring, [0, 1], [0.1, 1]) *
    interpolate(outSpring, [0, 1], [1, 0.3]);

  const entryY = interpolate(inSpring, [0, 1], [65, 0]);
  const exitY = interpolate(outSpring, [0, 1], [0, 40]);

  const entryRot = interpolate(inSpring, [0, 1], [item.baseTilt * 2.2, item.baseTilt]);
  const opacity =
    interpolate(inSpring, [0, 0.35, 1], [0, 1, 1]) *
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
        zIndex: 4,
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

// KOMPONEN UTAMA SCENE 1
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // JUICY SPRINGS CONFIGURATION
  const popConfig = { damping: 12, stiffness: 180, mass: 0.7 };
  const textConfig = { damping: 14, stiffness: 160, mass: 0.8 };

  // PART 1 & 2 TIMINGS (Tepat sesuai VO)
  const wCustomer = spring({ frame: frame - 6, fps, config: textConfig });
  const wSeringBilang = spring({ frame: frame - 12, fps, config: textConfig });

  const quote1Spring = spring({ frame: frame - 46, fps, config: popConfig });
  const quote2Spring = spring({ frame: frame - 92, fps, config: popConfig });

  const part1ExitOpacity = interpolate(frame, [136, 142], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const part1ExitY = interpolate(frame, [136, 144], [0, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // PART 3 TIMINGS (Tepat sesuai VO)
  const wPakaiTeknik = spring({ frame: frame - 144, fps, config: popConfig });
  const wDealBadge = spring({ frame: frame - 186, fps, config: popConfig });

  // Dinamika ornamen kecil
  const starPulse = 1 + Math.sin(frame * 0.25) * 0.2;

  // POP-UP CHARACTER SPRINGS
  const char1In = spring({ frame: frame - 4, fps, config: popConfig });
  const char1Out = spring({
    frame: frame - 86,
    fps,
    config: { damping: 16, stiffness: 150, mass: 0.6 },
  });

  const char2In = spring({ frame: frame - 88, fps, config: popConfig });
  const char2Out = spring({
    frame: frame - 142,
    fps,
    config: { damping: 16, stiffness: 150, mass: 0.6 },
  });

  const char3In = spring({ frame: frame - 144, fps, config: popConfig });

  const calcCharTransform = (inSpring: number, outSpring: number = 0) => {
    const scale =
      interpolate(inSpring, [0, 1], [0.1, 1]) *
      interpolate(outSpring, [0, 1], [1, 0.5]);
    const y =
      interpolate(inSpring, [0, 1], [100, 0]) +
      interpolate(outSpring, [0, 1], [0, 80]);
    const rot =
      interpolate(inSpring, [0, 1], [15, 0]) +
      interpolate(outSpring, [0, 1], [0, -15]);
    const opacity =
      interpolate(inSpring, [0, 0.4, 1], [0, 1, 1]) *
      interpolate(outSpring, [0, 0.6, 1], [1, 0, 0]);
    return { scale, y, rot, opacity };
  };

  const c1 = calcCharTransform(char1In, char1Out);
  const c2 = calcCharTransform(char2In, char2Out);
  const c3 = calcCharTransform(char3In, 0);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        pointerEvents: "none",
      }}
    >
      {CUSTOM_3D_ICONS_CONFIG.map((item) => (
        <Floating3DSticker key={item.id} item={item} />
      ))}

      {frame < 144 && (
        <div
          style={{
            position: "absolute",
            top: 310,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: part1ExitOpacity,
            transform: `translateY(${part1ExitY}px)`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 70,
              fontWeight: 700,
              color: COLORS.dark,
              marginBottom: 24,
              marginTop: 60,
              letterSpacing: -5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: wCustomer,
                transform: `translateY(${interpolate(wCustomer, [0, 1], [30, 0])}px) rotate(${interpolate(wCustomer, [0, 1], [-5, 0])}deg)`,
              }}
            >
              Customer
            </span>
            <span
              style={{
                display: "inline-block",
                opacity: wSeringBilang,
                transform: `translateY(${interpolate(wSeringBilang, [0, 1], [30, 0])}px) rotate(${interpolate(wSeringBilang, [0, 1], [5, 0])}deg)`,
              }}
            >
              Sering Bilang...
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 55,
              marginTop: 20,
              width: "100%",
              maxWidth: 860,
              alignItems: "center",
            }}
          >
            {frame >= 44 && (
              <div
                style={{
                  backgroundColor: COLORS.yellowMuda,
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 22,
                  padding: "18px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: "90%",
                  transform: `scale(${interpolate(quote1Spring, [0, 1], [0.8, 1])}) translateY(${interpolate(quote1Spring, [0, 1], [40, 0])}px) rotateZ(${interpolate(quote1Spring, [0, 1], [-8, 0])}deg)`,
                  opacity: quote1Spring,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.red,
                    color: "#ffffff",
                    borderRadius: "50%",
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 900,
                    flexShrink: 0,
                    border: `2px solid ${COLORS.dark}`,
                  }}
                >
                  ?
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    letterSpacing: -2,
                    color: COLORS.dark,
                  }}
                >
                  &ldquo;Pikir-pikir dulu ya...&rdquo;
                </div>
              </div>
            )}

            {frame >= 90 && (
              <div
                style={{
                  backgroundColor: COLORS.yellow,
                  border: `4px solid ${COLORS.dark}`,
                  boxShadow: `0 6px 0 ${COLORS.dark}`,
                  borderRadius: 22,
                  padding: "18px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: "90%",
                  transform: `scale(${interpolate(quote2Spring, [0, 1], [0.8, 1])}) translateY(${interpolate(quote2Spring, [0, 1], [40, 0])}px) rotateZ(${interpolate(quote2Spring, [0, 1], [8, 0])}deg)`,
                  opacity: quote2Spring,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.blue,
                    color: COLORS.yellowMuda,
                    borderRadius: "50%",
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 900,
                    flexShrink: 0,
                    border: `2px solid ${COLORS.dark}`,
                  }}
                >
                  💬
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    letterSpacing: -2,
                    color: COLORS.dark,
                  }}
                >
                  &ldquo;Atau nanti dihubungi lagi?&rdquo;
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PART 3 */}
      {frame >= 144 && (
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              borderRadius: 26,
              padding: "24px 36px",
              textAlign: "center",
              width: "88%",
              maxWidth: 840,
              transform: `scale(${interpolate(wPakaiTeknik, [0, 1], [0.8, 1])}) translateY(${interpolate(wPakaiTeknik, [0, 1], [40, 0])}px) rotateZ(${interpolate(wPakaiTeknik, [0, 1], [-3, 0])}deg)`,
              opacity: wPakaiTeknik,
              marginBottom: 35,
            }}
          >
            <div
              style={{
                fontSize: 65,
                letterSpacing: -5,
                color: COLORS.dark,
                marginBottom: 25,
              }}
            >
              Jangan Bingung!
            </div>
            <div
              style={{
                fontSize: 85,
                color: COLORS.blue,
                letterSpacing: -5,
                fontStyle: "italic",
                textDecoration: "underline",
                lineHeight: 1.15,
              }}
            >
              Pakai 3 Teknik Ini
            </div>
          </div>

          {frame >= 184 && (
            <div
              style={{
                backgroundColor: COLORS.yellowMuda,
                border: `4px solid ${COLORS.dark}`,
                boxShadow: `0 6px 0 ${COLORS.dark}`,
                borderRadius: 20,
                padding: "14px 38px",
                display: "flex",
                alignItems: "center",
                gap: 15,
                transform: `scale(${interpolate(wDealBadge, [0, 1], [0.7, 1])}) rotateZ(${interpolate(wDealBadge, [0, 1], [5, 0])}deg)`,
                opacity: wDealBadge,
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  color: COLORS.dark,
                  letterSpacing: -2,
                }}
              >
                Biar Langsung Deal!
              </span>
            </div>
          )}
        </div>
      )}

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
        {/* Character 1 */}
        {frame < 90 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              transform: `translateX(50px) translateY(${c1.y}px) scale(${c1.scale * 1.5}) rotateZ(${c1.rot}deg)`,
              transformOrigin: "bottom center",
              opacity: c1.opacity,
              willChange: "transform, opacity",
            }}
          >
            <Character
              assetName="Scene1 (1).png"
              height={530}
              enterFrom="none"
              delay={0}
              animationType="confused"
            />
          </div>
        )}

        {/* Character 2 */}
        {frame >= 88 && frame < 146 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              transform: `translateY(${c2.y + 25}px) scale(${c2.scale * 1.4}) rotateZ(${c2.rot}deg)`,
              transformOrigin: "bottom center",
              opacity: c2.opacity,
              willChange: "transform, opacity",
            }}
          >
            <Character
              assetName="Scene1 (2).png"
              height={530}
              enterFrom="none"
              delay={0}
              animationType="awkward"
            />
          </div>
        )}

        {/* Character 3 */}
        {frame >= 144 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              transform: `translateX(-20px) translateY(${c3.y + 20}px) scale(${c3.scale * 1.4}) rotateZ(${c3.rot}deg)`,
              transformOrigin: "bottom center",
              opacity: c3.opacity,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 50,
                fontSize: 34,
                color: COLORS.red,
                transform: `scale(${starPulse}) rotate(${frame * 3}deg)`,
                zIndex: 8,
              }}
            >
              ✨
            </div>
            <div
              style={{
                position: "absolute",
                top: 15,
                right: 90,
                fontSize: 24,
                color: COLORS.yellowTua,
                transform: `scale(${starPulse}) rotate(${-frame * 4}deg)`,
                zIndex: 8,
              }}
            >
              ⭐
            </div>
            <Character
              assetName="Scene1 (3).png"
              height={530}
              enterFrom="none"
              delay={0}
              animationType="cheerful_wave"
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
