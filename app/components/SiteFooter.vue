<script setup lang="ts">
const { contacts } = useAppConfig()
const year = new Date().getFullYear()

const navLinks = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#etapy', label: 'Этапы работы' },
  { href: '#preimuschestva', label: 'Почему я' },
  { href: '#keysy', label: 'Кейсы и результаты' },
  { href: '#otzyvy', label: 'Отзывы' },
  { href: '#voprosy', label: 'Вопросы и ответы' },
  { href: '#kontakty', label: 'Контакты' },
]

const contactLinks = [
  { label: contacts.phone, href: `tel:${contacts.phoneHref}`, ext: false },
  { label: 'Telegram', href: contacts.telegram, ext: true },
  { label: 'MAX', href: contacts.max, ext: true },
  { label: 'WhatsApp', href: contacts.whatsapp, ext: true },
  { label: 'ВКонтакте', href: contacts.vk, ext: true },
  { label: contacts.email, href: `mailto:${contacts.email}`, ext: false },
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
        <p class="ftr__copy">© {{ year }} Руслан Ганеев. Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ.</p>
        <p class="ftr__legal">
          Информация на сайте носит справочный характер и не является публичной офертой.
          Услуги оказываются на основании договора. Отправляя формы на сайте,
          вы соглашаетесь с обработкой персональных данных.
        </p>
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ftr__copy { font-size: 14px; color: #97a6bd; font-weight: 600; }
.ftr__legal { font-size: 12.5px; color: #6f8099; line-height: 1.6; max-width: 760px; }

@media (min-width: 760px) {
  .ftr__top { grid-template-columns: 1.7fr 1fr 1fr; gap: 40px; }
}
</style>
