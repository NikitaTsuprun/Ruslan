<script setup lang="ts">
const steps = [
  {
    title: 'Заявка и бесплатная консультация',
    text: 'Вы оставляете заявку или звоните. Я выслушиваю ситуацию, отвечаю на первые вопросы и сразу говорю, чем смогу помочь.',
  },
  {
    title: 'Анализ ситуации',
    text: 'Изучаю основание блокировки, уведомления и запросы банка. Определяю, по какому закону и почему наложены ограничения.',
  },
  {
    title: 'Подготовка документов',
    text: 'Готовлю пояснения, ответы на запросы банка, заявления и при необходимости жалобы в ЦБ РФ и межведомственную комиссию.',
  },
  {
    title: 'Снятие блокировки',
    text: 'Сопровождаю до результата — снятия блокировки и возврата полного доступа к карте, счёту и вашим деньгам.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, { mode: 'stagger-children', stagger: 0.12 })
</script>

<template>
  <section id="etapy" ref="sectionRef" class="section process scroll-animate scroll-animate--stagger-children">
    <div class="container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">Как проходит работа</p>
        <h2 class="section-title">Четыре шага до разблокировки</h2>
        <p class="section-subtitle">
          Понятный процесс без сложных терминов — вы всегда знаете,
          на каком этапе находится ваше дело.
        </p>
      </div>

      <ol class="process__steps">
        <li
          v-for="(s, i) in steps"
          :key="s.title"
          class="step"
          :data-scroll-mode="i % 2 === 0 ? 'fade-left' : 'fade-right'"
          data-reveal-item
        >
          <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="step__title">{{ s.title }}</h3>
          <p class="step__text">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process__steps {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  counter-reset: step;
}
.step {
  position: relative;
  z-index: 1;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 22px 22px;
  overflow: hidden;
  transition:
    transform .32s cubic-bezier(.22, 1, .36, 1),
    box-shadow .32s ease,
    border-color .32s ease,
    background .32s ease;
}
.step::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0 0 0 1px rgba(4, 104, 214, .2), 0 0 0 0 rgba(4, 104, 214, .16);
}
.process.is-visible .step::after {
  animation: stepPulse .9s ease-out var(--scroll-delay, 0s) both;
}
.step:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
  border-color: var(--blue-400);
  background: linear-gradient(180deg, #fff 0%, #f7fbff 100%);
}
.step__num {
  display: grid; place-items: center;
  width: 50px; height: 50px;
  border-radius: 14px;
  background: linear-gradient(150deg, var(--blue-500), var(--blue-700));
  color: #fff;
  font-size: 18px; font-weight: 800;
  box-shadow: 0 8px 18px rgba(4, 104, 214, .32);
  margin-bottom: 16px;
  transition: transform .32s cubic-bezier(.22, 1, .36, 1), box-shadow .32s ease;
}
.step:hover .step__num {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 12px 24px rgba(4, 104, 214, .38);
}
.step__title { font-size: 18px; margin-bottom: 8px; }
.step__text { font-size: 15px; color: var(--text); }

@keyframes stepPulse {
  0% { opacity: 0; box-shadow: inset 0 0 0 1px rgba(4, 104, 214, 0), 0 0 0 0 rgba(4, 104, 214, .18); }
  42% { opacity: 1; box-shadow: inset 0 0 0 1px rgba(4, 104, 214, .24), 0 0 0 12px rgba(4, 104, 214, .08); }
  100% { opacity: 0; box-shadow: inset 0 0 0 1px rgba(4, 104, 214, 0), 0 0 0 22px rgba(4, 104, 214, 0); }
}

@media (min-width: 600px) {
  .process__steps { grid-template-columns: 1fr 1fr; gap: 20px; }
}
@media (min-width: 1000px) {
  .process__steps { grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .process__steps::before {
    content: '';
    position: absolute;
    top: 51px;
    left: 11%;
    right: 11%;
    height: 2px;
    background: linear-gradient(90deg, var(--blue-100), var(--blue-400), var(--blue-100));
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform .9s cubic-bezier(.22, 1, .36, 1) .25s;
  }
  .process.is-visible .process__steps::before { transform: scaleX(1); }
}
</style>
