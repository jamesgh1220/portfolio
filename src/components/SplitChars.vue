<template>
  <component :is="tag" ref="rootRef" :class="className">
    <span
      v-for="(char, i) in chars"
      :key="i"
      class="split-char"
      :class="{ 'split-char--space': char === ' ' }"
      aria-hidden="true"
    >{{ char === ' ' ? '\u00A0' : char }}</span>
    <span class="sr-only">{{ text }}</span>
  </component>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'span' },
  class: { type: String, default: '' },
});

const rootRef = ref(null);
const className = computed(() => props.class);

const chars = computed(() => props.text.split(''));

function getCharElements() {
  return rootRef.value?.querySelectorAll('.split-char') ?? [];
}

defineExpose({ rootRef, getCharElements });
</script>

<style scoped>
.split-char {
  display: inline-block;
  will-change: transform, opacity;
}

.split-char--space {
  width: 0.3em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
