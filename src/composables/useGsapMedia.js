import { gsap } from 'gsap';

let mm = null;

/** Siempre incluir isMobile para que el callback se ejecute en pantallas pequeñas. */
export const MEDIA = {
  isDesktop: '(min-width: 768px)',
  isMobile: '(max-width: 767px)',
  isWeb: '(min-width: 1024px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
};

export function getGsapMedia() {
  if (!mm) {
    mm = gsap.matchMedia();
  }
  return mm;
}

export function createMediaContext(callback) {
  const media = getGsapMedia();
  const ctx = gsap.context(callback, media);
  return { media, ctx };
}

export function isDesktop() {
  return window.matchMedia(MEDIA.isDesktop).matches;
}

export function isMobile() {
  return window.matchMedia(MEDIA.isMobile).matches;
}

export function prefersReducedMotion() {
  return window.matchMedia(MEDIA.reduceMotion).matches;
}

export function getScrubValue(isDesktopViewport) {
  return isDesktopViewport ? 1.5 : 1;
}
