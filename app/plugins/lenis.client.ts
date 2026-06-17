import Lenis from 'lenis'
import { gsap } from 'gsap'

declare module '#app' {
  interface NuxtApp {
    $lenis: Lenis | null
  }
}

export default defineNuxtPlugin(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return {
      provide: {
        lenis: null,
      },
    }
  }

  const lenis = new Lenis({
    duration: 1.12,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Удобный доступ для отладки в dev (в проде не выполняется).
  if (import.meta.dev) {
    ;(window as unknown as { __lenis?: unknown }).__lenis = lenis
  }

  return {
    provide: {
      lenis,
    },
  }
})
