<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatCompactNumber, formatCurrency } from '../../utils/dashboard-formatters'

const props = defineProps<{
  items: {
    month: string
    income: number
    expense: number
  }[]
}>()

const chartSeries = computed(() => [
  { name: 'Pemasukan', data: props.items.map(item => item.income) },
  { name: 'Pengeluaran', data: props.items.map(item => item.expense) }
])

const chartOptions = computed<ApexOptions>(() => ({
  chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
  colors: ['var(--uui-brand-600)', 'var(--uui-success-600)'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2.5 },
  fill: {
    type: 'gradient',
    gradient: { opacityFrom: 0.2, opacityTo: 0.01, stops: [0, 90, 100] }
  },
  legend: { position: 'top', horizontalAlign: 'left' },
  grid: { borderColor: 'var(--uui-gray-200)', strokeDashArray: 4 },
  xaxis: {
    categories: props.items.map(item => item.month),
    labels: { style: { colors: 'var(--uui-gray-500)' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      formatter: formatCompactNumber,
      style: { colors: ['var(--uui-gray-500)'] }
    }
  },
  tooltip: { y: { formatter: formatCurrency } }
}))

</script>

<template>
  <ApexChart
    type="area"
    height="300"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>
