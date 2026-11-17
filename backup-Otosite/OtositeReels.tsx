import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioTracks } from "./AudioTracks";
import { Background } from "./Background";
import { BrandingOverlay } from "./BrandingOverlay";
import { SCENES } from "./constants";
import { FontStyles } from "./loadFonts";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Problem } from "./Scene2Problem";
import { Scene3Catalog } from "./Scene3Catalog";
import { Scene4SEO } from "./Scene4SEO";
import { Scene5CTA } from "./Scene5CTA";

export const OtositeReels: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      {/* 1. Global Offline Font Definitions */}
      <FontStyles />

      {/* 2. Seamless Looping Background Grid (Layer 1) */}
      <Background />

      {/* 3. Five Production Scenes (Layer 2) */}
      <Sequence
        from={SCENES.SCENE_1.from}
        durationInFrames={SCENES.SCENE_1.duration}
        name="Scene 1 — Hook"
      >
        <Scene1Hook />
      </Sequence>

      <Sequence
        from={SCENES.SCENE_2.from}
        durationInFrames={SCENES.SCENE_2.duration}
        name="Scene 2 — Masalah"
      >
        <Scene2Problem />
      </Sequence>

      <Sequence
        from={SCENES.SCENE_3.from}
        durationInFrames={SCENES.SCENE_3.duration}
        name="Scene 3 — Solusi Katalog"
      >
        <Scene3Catalog />
      </Sequence>

      <Sequence
        from={SCENES.SCENE_4.from}
        durationInFrames={SCENES.SCENE_4.duration}
        name="Scene 4 — Fitur SEO"
      >
        <Scene4SEO />
      </Sequence>

      <Sequence
        from={SCENES.SCENE_5.from}
        durationInFrames={SCENES.SCENE_5.duration}
        name="Scene 5 — Call to Action"
      >
        <Scene5CTA />
      </Sequence>

      {/* 4. Master Voice-Over & Synchronized SFX (Layer 3) */}
      <AudioTracks />

      {/* 5. Authentic Otosite Branding Frame Overlay (Layer 4 - Topmost) */}
      <BrandingOverlay />
    </AbsoluteFill>
  );
};
