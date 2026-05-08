# Mobile MacBook Animation: Switch to Video Autoplay

## Problem
The MacBook scroll-driven animation (canvas + image sequence + GSAP ScrollTrigger) causes scroll jank on mobile. The ScaledFrame CSS-transform context and image loading overhead block the main thread, making the page feel stuck.

## Decision
Replace the mobile canvas animation with a native `<video autoplay muted playsinline>` element. Desktop keeps the existing scroll-driven canvas animation unchanged.

## Design

### Mobile behavior
- `<video>` replaces canvas entirely on mobile (`canvasWidth < 500`)
- Plays once automatically, stops on the last frame (MacBook fully open)
- `poster` attribute shows first frame instantly (zero blank state)
- No GSAP, no ScrollTrigger, no canvas — zero JS overhead for animation

### Video source
- Convert existing `public/images/macbook.webm` (VP9, 1744×1050, 5.08s) to MP4 (H.264)
- Resize to 375px width for mobile
- Output: `public/images/macbook-mobile.mp4`
- Expected size: 50-150KB (less than current 256KB sprite)

### Component changes (MacbookVideo.tsx)
- `isMobile` branch renders `<video>` instead of canvas
- Desktop branch unchanged (122 frames, canvas, GSAP)
- Remove mobile sprite sheet logic

### Cleanup
- Remove `public/images/macbook-sprite-mobile.webp` (replaced by video)
- Update `app/layout.tsx` preload: remove mobile sprite preload
- Remove `public/images/macbook-frames-mobile/` directory (no longer needed)

### Files to modify
1. `src/app/components/MacbookVideo.tsx` — mobile video, desktop unchanged
2. `app/layout.tsx` — remove mobile sprite preload
3. `public/images/macbook-mobile.mp4` — new (generated from macbook.webm)

### Verification
1. Mobile: video autoplays on load, plays once, stops at open state
2. Mobile: zero scroll jank — video is native, no JS involvement
3. Desktop: scroll-driven animation works exactly as before
4. `npm run build` succeeds
