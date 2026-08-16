<template>
  <section class="bg-charcoal-2 text-cream">
    <div class="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-16">
      <div>
        <span class="inline-block text-[0.82rem] font-bold tracking-[0.08em] uppercase text-gold mb-3.5">
          Sino ang nagluluto nito
        </span>
        <h2 class="font-poster text-2xl mb-3.5 leading-[1.3]">
          Sunday Carolino — materyales na luto sa tamang init, hindi microwave na AI dump.
        </h2>
        <p class="text-[#C9C4B4]">
          Ginagawa ko ang bawat materyal katulad ng pagbuo ko ng software: sundan ang spec, panatilihing
          editable, at walang half-cooked na order. Bawat file ay batay sa iyong BOW at DepEd
          competencies — walang filler.
        </p>
        <div class="flex flex-wrap gap-2.5 mt-5">
          <span
            v-for="badge in ['Self-made, fully editable', 'ILAW format', '24–48h delivery']"
            :key="badge"
            class="text-[0.86rem] font-semibold px-3.5 py-1.5 rounded-full border border-gold/50 text-gold"
          >
            {{ badge }}
          </span>
        </div>
      </div>

      <div class="bg-cream text-charcoal px-6 py-6 rounded -rotate-[1.5deg] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)]">
        <div class="font-mono text-[0.82rem] text-steel border-b border-dashed border-steel pb-2.5 mb-3 flex justify-between">
          <span>ORDER SLIP</span>
          <span>No. 001</span>
        </div>
        <div class="font-script font-bold text-[1.3rem]">
          "finally, DLL na 'di ko na kailangang ayusin ng alas-11 ng gabi."
        </div>
        <div class="mt-3.5 font-mono text-[0.82rem] text-steel">— [Teacher's Name], Grade Level / Subject</div>
      </div>
    </div>
  </section>
</template>