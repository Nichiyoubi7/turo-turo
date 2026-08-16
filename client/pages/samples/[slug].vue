<script setup lang="ts">
import { samples } from '~/data/samples'

const route = useRoute()
const draft = useOrderDraft()

const sample = computed(() =>
  samples.find(s => s.slug === route.params.slug)
)

function orderThis() {
  if (!sample.value) return
  draft.value = { segment: sample.value.segment, service: sample.value.service }
  navigateTo('/#contact')
}
</script>

<template>
  <div class="bg-cream text-charcoal font-body leading-relaxed min-h-screen">
    <AppHeader />

    <div v-if="sample" class="max-w-[720px] mx-auto px-6 py-14">
      <NuxtLink to="/#samples" class="text-red text-sm font-semibold underline mb-6 inline-block">
        ← Bumalik sa lahat ng sample
      </NuxtLink>

      <span class="inline-block text-[0.82rem] font-bold tracking-[0.08em] uppercase text-red mb-3">
        {{ sample.service }}
      </span>
      <h1 class="font-poster text-[1.6rem] sm:text-[2.1rem] mb-2 leading-tight">{{ sample.title }}</h1>
      <p class="text-steel text-sm mb-8">{{ sample.note }}</p>

      <div
        class="aspect-[4/3] rounded-xl flex items-center justify-center text-[#8A8578] text-base font-semibold text-center px-6 mb-8"
        style="background: repeating-linear-gradient(135deg, #33332D, #33332D 10px, #2B2B26 10px, #2B2B26 20px);"
      >
        {{ sample.placeholder }}
      </div>

      <p class="text-[1.02rem] text-[#5B5548] mb-10">{{ sample.description }}</p>

      <button
        type="button"
        class="inline-block px-7 py-3.5 rounded-md font-bold text-[0.92rem] bg-red text-cream transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
        @click="orderThis"
      >
        Mag-order ng ganito →
      </button>
    </div>

    <div v-else class="max-w-[520px] mx-auto px-6 py-24 text-center">
      <p class="text-lg font-semibold mb-3">Hindi nahanap ang sample na ito.</p>
      <NuxtLink to="/#samples" class="text-red underline font-semibold">← Bumalik sa samples</NuxtLink>
    </div>

    <AppFooter />
    <StickyOrder />
  </div>
</template>
