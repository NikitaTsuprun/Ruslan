// Эти значения используются в шапке, блоке контактов, подвале и SEO-разметке.
export default defineAppConfig({
  contacts: {
    phone: '+7 (912) 450-45-68',
    phoneHref: '+79124504568',
    vk: 'https://vk.ru/yuristpro1',
    avito: 'https://www.avito.ru/moskva/predlozheniya_uslug/razblokirovka_kartschetov_po_115-fz161-fzdbo_4362010090?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller',
    tiktok: 'https://www.tiktok.com/@ruslan_ganeev1?_r=1&_t=ZG-96qnvkNL4YC',
    instagram: 'https://www.instagram.com/ruslanganeev_yuristpro?igsh=MTk4a2VrNGxxdzNiaQ%3D%3D&utm_source=qr',
    max: 'https://max.ru/join/L2q3rjaimnYvnu5k4VcNtkAvWLNMVOPKFnJ0jfFWFaE',
    telegram: 'https://t.me/ganeev_ruslan1',
    telegramChannel: 'https://t.me/ruslanganeev_yuristpro',
    whatsapp: '',
    email: '',
    // Город / график (для блока контактов и SEO-разметки).
    city: 'Москва',
    schedule: 'Ежедневно, 09:00–21:00',
  },

  // ===== Аналитика и подтверждение прав на сайт =====
  // Заполните после регистрации сайта в соответствующих сервисах.
  // Пустые значения = ничего не подключается (безопасно).
  seo: {
    yandexMetrika: '110042390', // номер счётчика Яндекс.Метрики (только цифры, напр. 99999999)
    googleAnalytics: 'G-GWXQW9E6F6', // Measurement ID Google Analytics (вид G-XXXXXXXXXX)
    yandexVerification: '07d7828b142d5842', // код подтверждения из Яндекс.Вебмастера (meta yandex-verification)
    googleVerification: '', // код подтверждения из Google Search Console (meta google-site-verification)
  },
})
