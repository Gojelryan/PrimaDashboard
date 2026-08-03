<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

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
  colors: ['#7F56D9', '#079455', '#1570EF', '#DC6803', '#D92D20'],
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: '48%',
      distributed: true
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  grid: { borderColor: '#EAECF0', strokeDashArray: 4 },
  xaxis: {
    categories: props.items.map(item => item.label),
    labels: { style: { colors: '#667085' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      formatter: formatCompact,
      style: { colors: ['#667085'] }
    }
  },
  tooltip: { y: { formatter: formatCurrency } }
}))

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

function formatCompact(value: number) {
  return value >= 1000000000
    ? `${(value / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}M`
    : `${Math.round(value / 1000000).toLocaleString('id-ID')}jt`
}
</script>

<template>
  <ApexChart
    type="bar"
    height="300"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>
