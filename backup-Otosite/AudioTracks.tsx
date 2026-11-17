import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

type SfxCue = {
  from: number;
  durationInFrames: number;
  file: string;
  volume: number;
};

const SFX_CUES: SfxCue[] = [
  // Scene 1 — Hook
  { from: 8, durationInFrames: 15, file: "sfx/impact.wav", volume: 0.4 },
  { from: 42, durationInFrames: 15, file: "sfx/impact.wav", volume: 0.45 },
  { from: 61, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.35 },
  { from: 75, durationInFrames: 10, file: "sfx/pop.wav", volume: 0.35 },
  { from: 86, durationInFrames: 15, file: "sfx/boing.wav", volume: 0.4 },

  // Scene 1 -> 2 Transition
  { from: 98, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.4 },

  // Scene 2 — Problem ("Kurang Percaya" Alert / Doubt SFX)
  { from: 110, durationInFrames: 15, file: "sfx/impact.wav", volume: 0.35 },
  { from: 150, durationInFrames: 18, file: "sfx/alert_doubt.wav", volume: 0.45 }, // Subtle Alert / Panic / Doubt
  { from: 168, durationInFrames: 18, file: "sfx/thud.wav", volume: 0.5 },

  // Scene 2 -> 3 Transition
  { from: 204, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.4 },

  // Scene 3 — Catalog (Buttons synced to exact voice-over words)
  { from: 216, durationInFrames: 25, file: "sfx/chime.wav", volume: 0.4 },
  { from: 240, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.35 },
  { from: 249, durationInFrames: 15, file: "sfx/pop.wav", volume: 0.4 },
  { from: 308, durationInFrames: 10, file: "sfx/pop.wav", volume: 0.45 }, // Button 1: "tipe"
  { from: 319, durationInFrames: 10, file: "sfx/pop.wav", volume: 0.45 }, // Button 2: "spesifikasi"
  { from: 343, durationInFrames: 10, file: "sfx/pop.wav", volume: 0.45 }, // Button 3: "promo"

  // Scene 3 -> 4 Transition
  { from: 350, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.4 },

  // Scene 4 — SEO
  { from: 362, durationInFrames: 15, file: "sfx/impact.wav", volume: 0.45 },
  { from: 371, durationInFrames: 15, file: "sfx/impact.wav", volume: 0.5 },
  { from: 383, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.35 },
  { from: 388, durationInFrames: 6, file: "sfx/typing.wav", volume: 0.4 },
  { from: 394, durationInFrames: 6, file: "sfx/typing.wav", volume: 0.4 },
  { from: 400, durationInFrames: 6, file: "sfx/typing.wav", volume: 0.4 },
  { from: 406, durationInFrames: 6, file: "sfx/typing.wav", volume: 0.4 },
  { from: 416, durationInFrames: 10, file: "sfx/tick.wav", volume: 0.5 }, // Hand click on search
  { from: 420, durationInFrames: 25, file: "sfx/rising.wav", volume: 0.45 },
  { from: 434, durationInFrames: 25, file: "sfx/sparkle.wav", volume: 0.45 },
  { from: 481, durationInFrames: 25, file: "sfx/chime.wav", volume: 0.4 },

  // Scene 4 -> 5 Transition
  { from: 491, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.4 },

  // Scene 5 — CTA & Ending ("UPGARDE BERSAMA OTOSITE")
  { from: 503, durationInFrames: 20, file: "sfx/impact.wav", volume: 0.5 },
  { from: 570, durationInFrames: 15, file: "sfx/whoosh.wav", volume: 0.4 },
  { from: 601, durationInFrames: 30, file: "sfx/sparkle.wav", volume: 0.45 }, // Final Clean Climax
];

export const AudioTracks: React.FC = () => {
  return (
    <>
      {/* Master Voice-Over */}
      <Audio
        src={staticFile("assets/voice over.wav")}
        volume={1.0}
      />

      {/* Synchronized Sound Effects */}
      {SFX_CUES.map((cue, idx) => (
        <Sequence
          key={`sfx-${idx}-${cue.from}`}
          from={cue.from}
          durationInFrames={cue.durationInFrames}
          layout="none"
        >
          <Audio
            src={staticFile(cue.file)}
            volume={cue.volume}
          />
        </Sequence>
      ))}
    </>
  );
};
