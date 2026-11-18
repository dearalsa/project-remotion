export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;

// Total duration: 40.03s VO (1201 frames) + 44 frames outro hold = 1245 frames (41.50s)
export const TOTAL_DURATION = 1245;

// Strict 6 Brand Colors
export const COLORS = {
  blue: "#1800AC",
  red: "#FF3133",
  dark: "#1D1F20",
  yellow: "#F7C25D",
  yellowTua: "#E79B02",
  yellowMuda: "#FFD33C",
} as const;

// Safe Area (in pixels) for content so it never touches top branding pill or bottom footer
export const SAFE_TOP = 270;
export const SAFE_BOTTOM = 1540;
export const SAFE_LEFT = 60;
export const SAFE_RIGHT = 60;

// Precise Scene Timings in frames (@30fps) based on audio waveform & silence analysis of voice over(3).wav
export const SCENES = {
  scene1: {
    from: 0,
    duration: 240, // 0.00s - 8.00s (Hook)
    parts: {
      part1: { from: 0, duration: 90 },    // "Customer sering bilang 'pikir-pikir dulu'"
      part2: { from: 90, duration: 54 },   // "atau 'nanti dihubungi lagi'?"
      part3: { from: 144, duration: 96 },  // "Pakai 3 teknik ini biar langsung deal!"
    },
  },
  scene2: {
    from: 240,
    duration: 280, // 8.00s - 17.33s (Scarcity Closing)
    parts: {
      intro: { from: 0, duration: 155 },   // "Satu, Scarcity Closing. Bikin mereka takut kehabisan alias FOMO."
      example: { from: 155, duration: 125 },// "Contohnya: 'Promo diskon ini cuma berlaku sampai besok loh, Pak!'"
    },
  },
  scene3: {
    from: 520,
    duration: 295, // 17.33s - 27.17s (Assumptive Closing)
    parts: {
      intro: { from: 0, duration: 120 },   // "Dua, Assumptive Closing. Asumsikan mereka udah pasti beli."
      dontAsk: { from: 120, duration: 55 }, // "Jangan tanya 'mau beli gak?',"
      options: { from: 175, duration: 120 },// "tapi langsung kasih pilihan: 'Mau dikirim hari ini atau besok?'"
    },
  },
  scene4: {
    from: 815,
    duration: 235, // 27.17s - 35.00s (Summary Closing)
    parts: {
      intro: { from: 0, duration: 65 },     // "Tiga, Summary Closing."
      benefits: { from: 65, duration: 170 },// "Sebutin ulang semua keuntungannya biar mereka sadar kalau produk ini udah paling pas buat kebutuhannya."
    },
  },
  scene5: {
    from: 1050,
    duration: 195, // 35.00s - 41.50s (Call To Action + Outro Hold)
    parts: {
      hook: { from: 0, duration: 84 },      // "Mau tips jitu lainnya biar makin jago closing?"
      cta: { from: 84, duration: 67 },      // "Langsung aja follow Otosite sekarang!"
      hold: { from: 151, duration: 44 },    // Outro hold with CTA and footer clearly visible
    },
  },
} as const;

export const FONT_FAMILY =
  "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
