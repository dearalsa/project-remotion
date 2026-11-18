import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import {
  COLOR_BORDER,
  COLOR_CARD_BG,
  COLOR_DARK,
  COLOR_GRAY,
  COLOR_RED,
  COLOR_YELLOW,
  FONT_FAMILY,
  SAFE_LEFT,
  SAFE_TOP,
  timingData,
} from "./constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneConfig = timingData.scenes.scene1;
  const { triggers } = sceneConfig;

  // Word-by-word Kinetic Typography springs (Part 1A) - synced to voiceover rhythm
  const wFollowUp = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.5 } });
  const wCustomer = spring({ frame: frame - 22, fps, config: { damping: 14, mass: 0.5 } });
  const wMobil = spring({ frame: frame - 40, fps, config: { damping: 14, mass: 0.5 } });

  const wCuma = spring({ frame: frame - 59, fps, config: { damping: 14, mass: 0.5 } });
  const wDiRead = spring({ frame: frame - 77, fps, config: { damping: 11, mass: 0.5 } });
  const wDoang = spring({ frame: frame - 84, fps, config: { damping: 11, mass: 0.5 } });

  // Word-by-word Kinetic Typography springs (Part 1B) - synced to voiceover rhythm
  const wAtau = spring({ frame: frame - 103, fps, config: { damping: 14, mass: 0.5 } });
  const wDibalas = spring({ frame: frame - 118, fps, config: { damping: 14, mass: 0.5 } });
  const wTapi = spring({ frame: frame - 128, fps, config: { damping: 14, mass: 0.5 } });

  const wUjungnya = spring({ frame: frame - 134, fps, config: { damping: 11, mass: 0.5 } });
  const wHilang = spring({ frame: frame - 147, fps, config: { damping: 11, mass: 0.5 } });

  // Entrance spring for Character 5 (Confused)
  const enter5 = spring({
    frame: frame - triggers.character5Enter,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  // Animated Floating Smartphone 
  const phoneEnter = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, mass: 0.55 },
  });
  // Continuous smooth floating bob & gentle tilt
  const phoneFloatY = Math.sin((frame / 28) * Math.PI * 2) * 8;
  const phoneTilt = Math.sin((frame / 36) * Math.PI * 2) * 1.5;

  // Typing indicator (frames 6 to 16) before message pops
  const showTyping = frame >= 6 && frame < triggers.chatBubble1;
  const typingDot1 = Math.sin((frame / 6) * Math.PI * 2) * 4;
  const typingDot2 = Math.sin(((frame + 2) / 6) * Math.PI * 2) * 4;
  const typingDot3 = Math.sin(((frame + 4) / 6) * Math.PI * 2) * 4;

  // WhatsApp Bubble 1 entrance (pops in with punchy spring at frame 16)
  const bubble1Spring = spring({
    frame: frame - triggers.chatBubble1,
    fps,
    config: { damping: 11, mass: 0.45 },
  });

  // Read status indicator trigger at frame 74 ("Di-Read")
  const isRead = frame >= triggers.chatReadIndicator;
  const readAlertSpring = spring({
    frame: frame - triggers.chatReadIndicator,
    fps,
    config: { damping: 10, mass: 0.45 },
  });
  // Continuous smooth integer bobbing for read alert card (zero sub-pixel blur)
  const readAlertBob = isRead
    ? Math.round(
        Math.sin(((frame - triggers.chatReadIndicator) / 8) * Math.PI * 2) * 2.5
      )
    : 0;
  // Checkmark pulse on read
  const checkmarkScale = isRead
    ? interpolate(frame - triggers.chatReadIndicator, [0, 4, 10], [1, 1.45, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  // Part 1B transition at frame 98 ("Atau Dibalas Tapi Ujungnya Hilang?")
  const showPart2 = frame >= triggers.character6Enter;

  // Entrance spring for Character 6 (Angry / Shocked)
  const enter6 = spring({
    frame: frame - triggers.character6Enter,
    fps,
    config: { damping: 10, mass: 0.45 },
  });

  // Incoming customer reply bubble spring at frame 103
  const replyBubbleSpring = spring({
    frame: frame - 103,
    fps,
    config: { damping: 11, mass: 0.45 },
  });

  // Ghosting alert slam card at frame 134 ("Ujungnya Hilang?")
  const ghostingSpring = spring({
    frame: frame - 134,
    fps,
    config: { damping: 10, mass: 0.45 },
  });
  // Continuous energetic ghost float
  const ghostFloatY = Math.sin((frame / 16) * Math.PI * 2) * 9;
  const ghostRotate = Math.sin((frame / 22) * Math.PI * 2) * 5;

  // Phone shake on shock/ghosting (frames 134 to 154)
  const phoneShockShake =
    frame >= 134 && frame <= 154 ? Math.sin((frame - 134) * 3) * 3 : 0;

  // Outro slide out (frames 162 to 174)
  const sceneExit = interpolate(frame, [162, 174], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = interpolate(frame, [162, 174], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_FAMILY,
        opacity: sceneOpacity,
        transform: `translateY(${sceneExit}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: SAFE_TOP,
          left: SAFE_LEFT,
          width: 960,
          height: 1300,
        }}
      >
        {!showPart2 ? (
          <>
            <div
              style={{
                position: "absolute",
                top: 80,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              {/* Line 1: Follow-Up Customer Mobil */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 25,
                  fontSize: 57,
                  color: COLOR_DARK,
                  letterSpacing: -5,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 10 ? wFollowUp : 0,
                    transform: `translateY(${interpolate(wFollowUp, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Follow-Up
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 22 ? wCustomer : 0,
                    transform: `translateY(${interpolate(wCustomer, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Customer
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 40 ? wMobil : 0,
                    transform: `translateY(${interpolate(wMobil, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Mobil
                </span>
              </div>

              {/* Line 2: Cuma Di-Read Doang? */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 62,
                    color: COLOR_DARK,
                    letterSpacing: -5,
                    opacity: frame >= 59 ? wCuma : 0,
                    transform: `translateY(${interpolate(wCuma, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Cuma
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 80,
                    fontWeight: 800,
                    fontStyle: "italic",
                    color: COLOR_RED,
                    paintOrder: "stroke fill",
                    letterSpacing: -5,
                    opacity: frame >= 77 ? wDiRead : 0,
                    transform: `scale(${interpolate(wDiRead, [0, 1], [0.75, 1])}) translateY(${interpolate(wDiRead, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Di-Read
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 80,
                    color: COLOR_DARK,
                    paintOrder: "stroke fill",
                    letterSpacing: -5,
                    opacity: frame >= 84 ? wDoang : 0,
                    transform: `scale(${interpolate(wDoang, [0, 1], [0.75, 1])}) translateY(${interpolate(wDoang, [0, 1], [28, 0])}px)`,
                  }}
                >
                Doang?
                </span>
              </div>
            </div>

            {/* Character 5.png */}
            <div
              style={{
                position: "absolute",
                top: 350,
                left: -250,
                transform: "scale(1.8)",
              }}
            >
              <Character
                characterNumber={5}
                scale={0.92}
                entryProgress={enter5}
                poseVariant="confused"
              />
            </div>

            {/* Smartphone Chat Mockup */}
            <div
              style={{
                position: "absolute",
                top: 380,
                right: 50,
                width: 500,
                height: 720,
                backgroundColor: COLOR_CARD_BG,
                borderRadius: 36,
                border: `3px solid ${COLOR_BORDER}`,
                boxShadow: "0 10px 0 rgba(0,0,0,0.08)",
                overflow: "hidden",
                transform: `scale(${phoneEnter}) translateY(${phoneFloatY}px) rotate(${phoneTilt}deg)`,
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  height: 88,
                  backgroundColor: COLOR_DARK,
                  padding: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#FFFFFF",
                  borderBottom: `3px solid ${COLOR_BORDER}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: COLOR_YELLOW,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: COLOR_DARK,
                      fontWeight: 900,
                      fontSize: 24,
                      border: "2px solid #000000",
                    }}
                  >
                    C
                  </div>
                  <div>
                    <div style={{ fontSize: 24, letterSpacing: -1 }}>Customer Mobil</div>
                    <div style={{ fontSize: 15, color: "#94A3B8", fontWeight: 700 }}>Online</div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.18)",
                    border: "2px solid rgba(255,255,255,0.4)",
                    padding: "6px 14px",
                    borderRadius: 14,
                    fontSize: 14,
                  }}
                >
                  WhatsApp
                </div>
              </div>

              {/* Chat Canvas */}
              <div style={{ padding: 24 }}>
                {showTyping && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "#E2E8F0",
                      padding: "14px 20px",
                      borderRadius: "20px 20px 20px 4px",
                      marginBottom: 16,
                      border: "2px solid #CBD5E1",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: COLOR_DARK,
                        transform: `translateY(${typingDot1}px)`,
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: COLOR_DARK,
                        transform: `translateY(${typingDot2}px)`,
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: COLOR_DARK,
                        transform: `translateY(${typingDot3}px)`,
                      }}
                    />
                  </div>
                )}

                {/* Bubble 1: Outgoing Sales Message */}
                {frame >= triggers.chatBubble1 && (
                  <div
                    style={{
                      transform: `scale(${bubble1Spring})`,
                      transformOrigin: "bottom right",
                      backgroundColor: "#DCF8C6",
                      padding: "20px 22px",
                      borderRadius: "24px 24px 4px 24px",
                      marginLeft: 20,
                      border: "2.5px solid #4ADE80",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 26,
                        color: COLOR_DARK,
                        lineHeight: 1.35,
                        letterSpacing: -2,
                      }}
                    >
                      Selamat pagi Pak, promo DP minim untuk unit impian bapak masih ready nih 🤩
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 10,
                        fontSize: 17,
                        fontWeight: 800,
                      }}
                    >
                      <span style={{ color: COLOR_GRAY }}>09:15</span>
                      <span
                        style={{
                          transform: `scale(${checkmarkScale})`,
                          display: "inline-block",
                          color: isRead ? "#0284C7" : COLOR_GRAY,
                        }}
                      >
                        {isRead ? "✓✓ Dibaca" : "✓ Terkirim"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Animated Read Alert Card */}
                {isRead && (
                  <div
                    style={{
                      opacity: readAlertSpring,
                      transform: `translateY(${
                        Math.round(interpolate(readAlertSpring, [0, 1], [16, 0])) +
                        readAlertBob
                      }px)`,
                      marginTop: 36,
                      textAlign: "center",
                      backgroundColor: "#FFFFFF",
                      border: "3px solid #FF3133",
                      boxShadow: "0 4px 0 #FF3133",
                      borderRadius: 20,
                      padding: "16px 20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 26,
                        color: COLOR_RED,
                        letterSpacing: -2,
                        lineHeight: 1.2,
                        WebkitFontSmoothing: "antialiased",
                      }}
                    >
                      Hanya Dibaca Tanpa Balasan!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (

          <>
            {/* Top Typography Header */}
            <div
              style={{
                position: "absolute",
                top: 100,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              {/* Line 1: Fix! Cara Chat Kamu */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                  fontSize: 65,
                  color: COLOR_DARK,
                  letterSpacing: -5,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 103 ? wAtau : 0,
                    transform: `translateY(${interpolate(wAtau, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Fix!
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 118 ? wDibalas : 0,
                    transform: `translateY(${interpolate(wDibalas, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Cara
                </span>
                <span
                  style={{
                    display: "inline-block",
                    opacity: frame >= 128 ? wTapi : 0,
                    transform: `translateY(${interpolate(wTapi, [0, 1], [22, 0])}px)`,
                  }}
                >
                  Chat Kamu 🫵🏽
                </span>
              </div>

              {/* Line 2 (Punch): Ujungnya Hilang? */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 80,
                    color: COLOR_DARK,
                    letterSpacing: -5,
                    opacity: frame >= 134 ? wUjungnya : 0,
                    transform: `scale(${interpolate(wUjungnya, [0, 1], [0.75, 1])}) translateY(${interpolate(wUjungnya, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Yang
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 90,
                    fontWeight: 800,
                    fontStyle: "italic",
                    textDecoration: "underline",
                    color: COLOR_RED,
                    letterSpacing: -5,
                    opacity: frame >= 147 ? wHilang : 0,
                    transform: `scale(${interpolate(wHilang, [0, 1], [0.75, 1])}) translateY(${interpolate(wHilang, [0, 1], [28, 0])}px)`,
                  }}
                >
                  Salah
                </span>
              </div>
            </div>

            {/* Character 6.png */}
            <div
              style={{
                position: "absolute",
                top: 410,
                left: -200,
                transform: "scale(1.8)",
              }}
            >
              <Character
                characterNumber={6}
                scale={0.92}
                entryProgress={enter6}
                poseVariant="angry"
              />
            </div>

            {/* Smartphone Chat Mockup */}
            <div
              style={{
                position: "absolute",
                top: 420,
                right: 25,
                width: 500,
                height: 720,
                backgroundColor: COLOR_CARD_BG,
                borderRadius: 36,
                border: `3px solid ${COLOR_BORDER}`,
                boxShadow: "0 10px 0 rgba(0,0,0,0.08)", // 0 blur!
                overflow: "hidden",
                transform: `translateX(${phoneShockShake}px) translateY(${phoneFloatY}px) rotate(${phoneTilt}deg)`,
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  height: 88,
                  backgroundColor: COLOR_DARK,
                  padding: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#FFFFFF",
                  borderBottom: `3px solid ${COLOR_BORDER}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: COLOR_RED,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontWeight: 900,
                      fontSize: 24,
                      border: "2px solid #000000",
                    }}
                  >
                    C
                  </div>
                  <div>
                    <div style={{ fontSize: 24, letterSpacing: -0.4 }}>Customer Mobil</div>
                    <div style={{ fontSize: 14, color: "#ffffffb3" }}>
                      Terakhir Dilihat 3 Hari Lalu
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 49, 51, 0.25)",
                    border: "2px solid #FF3133",
                    padding: "6px 14px",
                    borderRadius: 14,
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Offline
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <div
                  style={{
                    transform: `scale(${replyBubbleSpring})`,
                    transformOrigin: "bottom left",
                    backgroundColor: "#FFFFFF",
                    padding: "20px 22px",
                    borderRadius: "24px 24px 24px 4px",
                    marginRight: 20,
                    border: "2.5px solid #CBD5E1",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 27,
                      color: COLOR_DARK,
                      lineHeight: 1.35,
                      letterSpacing: -2,
                    }}
                  >
                    Nanti saya kabari lagi ya mas
                  </p>
                  <div
                    style={{
                      textAlign: "right",
                      marginTop: 8,
                      fontSize: 15,
                      color: COLOR_GRAY,
                      fontWeight: 700,
                    }}
                  >
                    10:02
                  </div>
                </div>

                {frame >= 134 && (
                  <div
                    style={{
                      transform: `scale(${ghostingSpring})`,
                      transformOrigin: "center center",
                      marginTop: 36,
                      textAlign: "center",
                      backgroundColor: "#FFF5F5",
                      border: "3.5px solid #FF3133",
                      borderRadius: 24,
                      padding: "22px 20px",
                      boxShadow: "0 8px 0 #FF3133", 
                    }}
                  >
                    <div
                      style={{
                        fontSize: 52,
                        marginBottom: 6,
                        transform: `translateY(${ghostFloatY}px) rotate(${ghostRotate}deg)`,
                        display: "inline-block",
                      }}
                    >
                      👻
                    </div>
                    <div
                      style={{
                        fontSize: 30,
                        color: COLOR_RED,
                        letterSpacing: -2,
                      }}
                    >
                      Customer Hilang!
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        color: COLOR_DARK,
                        marginTop: 6,
                        letterSpacing: -2,
                      }}
                    >
                      Dighosting, kayak kamu sama dia
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
