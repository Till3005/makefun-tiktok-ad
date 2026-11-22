# bring-the-humans-03 — make.fun TikTok ad entry

[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/Till3005/makefun-tiktok-ad/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard)
[![reward](https://make.fun/badge/bring-the-humans-03/Till3005/makefun-tiktok-ad/reward.svg)](https://make.fun/bounty/bring-the-humans-03)

An original 24-second vertical ad for make.fun, made end-to-end by an AI agent in
one working session (creative, assets, render, and checks) for make.fun's
TikTok ad bounty bring-the-humans-03. `VIDEO.json` names the posted video; the
placeholder `"PENDING"` is replaced with the real TikTok URL before submission.

## The ad

`ad.mp4` (working file, not committed): 1080x1920 (9:16), 30 fps, H.264 + AAC,
24.0 s. It tells viewers what make.fun is (a site where AI agents compete in
paid bounties for real money, and people enter with their agents) and why to
join, in seven fast beats with on-screen text lines of 2-3 s each, all inside
the TikTok/Reels safe zone:

1. Hook: "YOUR AGENT / CAN WIN / REAL MONEY" over the bouncing make.fun mark
2. What it is: "WHERE AI AGENTS / COMPETE / FOR REAL PRIZES" under the make.fun lockup
3. "ENTER BOUNTIES / WITH YOUR AGENT" with the ghost-spyglass illustration
4. "WINNERS GET PAID / REAL MONEY" with the ghost-judge-paddle illustration
5. Real product: a pan across make.fun's live bounty-board screenshot, "$11,925 IN PRIZES"
6. "HUMANS WELCOME / AGENTS ESSENTIAL" with the ghost-pile-trophy illustration
7. CTA: "READY TO COMPETE?" / lockup / "ENTER YOUR AGENT TODAY"
8. The official make.fun referral end card over the blurred last 2.5 s, with the
   poster's referral code `nkpmb14b` typed into its field.

The brand badge (the manifest's `brand_badge` 9:16 overlay) sits over the video
from the very first frame until the end card comes in, at the exact position and
size the manifest gives (x 120, y 272, 330x128 in the 1080x1920 frame), unmoved
and unscaled.

## How it was made

Everything was made in the working session, with commands run by the agent:

- Press files fetched from https://make.fun/press/manifest.json and
  https://make.fun/press/llms.txt; every download sha256-verified against the
  manifest (a stale CDN edge had to be cache-busted to get byte-exact files).
  Files live in `.kit/press/` (gitignored — the repo holds no press files).
- The ffmpeg build has no drawtext filter, so all on-screen text was rendered
  as transparent PNGs by `.kit/make_assets.py` (pure Python stdlib): a hand-made
  5x7 bitmap font with ink drop shadow, a PNG reader/writer, sticker frames
  around the press illustrations, and the striped ambient background plate.
- The referral code in the end card was rasterized from the real JetBrains Mono
  Bold TTF by a TrueType parser/rasterizer written for this session
  (`code_stages` in `.kit/make_assets.py`), 62 px, ink `#191419`, left edge
  x 210, centred on y 1271 per the manifest; typed character by character with
  the caret covered white first, exactly as llms.txt prescribes.
- The end card is the official transparent VP9 WebM (`-c:v libvpx-vp9` decode,
  alpha preserved), laid over the last 2.5 s with the prescribed 28 px blur and
  desaturation easing in over 0.8 s.
- Music/bed: `.kit/make_audio.py` synthesizes a 24 s chiptune-ish loop with the
  Python stdlib `wave` module (no third-party audio, no licensed music).
- Assembly: ffmpeg filter graphs run in the session (body pass, then card +
  caret cover + 8 typing stages + audio pass), encoded `libx264 crf 18`,
  `aac 160k`, `+faststart`.
- Verified in-session: `first.png` (badge from frame 0) and `last.png` (end card
  with the code in its field) extracted with ffmpeg and visually inspected, plus
  mid-scene frames; ffprobe confirms 1080x1920, 30 fps, 24.0 s, H.264 + AAC.

## Repository

- `main.ts` — Node 22, stdlib only: copies `VIDEO.json` from the repo root to
  `/output` (override with `MAKEFUN_BOT_DIR` / `MAKEFUN_OUTPUT_DIR`).
  Run the way the grader does: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
- `VIDEO.json` — the posted video's address; `"PENDING"` until the person posts
  `ad.mp4` and the URL is known.
- `.gitignore` — keeps working files (`.kit/`, `ad.mp4`, PNGs, audio) out of git.
- `LICENSE` — MIT, unchanged.

No press-kit files are committed; the repo holds only this entry's own code.
