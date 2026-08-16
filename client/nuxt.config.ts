// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      // Same pattern as OBRA's client: overridable via NUXT_PUBLIC_API_BASE
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },
  app: {
    head: {
      title: 'Turo Turo — Materyales na Pangturo',
      meta: [
        { name: 'description', content: 'Modules, PPT decks, worksheets, IMs, at ILAW-format DLLs — self-made, BOW-matched. Elementary hanggang College.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bungee&family=Permanent+Marker&family=Caveat:wght@600;700&family=Work+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
        }
      ]
    }
  }
})
