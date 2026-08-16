<script setup lang="ts">
import { samples } from '~/data/samples'
</script>

<template>
  <section id="samples" class="px-6 py-16">
    <div class="max-w-[640px] mx-auto mb-10 text-center">
      <span class="inline-block text-[0.82rem] font-bold tracking-[0.08em] uppercase text-red mb-3.5">
        Sample work
      </span>
      <h2 class="font-poster text-[1.4rem] sm:text-[2rem] mb-2.5">Isang tikim bago mag-order</h2>
      <p class="text-[#5B5548]">Palitan ito ng totoong screenshots ng natapos mong materyales.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <NuxtLink
        v-for="s in samples"
        :key="s.slug"
        :to="`/samples/${s.slug}`"
        class="block bg-charcoal-2 rounded-xl overflow-hidden text-cream hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
      >
        <div
          class="h-[220px] flex items-center justify-center text-[#8A8578] text-[0.85rem] font-semibold text-center px-4"
          style="background: repeating-linear-gradient(135deg, #33332D, #33332D 10px, #2B2B26 10px, #2B2B26 20px);"
        >
          {{ s.placeholder }}
        </div>
        <div class="px-5 py-4">
          <h3 class="text-[0.98rem] mb-1 font-semibold">{{ s.title }}</h3>
          <p class="text-[0.88rem] text-steel">{{ s.note }}</p>
          <p class="text-[0.8rem] text-gold font-semibold mt-2">Tingnan →</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>