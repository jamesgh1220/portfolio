<template>
  <div ref="root" class="projects-section relative w-full overflow-hidden bg-bg text-text section-padding">
    <div class="projects-inner max-w-full">
      
      <section class="intro-panel min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center p-8">
        <SectionLabel ref="labelRef" number="02" title="Proyectos" />
        <h2 class="text-gradient font-display font-bold">Proyectos destacados</h2>
        <p class="intro-hint opacity-70 tracking-[0.08em] uppercase text-sm text-muted">Desplázate para explorar</p>
      </section>

      <div class="box-container overflow-hidden">
        <section
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-panel h-screen relative max-md:overflow-hidden"
        >
          <span class="project-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-extrabold text-text opacity-[0.05] z-0 leading-none pointer-events-none">{{ String(index + 1).padStart(2, '0') }}</span>
          <div
            class="project-image absolute top-0 left-0 w-full h-screen bg-cover bg-center will-change-transform"
            :style="{ backgroundImage: `url(${project.image})` }"
          />
          <div class="project-overlay relative z-10 h-screen flex flex-col items-center justify-center text-center p-8 gap-5 will-change-transform bg-[#050508]/35 backdrop-blur-[2px] border border-white/4 box-border max-md:p-5 max-md:px-4 max-md:pb-10 max-md:gap-[0.85rem] max-md:justify-end">
            <h3 class="project-title font-display font-extrabold leading-none m-0 text-text max-w-full max-md:leading-[1.1]">{{ project.title }}</h3>
            <p class="project-description max-w-[36rem] text-muted leading-[1.6] max-md:text-sm max-md:max-w-full">{{ project.description }}</p>
            <div class="stack-badges flex flex-wrap justify-center gap-2">
              <span
                v-for="tech in project.stack"
                :key="tech"
                 class="stack-badge bg-blue-500/15 border border-blue-500/40 text-text px-[0.85rem] py-[0.35rem] rounded-full text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links flex gap-6 mt-2">
              <a
                v-if="project.links.demo"
                :href="project.links.demo"
                class="project-link text-sm uppercase tracking-[0.1em] text-accent no-underline inline-block"
                target="_blank"
                rel="noopener"
              >Demo</a>
              <a
                v-if="project.links.repo"
                :href="project.links.repo"
                class="project-link text-sm uppercase tracking-[0.1em] text-accent no-underline inline-block"
                target="_blank"
                rel="noopener"
              >Repositorio</a>
            </div>
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

const { projects } = portfolio;

const root = ref(null);
const labelRef = ref(null);
const scrollTriggers = [];
let mediaRevert = null;
let initialized = false;

function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        })
    )
  );
}

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function init() {
  if (initialized || !root.value) return;

  await document.fonts.ready;
  await preloadImages(projects.map((p) => p.image));
  await nextTick();
  await waitForLayout();

  labelRef.value?.init();

  const mm = getGsapMedia();

  mediaRevert = mm.add(MEDIA, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      const panels = gsap.utils.toArray(root.value.querySelectorAll('.project-panel'));
      const scrub = isDesktop ? 1 : 0.6;

      panels.forEach((panel) => {
        const overlay = panel.querySelector('.project-overlay');
        const image = panel.querySelector('.project-image');
        const number = panel.querySelector('.project-number');

        if (reduceMotion) {
          gsap.set(panel, { opacity: 1 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub,
            start: 'top top',
            end: '+=100%',
            invalidateOnRefresh: true,
          },
        });

        tl.from(overlay, { opacity: 0, y: isDesktop ? 100 : 50 })
          .from(image, { scale: 0, ease: EASE.expo, duration: 1 }, 0)
          .to(image, { y: isDesktop ? '15%' : '8%', ease: EASE.scrub }, 0)
          .to(number, { opacity: 0.15, ease: EASE.scrub }, 0)
          .to(overlay, { opacity: 0, y: isDesktop ? -100 : -50, ease: EASE.exit });

        scrollTriggers.push(tl.scrollTrigger);
      });
  });

  root.value.querySelectorAll('.project-link').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { scale: 1.05, duration: 0.2, ease: EASE.enter });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { scale: 1, duration: 0.2, ease: EASE.enter });
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
.intro-panel h2 {
  font-size: clamp(2rem, 6vw, 4rem);
}

.project-number {
  font-size: clamp(8rem, 30vw, 20rem);
}

.project-title {
  font-size: clamp(3rem, 5vw, 8rem);
  overflow-wrap: break-word;
  word-break: break-word;
}

.project-description {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}

@media (max-width: 767px) {
  .project-number {
    font-size: clamp(5rem, 40vw, 8rem);
  }

  .project-title {
    font-size: clamp(1.75rem, 10vw, 2.5rem);
  }
}
</style>
