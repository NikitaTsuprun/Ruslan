<script setup lang="ts">
// Анимированный фон всей страницы. Вариант переключается пропом variant.
withDefaults(defineProps<{ variant?: 'aurora' | 'mesh' }>(), {
  variant: 'aurora',
})
</script>

<template>
  <div class="abg" :class="`abg--${variant}`" aria-hidden="true">
    <template v-if="variant === 'aurora'">
      <span class="abg__blob abg__blob--1" />
      <span class="abg__blob abg__blob--2" />
      <span class="abg__blob abg__blob--3" />
      <span class="abg__grid" />
    </template>

    <template v-else-if="variant === 'mesh'">
      <span class="abg__mesh" />
      <span class="abg__grid" />
    </template>
  </div>
</template>

<style scoped>
.abg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(180deg, #eef5ff 0%, #f7fbff 45%, #ffffff 100%);
}

/* ===== Общая сетка ===== */
.abg__grid {
  position: absolute;
  inset: -2px;
  background-image:
    linear-gradient(rgba(4, 104, 214, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(4, 104, 214, .05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%);
}

/* ===== Вариант 1: Аврора ===== */
.abg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: .5;
  will-change: transform;
}
.abg__blob--1 {
  width: 46vw; height: 46vw;
  top: -12vw; left: -8vw;
  background: radial-gradient(circle, #bcd8fb, transparent 70%);
  animation: abgDrift1 24s ease-in-out infinite;
}
.abg__blob--2 {
  width: 40vw; height: 40vw;
  top: 18vh; right: -10vw;
  background: radial-gradient(circle, #bfeefb, transparent 70%);
  animation: abgDrift2 28s ease-in-out infinite;
}
.abg__blob--3 {
  width: 44vw; height: 44vw;
  bottom: -16vw; left: 22vw;
  background: radial-gradient(circle, #cfe0fc, transparent 70%);
  animation: abgDrift3 32s ease-in-out infinite;
}

/* ===== Вариант 2: Мэш-градиент ===== */
.abg__mesh {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(38% 38% at 22% 28%, rgba(31, 134, 240, .42), transparent 60%),
    radial-gradient(34% 34% at 78% 22%, rgba(0, 166, 230, .40), transparent 60%),
    radial-gradient(40% 40% at 70% 78%, rgba(90, 166, 245, .38), transparent 62%),
    radial-gradient(36% 36% at 26% 76%, rgba(3, 78, 162, .30), transparent 60%);
  filter: blur(50px);
  will-change: transform;
  animation: abgMesh 26s ease-in-out infinite;
}

@keyframes abgDrift1 {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(6vw, 5vh, 0) scale(1.12); }
}
@keyframes abgDrift2 {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-7vw, 6vh, 0) scale(1.15); }
}
@keyframes abgDrift3 {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
  50% { transform: translate3d(5vw, -6vh, 0) scale(.92); }
}
@keyframes abgMesh {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  33% { transform: translate3d(4%, 3%, 0) rotate(4deg) scale(1.08); }
  66% { transform: translate3d(-3%, 4%, 0) rotate(-3deg) scale(1.05); }
}
@media (prefers-reduced-motion: reduce) {
  .abg__blob, .abg__mesh { animation: none; }
}
</style>
