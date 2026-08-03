<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

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
  colors: ['#7F56D9', '#079455'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2.5 },
  fill: {
    type: 'gradient',
    gradient: { opacityFrom: 0.2, opacityTo: 0.01, stops: [0, 90, 100] }
  },
  legend: { position: 'top', horizontalAlign: 'left' },
  grid: { borderColor: '#EAECF0', strokeDashArray: 4 },
  xaxis: {
    categories: props.items.map(item => item.month),
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
    type="area"
    height="300"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>
