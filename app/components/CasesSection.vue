<script setup lang="ts">
import { cases } from '~/composables/useCases'

const featured = computed(() => cases.filter((c) => c.featured))
const total = cases.length

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, { mode: 'scale-in', stagger: 0.1 })
</script>

<template>
  <section id="keysy" ref="sectionRef" class="section cases scroll-animate scroll-animate--scale-in">
    <div class="container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">Кейсы</p>
        <h2 class="section-title">Документально подтверждённые результаты</h2>
        <p class="section-subtitle">
          Реальные ответы банков и Центрального банка РФ о снятии блокировок.
          Нажмите на изображение, чтобы открыть его на весь экран.
        </p>
      </div>

      <div class="cases__count" data-reveal-item>
        <span class="cases__count-num">{{ total }}</span>
        <span class="cases__count-label">подтверждённых разблокировок<br>карт и счетов — и это не предел</span>
      </div>

      <CasesGrid :items="featured" />

      <div class="cases__more" data-reveal-item>
        <NuxtLink to="/keysy" class="btn btn--primary btn--lg">
          Смотреть все {{ total }} кейсов
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases__count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 0 auto 34px;
  padding: 22px 30px;
  max-width: 560px;
  border-radius: var(--radius);
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(4, 104, 214, .06), transparent 60%),
    #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.cases__count-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -.04em;
  background: linear-gradient(120deg, var(--blue-600), var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.cases__count-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.32;
}

.cases__more {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

@media (min-width: 640px) {
  .cases__count { gap: 22px; padding: 24px 38px; }
  .cases__count-num { font-size: 66px; }
  .cases__count-label { font-size: 16px; }
}
</style>
