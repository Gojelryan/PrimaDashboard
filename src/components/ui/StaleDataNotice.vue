<script setup lang="ts">
import { Clock3, RefreshCw } from 'lucide-vue-next'

withDefaults(defineProps<{
  message?: string
  timestamp?: string
  refreshing?: boolean
}>(), {
  message: 'Data mungkin belum terbaru.',
  timestamp: undefined,
  refreshing: false,
})

const emit = defineEmits<{
  refresh: []
}>()
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-lg border border-[var(--uui-warning-600)]/30 bg-[var(--uui-warning-50)] px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    role="status"
  >
    <div class="flex min-w-0 items-start gap-3 text-[var(--uui-warning-700)]">
      <Clock3 class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        <span class="font-semibold">{{ message }}</span>
        <span v-if="timestamp" class="ml-1">Terakhir diperbarui {{ timestamp }}.</span>
      </p>
    </div>
    <button
      type="button"
      class="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-md px-3 py-1.5 font-semibold text-[var(--uui-warning-700)] hover:bg-[var(--uui-warning-600)]/10 disabled:cursor-wait disabled:opacity-60"
      :disabled="refreshing"
      @click="emit('refresh')"
    >
      <RefreshCw class="h-4 w-4" :class="refreshing ? 'animate-spin' : ''" aria-hidden="true" />
      {{ refreshing ? 'Memperbarui' : 'Perbarui' }}
    </button>
  </div>
</template>
