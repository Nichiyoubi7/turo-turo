<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const auth = useAuthStore()
const email = ref('')
const password = ref('')

async function handleSubmit() {
  const ok = await auth.login(email.value, password.value)
  if (ok) await navigateTo('/admin/orders')
}
</script>

<template>
  <div class="mx-auto mt-16 bg-cream text-charcoal rounded-lg px-6 py-8" style="max-width: 384px;">
    <h1 class="font-poster text-xl mb-6 text-center">Turo Turo Admin</h1>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label class="block text-sm font-semibold mb-1.5" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full px-3.5 py-2.5 rounded-md border border-steel/50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
        >
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1.5" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full px-3.5 py-2.5 rounded-md border border-steel/50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
        >
      </div>
      <p v-if="auth.error" class="text-red text-sm font-medium">{{ auth.error }}</p>
      <button
        type="submit"
        :disabled="auth.loading"
        class="w-full py-3 rounded-md bg-red text-cream font-bold disabled:opacity-60 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        {{ auth.loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>