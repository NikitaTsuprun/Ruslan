<script setup lang="ts">
import { useIntersectionObserver, useMouseInElement } from '@vueuse/core'

const { contacts } = useAppConfig()
const { $lenis } = useNuxtApp()

const titleWords = ['Разблокировка', 'карт', 'и', 'счетов', 'по', '115-ФЗ', 'и', '161-ФЗ']
const titleText = titleWords.join(' ')

const trust = [
  'Бесплатная первичная консультация',
  'Честная оценка перспектив дела',
  'Полная конфиденциальность',
  'Работаю со всеми банками РФ',
]

// ВАЖНО: цифры опыта/количества — ориентировочные, замените на свои реальные.
const stats = [
  { value: '7+ лет', countTo: 7, prefix: '', suffix: '+ лет', label: 'помогаю с разблокировкой' },
  { value: '1500+', countTo: 1500, prefix: '', suffix: '+', label: 'разблокированных карт и счетов' },
  { value: 'Вся РФ', countTo: null, prefix: '', suffix: '', label: 'работаю дистанционно' },
  { value: 'от 1 дня', countTo: 1, prefix: 'от ', suffix: ' дня', label: 'срок снятия блокировки' },
]

const titleRef = ref<HTMLElement | null>(null)
const leadRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const bgShift = ref(0)
const statValues = ref(stats.map((s) => s.value))
let cleanupLenis: (() => void) | undefined
let stopStatsObserver: (() => void) | undefined

const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(visualRef)

const cardStyle = computed<Record<string, string>>(() => {
  if (!import.meta.client || elementWidth.value === 0 || elementHeight.value === 0 || isOutside.value) {
    return { '--tilt-x': '0deg', '--tilt-y': '0deg' }
  }

  const rotateY = ((elementX.value / elementWidth.value) - 0.5) * 20
  const rotateX = ((elementY.value / elementHeight.value) - 0.5) * -20

  return {
    '--tilt-x': `${rotateX.toFixed(2)}deg`,
    '--tilt-y': `${rotateY.toFixed(2)}deg`,
  }
})

const bgStyle = computed<Record<string, string>>(() => ({
  transform: `translate3d(0, ${bgShift.value}px, 0)`,
}))

function formatStat(index: number, value: number) {
  const stat = stats[index]
  return `${stat.prefix}${Math.round(value).toLocaleString('ru-RU')}${stat.suffix}`
}

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const { gsap } = await import('gsap')

  const words = titleRef.value?.querySelectorAll('.hero__word') ?? []

  if (prefersReduced) {
    gsap.set([words, leadRef.value, actionsRef.value, visualRef.value], { autoAlpha: 1, y: 0, scale: 1 })
  } else {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(words, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.08 })
      .fromTo(visualRef.value, { autoAlpha: 0, y: 34, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0.18)
      .fromTo([leadRef.value, actionsRef.value], { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.1 }, 0.6)
  }

  const statsControls = useIntersectionObserver(
    statsRef,
    ([entry]) => {
      if (!entry?.isIntersecting) return

      stats.forEach((stat, index) => {
        if (stat.countTo === null) {
          statValues.value[index] = stat.value
          return
        }

        if (prefersReduced) {
          statValues.value[index] = stat.value
          return
        }

        const counter = { value: 0 }
        gsap.to(counter, {
          value: stat.countTo,
          duration: 1.35,
          ease: 'power2.out',
          onUpdate: () => {
            statValues.value[index] = formatStat(index, counter.value)
          },
          onComplete: () => {
            statValues.value[index] = stat.value
          },
        })
      })

      statsControls.stop()
    },
    { threshold: 0.35 },
  )
  stopStatsObserver = statsControls.stop

  if ($lenis && !prefersReduced && !isMobile) {
    const onScroll = ({ scroll }: { scroll: number }) => {
      bgShift.value = Math.min(scroll * 0.3, 120)
    }

    $lenis.on('scroll', onScroll)
    cleanupLenis = () => $lenis.off('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  cleanupLenis?.()
  stopStatsObserver?.()
})
</script>

<template>
  <section
    id="top"
    class="hero"
  >
    <div class="hero__bg" :style="bgStyle" aria-hidden="true">
      <span class="blob blob--1" />
      <span class="blob blob--2" />
    </div>
    <ClientOnly>
      <HeroParticles />
    </ClientOnly>

    <div class="container hero__grid">
      <div class="hero__content">
        <p class="eyebrow">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
          Юридическая помощь · 115-ФЗ и 161-ФЗ
        </p>

        <h1 ref="titleRef" class="hero__title" :aria-label="titleText">
          <template v-for="(word, index) in titleWords" :key="`${word}-${index}`">
            <br v-if="index === 4" class="hero__title-break">
            <span
              class="hero__word"
              :class="{ 'hero__word--accent': index >= 4 }"
              aria-hidden="true"
            >{{ word }}</span>
          </template>
        </h1>

        <p ref="leadRef" class="hero__lead">
          Помогу снять блокировку банковской карты, счёта и дистанционного
          обслуживания, выведу из базы ЦБ РФ. Работаю с физлицами и бизнесом —
          в Москве и по всей России <strong>дистанционно</strong>.
        </p>

        <div ref="actionsRef" class="hero__actions">
          <a href="#kontakty" class="btn btn--primary btn--lg">
            Получить консультацию
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
          <a :href="`tel:${contacts.phoneHref}`" class="btn btn--outline btn--lg">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6.6 3.5c.5 0 .9.3 1 .8l.9 3.2c.1.4 0 .9-.3 1.2L7 10.3a14 14 0 0 0 6.7 6.7l1.6-2.2c.3-.3.8-.4 1.2-.3l3.2.9c.5.1.8.5.8 1V20a1.5 1.5 0 0 1-1.6 1.5C10.8 21 3 13.2 2.5 4.6A1.5 1.5 0 0 1 4 3h2.6Z" fill="currentColor" /></svg>
            Позвонить
          </a>
        </div>

      </div>

      <div ref="visualRef" class="hero__visual" aria-hidden="true">
        <div class="card3d" :style="cardStyle">
          <div class="hero-phone">
            <span class="hero-phone__button hero-phone__button--action" />
            <span class="hero-phone__button hero-phone__button--volume-up" />
            <span class="hero-phone__button hero-phone__button--volume-down" />
            <span class="hero-phone__button hero-phone__button--power" />

            <div class="hero-phone__shell">
              <div class="hero-phone__screen">
                <div class="hero-phone__status">
                  <span>9:41</span>
                  <span>5G ▰</span>
                </div>

                <span class="hero-phone__island"><i /></span>

                <div class="bank-app">
                  <div class="bank-app__hero">
                    <div class="bank-app__nav">
                      <span class="bank-app__back">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </span>
                      <span class="bank-app__tag">115-ФЗ</span>
                    </div>

                    <div class="bank-app__account">
                      <span>Текущий счет · T-Bank</span>
                      <strong>27 914,80 ₽</strong>
                      <small>Доступ ограничен банком</small>
                    </div>

                    <div class="bank-app__card">
                      <span>BLACK</span>
                      <b>•• 4417</b>
                      <i />
                    </div>
                  </div>

                  <div class="bank-app__sheet">
                    <div class="bank-alert">
                      <span class="bank-alert__icon">!</span>
                      <span>
                        <b>Ограничения по счету</b>
                        <small>Нужны пояснения по операциям</small>
                      </span>
                    </div>

                    <div class="bank-actions">
                      <span>
                        <i>₽</i>
                        Оплатить
                      </span>
                      <span>
                        <i>+</i>
                        Пополнить
                      </span>
                      <span>
                        <i>↗</i>
                        Перевести
                      </span>
                    </div>

                    <div class="bank-widgets">
                      <article>
                        <span>Операции по счету</span>
                        <b>запрос банка</b>
                        <div class="bank-bars">
                          <i /><i /><i /><i />
                        </div>
                      </article>
                      <article>
                        <span>Документы</span>
                        <b>3 из 4 готовы</b>
                        <small>пояснения, чеки, договор</small>
                      </article>
                    </div>

                    <div class="unlock-progress">
                      <div>
                        <span>Сопровождение</span>
                        <b>Разблокировка в работе</b>
                      </div>
                      <strong>82%</strong>
                    </div>

                    <div class="bank-bottom">
                      <span class="is-active">Главная</span>
                      <span>Платежи</span>
                      <span>Сервисы</span>
                      <span>Чат</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-phone__float hero-phone__float--success">
              <span>
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.4 4.2L19 7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <b>Пакет готов</b>
            </div>

            <div class="hero-phone__float hero-phone__float--case">
              <span>Кейс</span>
              <b>3 дня</b>
              <small>до ответа банка</small>
            </div>
          </div>
        </div>
      </div>

      <ul class="hero__trust">
        <li v-for="item in trust" :key="item">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#16a86b" /><path d="M8 12.4l2.6 2.6L16 9.5" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="container">
      <ul ref="statsRef" class="hero__stats">
        <li v-for="(s, index) in stats" :key="s.label" data-reveal-item>
          <span class="hero__stat-value">{{ statValues[index] }}</span>
          <span class="hero__stat-label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 40px 0 56px;
  background: linear-gradient(180deg, #eef4fc 0%, #f7fafe 52%, #fff 100%);
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform;
}
.blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .55; }
.blob--1 { width: 420px; height: 420px; background: #cfe1fb; top: -140px; right: -90px; }
.blob--2 { width: 360px; height: 360px; background: #d9f0fb; bottom: -120px; left: -120px; }

.hero__grid { position: relative; display: grid; gap: 38px; }
.hero__content { position: relative; z-index: 2; }

.hero__title {
  font-size: 33px;
  margin: 6px 0 16px;
  letter-spacing: -.025em;
}
.hero__word {
  display: inline-block;
  margin-right: .22em;
  opacity: 0;
  transform: translateY(40px);
  will-change: opacity, transform;
}
.hero__word--accent {
  background: linear-gradient(100deg, var(--blue-600), var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__lead {
  font-size: 17px;
  max-width: 540px;
  margin-bottom: 26px;
  opacity: 0;
  transform: translateY(22px);
}
.hero__lead strong { color: var(--ink); }

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  opacity: 0;
  transform: translateY(22px);
}

.hero__trust { display: grid; gap: 10px; }
.hero__trust li {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 600; color: var(--ink);
}
.hero__trust svg { width: 21px; height: 21px; flex: none; }

/* Телефонное превью первого экрана */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card3d {
  position: relative;
  width: min(450px, 100%);
  display: flex;
  justify-content: center;
  transform: perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transform-style: preserve-3d;
  transition: transform .18s ease-out;
  will-change: transform;
}
.hero-phone {
  position: relative;
  width: min(326px, 78vw);
  aspect-ratio: 9 / 19.35;
  transform-style: preserve-3d;
}
.hero-phone__shell {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 13px;
  border-radius: 64px;
  background:
    linear-gradient(118deg, rgba(255, 255, 255, .72) 0 2.4%, rgba(255, 255, 255, .18) 6%, transparent 15%),
    linear-gradient(302deg, rgba(255, 255, 255, .38) 0 4%, rgba(3, 11, 22, .24) 13%, transparent 28%),
    linear-gradient(145deg, #d8dde5 0%, #596474 9%, #151d29 28%, #050914 58%, #404b59 88%, #f1f4f8 100%);
  box-shadow:
    0 42px 96px rgba(6, 40, 90, .30),
    0 18px 38px rgba(11, 28, 58, .25),
    0 0 0 10px rgba(255, 255, 255, .32),
    inset 0 0 0 1px rgba(255, 255, 255, .42),
    inset 0 0 0 4px rgba(5, 10, 17, .84);
  transform-style: preserve-3d;
  animation: phoneFloat 7s ease-in-out infinite;
}
.hero-phone__shell::before,
.hero-phone__shell::after {
  content: '';
  position: absolute;
  pointer-events: none;
}
.hero-phone__shell::before {
  inset: 9px;
  border-radius: 54px;
  border: 1px solid rgba(255, 255, 255, .18);
  box-shadow:
    inset 0 0 0 2px rgba(0, 0, 0, .72),
    inset 0 0 34px rgba(255, 255, 255, .11);
  z-index: 1;
}
.hero-phone__shell::after {
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(112deg, transparent 0 16%, rgba(255, 255, 255, .22) 23%, transparent 32%),
    linear-gradient(284deg, transparent 0 66%, rgba(255, 255, 255, .16) 76%, transparent 86%);
  mix-blend-mode: screen;
  opacity: .7;
  z-index: 5;
}
.hero-phone__button {
  position: absolute;
  display: block;
  border-radius: 999px;
  background: linear-gradient(180deg, #727d89, #101722 52%, #566170);
  box-shadow:
    inset 1px 0 0 rgba(255, 255, 255, .26),
    0 4px 10px rgba(11, 28, 58, .22);
  z-index: 0;
}
.hero-phone__button--action {
  left: -4px;
  top: 18%;
  width: 5px;
  height: 34px;
}
.hero-phone__button--volume-up,
.hero-phone__button--volume-down {
  left: -6px;
  width: 7px;
  height: 70px;
}
.hero-phone__button--volume-up { top: 28%; }
.hero-phone__button--volume-down { top: 39%; }
.hero-phone__button--power {
  right: -6px;
  top: 32%;
  width: 7px;
  height: 96px;
}
.hero-phone__screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 51px;
  border: 1px solid rgba(255, 255, 255, .14);
  background: #f4f8fd;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, .60),
    inset 0 0 42px rgba(255, 255, 255, .08);
  z-index: 1;
}
.hero-phone__screen::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(112deg, rgba(255, 255, 255, .24) 0 8%, transparent 20% 66%, rgba(255, 255, 255, .1) 78%, transparent 92%),
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, .2), transparent 24%);
  mix-blend-mode: screen;
  opacity: .58;
  pointer-events: none;
  z-index: 5;
}
.hero-phone__status {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
  min-height: 43px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 31px;
  color: rgba(255, 255, 255, .92);
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
}
.hero-phone__island {
  position: absolute;
  top: 14px;
  left: 50%;
  z-index: 7;
  width: 124px;
  height: 35px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 78% 48%, rgba(38, 53, 68, .96) 0 8%, rgba(0, 0, 0, .98) 9% 100%),
    rgba(0, 0, 0, .98);
  transform: translateX(-50%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, .04),
    inset 0 -8px 18px rgba(255, 255, 255, .035),
    0 2px 8px rgba(0, 0, 0, .48);
}
.hero-phone__island i {
  position: absolute;
  right: 15px;
  top: 50%;
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 40%, rgba(71, 104, 132, .9), rgba(3, 7, 14, .98) 68%);
  transform: translateY(-50%);
}
.bank-app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f8fd;
}
.bank-app__hero {
  min-height: 300px;
  padding: 60px 24px 44px;
  color: #fff;
  background:
    radial-gradient(circle at 18% 16%, rgba(4, 104, 214, .56), transparent 32%),
    radial-gradient(circle at 86% 20%, rgba(0, 166, 230, .26), transparent 34%),
    linear-gradient(180deg, #0d1826 0%, #172231 100%);
}
.bank-app__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 29px;
}
.bank-app__back,
.bank-app__tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.bank-app__back {
  width: 38px;
  height: 38px;
  border-radius: 16px;
  background: rgba(255, 255, 255, .1);
  color: rgba(255, 255, 255, .9);
}
.bank-app__back svg { width: 23px; height: 23px; }
.bank-app__tag {
  min-height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .12);
  color: rgba(255, 255, 255, .84);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: .08em;
}
.bank-app__account span,
.bank-app__account small {
  display: block;
  color: rgba(255, 255, 255, .7);
  font-size: 14px;
  font-weight: 700;
}
.bank-app__account strong {
  display: block;
  margin-top: 6px;
  color: #fff;
  font-size: 38px;
  line-height: 1.05;
  letter-spacing: -.03em;
}
.bank-app__account small {
  margin-top: 12px;
  color: rgba(255, 255, 255, .58);
}
.bank-app__card {
  position: absolute;
  right: 26px;
  top: 196px;
  width: 116px;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 22px;
  padding: 16px;
  color: #fff;
  background:
    radial-gradient(circle at 84% 18%, rgba(255, 255, 255, .22), transparent 32%),
    linear-gradient(135deg, #111824 0%, #02050a 62%, #233144 100%);
  box-shadow: 0 14px 28px rgba(0, 0, 0, .32);
}
.bank-app__card span {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .12em;
}
.bank-app__card b {
  font-size: 15px;
  letter-spacing: .04em;
}
.bank-app__card i {
  position: absolute;
  right: 17px;
  bottom: 17px;
  width: 28px;
  height: 18px;
  border-radius: 5px;
  background: linear-gradient(90deg, #ee4d4d 0 50%, #f3c243 50% 100%);
}
.bank-app__sheet {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  gap: 12px;
  margin-top: -43px;
  padding: 26px 24px 21px;
  border-radius: 43px 43px 50px 50px;
  background:
    radial-gradient(circle at 18% 0%, rgba(227, 238, 252, .96), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, .98), #f5f8fc);
  box-shadow: 0 -12px 30px rgba(8, 20, 38, .12);
}
.bank-alert {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 15px;
  padding: 14px 16px;
  border: 1px solid rgba(228, 235, 244, .96);
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(11, 28, 58, .08);
}
.bank-alert__icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: #fff1df;
  color: #be6a10;
  font-size: 24px;
  font-weight: 900;
}
.bank-alert b,
.bank-widgets b,
.unlock-progress b {
  display: block;
  color: var(--ink);
  line-height: 1.18;
}
.bank-alert b { font-size: 15.5px; }
.bank-alert small,
.bank-widgets small,
.unlock-progress span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.25;
}
.bank-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
}
.bank-actions span {
  display: grid;
  place-items: center;
  gap: 9px;
  min-height: 78px;
  border-radius: 23px;
  background: #fff;
  color: var(--blue-700);
  font-size: 12.5px;
  font-weight: 800;
  box-shadow: 0 8px 20px rgba(11, 28, 58, .07);
}
.bank-actions i {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--blue-100);
  color: var(--blue-600);
  font-style: normal;
  font-weight: 900;
  line-height: 1;
}
.bank-widgets {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 12px;
}
.bank-widgets article {
  min-height: 110px;
  padding: 16px;
  border: 1px solid rgba(228, 235, 244, .92);
  border-radius: 27px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(11, 28, 58, .06);
}
.bank-widgets span {
  display: block;
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 800;
  line-height: 1.2;
}
.bank-widgets b {
  margin-top: 8px;
  font-size: 14px;
}
.bank-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 26px;
  margin-top: 18px;
}
.bank-bars i {
  flex: 1;
  border-radius: 999px;
  background: var(--blue-500);
  animation: bankBar 2.6s ease-in-out infinite;
}
.bank-bars i:nth-child(1) { height: 38%; background: var(--cyan); }
.bank-bars i:nth-child(2) { height: 72%; animation-delay: .16s; }
.bank-bars i:nth-child(3) { height: 52%; background: var(--green); animation-delay: .32s; }
.bank-bars i:nth-child(4) { height: 86%; background: var(--amber); animation-delay: .48s; }
.unlock-progress {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 19px 21px;
  border-radius: 27px;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(100deg, rgba(4, 104, 214, .5), rgba(22, 168, 107, .42)) border-box;
  border: 1px solid transparent;
  box-shadow: 0 10px 24px rgba(4, 104, 214, .08);
}
.unlock-progress b { margin-top: 5px; font-size: 14px; }
.unlock-progress strong {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex: none;
  border-radius: 50%;
  color: var(--blue-700);
  font-size: 13px;
  background:
    radial-gradient(circle at center, #fff 0 55%, transparent 56%),
    conic-gradient(var(--blue-600) 0 82%, var(--blue-100) 82% 100%);
}
.bank-bottom {
  align-self: end;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  padding-top: 15px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 800;
  text-align: center;
}
.bank-bottom span::before {
  content: '';
  display: block;
  width: 27px;
  height: 5px;
  margin: 0 auto 8px;
  border-radius: 999px;
  background: #d9e4f2;
}
.bank-bottom .is-active {
  color: var(--blue-700);
}
.bank-bottom .is-active::before {
  background: var(--blue-600);
}
.hero-phone__float {
  position: absolute;
  z-index: 8;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(228, 235, 244, .9);
  background: rgba(255, 255, 255, .94);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 44px rgba(11, 28, 58, .14);
}
.hero-phone__float--success {
  top: 23%;
  left: -76px;
  padding: 17px 22px;
  border-radius: 27px;
  animation: phoneFloatBadge 5.4s ease-in-out infinite;
}
.hero-phone__float--success span {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex: none;
  border-radius: 19px;
  background: #e3f6ed;
  color: var(--green);
}
.hero-phone__float--success svg {
  width: 28px;
  height: 28px;
}
.hero-phone__float--success b {
  color: var(--ink);
  font-size: 17px;
  white-space: nowrap;
}
.hero-phone__float--case {
  right: -77px;
  bottom: 22%;
  width: 172px;
  display: block;
  border-radius: 25px;
  padding: 24px 25px;
  animation: phoneFloatBadge 5.8s ease-in-out infinite .45s;
}
.hero-phone__float--case span {
  display: block;
  margin-bottom: 11px;
  color: var(--blue-600);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hero-phone__float--case b {
  display: block;
  color: var(--blue-700);
  font-size: 40px;
  line-height: 1;
  letter-spacing: -.03em;
}
.hero-phone__float--case small {
  display: block;
  margin-top: 7px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.2;
}
@keyframes phoneFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}
@keyframes phoneFloatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes bankBar {
  0%, 100% { transform: scaleY(.82); }
  50% { transform: scaleY(1); }
}

/* Статистика */
.hero__stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-top: 34px;
}
.hero__stats li {
  background: #fff;
  padding: 20px 16px;
  text-align: center;
}
.hero__stat-value {
  display: block;
  font-size: 24px; font-weight: 800; color: var(--blue-700);
  letter-spacing: -.02em;
}
.hero__stat-label { display: block; font-size: 13.5px; color: var(--muted); margin-top: 3px; }

@media (min-width: 600px) {
  .hero__title { font-size: 42px; }
}
@media (max-width: 520px) {
  .hero-phone {
    width: min(286px, 84vw);
  }
  .hero-phone__float {
    display: none;
  }
  .bank-app__hero {
    min-height: 210px;
  }
  .bank-app__sheet {
    gap: 8px;
  }
  .bank-alert {
    grid-template-columns: 32px 1fr;
    padding: 10px;
  }
  .bank-alert__icon {
    width: 32px;
    height: 32px;
  }
}
@media (min-width: 960px) {
  .hero { padding: 54px 0 68px; }
  .hero__grid { grid-template-columns: 1.05fr .95fr; align-items: start; gap: 56px; }
  .hero__content { padding-top: 58px; }
  .hero__visual { align-items: flex-start; }
  .hero__title { font-size: 52px; }
  .hero__lead { font-size: 18.5px; }
  .hero__trust { grid-template-columns: 1fr 1fr; }
  .card3d { width: min(450px, 100%); }
  .hero__stats { grid-template-columns: repeat(4, 1fr); margin-top: 8px; }
  .hero__stat-value { font-size: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__word,
  .hero__lead,
  .hero__actions {
    opacity: 1;
    transform: none;
  }
  .hero-phone__shell,
  .hero-phone__float,
  .bank-bars i {
    animation: none;
  }
}
</style>
