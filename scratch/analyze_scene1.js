const fs = require('fs');
const buf = fs.readFileSync('public/assets/voice over(3).wav');
const pos = 44;
const dataBuf = buf.subarray(pos);

function findPeaks(startSec, endSec) {
  const startF = Math.floor(startSec * 30);
  const endF = Math.ceil(endSec * 30);
  console.log(`\n--- Range ${startSec}s - ${endSec}s (frames ${startF} - ${endF}) ---`);
  for (let f = startF; f <= endF; f++) {
    let sumSq = 0;
    for (let s = 0; s < 800; s++) {
      const v = dataBuf.readInt16LE(f * 1600 + s * 2);
      sumSq += v * v;
    }
    const rms = Math.sqrt(sumSq / 800);
    if (rms > 800) {
      const bar = '#'.repeat(Math.min(30, Math.floor(rms / 300)));
      console.log(`f ${f.toString().padStart(4)} (${(f/30).toFixed(2)}s): ${rms.toFixed(0).padStart(5)} | ${bar}`);
    } else {
      console.log(`f ${f.toString().padStart(4)} (${(f/30).toFixed(2)}s): [silence/low ${rms.toFixed(0)}]`);
    }
  }
}

// Scene 1: 0s to 7.8s
findPeaks(0, 7.8);
