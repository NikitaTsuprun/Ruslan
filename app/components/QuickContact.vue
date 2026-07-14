<script setup lang="ts">
const { contacts } = useAppConfig()
const socials = useSocials()

// Каналы для быстрой связи: телефон + мессенджеры (если заданы в app.config).
const messengerKeys = ['telegram', 'whatsapp', 'max', 'vk']
const channels = computed(() => [
  {
    key: 'phone',
    title: 'Позвонить',
    href: `tel:${contacts.phoneHref}`,
    color: '#0468d6',
    ext: false,
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 3.5c.5 0 .9.3 1 .8l.9 3.2c.1.4 0 .9-.3 1.2L7 10.3a14 14 0 0 0 6.7 6.7l1.6-2.2c.3-.3.8-.4 1.2-.3l3.2.9c.5.1.8.5.8 1V20a1.5 1.5 0 0 1-1.6 1.5C10.8 21 3 13.2 2.5 4.6A1.5 1.5 0 0 1 4 3h2.6Z"/></svg>',
  },
  ...socials
    .filter((s) => messengerKeys.includes(s.key))
    .sort((a, b) => messengerKeys.indexOf(a.key) - messengerKeys.indexOf(b.key))
    .map((s) => ({ key: s.key, title: s.title, href: s.href, color: s.color, ext: true, icon: s.icon })),
])

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="qc" :class="{ 'qc--open': open }">
    <Transition name="qc-list">
      <ul v-show="open" class="qc__list" aria-label="Способы связи">
        <li v-for="(c, i) in channels" :key="c.key" :style="{ '--c': c.color, '--i': i }">
          <a
            class="qc__item"
            :href="c.href"
            :target="c.ext ? '_blank' : undefined"
            :rel="c.ext ? 'noopener' : undefined"
            @click="trackContact(c.key)"
          >
            <span class="qc__item-label">{{ c.title }}</span>
            <span class="qc__item-ic" v-html="c.icon" />
          </a>
        </li>
      </ul>
    </Transition>

    <button
      type="button"
      class="qc__fab"
      :aria-expanded="open"
      aria-label="Связаться"
      @click="open = !open"
    >
      <span class="qc__fab-pulse" aria-hidden="true" />
      <svg v-if="!open" class="qc__fab-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="8.5" cy="11.5" r="1.1" fill="currentColor"/><circle cx="12.5" cy="11.5" r="1.1" fill="currentColor"/><circle cx="16.5" cy="11.5" r="1.1" fill="currentColor"/>
      </svg>
      <svg v-else class="qc__fab-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.qc {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.qc__list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 11px;
}
.qc__item {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  padding: 9px 9px 9px 16px;
  border-radius: 100px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(11, 28, 58, .18);
  border: 1px solid var(--border);
  transition: transform .22s cubic-bezier(.22, 1, .36, 1), box-shadow .22s ease;
}
.qc__item:hover { transform: translateX(-3px); box-shadow: 0 16px 36px rgba(11, 28, 58, .24); }
.qc__item-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
}
.qc__item-ic {
  width: 42px;
  height: 42px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--c);
  color: #fff;
}
.qc__item-ic :deep(svg) { width: 22px; height: 22px; }

.qc__fab {
  position: relative;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(150deg, #1f86f0, #00a6e6);
  box-shadow: 0 14px 30px rgba(4, 104, 214, .42);
  transition: transform .26s cubic-bezier(.22, 1, .36, 1), box-shadow .26s ease;
}
.qc__fab:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 18px 38px rgba(4, 104, 214, .5); }
.qc__fab:active { transform: scale(.96); }
.qc--open .qc__fab { background: var(--ink); box-shadow: 0 14px 30px rgba(11, 28, 58, .4); }
.qc__fab-ic { width: 28px; height: 28px; }
.qc__fab-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(4, 104, 214, .5);
  animation: qcPulse 2.4s ease-out infinite;
  z-index: -1;
}
.qc--open .qc__fab-pulse { display: none; }

@keyframes qcPulse {
  0% { transform: scale(1); opacity: .55; }
  70% { transform: scale(1.7); opacity: 0; }
  100% { opacity: 0; }
}

.qc-list-enter-active, .qc-list-leave-active { transition: opacity .22s ease; }
.qc-list-enter-active .qc__item, .qc-list-leave-active .qc__item {
  transition: transform .26s cubic-bezier(.22, 1, .36, 1), opacity .22s ease;
  transition-delay: calc(var(--i, 0) * .04s);
}
.qc-list-enter-from, .qc-list-leave-to { opacity: 0; }
.qc-list-enter-from .qc__item, .qc-list-leave-to .qc__item { opacity: 0; transform: translateY(12px) scale(.9); }

@media (min-width: 760px) {
  .qc { right: 28px; bottom: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .qc__fab-pulse { animation: none; display: none; }
}
</style>
