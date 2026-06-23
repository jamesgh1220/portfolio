import { gsap } from 'gsap';

export const EASE = {
  enter: 'power3.out',
  exit: 'power2.in',
  scrub: 'none',
  expo: 'expo.out',
};

export function applyGsapDefaults() {
  gsap.defaults({ ease: EASE.enter });
}
