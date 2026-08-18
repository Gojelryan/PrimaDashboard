<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

withDefaults(defineProps<{
  label?: string
  inline?: boolean
}>(), {
  label: 'Lihat detail',
  inline: false
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="flex justify-end"
    :class="inline ? '' : 'mt-auto pt-4'"
  >
    <button
      type="button"
      class="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold text-[var(--uui-brand-600)] transition-colors hover:bg-[var(--uui-brand-50)]"
      @click="$emit('click')"
    >
      {{ label }}
      <ChevronRight class="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
</template>
