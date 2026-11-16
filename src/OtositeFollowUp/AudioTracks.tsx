import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { timingData } from "./constants";

export const AudioTracks: React.FC = () => {
  const currentFrame = useCurrentFrame();

  return (
    <>
      {/* Master Voice-Over */}
      <Audio
        src={staticFile("assets/voice over(2).wav")}
        volume={1.0}
      />

      {/* Procedural Synthesized Sound Effects */}
      {timingData.sfxCues.map((cue, idx) => {
        // Special dynamic volume handling for incoming_ring in Scene 6B:
        // Lower (0.15) while VO is speaking, rises slightly (0.24) after VO ends (frame 1187)
        let volume = cue.volume;
        if (cue.file === "incoming_ring.wav" && currentFrame >= 958) {
          volume = 0.24;
        }

        return (
          <Sequence key={`sfx-${idx}-${cue.file}`} from={cue.frame}>
            <Audio
              src={staticFile(`assets/followup-sfx/${cue.file}`)}
              volume={volume}
            />
          </Sequence>
        );
      })}
    </>
  );
};
