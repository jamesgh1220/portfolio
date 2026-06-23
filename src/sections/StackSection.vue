<template>
  <section ref="root" class="stack-section min-h-screen bg-surface text-text flex items-center justify-center section-padding">
    <div class="stack-inner max-w-5xl w-full px-8">
      <SectionLabel ref="labelRef" number="04" title="Stack" />

      <h2 class="stack-title font-display font-bold mb-2 text-gradient">Stack de desarrollador</h2>
      <p class="stack-subtitle text-muted mb-12 text-lg">Tecnologías con las que trabajo día a día</p>

      <div class="marquee-wrapper overflow-hidden mb-16">
        <div ref="marqueeTopRef" class="marquee-row flex gap-8 w-max py-4">
          <span v-for="(tech, i) in marqueeTop" :key="`top-${i}`" class="marquee-item font-display font-bold text-muted opacity-40 whitespace-nowrap px-4">
            {{ tech.name }}
          </span>
        </div>
        <div ref="marqueeBottomRef" class="marquee-row flex gap-8 w-max py-4 mt-2">
          <span v-for="(tech, i) in marqueeBottom" :key="`bottom-${i}`" class="marquee-item font-display font-bold text-muted opacity-40 whitespace-nowrap px-4">
            {{ tech.name }}
          </span>
        </div>
      </div>

      <div
        v-for="category in categories"
        :key="category"
        class="stack-category mb-10"
      >
        <h3 class="category-label text-sm uppercase tracking-[0.12em] text-muted mb-4">{{ stackCategories[category] }}</h3>
        <div class="stack-grid gap-4">
          <div
            v-for="tech in groupedStack[category]"
            :key="tech.name"
            class="stack-card bg-bg border border-white/8 rounded-lg px-4 py-5 text-center font-semibold text-[0.95rem] will-change-transform cursor-default"
            @mouseenter="onCardHover"
            @mouseleave="onCardLeave"
          >
            {{ tech.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '../lib/gsapDefaults';
import SectionLabel from '../components/SectionLabel.vue';
import { portfolio, stackCategories } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const { stack } = portfolio;

const root = ref(null);
const labelRef = ref(null);
const marqueeTopRef = ref(null);
const marqueeBottomRef = ref(null);
const scrollTriggers = [];
let marqueeTweens = [];
let initialized = false;

const categories = ['frontend', 'backend', 'tools'];

const groupedStack = computed(() => {
  const groups = {};
  categories.forEach((cat) => {
    groups[cat] = stack.filter((t) => t.category === cat);
  });
  return groups;
});

const marqueeTop = computed(() => [...stack, ...stack]);
const marqueeBottom = computed(() => [...[...stack].reverse(), ...[...stack].reverse()]);

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function onCardHover(e) {
  gsap.to(e.currentTarget, {
    scale: 1.05,
    borderColor: 'rgba(59, 130, 246, 0.6)',
    duration: 0.25,
    ease: EASE.enter,
  });
}

function onCardLeave(e) {
  gsap.to(e.currentTarget, {
    scale: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    duration: 0.25,
    ease: EASE.enter,
  });
}

async function init() {
  if (initialized || !root.value) return;

  await document.fonts.ready;
  await nextTick();
  await waitForLayout();

  labelRef.value?.init();

  if (marqueeTopRef.value) {
    const topTween = gsap.to(marqueeTopRef.value, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
    marqueeTweens.push(topTween);
  }

  if (marqueeBottomRef.value) {
    gsap.set(marqueeBottomRef.value, { x: '-50%' });
    const bottomTween = gsap.to(marqueeBottomRef.value, {
      x: '0%',
      duration: 35,
      ease: 'none',
      repeat: -1,
    });
    marqueeTweens.push(bottomTween);
  }

  const cards = root.value.querySelectorAll('.stack-card');
  const trigger = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.05,
        duration: 0.6,
        ease: EASE.enter,
      });
    },
  });

  scrollTriggers.push(trigger);
  initialized = true;
}

onUnmounted(() => {
  marqueeTweens.forEach((t) => t.kill());
  marqueeTweens = [];
  scrollTriggers.forEach((trigger) => trigger.kill());
  scrollTriggers.length = 0;
  initialized = false;
});

defineExpose({ init });
</script>

<style scoped>
.stack-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.marquee-wrapper {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-item {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.stack-grid {
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
}
</style>
