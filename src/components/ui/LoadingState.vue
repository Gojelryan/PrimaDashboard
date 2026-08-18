<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  rows?: number
}>(), {
  label: 'Memuat data',
  rows: 3,
})
</script>

<template>
  <div
    class="rounded-xl border border-[var(--uui-gray-200)] bg-white p-5 shadow-[var(--uui-shadow-xs)]"
    role="status"
    aria-live="polite"
  >
    <span class="sr-only">{{ label }}</span>
    <div class="animate-pulse space-y-4" aria-hidden="true">
      <div class="h-4 w-36 rounded bg-[var(--uui-gray-200)]" />
      <div
        v-for="row in rows"
        :key="row"
        class="h-10 rounded-lg bg-[var(--uui-gray-100)]"
        :class="row === rows ? 'w-4/5' : 'w-full'"
      />
    </div>
  </div>
</template>
