export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const TOTAL_DURATION = 646; // 21.53s matching voice over.wav

// Scene Timings in frames (@30fps) based on accurate audio waveform analysis
export const SCENES = {
  SCENE_1: { from: 0, duration: 98 },    // 0.00s - 3.27s: Hook ("Masih ngandelin medsos doang buat jualan mobil?")
  SCENE_2: { from: 98, duration: 106 },  // 3.27s - 6.80s: Problem ("Calon pembeli bisa jadi kurang percaya.")
  SCENE_3: { from: 204, duration: 146 }, // 6.80s - 11.67s: Catalog Solution ("Yuk, punya website katalog...")
  SCENE_4: { from: 350, duration: 141 }, // 11.67s - 16.37s: SEO Discovery ("Dengan SEO, website kamu juga...")
  SCENE_5: { from: 491, duration: 155 }, // 16.37s - 21.53s: CTA & Closing ("Upgrade cara jualanmu sekarang...")
} as const;

// Safe Area (in pixels) for central content so it never touches the branding frame
export const SAFE_TOP = 230;
export const SAFE_BOTTOM = 250;

// Otosite Official Brand Colors & Styling
export const COLORS = {
  yellow: "#FFD33C",       // Kuning Otosite utama
  red: "#FF3133",          // Merah Otosite aksen penting
  blue: "#1842B6",         // Biru Otosite header/footer
  blueDark: "#0F2B82",
  textDark: "#0F172A",     // Hitam teks tajam
  textMuted: "#475569",    // Abu-abu keterangan
  bgWhite: "#FFFFFF",
  cardBg: "#FFFFFF",
  cardBorder: "rgba(0, 0, 0, 0.08)",
  cardShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.14)",
  accentGreen: "#10B981",
};

export const FONT_FAMILY =
  "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

