// https://nuxt.com/docs/api/configuration/nuxt-config

// Базовый путь сайта. На GitHub Pages проект открывается по под-пути (/Ruslan/),
// он задаётся переменной NUXT_APP_BASE_URL в GitHub Actions; локально — корень.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-05-16',

  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  css: ['~/assets/css/main.css'],

  // Общие SEO-настройки сайта. URL замените на ваш реальный домен,
  // когда он появится — он используется в canonical, sitemap.xml и robots.txt.
  site: {
    url: 'https://example.com',
    name: 'Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ — Руслан Ганеев',
    description:
      'Профессиональная помощь в разблокировке банковских карт и счетов по 115-ФЗ и 161-ФЗ. Снятие блокировки, вывод из базы ЦБ РФ, восстановление ДБО. Москва и вся Россия — дистанционно.',
    defaultLocale: 'ru',
    indexable: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0468d6' },
        { name: 'format-detection', content: 'telephone=yes' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
        { rel: 'apple-touch-icon', href: `${baseURL}favicon.svg` },
      ],
    },
  },

  // Почтовые настройки читаются из .env (серверная часть, в браузер не попадают).
  runtimeConfig: {
    mailHost: process.env.MAIL_HOST || 'smtp.gmail.com',
    mailPort: process.env.MAIL_PORT || '587',
    mailUser: process.env.MAIL_USERNAME || '',
    mailPass: process.env.MAIL_PASSWORD || '',
    mailFrom: process.env.MAIL_FROM_ADDRESS || '',
    mailFromName: process.env.MAIL_FROM_NAME || 'Сайт-визитка',
    mailTo: process.env.MAIL_TO || '',
  },

  routeRules: {
    '/': { prerender: true },
  },

  sitemap: {
    urls: ['/'],
  },

  nitro: {
    compressPublicAssets: true,
  },
})
