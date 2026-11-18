import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export const AudioTracks: React.FC = () => {
  return (
    <>
      {/* 1. Main Voice-Over Track (Full length, uninterrupted from frame 0) */}
      <Audio
        src={staticFile("assets/voice over(3).wav")}
        volume={1}
      />

      {/* 2. Procedural SFX synced to staggered kinetic reveals (Volume 0.20 - 0.25, never masking VO) */}

      {/* --- SCENE 1 (Hook: 0 - 240) --- */}
      {/* Frame 6: Hook speech begins pop */}
      <Sequence from={6} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 46: Quote 1 "Pikir-pikir dulu" pop */}
      <Sequence from={46} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 92: Quote 2 "Nanti dihubungi lagi" pop */}
      <Sequence from={92} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 144: Transition to Part 3 "Pakai 3 teknik ini" */}
      <Sequence from={144} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 186: "Biar langsung deal!" solution reveal impact */}
      <Sequence from={186} durationInFrames={35}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 200: Cheerful 3-finger wave chime */}
      <Sequence from={200} durationInFrames={35}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.22} />
      </Sequence>

      {/* --- SCENE 2 (Scarcity Closing: 240 - 520) --- */}
      {/* Frame 240: Scene 2 transition whoosh */}
      <Sequence from={240} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 268: Scarcity title card */}
      <Sequence from={268} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 366: FOMO badge pop */}
      <Sequence from={366} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 398: Urgent promo card slam */}
      <Sequence from={398} durationInFrames={30}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 3 (Assumptive Closing: 520 - 815) --- */}
      {/* Frame 520: Scene 3 transition whoosh */}
      <Sequence from={520} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 546: Assumptive title card */}
      <Sequence from={546} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 644: Crossed question card pop */}
      <Sequence from={644} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 746: Choice option 1 "Hari ini?" tick */}
      <Sequence from={746} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 766: Choice option 2 "Besok?" tick */}
      <Sequence from={766} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 4 (Summary Closing: 815 - 1050) --- */}
      {/* Frame 815: Scene 4 transition whoosh */}
      <Sequence from={815} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 840: Summary Closing title pop */}
      <Sequence from={840} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 890: Checklist item 1 tick */}
      <Sequence from={890} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 907: Checklist item 2 tick */}
      <Sequence from={907} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 923: Checklist item 3 tick */}
      <Sequence from={923} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 5 (Call To Action: 1050 - 1245) --- */}
      {/* Frame 1050: Scene 5 transition whoosh */}
      <Sequence from={1050} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 1060: Question card pop */}
      <Sequence from={1060} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 1134: CTA transition pop */}
      <Sequence from={1134} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 1158: Follow Otosite CTA impact */}
      <Sequence from={1158} durationInFrames={35}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.25} />
      </Sequence>
      {/* Frame 1170: Celebration sparkle */}
      <Sequence from={1170} durationInFrames={40}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.22} />
      </Sequence>
    </>
  );
};
