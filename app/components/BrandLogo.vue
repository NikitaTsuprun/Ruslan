<script setup lang="ts">
// Минималистичный логотип: открытый замок (разблокировка) в градиентном квадрате.
withDefaults(defineProps<{ size?: number | string }>(), { size: 40 })
const uid = useId()
</script>

<template>
  <svg
    class="brand-logo"
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    fill="none"
    role="img"
    aria-label="Логотип Руслан Ганеев"
  >
    <defs>
      <linearGradient :id="`bl-g-${uid}`" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1f86f0" />
        <stop offset="1" stop-color="#00a6e6" />
      </linearGradient>
    </defs>

    <rect width="40" height="40" rx="11" :fill="`url(#bl-g-${uid})`" />

    <!-- Открытая дужка замка -->
    <path
      d="M14 21v-5a6 6 0 0 1 11.6-2.1"
      stroke="#fff"
      stroke-width="3"
      stroke-linecap="round"
      fill="none"
    />
    <!-- Корпус замка -->
    <rect x="10.5" y="20" width="19" height="12.5" rx="3.6" fill="#fff" />
    <!-- Скважина -->
    <path
      d="M20 23.8a2.1 2.1 0 0 0-.8 4v1.7a.8.8 0 0 0 1.6 0v-1.7a2.1 2.1 0 0 0-.8-4z"
      fill="#0468d6"
    />
  </svg>
</template>

<style scoped>
.brand-logo { display: block; }
</style>
