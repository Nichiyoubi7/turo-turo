<script setup lang="ts">
const auth = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-charcoal-2 font-body">
    <header class="bg-charcoal px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <TuroMark :size="28" />
        <span class="font-poster text-cream text-sm">TURO TURO ADMIN</span>
      </div>
      <button
        v-if="auth.user"
        class="text-cream/70 text-sm hover:text-cream focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold rounded px-2 py-1"
        @click="auth.logout()"
      >
        Logout ({{ auth.user.name }})
      </button>
    </header>
    <main class="px-6 py-8">
      <slot />
    </main>
  </div>
</template>