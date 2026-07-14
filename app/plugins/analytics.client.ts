// Аналитика: Яндекс.Метрика и Google Analytics (GA4).
// Подключаются только если в app.config.ts → seo заданы ID. Иначе ничего не грузится.
export default defineNuxtPlugin(() => {
  const { seo } = useAppConfig() as { seo?: { yandexMetrika?: string; googleAnalytics?: string } }
  const w = window as unknown as Record<string, unknown> & { dataLayer?: unknown[] }

  // ===== Яндекс.Метрика =====
  const metrika = seo?.yandexMetrika
  if (metrika) {
    ;(function (m: any, e: Document, t: string, r: string, i: string) {
      m[i] =
        m[i] ||
        function (...args: unknown[]) {
          ;(m[i].a = m[i].a || []).push(args)
        }
      m[i].l = 1 * (new Date() as unknown as number)
      const k = e.createElement(t) as HTMLScriptElement
      const a = e.getElementsByTagName(t)[0]
      k.async = true
      k.src = r
      a?.parentNode?.insertBefore(k, a)
    })(w, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')
    ;(w.ym as (...a: unknown[]) => void)(Number(metrika), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }

  // ===== Google Analytics (GA4) =====
  const ga = seo?.googleAnalytics
  if (ga) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`
    document.head.appendChild(s)
    w.dataLayer = w.dataLayer || []
    const gtag = (...args: unknown[]) => {
      w.dataLayer!.push(args)
    }
    ;(w as Record<string, unknown>).gtag = gtag
    gtag('js', new Date())
    gtag('config', ga)
  }

  // Учёт переходов между страницами (SPA): первый просмотр уже учтён выше.
  if (metrika || ga) {
    const router = useRouter()
    let first = true
    router.afterEach((to) => {
      if (first) {
        first = false
        return
      }
      if (metrika && typeof w.ym === 'function') {
        ;(w.ym as (...a: unknown[]) => void)(Number(metrika), 'hit', to.fullPath)
      }
      if (ga && typeof w.gtag === 'function') {
        ;(w.gtag as (...a: unknown[]) => void)('event', 'page_view', { page_path: to.fullPath })
      }
    })
  }
})
