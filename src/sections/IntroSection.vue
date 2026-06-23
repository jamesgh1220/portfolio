<template>
  <section ref="sectionRef" id="intro" class="intro-section relative h-screen flex bg-bg overflow-hidden">
    <p ref="titleRef" class="intro-title absolute m-0 font-display font-extrabold text-text flex flex-wrap items-baseline gap-0 leading-[1.05] md:hidden!">
      <SplitChars
        ref="nameSplitRef"
        :text="'John'"
        tag="span"
        class="intro-name inline"
      />
      <SplitChars
        ref="nameSplitRef"
        :text="'James'"
        tag="span"
        class="intro-name inline"
      />
      <SplitChars
        ref="nameSplitRef"
        :text="'Gallego'"
        tag="span"
        class="intro-name inline"
      />
      <SplitChars
        ref="nameSplitRef"
        :text="'Hernández'"
        tag="span"
        class="intro-name inline"
      />
      <span ref="periodRef" class="intro-period inline-block text-accent leading-none shrink-0">.</span>
    </p>
    <p ref="titleRef" class="intro-title absolute m-0 font-display font-extrabold text-text flex flex-wrap items-baseline gap-0 leading-[1.05] hidden! md:flex!">
      <SplitChars
        ref="nameSplitRef"
        :text="branding.name"
        tag="span"
        class="intro-name inline"
      />
      <SplitChars
        ref="nameSplitRef"
        :text="branding.lastName"
        tag="span"
        class="intro-name inline"
      />
      <span ref="periodRef" class="intro-period inline-block text-accent leading-none shrink-0">.</span>
    </p>

    <SplitChars
      ref="roleSplitRef"
      :text="branding.role"
      tag="p"
      class="intro-role absolute m-0 text-right text-accent font-medium leading-[1.3]"
    />

    <div class="dot w-0 h-0 rounded-full absolute overflow-hidden bg-text">
      <div ref="nextContentRef" class="dot-content absolute inset-0 flex flex-col items-center justify-center gap-8 text-center p-8 w-full box-border opacity-0 max-md:p-5 max-md:gap-4">
        <p class="dot-tagline font-display text-bg font-semibold w-full leading-[1.4] hyphens-auto max-md:max-w-64 max-md:leading-[1.45]">{{ branding.tagline }}</p>
        <div ref="scrollHintRef" class="scroll-hint flex flex-col items-center gap-2 text-muted text-xs uppercase tracking-[0.15em] max-md:text-[0.65rem] max-md:tracking-[0.1em]">
          <span>Desplázate</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGsapMedia, MEDIA } from '../composables/useGsapMedia';
import { EASE } from '../lib/gsapDefaults';
import SplitChars from '../components/SplitChars.vue';
import { portfolio } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const { branding } = portfolio;

const sectionRef = ref(null);
const titleRef = ref(null);
const nameSplitRef = ref(null);
const periodRef = ref(null);
const roleSplitRef = ref(null);
const nextContentRef = ref(null);
const scrollHintRef = ref(null);
const scrollTriggers = [];
let hintTween = null;
let mediaRevert = null;
let initialized = false;

function getDotOrigin(mark, section) {
  const markBounds = mark.getBoundingClientRect();
  const sectionBounds = section.getBoundingClientRect();
  const px = markBounds.left + markBounds.width * 0.5;
  const py = markBounds.top + markBounds.height * 0.85;
  return {
    x: px - (sectionBounds.left + sectionBounds.width / 2),
    y: py - (sectionBounds.top + sectionBounds.height / 2),
  };
}

async function init() {
  if (initialized || !sectionRef.value) return;

  const section = sectionRef.value;
  const titleEl = titleRef.value;
  const mark = periodRef.value;
  const dot = section.querySelector('.dot');

  gsap.set(dot, {
    width: '142vmax',
    height: '142vmax',
    xPercent: -50,
    yPercent: -50,
    top: '50%',
    left: '50%',
  });

  await document.fonts.ready;

  const nameChars = nameSplitRef.value?.getCharElements() ?? [];
  const roleChars = roleSplitRef.value?.getCharElements() ?? [];

  gsap.set([titleEl, roleSplitRef.value?.rootRef], { opacity: 1 });

  gsap.from(nameChars, {
    duration: 0.6,
    yPercent: 'random([-100, 100])',
    xPercent: 'random([-50, 50])',
    stagger: { from: 'random', amount: 0.6 },
    ease: EASE.enter,
    onComplete: () => {
      gsap.set(nameChars, { xPercent: 0, yPercent: 0, clearProps: 'transform' });
    },
  }).timeScale(0.5);

  gsap.from(mark, { opacity: 0, scale: 0, duration: 0.3, ease: EASE.enter, delay: 0.2 });
  gsap.set(mark, { clearProps: 'transform' });

  gsap.from(roleChars, {
    duration: 0.5,
    opacity: 0,
    y: 20,
    stagger: 0.03,
    delay: 0.3,
    ease: EASE.enter,
  });

  hintTween = gsap.to(scrollHintRef.value, {
    y: 8,
    duration: 0.8,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });

  const mm = getGsapMedia();

  mediaRevert = mm.add(MEDIA, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set(titleEl, { opacity: 1 });
        gsap.set(nextContentRef.value, { opacity: 1 });
        return;
      }

      if (mark) {
        const scrub = isDesktop ? 1.5 : 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub,
            pin: section,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
          defaults: { ease: EASE.scrub },
        });

        tl.to(titleEl, { opacity: 1 })
          .fromTo(
            dot,
            {
              scale: 0,
              x: () => getDotOrigin(mark, section).x,
              y: () => getDotOrigin(mark, section).y,
            },
            { x: 0, y: 0, ease: 'power3.in', scale: 1 },
            '<0.2'
          )
          .to(nextContentRef.value, { opacity: 1, duration: 0.5 })
          .to(titleEl, { opacity: 0, duration: 0.3 }, '<');

        if (roleSplitRef.value?.rootRef) {
          tl.to(roleSplitRef.value.rootRef, { y: isDesktop ? -30 : -15, ease: EASE.scrub }, 0);
        }

        scrollTriggers.push(tl.scrollTrigger);
      }
  });

  initialized = true;
}

onUnmounted(() => {
  hintTween?.kill();
  scrollTriggers.forEach((trigger) => trigger.kill());
  scrollTriggers.length = 0;
  mediaRevert?.revert();
  initialized = false;
});

defineExpose({ init });
</script>

<style scoped>
.intro-title {
  left: clamp(1.5rem, 8vw, 6rem);
  top: clamp(10vh, 18vh, 22vh);
  max-width: calc(100vw - clamp(3rem, 16vw, 12rem));
  font-size: clamp(1.7rem, 5.25vw, 5rem);
}

.intro-role {
  right: clamp(1.5rem, 8vw, 6rem);
  bottom: clamp(10vh, 18vh, 22vh);
  left: clamp(1.5rem, 8vw, 6rem);
  max-width: calc(100vw - clamp(3rem, 16vw, 12rem));
  font-size: clamp(1.3rem, 3.5vw, 2rem);
}

.dot-tagline {
  font-size: clamp(1.25rem, 3vw, 2rem);
  max-width: min(32rem, 90vw);
  overflow-wrap: break-word;
  word-break: break-word;
}

@media (max-width: 767px) {
  .dot-tagline {
    font-size: clamp(0.9rem, 4.2vw, 1.15rem);
  }
}
</style>
