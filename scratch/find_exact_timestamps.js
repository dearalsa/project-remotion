const fs = require('fs');
const buf = fs.readFileSync('public/assets/voice over(3).wav');
// 24000 Hz, 16-bit mono = 2 bytes per sample, 48000 bytes per second
// 800 samples per frame (30fps) = 1600 bytes per frame
const sampleRate = 24000;
const fps = 30;
const samplesPerFrame = sampleRate / fps; // 800

// Find data chunk
let pos = 12;
while (pos < buf.length) {
  const id = buf.toString('ascii', pos, pos + 4);
  const size = buf.readUInt32LE(pos + 4);
  if (id === 'data') {
    pos += 8;
    break;
  }
  pos += 8 + size;
}

const dataBuf = buf.subarray(pos);
const totalFrames = Math.floor(dataBuf.length / 1600);
console.log('Total frames:', totalFrames, 'Duration sec:', (totalFrames / fps).toFixed(2));

// Calculate RMS per frame
const frameRms = [];
for (let f = 0; f < totalFrames; f++) {
  let sumSq = 0;
  const startByte = f * 1600;
  for (let s = 0; s < 800; s++) {
    const val = dataBuf.readInt16LE(startByte + s * 2);
    sumSq += val * val;
  }
  const rms = Math.sqrt(sumSq / 800);
  frameRms.push(rms);
}

// Function to print energy in a time window
function printWindow(startSec, endSec, label) {
  console.log(`\n--- ${label} (${startSec}s - ${endSec}s) ---`);
  const startF = Math.floor(startSec * fps);
  const endF = Math.min(totalFrames - 1, Math.ceil(endSec * fps));
  for (let f = startF; f <= endF; f++) {
    const sec = (f / fps).toFixed(2);
    const rms = frameRms[f];
    const bar = '#'.repeat(Math.min(50, Math.floor(rms / 200)));
    console.log(`Frame ${f.toString().padStart(4)} (${sec}s): RMS ${rms.toFixed(0).padStart(5)} | ${bar}`);
  }
}

// Inspect transitions
printWindow(0, 10, 'Scene 1 Hook & Transition to Scene 2');
printWindow(15.5, 19, 'Transition to Scene 3');
printWindow(25.5, 29, 'Transition to Scene 4');
printWindow(33.5, 36.5, 'Transition to Scene 5');
printWindow(39, 40.5, 'End of speech');
