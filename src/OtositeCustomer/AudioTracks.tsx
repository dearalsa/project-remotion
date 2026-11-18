import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export const AudioTracks: React.FC = () => {
  return (
    <>
      {/* 1. Main Voice-Over Track (Full length, uninterrupted from frame 0) */}
      <Audio
        src={staticFile("assets/voice over (3).wav")}
        volume={1}
      />

      {/* 2. Procedural SFX synced to staggered kinetic reveals (Volume 0.20 - 0.25, never masking VO) */}

      {/* --- SCENE 1 (Hook: 0 - 290) --- */}
      {/* Frame 8: Hook badge pop */}
      <Sequence from={8} durationInFrames={30}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 42: Quote 1 "Pikir-pikir dulu" pop */}
      <Sequence from={42} durationInFrames={30}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 92: Quote 2 "Nanti dihubungi lagi" pop */}
      <Sequence from={92} durationInFrames={30}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 144: Transition to Part 3 */}
      <Sequence from={144} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 160: Solution reveal impact */}
      <Sequence from={160} durationInFrames={35}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 195: Cheerful 3-finger wave chime */}
      <Sequence from={195} durationInFrames={40}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.22} />
      </Sequence>

      {/* --- SCENE 2 (Scarcity Closing: 290 - 465) --- */}
      {/* Frame 290: Scene 2 transition whoosh */}
      <Sequence from={290} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 312: Scarcity title card */}
      <Sequence from={312} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 370: FOMO badge pop */}
      <Sequence from={370} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 395: Urgent promo card slam */}
      <Sequence from={395} durationInFrames={35}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 3 (Assumptive Closing: 465 - 695) --- */}
      {/* Frame 465: Scene 3 transition whoosh */}
      <Sequence from={465} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 575: Crossed question card pop */}
      <Sequence from={575} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 625: Choice option selected tick */}
      <Sequence from={625} durationInFrames={25}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 4 (Summary Closing: 695 - 930) --- */}
      {/* Frame 695: Scene 4 transition whoosh */}
      <Sequence from={695} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 800: Checklist item 1 tick */}
      <Sequence from={800} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 840: Checklist item 2 tick */}
      <Sequence from={840} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>
      {/* Frame 875: Checklist item 3 tick */}
      <Sequence from={875} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
      </Sequence>

      {/* --- SCENE 5 (Call To Action: 930 - 1125) --- */}
      {/* Frame 930: Scene 5 transition whoosh */}
      <Sequence from={930} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />
      </Sequence>
      {/* Frame 1008: CTA card pop */}
      <Sequence from={1008} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />
      </Sequence>
      {/* Frame 1025: Follow Otosite CTA impact */}
      <Sequence from={1025} durationInFrames={35}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.25} />
      </Sequence>
      {/* Frame 1038: Celebration sparkle */}
      <Sequence from={1038} durationInFrames={40}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.22} />
      </Sequence>
    </>
  );
};
