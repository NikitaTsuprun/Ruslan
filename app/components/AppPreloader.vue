<script setup lang="ts">
const preloader = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const visible = ref(true)

onMounted(async () => {
  if (sessionStorage.getItem('ruslan-preloader-seen') === '1') {
    visible.value = false
    return
  }

  sessionStorage.setItem('ruslan-preloader-seen', '1')
  document.body.classList.add('is-preloading')

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    window.setTimeout(() => {
      visible.value = false
      document.body.classList.remove('is-preloading')
    }, 180)
    return
  }

  const { gsap } = await import('gsap')

  gsap
    .timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        visible.value = false
        document.body.classList.remove('is-preloading')
      },
    })
    .fromTo(title.value, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.72 })
    .fromTo(subtitle.value, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.34')
    .fromTo(line.value, { scaleX: 0 }, { scaleX: 1, duration: 0.95, transformOrigin: 'left center' }, '-=0.2')
    .to(preloader.value, { yPercent: -100, duration: 0.86, ease: 'power2.inOut' }, 1.8)
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.classList.remove('is-preloading')
})
</script>

<template>
  <div v-if="visible" ref="preloader" class="app-preloader" aria-label="Загрузка сайта">
    <div class="app-preloader__orb" aria-hidden="true" />
    <div class="app-preloader__mark" aria-hidden="true">
      <BrandLogo :size="104" />
    </div>

    <div class="app-preloader__text">
      <p ref="title">Руслан Ганеев</p>
      <span ref="subtitle">разблокировка карт и счетов</span>
    </div>

    <div class="app-preloader__line" aria-hidden="true">
      <span ref="line" />
    </div>
  </div>
</template>

<style scoped>
.app-preloader {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 24px;
  min-height: 100dvh;
  padding: 28px;
  background:
    radial-gradient(520px 420px at 50% 44%, rgba(4, 104, 214, .24), transparent 72%),
    linear-gradient(180deg, #07152c 0%, #0a0a0a 100%);
  color: #fff;
  overflow: hidden;
}
.app-preloader__orb {
  position: absolute;
  width: min(58vw, 420px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .09);
  box-shadow: inset 0 0 0 28px rgba(255, 255, 255, .025), 0 0 80px rgba(4, 104, 214, .18);
}
.app-preloader__mark {
  position: relative;
  width: 104px;
  height: 104px;
  display: grid;
  place-items: center;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 22px 54px rgba(4, 104, 214, .34);
}
.app-preloader__mark svg {
  width: 100%;
  height: 100%;
}
.app-preloader__text {
  position: relative;
  text-align: center;
}
.app-preloader__text p {
  font-size: clamp(30px, 5vw, 58px);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -.03em;
}
.app-preloader__text span {
  display: block;
  margin-top: 10px;
  font-size: 15px;
  color: rgba(231, 237, 246, .72);
}
.app-preloader__line {
  position: relative;
  width: min(260px, 62vw);
  height: 4px;
  border-radius: 100px;
  background: rgba(255, 255, 255, .12);
  overflow: hidden;
}
.app-preloader__line span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--blue-600), var(--cyan));
}

@media (prefers-reduced-motion: reduce) {
  .app-preloader,
  .app-preloader * {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
</style>
