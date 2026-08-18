<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatNumber, formatUnit } from '../../utils/dashboard-formatters'

const props = defineProps<{
  categories: string[]
  series: number[]
}>()

const totalWeeklyInstallation = computed(() =>
  props.series.reduce(
    (total, value) => total + value,
    0
  )
)

const chartSeries = computed(() => [
  {
    name: 'Instalasi Baru',
    data: props.series
  }
])

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'line',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },

  colors: ['var(--uui-brand-600)'],

  stroke: {
    curve: 'smooth',
    width: 3
  },

  markers: {
    size: 4,
    strokeWidth: 2,
    strokeColors: 'var(--uui-surface)'
  },

  dataLabels: {
    enabled: false
  },

  legend: {
    show: false
  },

  grid: {
    borderColor: 'var(--uui-gray-200)',
    strokeDashArray: 4
  },

  xaxis: {
    categories: props.categories,
    labels: {
      style: {
        colors: 'var(--uui-gray-500)'
      }
    }
  },

  yaxis: {
    min: 0,
    max: 50,
    tickAmount: 5,
    labels: {
      formatter(value: number) {
        return formatNumber(value)
      }
    }
  },

  tooltip: {
    y: {
      formatter(value: number) {
        return formatUnit(value, 'instalasi')
      }
    }
  }
}))
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden">
    <div class="shrink-0">
      <p class="text-sm text-[var(--uui-gray-500)]">
        Total pemasangan pekan ini
      </p>

      <p class="mt-1 text-2xl font-bold leading-none text-[var(--uui-gray-900)]">
        {{ formatNumber(totalWeeklyInstallation) }}
      </p>
    </div>

    <div class="mt-4 min-h-0 flex-1 overflow-hidden">
      <ApexChart
        type="line"
        height="100%"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>
