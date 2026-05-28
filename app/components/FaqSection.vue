<script setup lang="ts">
defineProps<{
  items: { q: string; a: string }[]
}>()

const openIndex = ref(0)
const sectionRef = ref<HTMLElement | null>(null)

useScrollAnimation(sectionRef, { mode: 'fade-up', stagger: 0.08 })

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? -1 : index
}

function enter(el: Element) {
  const node = el as HTMLElement
  node.style.height = '0'
  node.style.opacity = '0'

  requestAnimationFrame(() => {
    node.style.height = `${node.scrollHeight}px`
    node.style.opacity = '1'
  })
}

function afterEnter(el: Element) {
  const node = el as HTMLElement
  node.style.height = 'auto'
}

function leave(el: Element) {
  const node = el as HTMLElement
  node.style.height = `${node.scrollHeight}px`
  node.style.opacity = '1'

  requestAnimationFrame(() => {
    node.style.height = '0'
    node.style.opacity = '0'
  })
}
</script>

<template>
  <section id="voprosy" ref="sectionRef" class="section faq scroll-animate scroll-animate--fade-up">
    <div class="container faq__container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">Вопросы и ответы</p>
        <h2 class="section-title">Частые вопросы о разблокировке</h2>
        <p class="section-subtitle">
          Коротко о главном про 115-ФЗ, 161-ФЗ и блокировку счетов.
          Не нашли ответ — задайте вопрос напрямую.
        </p>
      </div>

      <div class="faq__list">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="faq__item"
          :class="{ 'faq__item--open': openIndex === i }"
          data-reveal-item
        >
          <button
            class="faq__q"
            type="button"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-answer-${i}`"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <span class="faq__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </button>
          <Transition name="faq-a" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div v-if="openIndex === i" :id="`faq-answer-${i}`" class="faq__a">
              <p>{{ item.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <p class="faq__more" data-reveal-item>
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
  transition:
    box-shadow .28s ease,
    border-color .28s ease,
    transform .28s cubic-bezier(.22, 1, .36, 1);
}
.faq__item--open { box-shadow: var(--shadow-sm); border-color: var(--blue-400); }
.faq__item:hover { transform: translateY(-2px); }
.faq__q {
  width: 100%;
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
  text-align: left;
}
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
.faq__item--open .faq__icon { transform: rotate(180deg); background: var(--blue-600); color: #fff; }
.faq__a {
  overflow: hidden;
  padding: 0 20px 20px;
  transition: height .32s cubic-bezier(.22, 1, .36, 1), opacity .26s ease;
}
.faq__a p { font-size: 15px; color: var(--text); }
.faq-a-enter-from,
.faq-a-leave-to { opacity: 0; }

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
