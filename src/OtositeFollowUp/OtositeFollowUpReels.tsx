import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "../Otosite/Background";
import { BrandingOverlay } from "../Otosite/BrandingOverlay";
import { FontStyles } from "../Otosite/loadFonts";
import { AudioTracks } from "./AudioTracks";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2ChatHistory } from "./Scene2ChatHistory";
import { Scene3UsefulInfo } from "./Scene3UsefulInfo";
import { Scene4CustomerNotes } from "./Scene4CustomerNotes";
import { Scene5OtositeWeb } from "./Scene5OtositeWeb";
import { Scene6ClosingCTA } from "./Scene6ClosingCTA";
import { timingData } from "./constants";

export const OtositeFollowUpReels: React.FC = () => {
  const { scenes } = timingData;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      {/* 1. Typography Fonts */}
      <FontStyles />

      {/* 2. Global Video Background (Read-Only from ../Otosite/) */}
      <Background />

      {/* 3. Visual Educational Scenes */}
      {/* Scene 1: Hook - Cuma Di-Read Doang? (0 - 164) */}
      <Sequence from={scenes.scene1.startFrame} durationInFrames={scenes.scene1.duration}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Tips 1 - Cek Riwayat Chat (164 - 410) */}
      <Sequence from={scenes.scene2.startFrame} durationInFrames={scenes.scene2.duration}>
        <Scene2ChatHistory />
      </Sequence>

      {/* Scene 3: Tips 2 - Kirim Informasi Berguna (410 - 611) */}
      <Sequence from={scenes.scene3.startFrame} durationInFrames={scenes.scene3.duration}>
        <Scene3UsefulInfo />
      </Sequence>

      {/* Scene 4: Tips 3 - Catat Kebutuhan Customer (611 - 816) */}
      <Sequence from={scenes.scene4.startFrame} durationInFrames={scenes.scene4.duration}>
        <Scene4CustomerNotes />
      </Sequence>

      {/* Scene 5: Tips 4 - Website Sales Otosite (816 - 1051) */}
      <Sequence from={scenes.scene5.startFrame} durationInFrames={scenes.scene5.duration}>
        <Scene5OtositeWeb />
      </Sequence>

      {/* Scene 6: Closing CTA - Follow-Up Pintar, Closing Lancar! (1051 - 1245) */}
      <Sequence from={scenes.scene6.startFrame} durationInFrames={scenes.scene6.duration}>
        <Scene6ClosingCTA />
      </Sequence>

      {/* 4. Complete Audio Synchronization (VO + Procedural SFX) */}
      <AudioTracks />

      {/* 5. Otosite Branding Overlay (Top Logo & Bottom Footer, Layered on Top at zIndex 50) */}
      <BrandingOverlay />
    </AbsoluteFill>
  );
};
