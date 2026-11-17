import React from "react";
import { staticFile } from "remotion";

export const FontStyles: React.FC = () => {
  const montserratExtraBoldUrl = staticFile("fonts/Montserrat-ExtraBold.ttf");
  const montserratBoldUrl = staticFile("fonts/Montserrat-Bold.ttf");

  return (
    <style>{`
      @font-face {
        font-family: 'Montserrat';
        font-weight: 800;
        font-style: normal;
        font-display: swap;
        src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url('${montserratExtraBoldUrl}') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat';
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        src: local('Montserrat Bold'), local('Montserrat-Bold'), url('${montserratBoldUrl}') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat';
        font-weight: 900;
        font-style: normal;
        font-display: swap;
        src: local('Montserrat Black'), local('Montserrat-Black'), url('${montserratExtraBoldUrl}') format('truetype');
      }
    `}</style>
  );
};
