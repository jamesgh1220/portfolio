import { onUnmounted } from 'vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  let lenis = null;
  let tickerCallback = null;

  function initLenis() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  function destroyLenis() {
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    lenis?.destroy();
    lenis = null;
  }

  onUnmounted(destroyLenis);

  return { initLenis, destroyLenis, getLenis: () => lenis };
}
