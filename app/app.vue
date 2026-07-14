<script setup lang="ts">
// Подтверждение прав на сайт (Яндекс.Вебмастер / Google Search Console).
const { seo } = useAppConfig() as { seo?: { yandexVerification?: string; googleVerification?: string } }
useHead({
  meta: [
    ...(seo?.yandexVerification ? [{ name: 'yandex-verification', content: seo.yandexVerification }] : []),
    ...(seo?.googleVerification ? [{ name: 'google-site-verification', content: seo.googleVerification }] : []),
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
