<script setup lang="ts">
const { contacts } = useAppConfig()
const year = new Date().getFullYear()

const svg = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const navLinks = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#etapy', label: 'Этапы работы' },
  { href: '#preimuschestva', label: 'Почему я' },
  { href: '#keysy', label: 'Кейсы и результаты' },
  { href: '#otzyvy', label: 'Отзывы' },
  { href: '#voprosy', label: 'Вопросы и ответы' },
  { href: '#kontakty', label: 'Контакты' },
]

const socialLinks = [
  {
    label: 'ВК',
    title: 'ВКонтакте',
    href: contacts.vk,
    color: '#0077ff',
    icon: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M7 9.2c.3 3.2 2.3 5.6 5 5.8M12 15v-3.4c1.6 0 3 1.4 3.4 3.4M12 11.6c1.6 0 2.9-1.2 3.2-2.8"/>'),
  },
  {
    label: 'Авито',
    title: 'Авито',
    href: contacts.avito,
    color: '#04b45f',
    icon: svg('<circle cx="8" cy="8" r="3.1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="8.5" r="2.4" fill="currentColor" opacity=".74" stroke="none"/><circle cx="9.2" cy="16" r="2.5" fill="currentColor" opacity=".9" stroke="none"/><circle cx="16.2" cy="16.2" r="3.4" fill="currentColor" opacity=".46" stroke="none"/>'),
  },
  {
    label: 'TikTok',
    title: 'TikTok',
    href: contacts.tiktok,
    color: '#111827',
    icon: svg('<path d="M14.2 3.6v10.2a4.2 4.2 0 1 1-4.2-4.2"/><path d="M14.2 6.4c1.2 2.1 2.8 3.2 5 3.3"/><path d="M10 13.5a1.8 1.8 0 1 0 1.8 1.8"/>'),
  },
  {
    label: 'Instagram',
    title: 'Instagram',
    href: contacts.instagram,
    color: '#d62976',
    icon: svg('<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.8" cy="7.2" r=".8" fill="currentColor" stroke="none"/>'),
  },
  {
    label: 'MAX',
    title: 'MAX',
    href: contacts.max,
    color: '#574ef0',
    icon: svg('<path d="M4 5.5h16A1.5 1.5 0 0 1 21.5 7v8a1.5 1.5 0 0 1-1.5 1.5H9.5L5 20.5v-4H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5z"/><circle cx="8.5" cy="11" r="1.05" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r="1.05" fill="currentColor" stroke="none"/><circle cx="15.5" cy="11" r="1.05" fill="currentColor" stroke="none"/>'),
  },
].filter((link) => link.href)

const contactLinks = [
  { label: contacts.phone, href: `tel:${contacts.phoneHref}`, ext: false },
  ...socialLinks.map((link) => ({ label: link.title, href: link.href, ext: true })),
]
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="ftr__top">
        <div class="ftr__brand">
          <div class="ftr__logo">
            <span class="ftr__mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="3" y="8" width="26" height="17" rx="3.4" fill="#fff" opacity=".95" />
                <rect x="3" y="11.4" width="26" height="3.4" fill="#0468d6" />
                <path d="M16 16.2l4.6 1.9v3c0 2.9-1.9 5.2-4.6 6-2.7-.8-4.6-3.1-4.6-6v-3L16 16.2z" fill="#16a86b" />
                <path d="M14.2 19.7l1.3 1.3 2.5-2.6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="ftr__name">Руслан Ганеев</span>
          </div>
          <p class="ftr__desc">
            Помощь в разблокировке банковских карт и счетов по 115-ФЗ и 161-ФЗ.
            Снятие блокировки, вывод из базы ЦБ РФ, восстановление доступа к деньгам.
            Москва и вся Россия — дистанционно.
          </p>
          <a href="#kontakty" class="btn btn--white">Получить консультацию</a>
        </div>

        <nav class="ftr__col" aria-label="Разделы сайта">
          <h4 class="ftr__col-title">Разделы</h4>
          <a v-for="l in navLinks" :key="l.href" :href="l.href" class="ftr__link">{{ l.label }}</a>
        </nav>

        <div class="ftr__col">
          <h4 class="ftr__col-title">Связаться</h4>
          <a
            v-for="c in contactLinks"
            :key="c.label"
            :href="c.href"
            :target="c.ext ? '_blank' : null"
            :rel="c.ext ? 'noopener' : null"
            class="ftr__link"
          >{{ c.label }}</a>
        </div>
      </div>

      <div class="ftr__bottom">
        <div>
          <p class="ftr__copy">© {{ year }} Руслан Ганеев. Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ.</p>
          <p class="ftr__legal">
            Информация на сайте носит справочный характер и не является публичной офертой.
            Услуги оказываются на основании договора. Отправляя формы на сайте,
            вы соглашаетесь с обработкой персональных данных.
          </p>
        </div>

        <div class="ftr__socials" aria-label="Социальные сети">
          <a
            v-for="social in socialLinks"
            :key="social.title"
            :href="social.href"
            class="ftr__social"
            :style="{ '--c': social.color }"
            target="_blank"
            rel="noopener"
            :aria-label="social.title"
          >
            <span v-html="social.icon" />
            <b>{{ social.label }}</b>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink);
  color: #c4cfe0;
  padding: 52px 0 30px;
}
.ftr__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 34px;
  padding-bottom: 34px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}
.ftr__logo { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
.ftr__mark {
  width: 42px; height: 42px; flex: none;
  display: grid; place-items: center;
  background: linear-gradient(150deg, var(--blue-500), var(--blue-700));
  border-radius: 11px;
}
.ftr__mark svg { width: 26px; height: 26px; }
.ftr__name { font-size: 18px; font-weight: 800; color: #fff; }
.ftr__desc { font-size: 14.5px; line-height: 1.6; margin-bottom: 20px; max-width: 420px; }

.ftr__col { display: flex; flex-direction: column; }
.ftr__col-title {
  font-size: 13px; text-transform: uppercase; letter-spacing: .06em;
  color: #8294ad; margin-bottom: 15px; font-weight: 700;
}
.ftr__link {
  font-size: 15px;
  color: #c4cfe0;
  padding: 6px 0;
  transition: color .15s ease, transform .15s ease;
  width: fit-content;
}
.ftr__link:hover { color: #fff; transform: translateX(3px); }

.ftr__bottom {
  padding-top: 26px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  align-items: start;
}
.ftr__copy { font-size: 14px; color: #97a6bd; font-weight: 600; }
.ftr__legal { font-size: 12.5px; color: #6f8099; line-height: 1.6; max-width: 760px; }
.ftr__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.ftr__social {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 39px;
  padding: 9px 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: rgba(255, 255, 255, .045);
  color: #dce8f8;
  transition:
    transform .24s cubic-bezier(.22, 1, .36, 1),
    border-color .24s ease,
    background .24s ease,
    color .24s ease;
}
.ftr__social span {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  color: var(--c);
}
.ftr__social span :deep(svg) { width: 20px; height: 20px; }
.ftr__social b {
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0;
}
.ftr__social:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--c) 54%, rgba(255, 255, 255, .16));
  background: color-mix(in srgb, var(--c) 12%, rgba(255, 255, 255, .05));
  color: #fff;
}

@media (min-width: 760px) {
  .ftr__top { grid-template-columns: 1.7fr 1fr 1fr; gap: 40px; }
  .ftr__bottom { grid-template-columns: 1fr auto; }
  .ftr__socials { justify-content: flex-end; max-width: 420px; }
}
</style>
