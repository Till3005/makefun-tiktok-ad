// make.fun bounty bring-the-humans-03 — TikTok ad entry.
// The ad itself (ad.mp4) was made in the working session and posted on TikTok;
// VIDEO.json names the posted video. This program is the entry harness: it
// copies VIDEO.json from the repository root to /output, where the gate reads
// the video address to grade it. Nothing else is scored from here.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // VIDEO.json must hold the full video URL as tiktok.com/@handle/video/id — shortlinks (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/...) are refused.
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
