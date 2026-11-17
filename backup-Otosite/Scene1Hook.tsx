import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { FONT_FAMILY } from "./constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word entrance springs synced with waveform beats
  // f8: masih, f20: ngandelin, f42: medsos, f52: doang, f61: buat, f75: jualan, f88: mobil?
  const wMasih = spring({ frame: frame - 8, fps, config: { damping: 14, mass: 0.5 } });
  const wNgandelin = spring({ frame: frame - 20, fps, config: { damping: 14, mass: 0.5 } });
  const wMedsos = spring({ frame: frame - 42, fps, config: { damping: 11, mass: 0.5 } });
  const wDoang = spring({ frame: frame - 52, fps, config: { damping: 11, mass: 0.5 } });
  const wBuat = spring({ frame: frame - 61, fps, config: { damping: 14, mass: 0.5 } });
  const wJualan = spring({ frame: frame - 75, fps, config: { damping: 14, mass: 0.5 } });
  const wMobil = spring({ frame: frame - 86, fps, config: { damping: 11, mass: 0.5 } });

  // Floating Social Media Icons
  const iconTT = spring({ frame: frame - 46, fps, config: { damping: 12 } });
  const iconIG = spring({ frame: frame - 56, fps, config: { damping: 12 } });
  const iconFB = spring({ frame: frame - 72, fps, config: { damping: 12 } });

  // Floating question mark
  const qSpring = spring({ frame: frame - 82, fps, config: { damping: 12 } });

  // Outro transition (frames 88 to 98)
  const sceneExit = interpolate(frame, [88, 98], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitTranslate = interpolate(frame, [88, 98], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        opacity: sceneExit,
        transform: `translateY(${exitTranslate}px)`,
        pointerEvents: "none",
      }}
    >
      {/* Kinetic Typography */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Line 1: Masih Ngandelin */}
        <div
          style={{
            fontSize: 65,
            color: "#000000",
            letterSpacing: -5,
            marginBottom: 30,
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wMasih,
              transform: `translateY(${interpolate(wMasih, [0, 1], [24, 0])}px)`,
            }}
          >
            Masih
          </span>
          <span
            style={{
              display: "inline-block",
              opacity: wNgandelin,
              transform: `translateY(${interpolate(wNgandelin, [0, 1], [24, 0])}px)`,
            }}
          >
            Ngandelin
          </span>
        </div>

        {/* Line 2: MEDSOS DOANG */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 950,
            lineHeight: 1.1,
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#FFD33C",
              WebkitTextStroke: "3.5px #000000",
              paintOrder: "stroke fill",
              filter: "drop-shadow(0 6px 0 #000000)",
              transform: `scale(${interpolate(wMedsos, [0, 1], [0.75, 1])}) translateY(${interpolate(wMedsos, [0, 1], [30, 0])}px)`,
              opacity: wMedsos,
            }}
          >
            MEDSOS
          </span>
          <span
            style={{
              display: "inline-block",
              color: "#FFD33C",
              WebkitTextStroke: "3.5px #000000",
              paintOrder: "stroke fill",
              filter: "drop-shadow(0 6px 0 #000000)",
              transform: `scale(${interpolate(wDoang, [0, 1], [0.75, 1])}) translateY(${interpolate(wDoang, [0, 1], [30, 0])}px)`,
              opacity: wDoang,
            }}
          >
            DOANG
          </span>
        </div>

        {/* Line 3: buat jualan mobil? */}
        <div
          style={{
            fontSize: 50,
            color: "#000000",
            letterSpacing: -5,
            fontStyle: "italic",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wBuat,
              transform: `translateY(${interpolate(wBuat, [0, 1], [20, 0])}px)`,
            }}
          >
            Buat
          </span>
          <span
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: wJualan,
              transform: `translateY(${interpolate(wJualan, [0, 1], [20, 0])}px)`,
            }}
          >
            Jualan
          </span>
          <span
            style={{
              display: "inline-block",
              opacity: wMobil,
              transform: `scale(${interpolate(wMobil, [0, 1], [0.8, 1])}) translateY(${interpolate(wMobil, [0, 1], [20, 0])}px)`,
            }}
          >
            Mobil?
          </span>
        </div>
      </div>

      {/* Floating Social Media Icons */}
      {/* Left: TikTok Icon */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 920,
          width: 140,
          height: 140,
          transform: `scale(${iconTT}) translateY(${Math.sin(frame / 8) * 8}px)`,
          opacity: iconTT,
          filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.22))",
          zIndex: 8,
        }}
      >
        <Img
          src={staticFile("assets/icon_tiktok.png")}
          alt="TikTok"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 32 }}
        />
      </div>

      {/* Right Top: Instagram Icon */}
      <div
        style={{
          position: "absolute",
          left: 800,
          top: 820,
          width: 150,
          height: 150,
          transform: `scale(${iconIG}) translateY(${Math.cos(frame / 8) * 8}px)`,
          opacity: iconIG,
          filter: "drop-shadow(0 12px 24px rgba(221, 42, 123, 0.25))",
          zIndex: 8,
        }}
      >
        <Img
          src={staticFile("assets/icon_instagram.png")}
          alt="Instagram"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 36 }}
        />
      </div>

      {/* Right Bottom: Facebook Icon */}
      <div
        style={{
          position: "absolute",
          left: 805,
          top: 1190,
          width: 135,
          height: 135,
          transform: `scale(${iconFB}) translateY(${Math.sin((frame + 4) / 8) * 8}px)`,
          opacity: iconFB,
          filter: "drop-shadow(0 12px 24px rgba(24, 119, 242, 0.22))",
          zIndex: 8,
        }}
      >
        <Img
          src={staticFile("assets/icon_facebook.png")}
          alt="Facebook"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
        />
      </div>

      {/* Character 1 (Thinking) Standing Centered on Floor with Drop Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 460,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
          transform: "scale(1.3)",
        }}
      >
        {/* Floating Question Bubble above Head */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 430,
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "3px solid #000000",
            width: 56,
            height: 56,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.16)",
            transform: `scale(${qSpring}) translateY(${Math.sin(frame / 6) * 5}px)`,
            opacity: qSpring,
            zIndex: 12,
          }}
        >
          ?
        </div>

        <Character id={1} height={550} delay={4} motion="idle-breathe" />
      </div>
    </AbsoluteFill>
  );
};
