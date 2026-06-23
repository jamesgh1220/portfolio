<template>
  <div ref="labelRef" class="section-label-wrapper">
    <span class="section-label-number">{{ number }}</span>
    <span class="section-label-divider">—</span>
    <span class="section-label-title">{{ title }}</span>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '../lib/gsapDefaults';

defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
});

const labelRef = ref(null);
let scrollTrigger = null;

function init() {
  if (!labelRef.value) return;

  scrollTrigger = ScrollTrigger.create({
    trigger: labelRef.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.from(labelRef.value, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: EASE.enter,
      });
    },
  });
}

onUnmounted(() => {
  scrollTrigger?.kill();
});

defineExpose({ init });
</script>

<style scoped>
.section-label-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-muted);
  margin-bottom: 2rem;
  opacity: 1;
}

.section-label-number {
  color: var(--color-accent);
  font-weight: 600;
}

.section-label-divider {
  opacity: 0.4;
}

.section-label-title {
  font-weight: 500;
}
</style>
