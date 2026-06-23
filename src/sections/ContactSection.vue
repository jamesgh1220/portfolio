<template>
  <div ref="root" class="contact-section relative w-full overflow-hidden">
    <section ref="trigger" class="trigger w-screen h-screen overflow-hidden bg-text relative">
      <span ref="ctaLeftRef" class="cta-left absolute block text-center font-display z-10 w-1/2 font-bold text-bg leading-[1.2] pointer-events-none left-0">Hablemos<br />de tu proyecto</span>
      <span ref="ctaRightRef" class="cta-right absolute block text-center font-display z-10 w-1/2 font-bold text-bg leading-[1.2] pointer-events-none right-0">¿Tienes una idea?<br />Escríbeme</span>

      <form
        ref="contactFormRef"
        class="contact-form-panel hidden md:flex md:flex-col md:justify-center md:gap-4 md:absolute md:right-0 md:top-0 md:w-1/2 md:h-full md:z-30 md:px-12 md:py-8 md:box-border md:opacity-0 md:pointer-events-none"
        @submit.prevent="onSubmitForm"
      >
        <p class="form-title md:font-display md:text-xl md:font-bold md:text-text md:m-0 md:mb-2">Cuéntame tu idea</p>
        <label class="form-field md:flex md:flex-col md:gap-[0.35rem] md:text-left">
          <span class="md:text-[0.7rem] md:uppercase md:tracking-[0.1em] md:text-muted">Nombre</span>
          <input v-model="form.name" type="text" name="name" placeholder="Tu nombre" required class="md:w-full md:bg-white/6 md:border md:border-white/12 md:rounded-lg md:px-[0.85rem] md:py-[0.65rem] md:text-text md:font-body md:text-[0.9rem] md:box-border md:resize-y focus:outline-none focus:border-accent" />
        </label>
        <label class="form-field md:flex md:flex-col md:gap-[0.35rem] md:text-left">
          <span class="md:text-[0.7rem] md:uppercase md:tracking-[0.1em] md:text-muted">Email</span>
          <input v-model="form.email" type="email" name="email" placeholder="tu@email.com" required class="md:w-full md:bg-white/6 md:border md:border-white/12 md:rounded-lg md:px-[0.85rem] md:py-[0.65rem] md:text-text md:font-body md:text-[0.9rem] md:box-border md:resize-y focus:outline-none focus:border-accent" />
        </label>
        <label class="form-field md:flex md:flex-col md:gap-[0.35rem] md:text-left">
          <span class="md:text-[0.7rem] md:uppercase md:tracking-[0.1em] md:text-muted">Mensaje</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="4"
            placeholder="¿En qué puedo ayudarte?"
            required
            class="md:w-full md:bg-white/6 md:border md:border-white/12 md:rounded-lg md:px-[0.85rem] md:py-[0.65rem] md:text-text md:font-body md:text-[0.9rem] md:box-border md:resize-y focus:outline-none focus:border-accent"
          />
        </label>
        <div class="md:w-full md:min-h-[78px]">
          <VueHcaptcha :sitekey="hCaptchaSiteKey" @verify="onCaptchaVerify" @expired="onCaptchaExpired" />
        </div>
        <button type="submit" class="form-submit md:mt-2 md:px-5 md:py-3 md:bg-gradient-accent md:border-none md:rounded-lg md:text-white md:font-body md:text-sm md:font-semibold md:uppercase md:tracking-[0.08em] md:cursor-pointer transition-opacity duration-200 hover:opacity-90">Enviar mensaje</button>
      </form>

      <div v-for="n in boxCount" :key="n" class="box h-[1.2vh] w-[50vw] mb-[-0.2vh] bg-bg block will-change-transform" />
    </section>

    <section ref="contactContentRef" class="contact-content min-h-screen bg-bg text-text flex flex-col items-center justify-center text-center gap-6 section-padding">
      <SectionLabel ref="labelRef" number="05" title="Contacto" />

      <h2 class="contact-title font-display font-extrabold m-0 text-gradient">Contacto</h2>
      <p class="contact-availability text-lg text-muted m-0">{{ contact.availability }}</p>

      <div class="email-reveal my-4 w-full max-w-[28rem] px-4 box-border">
        <SplitChars
          ref="emailSplitRef"
          :text="contact.email"
          tag="p"
          class="email-text font-display font-semibold text-accent max-w-full m-0 max-md:leading-[1.45]"
        />
      </div>

      <div ref="linksRef" class="contact-links flex flex-col gap-4 mt-4 w-full max-w-[28rem]">
        <a
          :href="`mailto:${contact.email}`"
          class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg no-underline text-inherit will-change-transform hover:border-accent"
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">Email</span>
          <span class="link-value text-base font-medium text-text">{{ contact.email }}</span>
        </a>
        <a
          v-if="contact.phone"
          :href="`tel:${contact.phone.replace(/\s/g, '')}`"
          class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg no-underline text-inherit will-change-transform hover:border-accent"
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">Teléfono</span>
          <span class="link-value text-base font-medium text-text">{{ contact.phone }}</span>
        </a>
        <a
          :href="`https://${contact.github}`"
          target="_blank"
          rel="noopener"
          class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg no-underline text-inherit will-change-transform hover:border-accent"
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">GitHub</span>
          <span class="link-value text-base font-medium text-text">{{ contact.github }}</span>
        </a>
        <a
          v-if="contact.linkedin"
          :href="`https://${contact.linkedin}`"
          target="_blank"
          rel="noopener"
          class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg no-underline text-inherit will-change-transform hover:border-accent"
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">LinkedIn</span>
          <span class="link-value text-base font-medium text-text">{{ contact.linkedin }}</span>
        </a>
        <div v-else class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg">
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">LinkedIn</span>
          <span class="link-value text-base font-medium text-text">{{ contact.linkedinLabel || 'Próximamente' }}</span>
        </div>
        <div class="contact-link flex flex-col gap-1 p-5 bg-surface border border-white/8 rounded-lg">
          <span class="link-label text-xs uppercase tracking-[0.1em] text-muted">Ubicación</span>
          <span class="link-value text-base font-medium text-text">{{ contact.location }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onUnmounted, reactive, ref } from 'vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGsapMedia, MEDIA } from '../composables/useGsapMedia';
import { EASE } from '../lib/gsapDefaults';
import SectionLabel from '../components/SectionLabel.vue';
import SplitChars from '../components/SplitChars.vue';
import { portfolio } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const { contact } = portfolio;
const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const hCaptchaSiteKey = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

const form = reactive({
  name: '',
  email: '',
  message: '',
});
const captchaToken = ref('');

const root = ref(null);
const trigger = ref(null);
const contactContentRef = ref(null);
const linksRef = ref(null);
const labelRef = ref(null);
const emailSplitRef = ref(null);
const ctaLeftRef = ref(null);
const ctaRightRef = ref(null);
const contactFormRef = ref(null);
const scrollTriggers = [];
let mediaRevert = null;
let initialized = false;
let contactRevealed = false;
const boxCount = 90;

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function onMagneticMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(el, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: EASE.enter });
}

function onMagneticLeave(e) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: EASE.enter });
}

function onCaptchaVerify(token) {
  captchaToken.value = token;
}

function onCaptchaExpired() {
  captchaToken.value = '';
}

async function onSubmitForm() {
  if (!captchaToken.value) {
    alert('Por favor completa el captcha');
    return;
  }

    const payload = {
      access_key: web3AccessKey,
      name: form.name,
      email: form.email,
      message: form.message,
      subject: `Nuevo contacto desde portafolio: ${form.name}`,
      replyto: form.email,
      'h-captcha-response': captchaToken.value,
    };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      alert('Mensaje enviado correctamente');
      form.name = '';
      form.email = '';
      form.message = '';
      captchaToken.value = '';
    } else {
      alert(data.message || 'Error al enviar el mensaje');
    }
  } catch {
    alert('Error de conexión. Intenta de nuevo.');
  }
}

function animateEmailReveal() {
  const emailChars = [...(emailSplitRef.value?.getCharElements() ?? [])];
  if (!emailChars.length) return;

  gsap.from(emailChars, {
    opacity: 0,
    x: 24,
    stagger: 0.02,
    duration: 0.5,
    ease: EASE.enter,
  });
}

async function revealContactContent() {
  if (contactRevealed) return;
  contactRevealed = true;

  labelRef.value?.init();

  await waitForLayout();
  animateEmailReveal();

  const links = linksRef.value?.querySelectorAll('.contact-link') ?? [];
  gsap.from(links, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: EASE.enter,
    delay: 0.3,
  });
}

function buildStripeTimeline(tl, boxes) {
  tl.to(boxes, {
    force3D: true,
    duration: 1,
    xPercent: 100,
    ease: 'power1.inOut',
    stagger: { amount: 1 },
  })
    .to(boxes, { ease: 'power1.out', duration: 1, rotation: '45deg' }, 0)
    .to(boxes, { ease: 'power1.in', duration: 1, rotation: '0deg' }, 1);
}

function buildWebTimeline(tl, boxes) {
  const ctaLeft = ctaLeftRef.value;
  const ctaRight = ctaRightRef.value;
  const formEl = contactFormRef.value;

  gsap.set(ctaLeft, { opacity: 0 });
  gsap.set(ctaRight, { opacity: 1 });
  gsap.set(formEl, { opacity: 0, pointerEvents: 'none' });

  buildStripeTimeline(tl, boxes);

  tl.to(ctaRight, { opacity: 0, duration: 0.15, ease: EASE.exit }, 0.45)
    .to(ctaLeft, { opacity: 1, duration: 0.2, ease: EASE.enter }, 0.5)
    .to(
      formEl,
      {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.25,
        ease: EASE.enter,
      },
      0.55
    );
}

async function init() {
  if (initialized || !root.value || !trigger.value) return;

  await document.fonts.ready;
  await nextTick();
  await waitForLayout();

  const boxes = trigger.value.querySelectorAll('.box');

  const mm = getGsapMedia();

  mediaRevert = mm.add(MEDIA, (context) => {
    const { isWeb, isDesktop, reduceMotion } = context.conditions;
    const scrub = isDesktop ? 0.5 : 0.4;

    if (reduceMotion) {
      revealContactContent();
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger.value,
        scrub,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        start: 'top top',
        end: isDesktop ? '+=150%' : '+=120%',
        invalidateOnRefresh: true,
        onLeave: () => revealContactContent(),
      },
    });

    if (isDesktop) {
      buildWebTimeline(tl, boxes);
    } else {
      buildStripeTimeline(tl, boxes);
    }

    scrollTriggers.push(tl.scrollTrigger);
  });

  ScrollTrigger.create({
    trigger: contactContentRef.value,
    start: 'top 85%',
    once: true,
    onEnter: revealContactContent,
  });

  initialized = true;
}

onUnmounted(() => {
  scrollTriggers.forEach((st) => st.kill());
  scrollTriggers.length = 0;
  mediaRevert?.revert();
  initialized = false;
});

defineExpose({ init });
</script>

<style scoped>
.contact-section {
  --light: var(--color-text);
  --dark: var(--color-bg);
}

.trigger > span {
  font-size: clamp(1.25rem, 3.5vw, 2.5rem);
  top: calc(50vh - 3rem);
}

.contact-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
}

.email-text {
  font-size: clamp(1.25rem, 2.15vw, 1.8rem);
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 767px) {
  .email-text {
    font-size: clamp(0.95rem, 4vw, 1.15rem);
  }

  .trigger > span {
    font-size: clamp(1rem, 4.5vw, 1.35rem);
    top: calc(50vh - 2.5rem);
  }
}
</style>
