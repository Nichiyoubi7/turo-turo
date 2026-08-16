<script setup lang="ts">
const isOpen = ref(false)

const links = [
  { href: '#menu', label: 'Elementary' },
  { href: '#menu', label: 'Junior High' },
  { href: '#menu', label: 'Senior High' },
  { href: '#college', label: 'College' },
  { href: '#contact', label: 'Order' }
]

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <div>
    <a
      href="#main"
      class="absolute z-[200] -left-full top-0 focus:left-0 bg-gold text-charcoal font-bold text-sm px-4 py-3 rounded-br-lg"
    >
      Skip to content
    </a>

    <div
      class="pt-3.5"
      style="background: repeating-linear-gradient(115deg, #C0392B 0 26px, #9E2E22 26px 52px);"
    >
      <div class="max-w-[1080px] mx-auto flex items-center justify-between px-6 py-3.5">
        <div class="flex items-center gap-2.5">
          <TuroMark :size="34" />
          <div class="font-poster text-xl text-cream">
            TURO <span class="text-gold">TURO</span>
          </div>
        </div>

        <nav class="hidden md:flex gap-1.5">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="text-cream text-sm font-semibold px-3.5 py-2 rounded-t-md bg-black/15 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            {{ link.label }}
          </a>
        </nav>

        <button
          class="md:hidden flex flex-col gap-1.5 p-2 rounded-md focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
          :aria-expanded="isOpen"
          aria-controls="mobileMenu"
          aria-label="Open menu"
          @click="isOpen = !isOpen"
        >
          <span class="w-6 h-0.5 bg-cream rounded" />
          <span class="w-6 h-0.5 bg-cream rounded" />
          <span class="w-6 h-0.5 bg-cream rounded" />
        </button>
      </div>

      <nav
        v-show="isOpen"
        id="mobileMenu"
        class="md:hidden flex flex-col px-6 pb-3.5 pt-1.5 bg-red-dark"
      >
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="text-cream font-semibold text-[0.95rem] py-3.5 border-b border-white/15 last:border-none"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>

    <!-- scalloped awning edge -->
    <div
      class="h-4"
      style="background-image: radial-gradient(circle at 8px 0, transparent 8px, #F7F0E4 8.5px); background-size: 16px 16px; background-repeat: repeat-x;"
    />
  </div>
</template>
