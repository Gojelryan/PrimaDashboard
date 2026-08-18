<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Belum ada data',
  description: 'Data akan tampil di sini setelah tersedia.',
})
</script>

<template>
  <div class="flex flex-col items-center rounded-xl border border-dashed border-[var(--uui-gray-300)] bg-[var(--uui-gray-25)] px-5 py-10 text-center">
    <span class="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--uui-gray-100)] text-[var(--uui-gray-500)]">
      <Inbox class="h-5 w-5" aria-hidden="true" />
    </span>
    <h3 class="mt-4 text-base font-semibold text-[var(--uui-gray-900)]">{{ title }}</h3>
    <p class="mt-1 max-w-md text-sm text-[var(--uui-gray-500)]">{{ description }}</p>
    <div v-if="$slots.action" class="mt-5">
      <slot name="action" />
    </div>
  </div>
</template>
