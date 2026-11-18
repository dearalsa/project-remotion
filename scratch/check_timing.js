const fs = require('fs');
const buf = fs.readFileSync('public/assets/voice over(3).wav');
const pos = 44;
const dataBuf = buf.subarray(pos);

function checkRange(startF, endF, label) {
  console.log(`\n=== ${label} (f${startF} - f${endF}) ===`);
  for (let f = startF; f <= endF; f++) {
    let sumSq = 0;
    for (let s = 0; s < 800; s++) {
      const v = dataBuf.readInt16LE(f * 1600 + s * 2);
      sumSq += v * v;
    }
    const rms = Math.sqrt(sumSq / 800);
    const bar = '#'.repeat(Math.min(30, Math.floor(rms / 250)));
    console.log(`f ${f.toString().padStart(4)} (${(f/30).toFixed(2)}s): ${rms.toFixed(0).padStart(5)} | ${bar}`);
  }
}

// Check Scene 1 to Scene 2
checkRange(215, 260, 'Around Scene 1 end & Scene 2 start');
// Check Scene 2 to Scene 3
checkRange(500, 545, 'Around Scene 2 end & Scene 3 start');
// Check Scene 3 to Scene 4
checkRange(800, 840, 'Around Scene 3 end & Scene 4 start');
// Check Scene 4 to Scene 5
checkRange(1030, 1075, 'Around Scene 4 end & Scene 5 start');
