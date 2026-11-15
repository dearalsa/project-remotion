import React from "react";
import { AbsoluteFill, Loop, staticFile, Video } from "remotion";

/**
 * BrandingOverlay renders the authentic footage from footer otosite.mp4
 * clipped precisely to the top Otosite logo pill and bottom www.otosite.id footer pill.
 * This guarantees 100% transparent overlay over the full-screen grid background
 * with ZERO black bars or borders!
 */
export const BrandingOverlay: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Loop durationInFrames={442}>
        {/* 1. Top Logo Pill (Top-Left) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 124,
            width: 350,
            height: 138,
            overflow: "hidden",
            borderTopRightRadius: 69,
            borderBottomRightRadius: 69,
          }}
        >
          <Video
            src={staticFile("assets/footer otosite.mp4")}
            muted
            volume={0}
            style={{
              position: "absolute",
              left: 0,
              top: -124,
              width: 1080,
              height: 1918,
            }}
          />
        </div>

        {/* 2. Bottom Footer Pill (Centered at Bottom) */}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 1562,
            width: 936,
            height: 124,
            overflow: "hidden",
            borderRadius: 62,
          }}
        >
          <Video
            src={staticFile("assets/footer otosite.mp4")}
            muted
            volume={0}
            style={{
              position: "absolute",
              left: -72,
              top: -1562,
              width: 1080,
              height: 1918,
            }}
          />
        </div>
      </Loop>
    </AbsoluteFill>
  );
};
