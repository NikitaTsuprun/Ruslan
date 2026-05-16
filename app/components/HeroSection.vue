<script setup lang="ts">
const { contacts } = useAppConfig()

const trust = [
  'Бесплатная первичная консультация',
  'Честная оценка перспектив дела',
  'Полная конфиденциальность',
  'Работаю со всеми банками РФ',
]

// ВАЖНО: цифры опыта/количества — ориентировочные, замените на свои реальные.
const stats = [
  { value: '7+ лет', label: 'помогаю с разблокировкой' },
  { value: '1500+', label: 'разблокированных карт и счетов' },
  { value: 'Вся РФ', label: 'работаю дистанционно' },
  { value: 'от 1 дня', label: 'срок снятия блокировки' },
]
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="blob blob--1" />
      <span class="blob blob--2" />
    </div>

    <div class="container hero__grid">
      <div class="hero__content">
        <p class="eyebrow">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
          Юридическая помощь · 115-ФЗ и 161-ФЗ
        </p>

        <h1 class="hero__title">
          Разблокировка карт и счетов
          <span class="hl">по 115-ФЗ и 161-ФЗ</span>
        </h1>

        <p class="hero__lead">
          Помогу снять блокировку банковской карты, счёта и дистанционного
          обслуживания, выведу из базы ЦБ РФ. Работаю с физлицами и бизнесом —
          в Москве и по всей России <strong>дистанционно</strong>.
        </p>

        <div class="hero__actions">
          <a href="#kontakty" class="btn btn--primary btn--lg">
            Получить консультацию
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
          <a :href="`tel:${contacts.phoneHref}`" class="btn btn--outline btn--lg">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6.6 3.5c.5 0 .9.3 1 .8l.9 3.2c.1.4 0 .9-.3 1.2L7 10.3a14 14 0 0 0 6.7 6.7l1.6-2.2c.3-.3.8-.4 1.2-.3l3.2.9c.5.1.8.5.8 1V20a1.5 1.5 0 0 1-1.6 1.5C10.8 21 3 13.2 2.5 4.6A1.5 1.5 0 0 1 4 3h2.6Z" fill="currentColor" /></svg>
            Позвонить
          </a>
        </div>

        <ul class="hero__trust">
          <li v-for="item in trust" :key="item">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#16a86b" /><path d="M8 12.4l2.6 2.6L16 9.5" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="card3d">
          <div class="bank-card">
            <div class="bank-card__top">
              <span class="bank-card__bank">BANK</span>
              <span class="bank-card__chip" />
            </div>
            <div class="bank-card__num">
              <span>5413</span><span>••••</span><span>••••</span><span>4417</span>
            </div>
            <div class="bank-card__bottom">
              <span class="bank-card__holder">RUSLAN GANEEV</span>
              <span class="bank-card__exp">12 / 29</span>
            </div>
          </div>

          <div class="badge-ok">
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>

          <div class="chip chip--1">
            <span class="chip__ic chip__ic--green">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <span>
              <b>Карта разблокирована</b>
              Доступ к деньгам восстановлен
            </span>
          </div>

          <div class="chip chip--2">
            <span class="chip__ic chip__ic--blue">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3v5c0 5-3.3 9-8 11-4.7-2-8-6-8-11V6l8-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 11.5l2 2 4-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <span>
              <b>Исключение из базы ЦБ</b>
              Сопровождение по 161-ФЗ
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <ul class="hero__stats">
        <li v-for="s in stats" :key="s.label">
          <span class="hero__stat-value">{{ s.value }}</span>
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
.hero__bg { position: absolute; inset: 0; pointer-events: none; }
.blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .55; }
.blob--1 { width: 420px; height: 420px; background: #cfe1fb; top: -140px; right: -90px; }
.blob--2 { width: 360px; height: 360px; background: #d9f0fb; bottom: -120px; left: -120px; }

.hero__grid { position: relative; display: grid; gap: 38px; }

.hero__title {
  font-size: 33px;
  margin: 6px 0 16px;
  letter-spacing: -.025em;
}
.hero__title .hl {
  display: block;
  background: linear-gradient(100deg, var(--blue-600), var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__lead { font-size: 17px; max-width: 540px; margin-bottom: 26px; }
.hero__lead strong { color: var(--ink); }

.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 26px; }

.hero__trust { display: grid; gap: 10px; }
.hero__trust li {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 600; color: var(--ink);
}
.hero__trust svg { width: 21px; height: 21px; flex: none; }

/* Визуал с картой */
.hero__visual { display: flex; justify-content: center; align-items: center; }
.card3d { position: relative; width: min(360px, 88vw); height: 320px; }

.bank-card {
  position: absolute;
  top: 46px; left: 50%;
  width: 300px; height: 188px;
  transform: translateX(-50%) rotate(-8deg);
  background: linear-gradient(135deg, #0a5fc4 0%, #0468d6 45%, #1f86f0 100%);
  border-radius: 18px;
  box-shadow: 0 30px 55px rgba(6, 40, 90, .35);
  padding: 22px;
  color: #fff;
  display: flex; flex-direction: column; justify-content: space-between;
}
.bank-card::after {
  content: ''; position: absolute; inset: 0; border-radius: 18px;
  background: radial-gradient(120px 80px at 80% 12%, rgba(255, 255, 255, .35), transparent 70%);
}
.bank-card__top { display: flex; justify-content: space-between; align-items: center; }
.bank-card__bank { font-weight: 800; letter-spacing: .18em; font-size: 14px; }
.bank-card__chip {
  width: 42px; height: 32px; border-radius: 6px;
  background: linear-gradient(135deg, #ffe39a, #f0b647);
}
.bank-card__num { display: flex; gap: 11px; font-size: 17px; font-weight: 600; letter-spacing: .04em; }
.bank-card__bottom { display: flex; justify-content: space-between; align-items: flex-end; }
.bank-card__holder { font-size: 13px; letter-spacing: .07em; font-weight: 600; }
.bank-card__exp { font-size: 13px; opacity: .85; }

.badge-ok {
  position: absolute;
  top: 30px; left: calc(50% + 96px);
  width: 56px; height: 56px;
  background: var(--green);
  border-radius: 50%;
  display: grid; place-items: center;
  box-shadow: 0 12px 26px rgba(22, 168, 107, .5);
  border: 4px solid #fff;
}
.badge-ok svg { width: 28px; height: 28px; }

.chip {
  position: absolute;
  display: flex; align-items: center; gap: 11px;
  background: #fff;
  border-radius: 14px;
  padding: 12px 15px;
  box-shadow: 0 18px 36px rgba(11, 28, 58, .16);
  width: 234px;
}
.chip__ic {
  width: 38px; height: 38px; flex: none;
  border-radius: 10px;
  display: grid; place-items: center;
}
.chip__ic svg { width: 21px; height: 21px; }
.chip__ic--green { background: #e3f6ed; color: var(--green); }
.chip__ic--blue { background: var(--blue-100); color: var(--blue-600); }
.chip b { display: block; font-size: 13.5px; color: var(--ink); }
.chip span span, .chip > span { font-size: 12px; color: var(--muted); line-height: 1.35; }
.chip > span b { margin-bottom: 1px; }
.chip--1 { top: 0; right: -6px; animation: float 5s ease-in-out infinite; }
.chip--2 { bottom: 4px; left: -10px; animation: float 5.6s ease-in-out infinite .8s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
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
@media (min-width: 960px) {
  .hero { padding: 64px 0 72px; }
  .hero__grid { grid-template-columns: 1.05fr .95fr; align-items: center; gap: 48px; }
  .hero__title { font-size: 52px; }
  .hero__title .hl { display: inline; }
  .hero__lead { font-size: 18.5px; }
  .hero__trust { grid-template-columns: 1fr 1fr; }
  .card3d { width: 420px; height: 380px; }
  .hero__stats { grid-template-columns: repeat(4, 1fr); margin-top: 8px; }
  .hero__stat-value { font-size: 30px; }
}
</style>
