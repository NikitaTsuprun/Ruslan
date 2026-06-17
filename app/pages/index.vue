<script setup lang="ts">
const { contacts } = useAppConfig()

// При появлении реального домена замените значение на ваш адрес
// (и продублируйте его в nuxt.config.ts → site.url).
const siteUrl = 'https://example.com'

const title = 'Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ | Руслан Ганеев'
const description =
  'Помогу разблокировать банковскую карту и счёт по 115-ФЗ и 161-ФЗ: снятие блокировки, вывод из базы ЦБ РФ, восстановление ДБО. Москва и вся Россия — дистанционно. Бесплатная первичная консультация.'

// Вопросы и ответы: используются и в блоке FAQ, и в schema.org (rich-сниппеты)
const faqItems = [
  {
    q: 'Можно ли разблокировать карту, заблокированную по 115-ФЗ?',
    a: 'Да. Блокировка по 115-ФЗ — это не приговор. В большинстве случаев карту и счёт удаётся разблокировать, если грамотно подготовить документы и пояснения по операциям для банка. Я анализирую вашу ситуацию, помогаю собрать подтверждающие документы и составить ответ на запрос банка так, чтобы снять подозрения в «сомнительных операциях».',
  },
  {
    q: 'Что такое блокировка по 161-ФЗ и база данных ЦБ РФ?',
    a: 'С 2024 года банки обязаны сверять переводы с базой данных Банка России о случаях и попытках переводов денежных средств без согласия клиента. Если ваши реквизиты попали в эту базу, банк приостанавливает дистанционное обслуживание, а другие банки видят эту отметку. В базу можно попасть даже без вины — например, получив перевод от мошенника. Я помогаю выйти из базы ЦБ и вернуть нормальную работу карты.',
  },
  {
    q: 'Как выйти из базы данных ЦБ РФ по 161-ФЗ?',
    a: 'Нужно подать в банк заявление об исключении сведений из базы ФинЦЕРТ, приложить пояснения и документы, подтверждающие законность операций. Банк рассматривает обращение и направляет данные в Банк России. Я готовлю весь пакет документов и сопровождаю процесс до удаления ваших реквизитов из базы.',
  },
  {
    q: 'Сколько времени занимает разблокировка карты или счёта?',
    a: 'Срок зависит от банка и основания блокировки. Несложные случаи решаются за 1–3 дня, более сложные — от одной до нескольких недель. На бесплатной консультации я оцениваю вашу ситуацию и называю реальные сроки.',
  },
  {
    q: 'Вы работаете дистанционно или нужно приезжать?',
    a: 'Работаю дистанционно по всей России. Все документы и переписку с банком ведём онлайн — вам никуда не нужно ехать. При необходимости возможна личная встреча в Москве.',
  },
  {
    q: 'С какими банками вы работаете?',
    a: 'Со всеми российскими банками: Сбербанк, Т-Банк (Тинькофф), Альфа-Банк, ВТБ, Озон Банк, Газпромбанк, Райффайзенбанк, Совкомбанк и другими. Подход подбирается под требования конкретного банка.',
  },
  {
    q: 'Сколько стоят услуги по разблокировке?',
    a: 'Стоимость зависит от сложности ситуации и объёма работы. Первичная консультация — бесплатная: я разбираю ваш случай и честно говорю, реально ли помочь и сколько это будет стоить. Скрытых платежей нет.',
  },
  {
    q: 'Какие документы понадобятся для разблокировки?',
    a: 'Обычно это уведомление или запрос от банка, выписки по счёту, документы о происхождении средств (договоры, справки о доходах, чеки). Точный список зависит от ситуации — подскажу, что именно нужно, на консультации.',
  },
]

const serviceNames = [
  'Разблокировка карт и счетов по 115-ФЗ',
  'Снятие блокировки по 161-ФЗ и вывод из базы ЦБ РФ',
  'Восстановление дистанционного банковского обслуживания (ДБО)',
  'Вывод из чёрного списка банков (список отказников)',
  'Разблокировка расчётных счетов ИП и юридических лиц',
  'Консультация и сопровождение в спорах с банком',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LegalService', 'ProfessionalService'],
      '@id': `${siteUrl}/#business`,
      name: 'Руслан Ганеев — разблокировка банковских карт и счетов по 115-ФЗ и 161-ФЗ',
      description,
      url: `${siteUrl}/`,
      image: `${siteUrl}/og-image.png`,
      telephone: contacts.phone,
      priceRange: '₽₽',
      currenciesAccepted: 'RUB',
      areaServed: { '@type': 'Country', name: 'Россия' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Москва',
        addressRegion: 'Москва',
        addressCountry: 'RU',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00',
        },
      ],
      provider: { '@id': `${siteUrl}/#person` },
      sameAs: [
        contacts.vk,
        contacts.avito,
        contacts.tiktok,
        contacts.instagram,
        contacts.max,
      ].filter(Boolean),
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Руслан Ганеев',
      jobTitle: 'Специалист по разблокировке банковских карт и счетов',
      description:
        'Помогаю физическим лицам и предпринимателям снимать блокировку банковских карт и счетов по 115-ФЗ и 161-ФЗ.',
      knowsAbout: [
        '115-ФЗ',
        '161-ФЗ',
        'разблокировка банковских карт',
        'разблокировка счетов',
        'база данных ЦБ РФ',
        'противодействие легализации доходов',
        'дистанционное банковское обслуживание',
      ],
      url: `${siteUrl}/`,
      telephone: contacts.phone,
      areaServed: 'RU',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: title,
      description,
      inLanguage: 'ru-RU',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#service`,
      serviceType: 'Разблокировка банковских карт и счетов',
      name: 'Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ',
      description,
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: { '@type': 'Country', name: 'Россия' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги по разблокировке карт и счетов',
        itemListElement: serviceNames.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: `${siteUrl}/`,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Разблокировка карт и счетов по 115-ФЗ и 161-ФЗ — Руслан Ганеев',
  ogSiteName: 'Руслан Ганеев — разблокировка карт и счетов',
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og-image.png`,
  author: 'Руслан Ганеев',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  meta: [
    {
      name: 'keywords',
      content:
        'разблокировка карты, разблокировать карту, разблокировка счёта, 115-ФЗ, 161-ФЗ, блокировка карты банком, снятие блокировки, база ЦБ, разблокировка ДБО, сомнительные операции, список отказников, разблокировка карты Сбербанк, помощь по 115-ФЗ, Руслан Ганеев, Москва',
    },
    { name: 'geo.region', content: 'RU-MOW' },
    { name: 'geo.placename', content: 'Москва' },
    { name: 'rating', content: 'General' },
    // Для подтверждения прав на сайт вставьте сюда коды из вебмастеров:
    // { name: 'yandex-verification', content: 'ВАШ_КОД' },
    // { name: 'google-site-verification', content: 'ВАШ_КОД' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
    },
  ],
})
</script>

<template>
  <HeroSection />
  <ServicesSection />
  <ProblemSection />
  <ProcessSection />
  <AdvantagesSection />
  <CasesSection />
  <ReviewsSection />
  <FaqSection :items="faqItems" />
  <ContactSection />
</template>
