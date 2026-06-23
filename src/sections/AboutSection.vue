<template>
  <div ref="root" class="about-section relative w-full bg-bg text-text section-padding">
    <div class="about-inner max-w-6xl mx-auto px-8">
      <SectionLabel ref="labelRef" number="01" title="Sobre mí" class="justify-center" />

      <div class="slides-wrapper">
        <section class="panel panel-bio w-full min-h-screen flex justify-center items-center relative box-border py-8 bg-surface overflow-hidden will-change-transform rounded-2xl mb-8">
          <div class="panel-content max-w-5xl w-full p-8 flex flex-col items-center gap-12 md:flex-row">
            <img
              ref="aboutImageRef"
              class="about-image w-72 h-72 rounded-full object-cover border-[3px] border-transparent will-change-transform"
              :src="about.image"
              :alt="branding.name"
              loading="lazy"
            />
            <div class="about-text">
              <h2 class="panel-title font-display font-bold mb-6 text-gradient">Quién soy</h2>
              <p class="bio leading-[1.8] text-muted">{{ about.bio }}</p>
            </div>
          </div>
        </section>

        <section class="panel panel-highlights w-full min-h-screen flex justify-center items-center relative box-border py-8 bg-surface overflow-hidden will-change-transform rounded-2xl mb-8 border border-white/6">
          <div class="panel-content max-w-5xl w-full p-8">
            <h2 class="panel-title font-display font-bold mb-6 text-gradient">En resumen</h2>
            <ul class="highlights-grid grid gap-6! list-none p-0 m-0">
              <li
                v-for="item in about.highlights"
                :key="item.label"
                class="highlight-card bg-surface border border-white/8 rounded-xl p-6 flex flex-col gap-2"
              >
                <span class="highlight-value font-display font-bold text-text">{{ item.value }}</span>
                <span class="highlight-label text-sm text-muted uppercase tracking-[0.08em]">{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGsapMedia, MEDIA } from '../composables/useGsapMedia';
import { EASE } from '../lib/gsapDefaults';
import SectionLabel from '../components/SectionLabel.vue';
import { portfolio } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const { branding, about } = portfolio;

const root = ref(null);
const labelRef = ref(null);
const aboutImageRef = ref(null);
const scrollTriggers = [];
let mediaRevert = null;
let initialized = false;

function setTransformOrigin(panel) {
  gsap.set(panel, {
    transformOrigin: `center ${panel.offsetHeight - window.innerHeight / 2}px`,
    force3D: true,
  });
}

function waitForImages(container) {
  const images = Array.from(container.querySelectorAll('img'));
  const pending = images
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        })
    );
  return Promise.all(pending);
}

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function init() {
  if (initialized || !root.value) return;

  await document.fonts.ready;
  await waitForImages(root.value);
  await nextTick();
  await waitForLayout();

  labelRef.value?.init();

  if (aboutImageRef.value) {
    gsap.to(aboutImageRef.value, {
      scale: 1.05,
      ease: EASE.scrub,
      scrollTrigger: {
        trigger: aboutImageRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  const mm = getGsapMedia();

  mediaRevert = mm.add(MEDIA, (context) => {
      const { reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set(root.value.querySelectorAll('.panel'), { opacity: 1 });
        return;
      }

      const panels = gsap.utils.toArray(root.value.querySelectorAll('.panel'));

      panels.forEach((panel) => {
        setTransformOrigin(panel);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'bottom bottom',
            pinSpacing: false,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => setTransformOrigin(panel),
          },
        });

        tl.fromTo(
          panel,
          { y: 0, rotate: 0, scale: 1, opacity: 1 },
          { y: 0, rotateX: 0, scale: 0.5, opacity: 0.5, duration: 1, ease: EASE.scrub },
          0
        ).to(panel, { opacity: 0, duration: 0.1 });

        scrollTriggers.push(tl.scrollTrigger);
      });

      const cards = root.value.querySelectorAll('.highlight-card');
      ScrollTrigger.create({
        trigger: root.value.querySelector('.panel-highlights'),
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.from(cards, {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.6,
            ease: EASE.enter,
          });
        },
      });
  });

  initialized = true;
}

onUnmounted(() => {
  scrollTriggers.forEach((trigger) => trigger.kill());
  scrollTriggers.length = 0;
  mediaRevert?.revert();
  initialized = false;
});

defineExpose({ init });
</script>

<style scoped>
.about-image {
  background: linear-gradient(var(--color-surface), var(--color-surface)) padding-box,
    var(--gradient-accent) border-box;
}

.panel-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.bio {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 40rem;
}

.highlights-grid {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.highlight-value {
  font-size: clamp(1rem, 3vw, 1.55rem);
}
</style>
