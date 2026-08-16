/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F0E4',
        charcoal: '#262622',
        'charcoal-2': '#1C1C19',
        red: {
          DEFAULT: '#C0392B',
          dark: '#9E2E22'
        },
        gold: '#E8A93D',
        steel: '#9AA0A6'
      },
      fontFamily: {
        poster: ['Bungee', 'Impact', 'sans-serif'],
        marker: ['"Permanent Marker"', 'cursive'],
        script: ['Caveat', 'cursive'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
