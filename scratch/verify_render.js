const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const mp4Path = path.resolve('out/OtositeFollowUpReels.mp4');
console.log('Verifying:', mp4Path);

if (!fs.existsSync(mp4Path)) {
  console.error('ERROR: File does not exist:', mp4Path);
  process.exit(1);
}

const stats = fs.statSync(mp4Path);
console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB (${stats.size} bytes)`);

// 1. Run ffprobe
const ffprobePath = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe');
const probeRes = cp.spawnSync(ffprobePath, [
  '-v', 'error',
  '-show_entries', 'stream=index,codec_name,codec_type,width,height,r_frame_rate,duration,sample_rate,channels',
  '-show_entries', 'format=duration,size,bit_rate',
  '-of', 'json',
  mp4Path
], { encoding: 'utf-8' });

if (probeRes.status === 0) {
  const probeData = JSON.parse(probeRes.stdout);
  console.log('\n--- FFPROBE STREAMS ---');
  console.log(JSON.stringify(probeData, null, 2));
} else {
  console.error('ffprobe error:', probeRes.stderr);
}

// 2. Run audio volumedetect & ebur128 with ffmpeg
const ffmpegPath = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const audioRes = cp.spawnSync(ffmpegPath, [
  '-i', mp4Path,
  '-af', 'volumedetect,ebur128=peak=true',
  '-f', 'null',
  '-'
], { encoding: 'utf-8' });

console.log('\n--- AUDIO ANALYSIS (Volume & Loudness) ---');
const lines = (audioRes.stderr || '').split('\n');
for (const line of lines) {
  if (line.includes('Parsed_volumedetect') || line.includes('I:') || line.includes('Threshold:') || line.includes('LRA:') || line.includes('Peak:')) {
    console.log(line.trim());
  }
}
