export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;

// Total duration: 36.16s VO (1085 frames) + 40 frames hold = 1125 frames (37.50s)
export const TOTAL_DURATION = 1125;

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

// Precise Scene Timings in frames (@30fps) based on audio waveform & silence analysis
export const SCENES = {
  scene1: {
    from: 0,
    duration: 290, // 0.00s - 9.67s (Hook)
    parts: {
      part1: { from: 0, duration: 86 },    // "Customer sering bilang 'pikir-pikir dulu'"
      part2: { from: 86, duration: 58 },   // "atau 'nanti dihubungi lagi'?"
      part3: { from: 144, duration: 146 }, // "Pakai 3 teknik ini biar langsung deal!"
    },
  },
  scene2: {
    from: 290,
    duration: 175, // 9.67s - 15.50s (Scarcity Closing)
    parts: {
      intro: { from: 0, duration: 100 },   // "Satu, Scarcity Closing. Bikin mereka takut kehabisan alias FOMO."
      example: { from: 100, duration: 75 },// "Contohnya: 'Promo diskon ini cuma berlaku sampai besok loh, Pak!'"
    },
  },
  scene3: {
    from: 465,
    duration: 230, // 15.50s - 23.17s (Assumptive Closing)
    parts: {
      intro: { from: 0, duration: 110 },   // "Dua, Assumptive Closing. Asumsikan mereka udah pasti beli."
      dontAsk: { from: 110, duration: 55 }, // "Jangan tanya 'mau beli gak?',"
      options: { from: 165, duration: 65 }, // "tapi langsung kasih pilihan: 'Mau dikirim hari ini atau besok?'"
    },
  },
  scene4: {
    from: 695,
    duration: 235, // 23.17s - 31.00s (Summary Closing)
    parts: {
      intro: { from: 0, duration: 60 },     // "Tiga, Summary Closing."
      benefits: { from: 60, duration: 175 }, // "Sebutin ulang semua keuntungannya biar mereka sadar kalau produk ini udah paling pas buat kebutuhannya."
    },
  },
  scene5: {
    from: 930,
    duration: 195, // 31.00s - 37.50s (Call To Action + Outro Hold)
    parts: {
      hook: { from: 0, duration: 80 },      // "Mau tips jitu lainnya biar makin jago closing?"
      cta: { from: 80, duration: 75 },      // "Langsung aja follow Otosite sekarang!"
      hold: { from: 155, duration: 40 },    // Outro hold with CTA and footer clearly visible
    },
  },
} as const;

export const FONT_FAMILY =
  "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
