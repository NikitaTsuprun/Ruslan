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
</script>

<template>
  <section id="etapy" class="section process">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Как проходит работа</p>
        <h2 class="section-title">Четыре шага до разблокировки</h2>
        <p class="section-subtitle">
          Понятный процесс без сложных терминов — вы всегда знаете,
          на каком этапе находится ваше дело.
        </p>
      </div>

      <ol class="process__steps">
        <li v-for="(s, i) in steps" :key="s.title" class="step">
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  counter-reset: step;
}
.step {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 22px 22px;
  transition: transform .2s ease, box-shadow .2s ease;
}
.step:hover { transform: translateY(-5px); box-shadow: var(--shadow); }
.step__num {
  display: grid; place-items: center;
  width: 50px; height: 50px;
  border-radius: 14px;
  background: linear-gradient(150deg, var(--blue-500), var(--blue-700));
  color: #fff;
  font-size: 18px; font-weight: 800;
  box-shadow: 0 8px 18px rgba(4, 104, 214, .32);
  margin-bottom: 16px;
}
.step__title { font-size: 18px; margin-bottom: 8px; }
.step__text { font-size: 15px; color: var(--text); }

@media (min-width: 600px) {
  .process__steps { grid-template-columns: 1fr 1fr; gap: 20px; }
}
@media (min-width: 1000px) {
  .process__steps { grid-template-columns: repeat(4, 1fr); gap: 22px; }
}
</style>
