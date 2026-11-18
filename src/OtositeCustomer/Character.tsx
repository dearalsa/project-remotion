import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export interface CharacterProps {
  assetName: string; // e.g. "Scene1 (1).png", "Scene1 (2).png", "Scene1 (3).png", "Scene2.png", etc.
  height?: number;
  animationType?: "confused" | "awkward" | "cheerful_wave" | "shouting" | "cool_thumbs" | "discussion" | "jumping_joy" | "none";
  enterFrom?: "bottom" | "scale" | "left" | "right";
  delay?: number;
  exitFrame?: number; // frame at which it smoothly exits
  showShadow?: boolean;
  flipX?: boolean;
  style?: React.CSSProperties;
}

export const Character: React.FC<CharacterProps> = ({
  assetName,
  height = 540,
  animationType = "none",
  enterFrom = "bottom",
  delay = 0,
  exitFrame,
  showShadow = true,
  flipX = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Smooth entrance spring
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.7,
    },
  });

  // Smooth exit if exitFrame is specified
  let exitProgress = 1;
  let exitTranslateX = 0;
  if (exitFrame !== undefined && frame >= exitFrame) {
    exitProgress = interpolate(frame, [exitFrame, exitFrame + 8], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    exitTranslateX = interpolate(frame, [exitFrame, exitFrame + 8], [0, -30], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Entrance translation based on direction
  let enterX = 0;
  let enterY = 0;
  let enterScale = 1;

  if (enterFrom === "bottom") {
    enterY = interpolate(entrance, [0, 1], [100, 0]);
  } else if (enterFrom === "scale") {
    enterScale = interpolate(entrance, [0, 1], [0.85, 1]);
    enterY = interpolate(entrance, [0, 1], [30, 0]);
  } else if (enterFrom === "left") {
    enterX = interpolate(entrance, [0, 1], [-120, 0]);
  } else if (enterFrom === "right") {
    enterX = interpolate(entrance, [0, 1], [120, 0]);
  }

  // Nuanced procedural motions per character type
  let idleY = 0;
  let idleRotate = 0;
  let idleScale = 1;
  let shadowScale = 1;

  if (animationType === "confused") {
    // Subtle puzzled wobble + hesitation breathing
    idleRotate = Math.sin(frame * 0.16) * 3;
    idleScale = 1 + Math.sin(frame * 0.12) * 0.015;
    idleY = Math.sin(frame * 0.14) * 4;
    shadowScale = 1 + Math.sin(frame * 0.12) * 0.04;
  } else if (animationType === "awkward") {
    // Awkward scratch head tilt & nervous hesitation
    idleRotate = -2.5 + Math.sin(frame * 0.2) * 2;
    idleY = Math.sin(frame * 0.16) * 3;
    shadowScale = 0.98;
  } else if (animationType === "cheerful_wave") {
    // Rhythmic 3-finger wave rocking & cheerful energetic vertical bounce
    const waveCycle = Math.sin(frame * 0.32);
    idleRotate = waveCycle * 5;
    idleY = -Math.abs(Math.sin(frame * 0.28)) * 14;
    idleScale = 1 + Math.abs(waveCycle) * 0.02;
    shadowScale = 1 - Math.abs(Math.sin(frame * 0.28)) * 0.12;
  } else if (animationType === "shouting") {
    // Megaphone announcement pulse & forward lean
    const shoutCycle = Math.sin(frame * 0.35);
    idleScale = 1 + Math.sin(frame * 0.35) * 0.02;
    idleRotate = -1.5 + shoutCycle * 1.5;
    enterX += Math.sin(frame * 0.35) * 4;
  } else if (animationType === "cool_thumbs") {
    // Confident steady posture with subtle breathing
    idleY = Math.sin(frame * 0.14) * 5;
    shadowScale = 1 + Math.sin(frame * 0.14) * 0.05;
  } else if (animationType === "discussion") {
    // Gentle conversational nodding
    idleRotate = Math.sin(frame * 0.18) * 1.8;
    idleY = Math.sin(frame * 0.18) * 3;
  } else if (animationType === "jumping_joy") {
    // High energy celebratory jump
    const jumpBounce = Math.abs(Math.sin(frame * 0.26));
    idleY = -jumpBounce * 24;
    idleRotate = Math.sin(frame * 0.26) * 3;
    shadowScale = 1 - jumpBounce * 0.25;
  }

  const opacity = interpolate(adjustedFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * exitProgress;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        opacity,
        transform: `translate(${enterX + exitTranslateX}px, ${enterY}px)`,
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Ground Elliptical Shadow */}
      {showShadow && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            width: height * 0.44,
            height: 18,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(29, 31, 32, 0.28) 0%, rgba(29, 31, 32, 0) 72%)",
            transform: `scale(${shadowScale})`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Stickman Character */}
      <div
        style={{
          transformOrigin: "bottom center",
          transform: `translateY(${idleY}px) rotate(${idleRotate}deg) scale(${enterScale * idleScale}) ${
            flipX ? "scaleX(-1)" : ""
          }`,
          zIndex: 2,
        }}
      >
        <Img
          src={staticFile(`assets/character/${assetName}`)}
          alt={assetName}
          style={{
            height,
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 16px rgba(29, 31, 32, 0.12))",
          }}
        />
      </div>
    </div>
  );
};
