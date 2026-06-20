<script setup lang="ts">
const svg = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const services = [
  {
    icon: svg('<rect x="2.5" y="5.5" width="19" height="13" rx="2.4"/><path d="M2.5 10h19"/><path d="M6 14.5h5"/>'),
    title: 'Разблокировка по 115-ФЗ',
    text: 'Снимаю блокировку карты и счёта, наложенную за «сомнительные операции». Готовлю документы и пояснения, чтобы банк снял ограничения и возобновил обслуживание.',
  },
  {
    icon: svg('<path d="M12 3l7.5 2.8v5.4c0 4.7-3.2 8.5-7.5 9.8C7.7 19.7 4.5 15.9 4.5 11.2V5.8L12 3z"/><path d="M8.8 11.8l2.3 2.3 4.3-4.6"/>'),
    title: 'Снятие блокировки по 161-ФЗ',
    text: 'Помогаю выйти из базы данных ЦБ РФ о переводах без согласия клиента и вернуть дистанционное обслуживание карты во всех банках.',
  },
  {
    icon: svg('<rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.3 18.5h3.4"/>'),
    title: 'Разблокировка ДБО и онлайн-банка',
    text: 'Восстанавливаю доступ к мобильному и интернет-банку, снимаю ограничения на переводы, оплату и снятие наличных.',
  },
  {
    icon: svg('<rect x="3" y="7.5" width="18" height="12.5" rx="2.4"/><path d="M8.5 7.5V6A2.5 2.5 0 0 1 11 3.5h2A2.5 2.5 0 0 1 15.5 6v1.5"/><path d="M3 12.5h18"/>'),
    title: 'Счета ИП и юридических лиц',
    text: 'Разблокирую расчётные счета бизнеса, готовлю ответы на запросы банка по 115-ФЗ, сопровождаю проверки и снимаю ограничения по ДБО.',
  },
  {
    icon: svg('<path d="M4 5.5h16A1.5 1.5 0 0 1 21.5 7v8a1.5 1.5 0 0 1-1.5 1.5H9.5L5 20v-3.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5z"/><path d="M7.5 9.5h9M7.5 12.7h6"/>'),
    title: 'Консультация и сопровождение',
    text: 'Разбираю вашу ситуацию, составляю пошаговый план, помогаю с перепиской с банком и жалобами в ЦБ РФ и межведомственную комиссию.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, { mode: 'fade-up', stagger: 0.1 })
</script>

<template>
  <section id="uslugi" ref="sectionRef" class="section services scroll-animate scroll-animate--fade-up">
    <div class="container">
      <div class="section-head" data-reveal-item>
        <p class="eyebrow">Услуги</p>
        <h2 class="section-title">Чем я помогаю</h2>
        <p class="section-subtitle">
          Полное сопровождение по разблокировке карт, счетов и дистанционного
          обслуживания — от анализа ситуации до снятия всех ограничений банка.
        </p>
      </div>

      <div class="services__grid">
        <article v-for="s in services" :key="s.title" class="svc service-card" data-reveal-item>
          <span class="svc__icon" v-html="s.icon" />
          <h3 class="svc__title">{{ s.title }}</h3>
          <p class="svc__text">{{ s.text }}</p>
          <a href="#kontakty" class="svc__link">
            Получить помощь
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
}
.svc {
  flex: 1 1 100%;
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 24px 24px;
  transition:
    transform .32s cubic-bezier(.22, 1, .36, 1),
    box-shadow .32s ease,
    border-color .32s ease,
    background .32s ease;
}
.svc:hover {
  transform: translateY(-7px);
  box-shadow: 0 22px 46px rgba(11, 28, 58, .12);
  border-color: var(--blue-400);
  background: linear-gradient(180deg, #fff 0%, #f8fbff 100%);
}
.svc__icon {
  display: grid; place-items: center;
  width: 56px; height: 56px;
  border-radius: 14px;
  background: var(--blue-100);
  color: var(--blue-600);
  margin-bottom: 16px;
  transition:
    background .32s ease,
    color .32s ease,
    transform .32s cubic-bezier(.22, 1, .36, 1);
}
.svc__icon :deep(svg) { width: 28px; height: 28px; }
.svc:hover .svc__icon { background: var(--blue-600); color: #fff; transform: translateY(-2px) scale(1.05); }
.svc__title { font-size: 19px; margin-bottom: 9px; }
.svc__text { font-size: 15px; color: var(--text); margin-bottom: 16px; }
.svc__link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14.5px; font-weight: 700; color: var(--blue-600);
}
.svc__link svg { width: 17px; height: 17px; transition: transform .2s ease; }
.svc:hover .svc__link svg { transform: translateX(4px); }

@media (min-width: 600px) {
  .services__grid { gap: 20px; }
  .svc { flex: 0 1 calc(50% - 10px); }
}
@media (min-width: 960px) {
  .services__grid { gap: 24px; }
  .svc { flex: 0 1 calc(33.333% - 16px); }
}
</style>
