import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export type CharacterProps = {
  readonly id: 1 | 2 | 3 | 4;
  readonly height?: number;
  readonly style?: React.CSSProperties;
  readonly enterFrom?: "bottom" | "left" | "right" | "scale";
  readonly delay?: number;
  readonly flipX?: boolean;
  readonly motion?: "idle-breathe" | "bounce" | "jump" | "none";
  readonly showShadow?: boolean;
};

export const Character: React.FC<CharacterProps> = ({
  id,
  height = 540,
  style,
  enterFrom = "bottom",
  delay = 0,
  flipX = false,
  motion = "idle-breathe",
  showShadow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 120,
    },
  });

  let translateX = 0;
  let translateY = 0;
  let scale = entrance;

  if (enterFrom === "bottom") {
    translateY = interpolate(entrance, [0, 1], [180, 0]);
    scale = 1;
  } else if (enterFrom === "left") {
    translateX = interpolate(entrance, [0, 1], [-220, 0]);
    scale = 1;
  } else if (enterFrom === "right") {
    translateX = interpolate(entrance, [0, 1], [220, 0]);
    scale = 1;
  }

  // Idle / Jump Motion
  let idleY = 0;
  let idleRotate = 0;
  let shadowScale = 1;
  let shadowOpacity = 0.28;

  if (motion === "idle-breathe") {
    idleY = Math.sin((frame / fps) * Math.PI * 1.6) * 6;
    shadowScale = 1 + Math.sin((frame / fps) * Math.PI * 1.6) * 0.08;
  } else if (motion === "bounce") {
    const cycle = Math.abs(Math.sin((frame / fps) * Math.PI * 2.8));
    idleY = cycle * -16;
    idleRotate = Math.sin((frame / fps) * Math.PI * 2.8) * 2.5;
    shadowScale = 1 - cycle * 0.15;
    shadowOpacity = 0.28 - cycle * 0.08;
  } else if (motion === "jump") {
    const jumpCycle = Math.abs(Math.sin((frame / fps) * Math.PI * 2.2));
    idleY = jumpCycle * -42;
    idleRotate = Math.sin((frame / fps) * Math.PI * 2.2) * 4;
    shadowScale = 1 - jumpCycle * 0.35;
    shadowOpacity = 0.28 - jumpCycle * 0.16;
  }

  const transform = [
    `translate(${translateX}px, ${translateY + idleY}px)`,
    `scale(${scale})`,
    flipX ? "scaleX(-1)" : "",
    idleRotate ? `rotate(${idleRotate}deg)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        opacity: interpolate(adjustedFrame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        ...style,
      }}
    >
      {/* Stickman Character */}
      <div
        style={{
          transform,
          transformOrigin: "bottom center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(`assets/character/${id}.png`)}
          alt={`Stickman Karakter ${id}`}
          style={{
            height,
            width: "auto",
            objectFit: "contain",
            rotate: "-0.4deg",
            translate: "0px -11.1px"
          }}
        />
      </div>

      {showShadow && (
        <div
          style={{
            position: "absolute",
            bottom: id === 3 ? 95 : 36,
            width: height * 0.38,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 72%)",
            transform: `scale(${shadowScale})`,
            opacity: shadowOpacity,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
};
