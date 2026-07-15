/**
 * assets.ts — Central CDN asset resolver
 *
 * All VITE_* env vars are injected at build time by Vite.
 * If a CDN URL is set, it is used; otherwise falls back to the
 * local /public path so the app works in dev without Cloudinary.
 */

// ─── Images ───────────────────────────────────────────────────────────────────

export const IMG_PORTRAIT =
  import.meta.env.VITE_IMG_PORTRAIT || '/godfrey_portrait.png';

export const IMG_FAVICON =
  import.meta.env.VITE_IMG_FAVICON || '/favicon.jpeg';

export const PROJECT_IMAGES: Record<string, string> = {
  'EchoCortex-Intelligence':
    import.meta.env.VITE_IMG_PROJECT_ECHOCORTEX || '/faceshield.png',
  'FaceShield-Authentication':
    import.meta.env.VITE_IMG_PROJECT_FACESHIELD || '/faceshield.png',
  'EntityEase-DataPlatform':
    import.meta.env.VITE_IMG_PROJECT_ENTITYEASE || '/entityease.png',
  'AegisNet-IDS':
    import.meta.env.VITE_IMG_PROJECT_AEGISNET || '/aegisnet.png',
  'FenceIN-AccessControl':
    import.meta.env.VITE_IMG_PROJECT_FENCEIN || '/fencein.png',
  'CodeSight-DeveloperToolkit':
    import.meta.env.VITE_IMG_PROJECT_CODESIGHT || '/codesight.png',
  'Veltrio.Suite':
    import.meta.env.VITE_IMG_PROJECT_VELTRIO || '/veltrio.png',
};

// ─── Videos — Desktop ────────────────────────────────────────────────────────

export const VID_DESKTOP_1 =
  import.meta.env.VITE_VID_DESKTOP_1 || '/Frames/Desktop/1A.mp4';

export const VID_DESKTOP_2 =
  import.meta.env.VITE_VID_DESKTOP_2 || '/Frames/Desktop/2A.mp4';

export const VID_DESKTOP_3 =
  import.meta.env.VITE_VID_DESKTOP_3 || '/Frames/Desktop/3A.mp4';

export const VID_DESKTOP_4 =
  import.meta.env.VITE_VID_DESKTOP_4 || '/Frames/Desktop/4A.mp4';

export const VID_DESKTOP_5 =
  import.meta.env.VITE_VID_DESKTOP_5 || '/Frames/Desktop/5A.mp4';

// ─── Videos — Mobile ─────────────────────────────────────────────────────────

export const VID_MOBILE_1 =
  import.meta.env.VITE_VID_MOBILE_1 || '/Frames/Mobile/1.mp4';

export const VID_MOBILE_2 =
  import.meta.env.VITE_VID_MOBILE_2 || '/Frames/Mobile/2.mp4';
