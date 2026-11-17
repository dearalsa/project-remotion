import React from "react";
import { AbsoluteFill, Loop, staticFile, Video } from "remotion";

export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      <Loop durationInFrames={450}>
        <Video
          src={staticFile("assets/background.mp4")}
          muted
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.95,
          }}
        />
      </Loop>
    </AbsoluteFill>
  );
};

