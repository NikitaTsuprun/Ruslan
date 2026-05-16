<script setup lang="ts">
const problems = [
  'Банк заблокировал карту или счёт и запросил документы по операциям',
  'Заблокирован вход в мобильный и интернет-банк, не проходят переводы',
  'Карта попала в базу данных ЦБ РФ по 161-ФЗ, обслуживание приостановлено',
  'Банк отказал в проведении операции и пометил её как сомнительную',
  'Вам отказали в открытии счёта или карты в другом банке',
  'Пришло уведомление о блокировке по 115-ФЗ и требование пояснений',
  'Заблокирован расчётный счёт ИП или ООО — бизнес не может работать',
  'Подозрение в «дроперстве», реквизиты попали в стоп-лист банка',
]
</script>

<template>
  <section class="section section--soft problems">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Когда нужна помощь</p>
        <h2 class="section-title">Помогу, если вы столкнулись с блокировкой</h2>
        <p class="section-subtitle">
          Узнали свою ситуацию? Не теряйте время — чем раньше начать работу,
          тем выше шанс быстро вернуть доступ к деньгам.
        </p>
      </div>

      <ul class="problems__grid">
        <li v-for="p in problems" :key="p" class="problem">
          <span class="problem__ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" />
              <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
            </svg>
          </span>
          <span class="problem__text">{{ p }}</span>
        </li>
      </ul>

      <div class="problems__cta">
        <p>Не нашли свой случай? Опишите ситуацию — честно скажу, реально ли помочь.</p>
        <a href="#kontakty" class="btn btn--primary btn--lg">Описать мою ситуацию</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problems__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
.problem {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px 18px;
  transition: transform .18s ease, box-shadow .18s ease;
}
.problem:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }
.problem__ic {
  width: 44px; height: 44px; flex: none;
  display: grid; place-items: center;
  border-radius: 11px;
  background: #fdeed7;
  color: #d98a23;
}
.problem__ic svg { width: 23px; height: 23px; }
.problem__text { font-size: 15px; font-weight: 600; color: var(--ink); }

.problems__cta {
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.problems__cta p {
  font-size: 16px;
  color: var(--text);
  max-width: 520px;
}

@media (min-width: 680px) {
  .problems__grid { grid-template-columns: 1fr 1fr; gap: 16px; }
}
@media (min-width: 1000px) {
  .problems__grid { grid-template-columns: 1fr 1fr; }
}
</style>
