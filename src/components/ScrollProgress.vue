<template>
  <div class="fixed top-0 left-0 w-full h-0.5 bg-gradient-accent origin-left z-9999 pointer-events-none" :style="{ transform: `scaleX(${progress})` }" />
</template>

<script setup>
import { onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const progress = ref(0);
let scrollTrigger = null;

function init() {
  scrollTrigger?.kill();

  scrollTrigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      progress.value = self.progress;
    },
  });
}

onUnmounted(() => {
  scrollTrigger?.kill();
});

defineExpose({ init });
</script>
