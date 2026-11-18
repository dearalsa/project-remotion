const { execSync } = require('child_process');
const path = require('path');
const ffmpeg = '"' + path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe') + '"';
const chunks = [
  { start: 5, dur: 5, out: 'scratch/chunk_5_10.wav' },
  { start: 10, dur: 5, out: 'scratch/chunk_10_15.wav' },
  { start: 15, dur: 5, out: 'scratch/chunk_15_20.wav' },
  { start: 20, dur: 5, out: 'scratch/chunk_20_25.wav' },
  { start: 25, dur: 5, out: 'scratch/chunk_25_30.wav' },
  { start: 30, dur: 5, out: 'scratch/chunk_30_35.wav' },
  { start: 35, dur: 6, out: 'scratch/chunk_35_41.wav' },
];
chunks.forEach(c => {
  execSync(`${ffmpeg} -y -i "public/assets/voice over(3).wav" -ss ${c.start} -t ${c.dur} "${c.out}"`);
  console.log('Created', c.out);
});
