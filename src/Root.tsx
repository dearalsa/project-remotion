import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { TOTAL_DURATION, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./Otosite/constants";
import { OtositeReels } from "./Otosite/OtositeReels";
import { TOTAL_DURATION as FOLLOWUP_DURATION } from "./OtositeFollowUp/constants";
import { OtositeFollowUpReels } from "./OtositeFollowUp/OtositeFollowUpReels";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Otosite Instagram Reels Video Composition */}
      <Composition
        id="OtositeReels"
        component={OtositeReels}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* New Follow-Up Education Reels Composition */}
      <Composition
        id="OtositeFollowUpReels"
        component={OtositeFollowUpReels}
        durationInFrames={FOLLOWUP_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Preserved Original Compositions */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
    </>
  );
};
