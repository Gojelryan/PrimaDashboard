<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

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
    '#7F56D9',
    '#079455',
    '#DC6803',
    '#D92D20',
    '#1570EF',
    '#9E77ED',
    '#17B26A',
    '#667085'
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
      formatter: value => `${value.toLocaleString('id-ID')} jam`
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
        <span class="text-[#6F6B7D]">■ {{ item.label }}</span>
        <span class="font-semibold text-[#5D596C]">{{ item.hours }} jam</span>
      </div>
    </div>
  </div>
</template>
