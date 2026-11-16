
import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SAFE_BOTTOM, SAFE_TOP } from "./constants";

export const Scene3Catalog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Konfigurasi spring super lambat & halus (Slow & Smooth)
  const slowSpringConfig = { damping: 18, mass: 1.3, stiffness: 60 };

  // Word-by-word animations 
  const wYuk = spring({ frame: frame - 2, fps, config: slowSpringConfig });
  const wPunya = spring({ frame: frame - 12, fps, config: slowSpringConfig });
  const wWebsite = spring({ frame: frame - 22, fps, config: slowSpringConfig });
  const wKatalog = spring({ frame: frame - 32, fps, config: slowSpringConfig });

  // Baris kedua muncul perlahan kata demi kata
  const subWords = ["Biar", "customer", "gampang", "cek :"];

  // Phone Mockup entrance & auto-scroll website yang sangat pelan
  const phoneSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, mass: 1.5, stiffness: 55 },
  });
  const siteScrollY = interpolate(frame, [25, 140], [0, -110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  void siteScrollY;

  // Animasi kursor di dalam layar HP (Gerakan diperhalus & diperlambat)
  const cursorSpring = spring({ frame: frame - 35, fps, config: slowSpringConfig });
  const cursorX = interpolate(frame, [35, 85, 130], [80, 190, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [35, 85, 130], [180, 320, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorClick = interpolate(Math.sin((frame / 18) * Math.PI), [-1, 1], [0.94, 1.06]);

  // Tiga Pill Buttons (Muncul perlahan dengan ayunan lembut)
  const pillTipe = spring({
    frame: frame - 72,
    fps,
    config: { damping: 16, mass: 1.3, stiffness: 65 },
  });
  const pillSpec = spring({
    frame: frame - 86,
    fps,
    config: { damping: 16, mass: 1.3, stiffness: 65 },
  });
  const pillPromo = spring({
    frame: frame - 100,
    fps,
    config: { damping: 16, mass: 1.3, stiffness: 65 },
  });

  // Outro transition 
  const sceneExit = interpolate(frame, [134, 146], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitTranslate = interpolate(frame, [134, 146], [0, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE_TOP + 20,
        paddingBottom: SAFE_BOTTOM + 20,
        paddingLeft: 48,
        paddingRight: 48,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: sceneExit,
        transform: `translateY(${exitTranslate}px)`,
        pointerEvents: "none",
      }}
    >
      {/* Headline dengan Animasi Kata demi Kata yang Lambat & Halus */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          textAlign: "center",
          marginTop: 150,
          marginBottom: 50,
          zIndex: 10,
        }}
      >
        {/* Baris 1: Yuk, Punya Website Katalog */}
        <div
          style={{
          fontSize: 60,
          color: COLORS.textDark,
          lineHeight: 1.2,
          letterSpacing: -5,
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: 14,
          whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              display: "inline-block",
              opacity: wYuk,
              transform: `scale(${interpolate(wYuk, [0, 1], [0.7, 1])}) translateY(${interpolate(wYuk, [0, 1], [24, 0])}px)`,
            }}
          >
            Yuk!
          </span>
          <span
            style={{
              display: "inline-block",
              opacity: wPunya,
              transform: `scale(${interpolate(wPunya, [0, 1], [0.7, 1])}) translateY(${interpolate(wPunya, [0, 1], [24, 0])}px)`,
            }}
          >
            Punya
          </span>
          <span
            style={{
              fontSize: 75,
              display: "inline-block",
              fontStyle: "italic",
              fontWeight: 800,
              color: COLORS.blue,
              opacity: wWebsite,
              transform: `scale(${interpolate(wWebsite, [0, 1], [0.7, 1])}) translateY(${interpolate(wWebsite, [0, 1], [24, 0])}px)`,
            }}
          >
            Website
          </span>
          <span
            style={{
              fontSize: 75,
              display: "inline-block",
              fontStyle: "italic",
              fontWeight: 800,
              color: COLORS.blue,
              opacity: wKatalog,
              transform: `scale(${interpolate(wKatalog, [0, 1], [0.7, 1])}) translateY(${interpolate(wKatalog, [0, 1], [24, 0])}px)`,
            }}
          >
            Katalog
          </span>
        </div>

        {/* Baris 2: Biar customer gampang cek: */}
        <div
          style={{
            fontSize: 55,
            letterSpacing: -5,
            color: COLORS.textDark,
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {subWords.map((word, index) => {
            const wordSpring = spring({
              frame: frame - (40 + index * 6), // Jeda tiap kata 6 frame dengan ayunan lambat
              fps,
              config: slowSpringConfig,
            });

            return (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  opacity: wordSpring,
                  transform: `scale(${interpolate(wordSpring, [0, 1], [0.75, 1])}) translateY(${interpolate(wordSpring, [0, 1], [20, 0])}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 940,
          flex: 1,
          marginBottom: 60,
          padding: "0 10px",
        }}
      >
        {/* Pill Buttons Pop-Up Lambat */}
        <div
          style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          width: "46%",
          zIndex: 12,
          transform: "translateY(-100px)",
          }}
        >
          {/* Button 1: Tipe Mobil */}
          <div
            style={{
              backgroundColor: "#f7c25d",
              color: "#000000",
              padding: "22px 32px",
              borderRadius: 999,
              border: "4px solid #0F172A",
              boxShadow: "0 8px 0 #0F172A",
              fontSize: 34,
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: -0.5,
              transform: `scale(${pillTipe}) translateY(${interpolate(pillTipe, [0, 1], [35, 0])}px)`,
              opacity: pillTipe,
            }}
          >
            Tipe Mobil
          </div>

          {/* Button 2: Spesifikasi */}
          <div
            style={{
              backgroundColor: "#e79b02",
              color: "#000000",
              padding: "22px 32px",
              borderRadius: 999,
              border: "4px solid #0F172A",
              boxShadow: "0 8px 0 #0F172A",
              fontSize: 34,
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: -0.5,
              transform: `scale(${pillSpec}) translateY(${interpolate(pillSpec, [0, 1], [35, 0])}px)`,
              opacity: pillSpec,
            }}
          >
            Spesifikasi
          </div>

          {/* Button 3: Promo */}
          <div
            style={{
              backgroundColor: "#ffd33c",
              color: "#000000",
              padding: "22px 32px",
              borderRadius: 999,
              border: "4px solid #0F172A",
              boxShadow: "0 8px 0 #0F172A",
              fontSize: 34,
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: -0.5,
              transform: `scale(${pillPromo}) translateY(${interpolate(pillPromo, [0, 1], [35, 0])}px)`,
              opacity: pillPromo,
            }}
          >
            Promo
          </div>
        </div>

        {/* Mockup HP Miring (Tilted Phone) berisi Website Scroll */}
        <div
          style={{
            width: "48%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 350,
              height: 680,
              borderRadius: 52,
              border: "12px solid #0F172A",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 28px 60px rgba(0, 0, 0, 0.22)",
              position: "relative",
              overflow: "hidden",
              transform: `scale(${phoneSpring}) rotate(9deg)`,
              opacity: phoneSpring,
            }}
          >
            {/* Poni HP (Notch) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 150,
                height: 28,
                backgroundColor: "#0F172A",
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                zIndex: 30,
              }}
            />

            {/* Isi Layar HP (Website Otosite di-scroll pelan) */}
            <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <OffthreadVideo
            src={staticFile("assets/Video Scroll Otosite.mp4")}
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
              {/* Kursor Interaktif */}
              <div
                style={{
                  position: "absolute",
                  left: cursorX,
                  top: cursorY,
                  opacity: cursorSpring,
                  transform: `scale(${cursorClick})`,
                  fontSize: 32,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              >
                🖱️
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
