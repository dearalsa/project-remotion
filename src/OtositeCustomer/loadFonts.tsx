import React, { useEffect, useState } from "react";
import { delayRender, continueRender, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

// Pre-load Google Fonts with Montserrat SemiBold, Bold, and ExtraBold
const fontData = loadFont("normal", {
  weights: ["600", "700", "800"],
});

export const LoadCustomerFonts: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading Montserrat Font"));

  useEffect(() => {
    fontData
      .waitUntilDone()
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        console.warn("Font loading fallback to local fonts:", err);
        continueRender(handle);
      });
  }, [handle]);

  const montserratBoldUrl = staticFile("fonts/Montserrat-Bold.ttf");
  const montserratExtraBoldUrl = staticFile("fonts/Montserrat-ExtraBold.ttf");

  return (
    <style>{`
      @font-face {
        font-family: 'Montserrat';
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        src: local('Montserrat Bold'), url('${montserratBoldUrl}') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat';
        font-weight: 800;
        font-style: normal;
        font-display: swap;
        src: local('Montserrat ExtraBold'), url('${montserratExtraBoldUrl}') format('truetype');
      }
    `}</style>
  );
};
