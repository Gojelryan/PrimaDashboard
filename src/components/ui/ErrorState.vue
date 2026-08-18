<script setup lang="ts">
import { CircleAlert, RefreshCw } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string
  description?: string
  retryLabel?: string
  retryable?: boolean
}>(), {
  title: 'Data gagal dimuat',
  description: 'Terjadi kendala saat mengambil data. Silakan coba kembali.',
  retryLabel: 'Coba lagi',
  retryable: true,
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="flex flex-col items-center rounded-xl border border-[var(--uui-error-500)]/30 bg-[var(--uui-error-50)] px-5 py-10 text-center"
    role="alert"
  >
    <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--uui-error-600)] shadow-[var(--uui-shadow-xs)]">
      <CircleAlert class="h-5 w-5" aria-hidden="true" />
    </span>
    <h3 class="mt-4 text-base font-semibold text-[var(--uui-gray-900)]">{{ title }}</h3>
    <p class="mt-1 max-w-md text-sm text-[var(--uui-gray-600)]">{{ description }}</p>
    <button
      v-if="retryable"
      type="button"
      class="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--uui-error-600)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--uui-shadow-xs)] hover:opacity-90"
      @click="emit('retry')"
    >
      <RefreshCw class="h-4 w-4" aria-hidden="true" />
      {{ retryLabel }}
    </button>
  </div>
</template>
