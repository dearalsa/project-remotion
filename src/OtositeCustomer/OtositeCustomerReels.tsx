import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "../Otosite/Background";
import { BrandingOverlay } from "../Otosite/BrandingOverlay";
import { AudioTracks } from "./AudioTracks";
import { SCENES } from "./constants";
import { LoadCustomerFonts } from "./loadFonts";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Scarcity } from "./Scene2Scarcity";
import { Scene3Assumptive } from "./Scene3Assumptive";
import { Scene4Summary } from "./Scene4Summary";
import { Scene5CTA } from "./Scene5CTA";

export const OtositeCustomerReels: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      {/* 1. Preload Montserrat Fonts */}
      <LoadCustomerFonts />

      {/* 2. Global Video Background (Consistent across whole video) */}
      <Background />

      {/* 3. Five Educational Scenes */}
      {/* Scene 1: Hook (0 - 290) */}
      <Sequence from={SCENES.scene1.from} durationInFrames={SCENES.scene1.duration}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Scarcity Closing (290 - 465) */}
      <Sequence from={SCENES.scene2.from} durationInFrames={SCENES.scene2.duration}>
        <Scene2Scarcity />
      </Sequence>

      {/* Scene 3: Assumptive Closing (465 - 695) */}
      <Sequence from={SCENES.scene3.from} durationInFrames={SCENES.scene3.duration}>
        <Scene3Assumptive />
      </Sequence>

      {/* Scene 4: Summary Closing (695 - 930) */}
      <Sequence from={SCENES.scene4.from} durationInFrames={SCENES.scene4.duration}>
        <Scene4Summary />
      </Sequence>

      {/* Scene 5: Call To Action & Outro Hold (930 - 1125) */}
      <Sequence from={SCENES.scene5.from} durationInFrames={SCENES.scene5.duration}>
        <Scene5CTA />
      </Sequence>

      {/* 4. Complete Audio Synchronization (VO + Balanced SFX) */}
      <AudioTracks />

      {/* 5. Otosite Branding Overlay (Top Logo & Bottom Footer, Consistent throughout entire video) */}
      <BrandingOverlay />
    </AbsoluteFill>
  );
};
