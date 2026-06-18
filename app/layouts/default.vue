<template>
  <div class="page">
    <AnimatedBg variant="aurora" />
    <AppPreloader />
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <ClientOnly>
      <QuickContact />
    </ClientOnly>
  </div>
</template>
