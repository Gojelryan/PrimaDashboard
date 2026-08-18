<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatCompactNumber, formatCurrency } from '../../utils/dashboard-formatters'

const props = defineProps<{
  items: {
    label: string
    value: number
  }[]
}>()

const chartSeries = computed(() => [
  { name: 'Opex', data: props.items.map(item => item.value) }
])

const chartOptions = computed<ApexOptions>(() => ({
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ['var(--uui-brand-600)', 'var(--uui-success-600)', 'var(--uui-blue-600)', 'var(--uui-warning-600)', 'var(--uui-error-600)'],
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: '48%',
      distributed: true
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  grid: { borderColor: 'var(--uui-gray-200)', strokeDashArray: 4 },
  xaxis: {
    categories: props.items.map(item => item.label),
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
    type="bar"
    height="300"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>
