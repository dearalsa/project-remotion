/**
 * Procedural SFX Synthesizer for OtositeFollowUpReels (V2 - High Audibility on Mobile)
 * - All SFX normalized to exactly -3.0 dBFS peak in-script.
 * - Enriched with 150-250 Hz body and 1-4 kHz transient/presence frequencies for clarity on phone speakers.
 * - phone_vibrate redesigned as a 3-burst tactile haptic buzz with phone housing clicks.
 * - Generates 14 distinct WAV files and 1 preview compilation (sfx_preview_all.wav).
 */

const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const TARGET_PEAK_DB = -3.0;
const TARGET_PEAK_LIN = Math.pow(10, TARGET_PEAK_DB / 20); // ~0.707946

// Helper: Create 44-byte WAV header for mono 16-bit PCM
function createWavHeader(numSamples) {
  const byteRate = SAMPLE_RATE * 2;
  const blockAlign = 2;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // 16-bit
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

// Helper: Normalize float samples to exact peak dBFS
function normalizeToPeak(samples, targetLin = TARGET_PEAK_LIN) {
  let maxAbs = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxAbs) maxAbs = abs;
  }
  if (maxAbs === 0) return samples;
  const gain = targetLin / maxAbs;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    out[i] = samples[i] * gain;
  }
  return out;
}

// Helper: Save Float32Array to 16-bit WAV file
function writeWavFile(filePath, samples) {
  const numSamples = samples.length;
  const header = createWavHeader(numSamples);
  const data = Buffer.alloc(numSamples * 2);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1.0, Math.min(1.0, samples[i]));
    const intVal = Math.round(clamped * 32767);
    data.writeInt16LE(intVal, i * 2);
  }

  const finalBuf = Buffer.concat([header, data]);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, finalBuf);
}

// -------------------------------------------------------------
// 14 Specialized SFX Generators (Optimized for Mobile Playback)
// -------------------------------------------------------------

// 1. chat_notification: Clean bright dual bell chime (880Hz + 1760Hz + 2640Hz), 0.22s
function genChatNotification() {
  const duration = 0.22;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 16);
    const s1 = Math.sin(2 * Math.PI * 880 * t);
    const s2 = 0.5 * Math.sin(2 * Math.PI * 1760 * t);
    const s3 = 0.25 * Math.sin(2 * Math.PI * 2640 * t);
    samples[i] = (s1 + s2 + s3) * env;
  }
  return normalizeToPeak(samples);
}

// 2. read_doubt: Minor tension cue with clear presence in 550-1800 Hz range, 0.35s
function genReadDoubt() {
  const duration = 0.35;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    // Downward glide from 587 Hz (D5) to 530 Hz with vibrato flutter
    const freq = 587 - progress * 57;
    const flutter = 1.0 + 0.25 * Math.sin(2 * Math.PI * 8 * t);
    const env = Math.sin(Math.PI * Math.min(1, t / 0.04)) * Math.exp(-t * 7);

    // Fundamental + 2nd & 3rd harmonic for phone speaker visibility
    const s1 = Math.sin(2 * Math.PI * freq * t);
    const s2 = 0.45 * Math.sin(2 * Math.PI * freq * 2 * t);
    const s3 = 0.2 * Math.sin(2 * Math.PI * freq * 3 * t);
    samples[i] = (s1 + s2 + s3) * env * flutter;
  }
  return normalizeToPeak(samples);
}

// 3. punch_impact: Tight punch with 180-220Hz body and 2.5-3.5kHz transient snap, 0.28s
function genPunchImpact() {
  const duration = 0.28;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Audible phone body frequency: drops from 220Hz down to 140Hz
    const freq = 140 + 80 * Math.exp(-t * 25);
    const bodyEnv = Math.exp(-t * 15);
    const body = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * bodyEnv;

    // Sharp transient slap in 2.5kHz - 3.5kHz range (20ms)
    let snap = 0;
    if (t < 0.02) {
      const snapEnv = 1 - t / 0.02;
      const snapNoise = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 3000 * t);
      snap = snapNoise * snapEnv * 1.2;
    }
    samples[i] = body + snap;
  }
  return normalizeToPeak(samples);
}

// 4. swipe_whoosh: Resonant card swipe with strong 1.2kHz - 3.5kHz presence, 0.20s
function genSwipeWhoosh() {
  const duration = 0.20;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const env = Math.sin(Math.PI * progress);

    // Resonant center frequency sweeps 1000Hz -> 3200Hz -> 1400Hz
    const centerFreq = 1000 + 2200 * Math.sin(Math.PI * progress);
    const white = Math.random() * 2 - 1;
    const carrier = Math.sin(2 * Math.PI * centerFreq * t);
    const transient = Math.sin(2 * Math.PI * (centerFreq * 0.5) * t) * 0.4;
    samples[i] = (white * 0.6 + carrier * 0.7 + transient) * env;
  }
  return normalizeToPeak(samples);
}

// 5. card_pop: Punchy upward UI chirp with 1.2kHz - 3.2kHz harmonic snap, 0.12s
function genCardPop() {
  const duration = 0.12;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    // Rises from 480Hz through 1400Hz up to 2400Hz
    const freq = 480 + 1920 * Math.pow(progress, 0.6);
    const env = Math.sin(Math.PI * Math.min(1, t / 0.015)) * Math.exp(-t * 26);

    const s1 = Math.sin(2 * Math.PI * freq * t);
    const s2 = 0.4 * Math.sin(2 * Math.PI * freq * 1.5 * t);
    // Transient click at start
    const click = t < 0.01 ? (Math.random() * 2 - 1) * 0.5 * (1 - t / 0.01) : 0;
    samples[i] = (s1 + s2 + click) * env;
  }
  return normalizeToPeak(samples);
}

// 6. clock_tick: Dual crisp mechanical tick-tock with 1.8kHz & 3.2kHz transients, 0.14s
function genClockTick() {
  const duration = 0.14;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    // Tick 1 (t = 0ms to 40ms): 2.4kHz & 3.4kHz crisp snap
    let s1 = 0;
    if (t < 0.045) {
      const env1 = Math.exp(-t * 120);
      s1 = (Math.sin(2 * Math.PI * 2400 * t) + 0.6 * Math.sin(2 * Math.PI * 3400 * t) + (Math.random() * 2 - 1) * 0.3) * env1;
    }

    // Tick 2 (t = 55ms to 100ms): 1.6kHz & 2.8kHz mechanical escapement
    let s2 = 0;
    if (t >= 0.055 && t < 0.11) {
      const t2 = t - 0.055;
      const env2 = Math.exp(-t2 * 130);
      s2 = (Math.sin(2 * Math.PI * 1600 * t2) + 0.5 * Math.sin(2 * Math.PI * 2800 * t2) + (Math.random() * 2 - 1) * 0.25) * env2;
    }

    samples[i] = s1 + s2;
  }
  return normalizeToPeak(samples);
}

// 7. soft_confirm: Ascending pentatonic two-tone (523Hz -> 659Hz) with 1kHz presence, 0.28s
function genSoftConfirm() {
  const duration = 0.28;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Tone 1: C5 (523.25 Hz)
    const env1 = Math.exp(-t * 14);
    const s1 = (Math.sin(2 * Math.PI * 523.25 * t) + 0.3 * Math.sin(2 * Math.PI * 1046.5 * t)) * env1 * 0.7;

    // Tone 2: E5 (659.25 Hz) entering at 0.06s
    let s2 = 0;
    if (t >= 0.06) {
      const t2 = t - 0.06;
      const env2 = Math.exp(-t2 * 12);
      s2 = (Math.sin(2 * Math.PI * 659.25 * t2) + 0.35 * Math.sin(2 * Math.PI * 1318.5 * t2) + 0.15 * Math.sin(2 * Math.PI * 1977.7 * t2)) * env2;
    }
    samples[i] = s1 + s2;
  }
  return normalizeToPeak(samples);
}

// 8. pencil_write: 3 tactile friction scratch bursts in 2kHz - 4.5kHz band, 0.24s
function genPencilWrite() {
  const duration = 0.24;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const strokeStarts = [0.0, 0.075, 0.15];
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;

    for (const st of strokeStarts) {
      if (t >= st && t < st + 0.055) {
        const dt = t - st;
        const env = Math.sin(Math.PI * (dt / 0.055));
        // High frequency friction modulation
        const friction = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 3200 * dt);
        const scratch = Math.sin(2 * Math.PI * 2600 * dt) * 0.4;
        val += (friction * 0.7 + scratch) * env;
      }
    }
    samples[i] = val;
  }
  return normalizeToPeak(samples);
}

// 9. card_morph: Upward FM sweep (420Hz -> 1350Hz) with shimmer texture, 0.24s
function genCardMorph() {
  const duration = 0.24;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const freq = 420 + 930 * progress;
    const lfo = Math.sin(2 * Math.PI * 28 * t);
    const env = Math.sin(Math.PI * progress);
    const s1 = Math.sin(2 * Math.PI * (freq + lfo * 50) * t);
    const s2 = 0.35 * Math.sin(2 * Math.PI * freq * 2 * t);
    samples[i] = (s1 + s2) * env;
  }
  return normalizeToPeak(samples);
}

// 10. sparkle_eureka: 4-note ascending sparkle arpeggio (C6, E6, G6, C7), 0.35s
function genSparkleEureka() {
  const duration = 0.35;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const notes = [
    { time: 0.0, freq: 1046.5 }, // C6
    { time: 0.04, freq: 1318.5 }, // E6
    { time: 0.08, freq: 1568.0 }, // G6
    { time: 0.12, freq: 2093.0 }, // C7
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sum = 0;
    for (const note of notes) {
      if (t >= note.time) {
        const dt = t - note.time;
        const env = Math.exp(-dt * 14);
        const shimmer = 0.8 + 0.2 * Math.sin(2 * Math.PI * 16 * dt);
        const s = Math.sin(2 * Math.PI * note.freq * dt) + 0.2 * Math.sin(2 * Math.PI * note.freq * 2 * dt);
        sum += s * env * shimmer * 0.45;
      }
    }
    samples[i] = sum;
  }
  return normalizeToPeak(samples);
}

// 11. web_expand: Low-mid opening glide (220Hz -> 850Hz) + upper air whoosh, 0.25s
function genWebExpand() {
  const duration = 0.25;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const freq = 220 + 630 * Math.pow(progress, 0.7);
    const env = Math.sin(Math.PI * progress);
    const tone = Math.sin(2 * Math.PI * freq * t) + 0.35 * Math.sin(2 * Math.PI * freq * 2 * t);
    const air = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 1800 * t) * 0.3;
    samples[i] = (tone + air) * env;
  }
  return normalizeToPeak(samples);
}

// 12. kinetic_slam: Solid slam with 190Hz body and 2.8kHz - 3.8kHz crisp transient, 0.25s
function genKineticSlam() {
  const duration = 0.25;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Audible speaker body: 190Hz dropping to 110Hz
    const freq = 110 + 80 * Math.exp(-t * 22);
    const env = Math.exp(-t * 14);
    const body = (Math.sin(2 * Math.PI * freq * t) + 0.4 * Math.sin(2 * Math.PI * freq * 2 * t)) * env;

    // Sharp editorial snap in 3 kHz range
    let snap = 0;
    if (t < 0.02) {
      const snapEnv = 1 - t / 0.02;
      snap = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 3200 * t) * snapEnv * 1.3;
    }
    samples[i] = body + snap;
  }
  return normalizeToPeak(samples);
}

// 13. phone_vibrate: 3 distinct haptic buzz bursts with 180Hz-220Hz body & 2.5-3.5kHz motor click
function genPhoneVibrate() {
  const duration = 0.42;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  // 3 distinct buzz pulses:
  // Pulse 1: 0.00s - 0.09s
  // Gap 1:   0.09s - 0.13s (40ms pause)
  // Pulse 2: 0.13s - 0.22s
  // Gap 2:   0.22s - 0.26s (40ms pause)
  // Pulse 3: 0.26s - 0.35s
  const pulses = [
    [0.00, 0.09],
    [0.13, 0.22],
    [0.26, 0.35]
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;

    for (const [start, end] of pulses) {
      if (t >= start && t < end) {
        const dt = t - start;
        const pLen = end - start;
        const env = Math.sin(Math.PI * (dt / pLen));

        // Phone speaker audible body: 185 Hz modulated by 26 Hz mechanical rattle
        const rattle = 0.7 + 0.3 * Math.sin(2 * Math.PI * 26 * dt);
        const body = (Math.sin(2 * Math.PI * 185 * dt) + 0.4 * Math.sin(2 * Math.PI * 230 * dt)) * rattle;

        // Housing transient clicks (2.5 kHz - 3.8 kHz) for physical buzz sensation
        const chatter = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 3000 * dt) * 0.35;
        val = (body + chatter) * env;
        break;
      }
    }
    samples[i] = val;
  }
  return normalizeToPeak(samples);
}

// 14. incoming_ring: Modern cheerful smartphone marimba chime pattern, 1.25s
function genIncomingRing() {
  const duration = 1.25;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const pattern = [
    [0.00, 880.0],  // A5
    [0.12, 1108.7], // C#6
    [0.24, 1318.5], // E6
    [0.36, 1760.0], // A6
    [0.65, 1318.5], // E6
    [0.77, 1108.7], // C#6
    [0.89, 880.0],  // A5
    [1.01, 1318.5], // E6
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sum = 0;
    for (const [startTime, freq] of pattern) {
      if (t >= startTime && t < startTime + 0.22) {
        const dt = t - startTime;
        const env = Math.exp(-dt * 13);
        const s = Math.sin(2 * Math.PI * freq * dt) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * dt) + 0.15 * Math.sin(2 * Math.PI * freq * 3 * dt);
        sum += s * env * 0.45;
      }
    }
    samples[i] = sum;
  }
  return normalizeToPeak(samples);
}

// -------------------------------------------------------------
// Main Runner: Synthesize & Output Measurements
// -------------------------------------------------------------
function main() {
  const outDir = path.resolve("public/assets/followup-sfx");
  console.log(`Generating normalized SFX into: ${outDir}\n`);

  const sfxList = [
    { name: "chat_notification.wav", fn: genChatNotification },
    { name: "read_doubt.wav", fn: genReadDoubt },
    { name: "punch_impact.wav", fn: genPunchImpact },
    { name: "swipe_whoosh.wav", fn: genSwipeWhoosh },
    { name: "card_pop.wav", fn: genCardPop },
    { name: "clock_tick.wav", fn: genClockTick },
    { name: "soft_confirm.wav", fn: genSoftConfirm },
    { name: "pencil_write.wav", fn: genPencilWrite },
    { name: "card_morph.wav", fn: genCardMorph },
    { name: "sparkle_eureka.wav", fn: genSparkleEureka },
    { name: "web_expand.wav", fn: genWebExpand },
    { name: "kinetic_slam.wav", fn: genKineticSlam },
    { name: "phone_vibrate.wav", fn: genPhoneVibrate },
    { name: "incoming_ring.wav", fn: genIncomingRing },
  ];

  const allSamples = [];
  const pauseSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.4)); // 0.4s pause

  for (const sfx of sfxList) {
    const filePath = path.join(outDir, sfx.name);
    const samples = sfx.fn();
    writeWavFile(filePath, samples);

    allSamples.push(samples);
    allSamples.push(pauseSamples);
  }

  // Create preview compilation
  let totalPreviewLen = 0;
  for (const chunk of allSamples) {
    totalPreviewLen += chunk.length;
  }
  const previewBuffer = new Float32Array(totalPreviewLen);
  let offset = 0;
  for (const chunk of allSamples) {
    previewBuffer.set(chunk, offset);
    offset += chunk.length;
  }

  const previewPath = path.join(outDir, "sfx_preview_all.wav");
  writeWavFile(previewPath, previewBuffer);
  console.log(`Successfully generated all 14 SFX and sfx_preview_all.wav!\n`);
}

main();
