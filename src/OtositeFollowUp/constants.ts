import timingData from "./timingData.json";

export const VIDEO_WIDTH = timingData.width;
export const VIDEO_HEIGHT = timingData.height;
export const VIDEO_FPS = timingData.fps;
export const TOTAL_DURATION = timingData.totalDuration;

// Strict Content Area (Between Top Logo Y=262 and Bottom Footer Y=1562)
export const SAFE_TOP = timingData.safeArea.top; // 262 px
export const SAFE_BOTTOM = timingData.safeArea.bottom; // 1562 px
export const SAFE_LEFT = timingData.safeArea.left; // 60 px
export const SAFE_RIGHT = timingData.safeArea.right; // 1020 px
export const CONTENT_HEIGHT = timingData.safeArea.contentHeight; // 1300 px
export const CONTENT_WIDTH = timingData.safeArea.contentWidth; // 960 px

// Color Palette (Strictly Yellow, Red, Dark, White + Green for checkmarks)
export const COLOR_YELLOW = "#FFD33C";
export const COLOR_RED = "#FF3133";
export const COLOR_DARK = "#1A1A1A";
export const COLOR_GRAY = "#64748B";
export const COLOR_LIGHT_BG = "#F8FAFC";
export const COLOR_CARD_BG = "#FFFFFF";
export const COLOR_GREEN = "#10B981"; // permitted only for tiny positive checkmark
export const COLOR_BORDER = "#1A1A1A";

export const FONT_FAMILY = "Montserrat, sans-serif";

export { timingData };
