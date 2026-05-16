<script setup lang="ts">
const svg = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const advantages = [
  {
    icon: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r=".6"/>'),
    title: 'Узкая специализация',
    text: 'Занимаюсь только разблокировкой счетов и карт. Глубоко знаю 115-ФЗ, 161-ФЗ и практику банков.',
  },
  {
    icon: svg('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.4 3.7 5.3 3.7 8.5S14.4 18.1 12 20.5C9.6 18.1 8.3 15.2 8.3 12S9.6 5.9 12 3.5z"/>'),
    title: 'Дистанционно по всей России',
    text: 'Решаем вопрос онлайн, без визитов и очередей — нужен только телефон и документы в электронном виде.',
  },
  {
    icon: svg('<path d="M4 9.5L12 4l8 5.5"/><path d="M5 9.8v8.7M19 9.8v8.7M9.3 9.8v8.7M14.7 9.8v8.7M3.3 18.8h17.4"/>'),
    title: 'Работаю со всеми банками',
    text: 'Сбербанк, Т-Банк, Альфа-Банк, ВТБ, Озон Банк и другие — знаю требования каждого банка.',
  },
  {
    icon: svg('<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.3l2.6 2.6 4.8-5.4"/>'),
    title: 'Честная оценка',
    text: 'Сразу скажу, реально ли помочь в вашем случае. Не берусь за дело, если шансов на успех нет.',
  },
  {
    icon: svg('<rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'),
    title: 'Полная конфиденциальность',
    text: 'Ваша ситуация, документы и персональные данные остаются строго между нами.',
  },
  {
    icon: svg('<path d="M6 21V3.5M6 4h11.5l-2.3 3.8L17.5 12H6"/>'),
    title: 'Сопровождение до результата',
    text: 'Не бросаю на полпути: веду дело до полного снятия блокировки и возврата доступа к деньгам.',
  },
]

const facts = [
  { strong: '115-ФЗ и 161-ФЗ', sub: 'профильная специализация' },
  { strong: 'Москва + вся РФ', sub: 'личный приём и работа онлайн' },
  { strong: 'Лично', sub: 'веду каждое дело от и до' },
]
</script>

<template>
  <section id="preimuschestva" class="section section--soft adv">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Почему обращаются ко мне</p>
        <h2 class="section-title">Решаю вопрос с блокировкой под ключ</h2>
        <p class="section-subtitle">
          Вы получаете не общие советы, а конкретный результат — снятую блокировку
          и возвращённый доступ к вашим деньгам.
        </p>
      </div>

      <div class="adv__layout">
        <aside class="expert">
          <div class="expert__head">
            <div class="expert__avatar" aria-hidden="true">РГ</div>
            <div>
              <p class="expert__name">Руслан Ганеев</p>
              <p class="expert__role">Специалист по разблокировке счетов и карт</p>
            </div>
          </div>
          <p class="expert__bio">
            Помогаю людям и бизнесу вернуть доступ к собственным деньгам, когда
            банк заблокировал карту или счёт. Знаю банковские процедуры изнутри
            и выстраиваю общение с банком так, чтобы блокировку сняли быстро.
          </p>
          <ul class="expert__facts">
            <li v-for="f in facts" :key="f.strong">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#16a86b" /><path d="M8 12.4l2.6 2.6L16 9.5" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span><b>{{ f.strong }}</b>{{ f.sub }}</span>
            </li>
          </ul>
          <a href="#kontakty" class="btn btn--primary btn--block">Получить консультацию</a>
        </aside>

        <ul class="adv__list">
          <li v-for="a in advantages" :key="a.title" class="adv__item">
            <span class="adv__ic" v-html="a.icon" />
            <div>
              <h3 class="adv__title">{{ a.title }}</h3>
              <p class="adv__text">{{ a.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.adv__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.expert {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 24px;
  box-shadow: var(--shadow-sm);
}
.expert__head { display: flex; align-items: center; gap: 15px; margin-bottom: 16px; }
.expert__avatar {
  width: 76px; height: 76px; flex: none;
  border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(150deg, var(--blue-500), var(--blue-700));
  color: #fff; font-size: 26px; font-weight: 800; letter-spacing: .02em;
  box-shadow: 0 10px 22px rgba(4, 104, 214, .34);
}
.expert__name { font-size: 21px; font-weight: 800; color: var(--ink); }
.expert__role { font-size: 14px; color: var(--blue-600); font-weight: 600; }
.expert__bio { font-size: 15px; color: var(--text); margin-bottom: 18px; }
.expert__facts { display: grid; gap: 12px; margin-bottom: 22px; }
.expert__facts li { display: flex; align-items: center; gap: 11px; }
.expert__facts svg { width: 22px; height: 22px; flex: none; }
.expert__facts b { display: block; font-size: 15px; color: var(--ink); }
.expert__facts span { font-size: 13px; color: var(--muted); }

.adv__list { display: grid; grid-template-columns: 1fr; gap: 14px; }
.adv__item {
  display: flex;
  gap: 15px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 19px 20px;
  transition: transform .18s ease, box-shadow .18s ease;
}
.adv__item:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }
.adv__ic {
  width: 48px; height: 48px; flex: none;
  display: grid; place-items: center;
  border-radius: 12px;
  background: var(--blue-100);
  color: var(--blue-600);
}
.adv__ic :deep(svg) { width: 25px; height: 25px; }
.adv__title { font-size: 17px; margin-bottom: 5px; }
.adv__text { font-size: 14.5px; color: var(--text); }

@media (min-width: 760px) {
  .adv__list { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1000px) {
  .adv__layout { grid-template-columns: 350px 1fr; gap: 26px; align-items: start; }
}
</style>
