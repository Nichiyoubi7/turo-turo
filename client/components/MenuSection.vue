<script setup lang="ts">
import { samples } from '~/data/samples'

export interface MenuItem {
  num: string
  name: string
  desc: string
  price: string
}

const props = withDefaults(
  defineProps<{
    sectionId: string
    eyebrow: string
    title: string
    description: string
    items: MenuItem[]
    tint?: boolean
    isCollege?: boolean
  }>(),
  { tint: false, isCollege: false }
)

const draft = useOrderDraft()

function scrollTo(id: string) {
  if (import.meta.client) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function selectService(item: MenuItem) {
  draft.value = {
    segment: props.isCollege ? 'college' : 'elementary',
    service: item.name
  }
  scrollTo('contact')
}

function goToSample(item: MenuItem) {
  const match = samples.find(s => s.service === item.name)
  if (match) {
    navigateTo(`/samples/${match.slug}`)
  } else {
    scrollTo('samples')
  }
}
</script>

<template>
  <section :id="sectionId" class="px-6 py-16" :class="tint ? 'bg-steel/10' : ''">
    <div class="max-w-[640px] mx-auto mb-10 text-center">
      <span class="inline-block text-[0.82rem] font-bold tracking-[0.08em] uppercase text-red mb-3.5">
        {{ eyebrow }}
      </span>
      <h2 class="font-poster text-[1.4rem] sm:text-[2rem] mb-2.5">{{ title }}</h2>
      <p class="text-[#5B5548]">{{ description }}</p>
    </div>

    <div class="max-w-[760px] mx-auto border-2 border-charcoal rounded-[10px] overflow-hidden">
      <div
        v-for="(item, i) in items"
        :key="item.num"
        role="button"
        tabindex="0"
        :aria-label="`Mag-order ng ${item.name}`"
        class="flex flex-col gap-1.5 px-6 py-5 border-b border-dashed border-[#C9BFA4] last:border-none cursor-pointer hover:bg-gold/10 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:-outline-offset-2"
        :class="i % 2 === 0 ? 'bg-gold/5' : ''"
        @click="selectService(item)"
        @keydown.enter="selectService(item)"
        @keydown.space.prevent="selectService(item)"
      >
        <div class="flex items-baseline gap-3">
          <span class="font-mono text-[0.85rem] text-red font-bold shrink-0">{{ item.num }}</span>
          <span class="font-bold text-[1.02rem] shrink-0">{{ item.name }}</span>
          <span class="hidden md:block grow border-b-2 border-dotted border-[#C9BFA4] mx-1.5 min-w-[20px] self-center" />
          <span class="font-marker text-red text-[1.15rem] shrink-0 ml-auto md:ml-0">{{ item.price }}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span class="text-[#5B5548] text-[0.92rem]">{{ item.desc }}</span>
          <button
            type="button"
            class="text-[0.8rem] text-red underline font-semibold shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold rounded"
            @click.stop="goToSample(item)"
          >
            Tingnan ang sample →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>