<script setup lang="ts">
const show = ref(false)

function onScroll() {
  const hero = document.getElementById('main')
  const threshold = hero ? hero.offsetHeight : 400
  show.value = window.scrollY > threshold
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <a
    href="#contact"
    class="fixed bottom-5 right-5 z-[80] bg-gold text-charcoal font-bold text-[0.88rem] px-5.5 py-3.5 rounded-full shadow-[0_10px_26px_-8px_rgba(0,0,0,0.45)] transition-all duration-200"
    :class="show ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'"
  >
    Order Now →
  </a>
</template>
