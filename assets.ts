/**
 * assets.ts — Central CDN asset resolver
 *
 * Cloudinary URLs are hardcoded as the true defaults so the app works
 * correctly on production (Vercel) without needing VITE_* env vars to be
 * manually configured. VITE_* env vars act as optional overrides for local
 * dev or future CDN migrations.
 */

const CDN = 'https://res.cloudinary.com/dhpwd7uta';

// ─── Images ───────────────────────────────────────────────────────────────────

export const IMG_FAVICON =
  import.meta.env.VITE_IMG_FAVICON ||
  `${CDN}/image/upload/v1784111271/favicon_uhn3jm.jpg`;

export const IMG_PORTRAIT =
  import.meta.env.VITE_IMG_PORTRAIT ||
  `${CDN}/image/upload/v1784111251/IMG_20260410_185513_oamxwl.png`;

export const PROJECT_IMAGES: Record<string, string> = {
  'EchoCortex-Intelligence':
    import.meta.env.VITE_IMG_PROJECT_ECHOCORTEX || `${CDN}/image/upload/faceshield.png`,
  'FaceShield-Authentication':
    import.meta.env.VITE_IMG_PROJECT_FACESHIELD || `${CDN}/image/upload/faceshield.png`,
  'EntityEase-DataPlatform':
    import.meta.env.VITE_IMG_PROJECT_ENTITYEASE || `${CDN}/image/upload/entityease.png`,
  'AegisNet-IDS':
    import.meta.env.VITE_IMG_PROJECT_AEGISNET || `${CDN}/image/upload/aegisnet.png`,
  'FenceIN-AccessControl':
    import.meta.env.VITE_IMG_PROJECT_FENCEIN || `${CDN}/image/upload/fencein.png`,
  'CodeSight-DeveloperToolkit':
    import.meta.env.VITE_IMG_PROJECT_CODESIGHT || `${CDN}/image/upload/codesight.png`,
  'Veltrio.Suite':
    import.meta.env.VITE_IMG_PROJECT_VELTRIO || `${CDN}/image/upload/veltrio.png`,
};

// ─── Videos — Desktop ────────────────────────────────────────────────────────

export const VID_DESKTOP_1 =
  import.meta.env.VITE_VID_DESKTOP_1 ||
  `${CDN}/video/upload/v1784109981/1A_nmnf1c.mp4`;

export const VID_DESKTOP_2 =
  import.meta.env.VITE_VID_DESKTOP_2 ||
  `${CDN}/video/upload/v1784109978/3A_zwqwgf.mp4`;

export const VID_DESKTOP_3 =
  import.meta.env.VITE_VID_DESKTOP_3 ||
  `${CDN}/video/upload/v1784109980/4A_ayodr9.mp4`;

export const VID_DESKTOP_4 =
  import.meta.env.VITE_VID_DESKTOP_4 ||
  `${CDN}/video/upload/v1784109983/2A_felgg3.mp4`;

// Section 8 — Contact: Emblem reveal with smoke
export const VID_DESKTOP_5 =
  import.meta.env.VITE_VID_DESKTOP_5 ||
  `${CDN}/video/upload/v1784122801/Emblem_reveal_with_smoke_1080p_202607051011_zxfqsq.mp4`;

// ─── Videos — Mobile ─────────────────────────────────────────────────────────

export const VID_MOBILE_1 =
  import.meta.env.VITE_VID_MOBILE_1 ||
  `${CDN}/video/upload/1_iprx1s.mp4`;

export const VID_MOBILE_2 =
  import.meta.env.VITE_VID_MOBILE_2 ||
  `${CDN}/video/upload/4_ux5ylt.mp4`;

export const VID_MOBILE_3 =
  import.meta.env.VITE_VID_MOBILE_3 ||
  `${CDN}/video/upload/3_vkzexl.mp4`;

export const VID_MOBILE_4 =
  import.meta.env.VITE_VID_MOBILE_4 ||
  `${CDN}/video/upload/2_gbyqid.mp4`;
