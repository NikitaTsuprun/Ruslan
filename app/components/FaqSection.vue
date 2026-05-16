<script setup lang="ts">
defineProps<{
  items: { q: string; a: string }[]
}>()
</script>

<template>
  <section id="voprosy" class="section faq">
    <div class="container faq__container">
      <div class="section-head">
        <p class="eyebrow">Вопросы и ответы</p>
        <h2 class="section-title">Частые вопросы о разблокировке</h2>
        <p class="section-subtitle">
          Коротко о главном про 115-ФЗ, 161-ФЗ и блокировку счетов.
          Не нашли ответ — задайте вопрос напрямую.
        </p>
      </div>

      <div class="faq__list">
        <details
          v-for="(item, i) in items"
          :key="i"
          class="faq__item"
          name="faq"
          :open="i === 0"
        >
          <summary class="faq__q">
            <span>{{ item.q }}</span>
            <span class="faq__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </summary>
          <div class="faq__a">
            <p>{{ item.a }}</p>
          </div>
        </details>
      </div>

      <p class="faq__more">
        Остались вопросы?
        <a href="#kontakty">Напишите мне — отвечу бесплатно</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.faq__container { max-width: 820px; }
.faq__list { display: grid; gap: 12px; }
.faq__item {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: box-shadow .2s ease, border-color .2s ease;
}
.faq__item[open] { box-shadow: var(--shadow-sm); border-color: var(--blue-400); }
.faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 19px 20px;
  cursor: pointer;
  font-size: 16.5px;
  font-weight: 700;
  color: var(--ink);
  list-style: none;
}
.faq__q::-webkit-details-marker { display: none; }
.faq__q:hover { color: var(--blue-700); }
.faq__icon {
  width: 32px; height: 32px; flex: none;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--blue-100);
  color: var(--blue-600);
  transition: transform .25s ease, background .2s ease;
}
.faq__icon svg { width: 18px; height: 18px; }
.faq__item[open] .faq__icon { transform: rotate(180deg); background: var(--blue-600); color: #fff; }
.faq__a {
  padding: 0 20px 20px;
  animation: faqOpen .26s ease;
}
.faq__a p { font-size: 15px; color: var(--text); }
@keyframes faqOpen {
  from { opacity: 0; transform: translateY(-7px); }
  to { opacity: 1; transform: none; }
}

.faq__more {
  margin-top: 22px;
  text-align: center;
  font-size: 16px;
  color: var(--text);
}
.faq__more a {
  color: var(--blue-600);
  font-weight: 700;
  border-bottom: 2px solid var(--blue-100);
}
.faq__more a:hover { border-color: var(--blue-600); }
</style>
