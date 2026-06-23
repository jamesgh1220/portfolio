<template>
  <ScrollProgress ref="scrollProgressRef" />
  <IntroSection ref="introRef" />
  <AboutSection ref="aboutRef" />
  <ProjectsSection ref="projectsRef" />
  <ExperienceSection ref="experienceRef" />
  <StackSection ref="stackRef" />
  <ContactSection ref="contactRef" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './composables/useLenis';
import ScrollProgress from './components/ScrollProgress.vue';
import IntroSection from './sections/IntroSection.vue';
import AboutSection from './sections/AboutSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import ExperienceSection from './sections/ExperienceSection.vue';
import StackSection from './sections/StackSection.vue';
import ContactSection from './sections/ContactSection.vue';

const { initLenis } = useLenis();

const scrollProgressRef = ref(null);
const introRef = ref(null);
const aboutRef = ref(null);
const projectsRef = ref(null);
const experienceRef = ref(null);
const stackRef = ref(null);
const contactRef = ref(null);

function onOrientationChange() {
  setTimeout(() => ScrollTrigger.refresh(true), 300);
}

onMounted(async () => {
  window.addEventListener('orientationchange', onOrientationChange);
  initLenis();

  await introRef.value?.init();
  await aboutRef.value?.init();
  await projectsRef.value?.init();
  await experienceRef.value?.init();
  await stackRef.value?.init();
  await contactRef.value?.init();

  ScrollTrigger.refresh(true);
  scrollProgressRef.value?.init();
});

onUnmounted(() => {
  window.removeEventListener('orientationchange', onOrientationChange);
});
</script>
