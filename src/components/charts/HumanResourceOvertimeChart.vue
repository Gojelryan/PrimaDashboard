<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatUnit } from '../../utils/dashboard-formatters'

const props = defineProps<{
  items: {
    label: string
    hours: number
  }[]
}>()

const chartSeries = computed(() => props.items.map(item => item.hours))
const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut',
    toolbar: { show: false }
  },
  labels: props.items.map(item => item.label),
  colors: [
    'var(--uui-brand-600)',
    'var(--uui-success-600)',
    'var(--uui-warning-600)',
    'var(--uui-error-600)',
    'var(--uui-blue-600)',
    'var(--uui-brand-500)',
    'var(--uui-success-500)',
    'var(--uui-gray-500)'
  ],
  legend: { show: false },
  dataLabels: { enabled: false },
  stroke: { width: 0 },
  plotOptions: {
    pie: {
      donut: { size: '68%' }
    }
  },
  tooltip: {
    y: {
      formatter: value => formatUnit(value, 'jam')
    }
  }
}))
</script>

<template>
  <div class="grid h-full grid-cols-1 items-center gap-4 sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
    <ApexChart
      type="donut"
      height="180"
      :options="chartOptions"
      :series="chartSeries"
    />

    <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
      <div
        v-for="item in items"
        :key="item.label"
        class="flex items-center justify-between gap-3 text-sm"
      >
        <span class="text-[var(--uui-gray-700)]">■ {{ item.label }}</span>
        <span class="font-semibold text-[var(--uui-gray-900)]">{{ item.hours }} jam</span>
      </div>
    </div>
  </div>
</template>
