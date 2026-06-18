<script setup lang="ts">
const svg = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const guarantees = [
  {
    title: 'Бесплатная консультация',
    text: 'Разбираю вашу ситуацию и честно говорю, реально ли помочь — бесплатно и без обязательств.',
    icon: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  },
  {
    title: 'Работа по договору',
    text: 'Все услуги оказываются официально, на основании договора — с понятными условиями.',
    icon: svg('<path d="M14 3v5h5"/><path d="M7 3h8l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M9 13h6M9 17h4"/>'),
  },
  {
    title: 'Без скрытых платежей',
    text: 'Стоимость согласовываем заранее. Никаких доплат «по ходу дела» и сюрпризов в счёте.',
    icon: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.2c0-1.2 1.1-1.9 2.5-1.9s2.5.7 2.5 1.8c0 2.5-5 1.3-5 3.8 0 1.2 1.1 1.9 2.5 1.9s2.5-.7 2.5-1.8"/>'),
  },
  {
    title: 'Честная оценка перспектив',
    text: 'Если шансов нет — скажу прямо и не возьму деньги за бесперспективное дело.',
    icon: svg('<path d="M3.5 7.5 12 3l8.5 4.5M5 10v7M19 10v7M3.5 17.5h17M9 10v5M15 10v5"/>'),
  },
  {
    title: 'Полная конфиденциальность',
    text: 'Ваши документы и данные не передаются третьим лицам — на любом этапе работы.',
    icon: svg('<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/>'),
  },
  {
    title: 'Сопровождение до результата',
    text: 'Веду дело до снятия блокировки и возврата полного доступа к карте, счёту и деньгам.',
    icon: svg('<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4 12 14.1l-3-3"/>'),
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, { mode: 'fade-up', stagger: 0.09 })
</script>

<template>
  <section id="stoimost" ref="sectionRef" class="section pricing scroll-animate scroll-animate--fade-up">
    <div class="container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
          Стоимость и гарантии
        </p>
        <h2 class="section-title">Прозрачные условия без скрытых платежей</h2>
        <p class="section-subtitle">
          Точную стоимость называю после бесплатной оценки — она зависит от банка,
          основания блокировки и объёма работы. Никаких платежей «вслепую».
        </p>
      </div>

      <div class="pricing__grid">
        <article
          v-for="g in guarantees"
          :key="g.title"
          class="guarantee"
          data-reveal-item
        >
          <span class="guarantee__ic" v-html="g.icon" />
          <h3 class="guarantee__title">{{ g.title }}</h3>
          <p class="guarantee__text">{{ g.text }}</p>
        </article>
      </div>

      <div class="pricing__cta" data-reveal-item>
        <div class="pricing__cta-text">
          <strong>Не знаете, сколько будет стоить ваше дело?</strong>
          <span>Оставьте заявку — оценю ситуацию и назову реальную цену и сроки. Бесплатно.</span>
        </div>
        <a href="#kontakty" class="btn btn--primary btn--lg">
          Получить бесплатную оценку
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 30px;
}
.guarantee {
  padding: 24px 22px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition:
    transform .3s cubic-bezier(.22, 1, .36, 1),
    box-shadow .3s ease,
    border-color .3s ease;
}
.guarantee:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 44px rgba(11, 28, 58, .1);
  border-color: var(--blue-400);
}
.guarantee__ic {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  margin-bottom: 15px;
  color: var(--blue-600);
  background: var(--blue-100);
}
.guarantee__ic :deep(svg) { width: 26px; height: 26px; }
.guarantee__title { font-size: 18px; margin-bottom: 7px; }
.guarantee__text { font-size: 14.5px; color: var(--text); line-height: 1.55; }

.pricing__cta {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
  padding: 28px 26px;
  border-radius: var(--radius);
  color: #fff;
  background:
    radial-gradient(120% 160% at 0% 0%, rgba(255, 255, 255, .14), transparent 55%),
    linear-gradient(135deg, var(--blue-700), var(--blue-600) 55%, var(--cyan));
  box-shadow: var(--shadow-lg);
}
.pricing__cta-text strong { display: block; font-size: 20px; color: #fff; letter-spacing: -.01em; }
.pricing__cta-text span { display: block; margin-top: 6px; font-size: 15px; color: rgba(255, 255, 255, .9); }
.pricing__cta .btn--primary {
  background: #fff;
  color: var(--blue-700);
  box-shadow: 0 12px 26px rgba(0, 0, 0, .18);
  flex: none;
}
.pricing__cta .btn--primary:hover { background: #fff; color: var(--blue-700); transform: translateY(-2px); }

@media (min-width: 640px) {
  .pricing__grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
}
@media (min-width: 980px) {
  .pricing__grid { grid-template-columns: repeat(3, 1fr); }
  .pricing__cta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px 36px;
  }
}
</style>
