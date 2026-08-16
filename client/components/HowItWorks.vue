<script setup lang="ts">
const steps = [
  { num: '1', title: 'Sabihin ang order', desc: 'Grade level, subject, coverage (week/quarter), at BOW kung meron.' },
  { num: '2', title: 'Confirm & bayad', desc: 'Padadalhan kita ng quote at timeline. 50% down via GCash para simulan.' },
  { num: '3', title: 'Kunin & i-revise', desc: 'Delivered sa loob ng 24–48h. May isang round ng free revisions.' }
]
</script>

<template>
  <section class="bg-charcoal-2 px-6 py-16">
    <div class="max-w-[640px] mx-auto mb-10 text-center">
      <span class="inline-block text-[0.82rem] font-bold tracking-[0.08em] uppercase text-gold mb-3.5">
        Paano mag-order
      </span>
      <h2 class="font-poster text-cream text-[1.4rem] sm:text-[2rem]">Three steps, walang paikot-ikot</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
      <div
        v-for="step in steps"
        :key="step.num"
        class="relative bg-cream border-2 border-charcoal rounded-[10px] px-5 py-6"
      >
        <span
          class="absolute -top-4 left-5 w-[34px] h-[34px] rounded-full bg-red text-cream flex items-center justify-center font-poster text-[0.95rem]"
        >
          {{ step.num }}
        </span>
        <h3 class="text-[1.02rem] mt-2.5 mb-2 font-semibold">{{ step.title }}</h3>
        <p class="text-[0.95rem] text-[#5B5548]">{{ step.desc }}</p>
      </div>
    </div>
  </section>
</template>