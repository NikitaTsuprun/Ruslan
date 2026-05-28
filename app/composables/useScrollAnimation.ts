import { useIntersectionObserver } from '@vueuse/core'
import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'

type AnimationMode = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'stagger-children'

type ScrollAnimationOptions = {
  childSelector?: string
  mode?: AnimationMode
  once?: boolean
  rootMargin?: string
  stagger?: number
  threshold?: number
}

export function useScrollAnimation(
  target: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {},
) {
  const {
    childSelector = '[data-reveal-item]',
    mode = 'fade-up',
    once = true,
    rootMargin = '0px 0px -12% 0px',
    stagger = 0.1,
    threshold = 0.14,
  } = options

  let stopObserver: (() => void) | undefined

  onMounted(() => {
    const el = target.value
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const items = Array.from(el.querySelectorAll<HTMLElement>(childSelector))
    const delayStep = isMobile ? Math.min(stagger, 0.06) : stagger

    el.classList.add('scroll-animate', `scroll-animate--${mode}`)

    items.forEach((item, index) => {
      item.classList.add('scroll-animate__item')
      item.dataset.scrollMode ||= mode
      item.style.setProperty('--scroll-delay', `${index * delayStep}s`)
    })

    if (prefersReduced) {
      el.classList.add('is-visible')
      return
    }

    const controls = useIntersectionObserver(
      target,
      ([entry]) => {
        if (!entry?.isIntersecting) return

        el.classList.add('is-visible')

        if (once) {
          controls.stop()
          stopObserver = undefined
        }
      },
      { rootMargin, threshold },
    )

    stopObserver = controls.stop
  })

  onBeforeUnmount(() => {
    stopObserver?.()
  })
}
