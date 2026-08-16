<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 34 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="-70 -70 140 140">
    <g transform="scale(1.15)">
      <rect x="-4" y="-8" width="48" height="60" rx="5" fill="#F7F0E4" stroke="#F7F0E4" stroke-width="4" />
      <polygon points="24,-8 44,12 24,12" fill="#E8E0CB" stroke="#F7F0E4" stroke-width="4" stroke-linejoin="round" />
      <rect x="6" y="16" width="30" height="6" rx="3" fill="#C0392B" />
      <rect x="6" y="28" width="30" height="6" rx="3" fill="#C0392B" />
      <rect x="6" y="40" width="20" height="6" rx="3" fill="#C0392B" />
      <g transform="translate(-38,-44) rotate(140)">
        <polygon points="0,0 0,34 8,26 13,38 20,35 14,23 25,23" fill="#E8A93D" stroke="#262622" stroke-width="3" stroke-linejoin="round" />
      </g>
    </g>
  </svg>
</template>
