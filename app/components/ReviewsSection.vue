<script setup lang="ts">
// Отзывы приведены как образец оформления — замените на реальные.
const reviews = [
  {
    initials: 'А',
    name: 'Александр',
    meta: '115-ФЗ · Сбербанк · Москва',
    text: 'Сбербанк заблокировал карту по 115-ФЗ и запросил пакет документов. Руслан помог всё правильно оформить и составить пояснения — через неделю доступ вернули. Очень выручил.',
  },
  {
    initials: 'М',
    name: 'Марина',
    meta: '161-ФЗ · база ЦБ · Казань',
    text: 'Попала в базу ЦБ, переводы перестали проходить во всех банках. Думала, это навсегда. Руслан подготовил заявление, и через три недели меня из базы исключили.',
  },
  {
    initials: 'Д',
    name: 'Дмитрий, ИП',
    meta: 'Расчётный счёт · Екатеринбург',
    text: 'Заблокировали расчётный счёт — бизнес фактически встал. Обратился к Руслану: помог грамотно ответить на запрос банка, счёт разблокировали за несколько дней.',
  },
  {
    initials: 'О',
    name: 'Ольга',
    meta: 'Блокировка ДБО · Москва',
    text: 'Банк ограничил онлайн-банк, я не могла оплачивать вообще ничего. Руслан спокойно всё объяснил и довёл дело до результата. Рекомендую за честность и поддержку.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, { mode: 'stagger-children', stagger: 0.11 })
</script>

<template>
  <section id="otzyvy" ref="sectionRef" class="section section--soft reviews scroll-animate scroll-animate--stagger-children">
    <div class="container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">Отзывы</p>
        <h2 class="section-title">Что говорят клиенты</h2>
        <p class="section-subtitle">
          Истории людей и предпринимателей, которым удалось вернуть доступ
          к своим картам, счетам и деньгам.
        </p>
      </div>

      <div class="reviews__grid">
        <figure
          v-for="(r, index) in reviews"
          :key="r.name"
          class="review"
          :data-scroll-mode="index % 2 === 0 ? 'fade-left' : 'fade-right'"
          data-reveal-item
        >
          <span class="review__quote" aria-hidden="true">”</span>
          <div class="review__stars" aria-label="Оценка 5 из 5">
            <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.6l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.6l-5.9 3.1 1.13-6.57L2.46 9.5l6.6-.96L12 2.6z" fill="#f0a13a" />
            </svg>
          </div>
          <blockquote class="review__text">{{ r.text }}</blockquote>
          <figcaption class="review__author">
            <span class="review__avatar">{{ r.initials }}</span>
            <span>
              <b class="review__name">{{ r.name }}</b>
              <span class="review__meta">{{ r.meta }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}
.review {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 24px 22px;
  overflow: hidden;
  transition:
    transform .32s cubic-bezier(.22, 1, .36, 1),
    box-shadow .32s ease,
    border-color .32s ease,
    background .32s ease;
}
.review:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
  border-color: var(--blue-400);
  background: linear-gradient(180deg, #fff 0%, #f9fcff 100%);
}
.review__quote {
  position: absolute;
  top: -22px; right: 14px;
  font-size: 110px; line-height: 1;
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--blue-100);
  pointer-events: none;
  transition: transform .32s cubic-bezier(.22, 1, .36, 1), color .32s ease;
}
.review:hover .review__quote { transform: translateY(6px) rotate(2deg); color: #d4e5fb; }
.review__stars { display: flex; gap: 3px; margin-bottom: 13px; }
.review__stars svg { width: 19px; height: 19px; }
.review__text {
  position: relative;
  font-size: 15px;
  color: var(--text);
  margin-bottom: 20px;
}
.review__author { display: flex; align-items: center; gap: 12px; }
.review__avatar {
  width: 46px; height: 46px; flex: none;
  border-radius: 50%;
  display: grid; place-items: center;
  background: var(--blue-100);
  color: var(--blue-700);
  font-weight: 800; font-size: 18px;
  transition: transform .32s cubic-bezier(.22, 1, .36, 1), background .32s ease;
}
.review:hover .review__avatar { transform: scale(1.05); background: #d8e9ff; }
.review__name { display: block; font-size: 15.5px; color: var(--ink); }
.review__meta { font-size: 13px; color: var(--muted); }

@media (min-width: 760px) {
  .reviews__grid { grid-template-columns: 1fr 1fr; gap: 22px; }
}
</style>
