<template>
  <div ref="root" class="experience-section relative w-full overflow-hidden bg-bg text-text section-padding">
    <div class="experience-header text-center px-8 pb-12 flex flex-col items-center">
      <SectionLabel ref="labelRef" number="03" title="Experiencia" />
      <h2 class="text-gradient font-display font-bold mb-2">Experiencia laboral</h2>
      <p class="intro-hint opacity-70 text-muted text-sm uppercase tracking-[0.08em]">Desplázate horizontalmente</p>
    </div>

    <section ref="panelsSection" class="panels-section h-screen overflow-hidden relative">
      <div ref="panelsContainer" class="panels-container flex flex-nowrap h-screen w-max">
        <article
          v-for="(job, index) in experience"
          :key="job.company"
          class="panel flex-[0_0_100vw] w-screen h-screen overflow-hidden flex bg-surface"
          :class="panelColors[index % panelColors.length]"
        >
          <div class="panel-inner w-full h-full flex flex-col justify-center p-16 gap-8 box-border md:flex-row md:items-center md:gap-16 max-md:px-5 max-md:py-10 max-md:pb-8 max-md:gap-5 max-md:justify-center max-md:overflow-y-auto">
            <div class="panel-header flex-1 max-md:w-full max-md:min-w-0">
              <span class="panel-period text-sm text-accent uppercase tracking-[0.1em] max-md:text-xs">{{ job.period }}</span>
              <h3 class="panel-company font-display font-extrabold leading-[1.1] my-2 max-w-full hyphens-auto max-md:leading-[1.15]" lang="es">{{ job.company }}</h3>
              <p class="panel-role text-muted m-0">{{ job.role }}</p>
            </div>
            <div class="panel-body flex-1 flex flex-col gap-6 max-md:w-full max-md:min-w-0">
              <p class="panel-description leading-[1.7] text-muted max-w-[36rem] max-md:text-[0.9rem] max-md:max-w-full">{{ job.description }}</p>
              <div class="stack-badges flex flex-wrap gap-2">
                <span v-for="tech in job.stack" :key="tech" class="stack-badge bg-white/8 border border-white/15 px-[0.85rem] py-[0.35rem] rounded-full text-xs">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="progress-track absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(20rem,60vw)] h-0.5 bg-white/10 rounded-[1px] overflow-hidden">
        <div ref="progressBarRef" class="progress-bar w-full h-full bg-gradient-accent origin-left scale-x-0" />
      </div>
    </section>
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

const { experience } = portfolio;
const panelColors = ['accent', 'surface', 'accent-alt', 'surface'];

const root = ref(null);
const labelRef = ref(null);
const panelsSection = ref(null);
const panelsContainer = ref(null);
const progressBarRef = ref(null);
const scrollTriggers = [];
let panelsTween = null;
let mediaRevert = null;
let initialized = false;

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function init() {
  if (initialized || !root.value || !panelsSection.value || !panelsContainer.value) return;

  await document.fonts.ready;
  await nextTick();
  await waitForLayout();

  labelRef.value?.init();

  const panels = gsap.utils.toArray(panelsContainer.value.querySelectorAll('.panel'));

  const mm = getGsapMedia();

  mediaRevert = mm.add(MEDIA, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      const scrub = isDesktop ? 1 : 0.6;

      if (reduceMotion) {
        gsap.set(panels, { opacity: 1, x: 0 });
        return;
      }

      gsap.set(panels, { opacity: 0.4 });
      gsap.to(panels[0], { opacity: 1, duration: 0.5, ease: EASE.enter });

      panelsTween = gsap.to(panels, {
        x: () => -(panels.length - 1) * window.innerWidth,
        ease: EASE.scrub,
        scrollTrigger: {
          trigger: panelsSection.value,
          pin: panelsSection.value,
          pinSpacing: true,
          start: 'top top',
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: isDesktop
            ? {
                snapTo: 1 / (panels.length - 1),
                duration: { min: 0.2, max: 0.5 },
                ease: 'power1.inOut',
              }
            : false,
          end: () => `+=${(panels.length - 1) * window.innerWidth}`,
          onUpdate: (self) => {
            if (progressBarRef.value) {
              gsap.set(progressBarRef.value, { scaleX: self.progress });
            }
            const activeIndex = Math.round(self.progress * (panels.length - 1));
            panels.forEach((panel, i) => {
              gsap.to(panel, {
                opacity: Math.abs(i - activeIndex) <= 1 ? 1 : 0.4,
                duration: 0.3,
                ease: EASE.enter,
                overwrite: 'auto',
              });
            });
          },
        },
      });

      scrollTriggers.push(panelsTween.scrollTrigger);
  });

  initialized = true;
}

onUnmounted(() => {
  scrollTriggers.forEach((trigger) => trigger.kill());
  scrollTriggers.length = 0;
  panelsTween = null;
  mediaRevert?.revert();
  initialized = false;
});

defineExpose({ init });
</script>

<style scoped>
.experience-header h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.panel.accent {
  background: linear-gradient(135deg, #0f1f35 0%, #1a2e4a 100%);
}

.panel.accent-alt {
  background: linear-gradient(135deg, #0f1f0f 0%, #1a2e1a 100%);
}

.panel-company {
  font-size: clamp(2rem, 4vw, 3.85rem);
  overflow-wrap: break-word;
  word-break: break-word;
}

.panel-role {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}

.panel-description {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
}

@media (max-width: 767px) {
  .panel-company {
    font-size: clamp(1.5rem, 7.5vw, 2.25rem);
  }

  .panel-role {
    font-size: clamp(0.9rem, 3.5vw, 1.1rem);
  }
}
</style>
