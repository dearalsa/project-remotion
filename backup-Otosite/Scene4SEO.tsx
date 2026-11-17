import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { FONT_FAMILY } from "./constants";

export const Scene4SEO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SEO Text Punch on local frame 18
  const seoPunch = spring({
    frame: frame - 18,
    fps,
    config: { damping: 11, mass: 0.45, stiffness: 160 },
  });

  // Moving Hand-Drawn Circle Animation around "SEO"
  // Smooth progressive stroke drawing (local frames 22 to 44)
  const circleDraw = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => t * (2 - t), // smooth natural easeOut
  });

  // Google Search Bar Entrance
  const searchBarSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  // Typing Animation: "Website Sales Mobil"
  const searchQuery = "Website Sales Mobil";
  const typingProgress = interpolate(frame, [34, 58], [0, searchQuery.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentTyped = searchQuery.slice(0, Math.round(typingProgress));
  const showCursor = Math.floor(frame / 6) % 2 === 0 && frame < 66;

  // Hand Cursor Animation & Click on the Search Button (local frames 56 to 78)
  // Hand moves toward the search button
  const handX = interpolate(frame, [56, 64], [970, 895], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const handY = interpolate(frame, [56, 64], [640, 545], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const handOpacity = interpolate(frame, [56, 60, 72, 78], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Click tap scale at frame 66
  const handScale = interpolate(frame, [65, 67, 70], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Click wave ripple expansion at frame 66 to 76
  const rippleScale = interpolate(frame, [66, 76], [0.3, 2.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(frame, [66, 68, 76], [0, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Search Results & yourwebsite.id Appearance Immediately After Click (frame 68)
  const resultsAppear = spring({
    frame: frame - 68,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 150 },
  });

  // Website Card Ascension from rank 3 to rank 1 (local frames 74 to 98)
  const riseSpring = spring({
    frame: frame - 74,
    fps,
    config: { damping: 14, mass: 0.7 },
  });
  const otositeCardY = interpolate(riseSpring, [0, 1], [240, 0]);
  const competitor1Y = interpolate(riseSpring, [0, 1], [0, 120]);
  const competitor2Y = interpolate(riseSpring, [0, 1], [120, 240]);

  // Bottom text entrance (local frame 85)
  const wBottom = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // Smooth Outro transition (local frames 130 to 141)
  const sceneExit = interpolate(frame, [130, 141], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitTranslate = interpolate(frame, [130, 141], [0, -35], {
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
      {/* SEO Display Typography with Animated Hand-Drawn Circle */}
      <div
        style={{
          position: "absolute",
          top: 305,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${interpolate(seoPunch, [0, 1], [0.75, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -5,
              color: "#FF3133",
              fontStyle: "italic",
              fontFamily: FONT_FAMILY,
              padding: "10px 24px",
              zIndex: 2,
            }}
          >
            SEO
          </div>
          <svg
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 360,
              height: 190,
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 3,
            }}
            viewBox="0 0 360 190"
          >
          <path
          d="M 180 5
            C 75 2 5 48 5 102
            C 5 165 95 188 185 188
            C 280 188 355 155 355 98
            C 355 40 275 2 180 5
            C 105 8 35 35 12 75"
          fill="none"
          stroke="#FF3133"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1000}
          strokeDasharray="1000"
          strokeDashoffset={interpolate(circleDraw, [0, 1], [1000, 0])}
        />
          </svg>
        </div>
      </div>

      {/* Google Search Bar */}
      <div
        style={{
          position: "absolute",
          top: 495,
          left: 140,
          width: 800,
          height: 84,
          backgroundColor: "#FFFFFF",
          borderRadius: 42,
          border: "1px solid #000000",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 16,
          transform: `scale(${searchBarSpring})`,
          opacity: searchBarSpring,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M46.145 24.5c0-1.636-.145-3.218-.418-4.75H24v9.009h12.436c-.536 2.891-2.173 5.345-4.618 6.991v5.809h7.482C43.682 37.473 46.145 31.427 46.145 24.5z"
            />
            <path
              fill="#34A853"
              d="M24 47c6.218 0 11.436-2.064 15.245-5.6l-7.482-5.809c-2.064 1.382-4.709 2.2-7.764 2.2-5.973 0-11.027-4.036-12.836-9.464H3.445v6.009C7.236 41.882 14.973 47 24 47z"
            />
            <path
              fill="#FBBC05"
              d="M11.164 28.327c-.464-1.382-.727-2.864-.727-4.327s.264-2.945.727-4.327V13.664H3.445C1.864 16.8 1 20.3 1 24s.864 7.2 2.445 10.336l7.718-6.009z"
            />
            <path
              fill="#EA4335"
              d="M24 9.5c3.382 0 6.418 1.164 8.8 3.445l6.6-6.6C35.427 2.655 30.209 1 24 1 14.973 1 7.236 6.118 3.445 13.664l7.718 6.009C12.973 14.245 18.027 9.5 24 9.5z"
            />
          </svg>
        </div>

        {/* Typed Search Query "website sales mobil" */}
        <div
          style={{
            flex: 1,
            fontSize: 32,
            letterSpacing: -2,
            color: "#000000",
          }}
        >
          <span>{currentTyped}</span>
          {showCursor && (
            <span style={{ fontWeight: 300, color: "#000000", marginLeft: 2 }}>|</span>
          )}
        </div>

        {/* Search Magnifier Button with Uploaded Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#FFFFFF",
            border: "1px solid #000000",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: frame >= 66 && frame <= 70 ? "scale(0.88)" : "scale(1)",
          }}
        >
          <Img
            src={staticFile("assets/icon_search.png")}
            alt="Search Icon"
            style={{
              width: 22,
              height: 22,
            }}
          />
        </div>
      </div>

      {/* Hand Click Ripple Ring Effect */}
      {frame >= 66 && frame <= 78 && (
        <div
          style={{
            position: "absolute",
            left: 895,
            top: 537,
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "1px solid #000000",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: "none",
            zIndex: 18,
          }}
        />
      )}

      {/* Hand Pointer Cursor */}
      <div
        style={{
          position: "absolute",
          left: handX,
          top: handY,
          transform: `translate(-15px, -15px) scale(${handScale})`,
          opacity: handOpacity,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <svg
          width="54"
          height="54"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            filter: "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.28))",
          }}
        >
          <path
            d="M9 11.75V3.5C9 2.67157 9.67157 2 10.5 2C11.3284 2 12 2.67157 12 3.5V11M12 9V8C12 7.17157 12.6716 6.5 13.5 6.5C14.3284 6.5 15 7.17157 15 8V11.5M15 10C15 9.17157 15.6716 8.5 16.5 8.5C17.3284 8.5 18 9.17157 18 10V14.5C18 18.6421 14.6421 22 10.5 22C7.46243 22 4.8647 20.1982 3.7323 17.6256L2.30799 14.3887C2.01524 13.7233 2.16482 12.9461 2.68417 12.4385L3.10985 12.0224C3.72262 11.4234 4.67389 11.3642 5.35338 11.8833L9 14.669"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: 615,
          left: 140,
          width: 800,
          height: 380,
          opacity: resultsAppear,
          transform: `scale(${resultsAppear})`,
          zIndex: 8,
        }}
      >
        {/* Card 1 (Competitor 1) */}
        <div
          style={{
            position: "absolute",
            top: competitor1Y,
            left: 0,
            width: "100%",
            height: 98,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: "1px solid #000000",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            opacity: 0.55,
          }}
        >
          <div style={{ width: 200, height: 16, borderRadius: 8, backgroundColor: "#94A3B8" }} />
          <div style={{ width: 360, height: 12, borderRadius: 6, backgroundColor: "#CBD5E1" }} />
        </div>

        {/* Card 2 (Competitor 2) */}
        <div
          style={{
            position: "absolute",
            top: competitor2Y,
            left: 0,
            width: "100%",
            height: 98,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: "1px solid #000000",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            opacity: 0.55,
          }}
        >
          <div style={{ width: 200, height: 16, borderRadius: 8, backgroundColor: "#94A3B8" }} />
          <div style={{ width: 360, height: 12, borderRadius: 6, backgroundColor: "#CBD5E1" }} />
        </div>

        {/* Card Website: yourwebsite.id */}
        <div
          style={{
            position: "absolute",
            top: otositeCardY,
            left: 0,
            width: "100%",
            height: 98,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            border: "1px solid #000000",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "#F8FAFC",
                border: "1px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🌐
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div
                style={{
                  fontSize: 24,
                  color: "#000000",
                  letterSpacing: -2,
                }}
              >
                yourwebsite.id
              </div>
            </div>
          </div>

          {/* Double Arrow (>>) */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#000000",
              letterSpacing: -2,
              transform: `translateX(${Math.sin(frame / 5) * 4}px)`,
            }}
          >
            &gt;&gt;
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 600,
          right: 180,
          display: "flex",
          alignItems: "center",
          gap: 10,
          transform: `scale(${wBottom})`,
          opacity: wBottom,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 40, fontWeight: 600, color: "#000000", letterSpacing: -2}}>Lewat</span>
        <span
          style={{
            fontSize: 75,
            fontWeight: 700,
            color: "#FF3133",
            fontStyle: "italic",
            letterSpacing: -1,
          }}
        >
          Google
        </span>
        <span style={{ fontSize: 42, fontWeight: 700, color: "#000000", letterSpacing: -2 }}>  Loh!</span>
      </div>

      {/* Joyful Character 3 */}
      <div
        style={{
          position: "absolute",
          bottom: 370,
          left: 80,
          zIndex: 6,
        }}
      >
        <Character id={3} height={460} delay={6} motion="bounce" />
      </div>
    </AbsoluteFill>
  );
};
