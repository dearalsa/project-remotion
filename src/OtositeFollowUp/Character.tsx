import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

export interface CharacterProps {
  characterNumber: number; // 5, 6, 7, 8, 9, 10, 11
  scale?: number;
  flipX?: boolean;
  style?: React.CSSProperties;
  entryProgress?: number; // 0 to 1 spring progress
  poseVariant?: "idle" | "confused" | "angry" | "pointing" | "ok" | "writing" | "speaking" | "eureka";
}

export const Character: React.FC<CharacterProps> = ({
  characterNumber,
  scale = 1,
  flipX = false,
  style,
  entryProgress = 1,
  poseVariant = "idle",
}) => {
  const frame = useCurrentFrame();

  // Gentle breathing / floating sinusoidal loop (duration 40 frames)
  const floatY = Math.sin((frame / 40) * Math.PI * 2) * 5;
  const floatRot = Math.sin((frame / 45) * Math.PI * 2) * 1.5;

  // Specific dynamic nuances per pose variant
  let extraTransform = "";
  if (poseVariant === "confused") {
    // 5.png: subtle questioning tilt
    const tilt = Math.sin((frame / 20) * Math.PI * 2) * 2.5;
    extraTransform = `rotate(${tilt}deg)`;
  } else if (poseVariant === "angry") {
    // 6.png: comedic jitter shake
    const shake = Math.sin(frame * 2.5) * 3;
    extraTransform = `translateX(${shake}px) scaleY(${1 + Math.sin(frame * 3) * 0.03})`;
  } else if (poseVariant === "pointing") {
    // 7.png: forward lean
    extraTransform = `rotate(-2deg)`;
  } else if (poseVariant === "ok") {
    // 8.png: rhythmic pulse
    const pulse = 1 + Math.sin((frame / 25) * Math.PI * 2) * 0.025;
    extraTransform = `scale(${pulse})`;
  } else if (poseVariant === "writing") {
    // 9.png: micro pencil jitter
    const pencilJitterX = Math.sin(frame * 3.5) * 2;
    const pencilJitterY = Math.cos(frame * 3.5) * 1.5;
    extraTransform = `translate(${pencilJitterX}px, ${pencilJitterY}px) rotate(1.5deg)`;
  } else if (poseVariant === "speaking") {
    // 10.png: friendly presenter nodding
    const nod = Math.sin((frame / 18) * Math.PI * 2) * 3;
    extraTransform = `translateY(${nod}px) rotate(${Math.sin((frame / 24) * Math.PI * 2) * 1.5}deg)`;
  } else if (poseVariant === "eureka") {
    // 11.png: celebratory buoyant bounce
    const hop = Math.abs(Math.sin((frame / 15) * Math.PI)) * -8;
    extraTransform = `translateY(${hop}px)`;
  }

  // Spring entry scaling from 0 to 1 with slight overshoot
  const currentScale = scale * entryProgress;

  return (
    <div
      style={{
        position: "absolute",
        width: 480,
        height: 480,
        transformOrigin: "50% 90%",
        transform: `translateY(${floatY}px) rotate(${floatRot}deg) scale(${currentScale}) scaleX(${
          flipX ? -1 : 1
        }) ${extraTransform}`,
        pointerEvents: "none",
        ...style,
      }}
    >
      <Img
        src={staticFile(`assets/character/${characterNumber}.png`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
