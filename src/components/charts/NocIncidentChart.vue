<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatNumber, formatUnit } from '../../utils/dashboard-formatters'

const props = defineProps<{
  items: readonly {
    category: string
    total: number
  }[]
}>()

const colors = ['var(--uui-brand-600)', 'var(--uui-warning-600)', 'var(--uui-error-600)', 'var(--uui-blue-600)', 'var(--uui-success-600)']
const chartSeries = computed(() => props.items.map(item => item.total))
const totalIncident = computed(() =>
  props.items.reduce((total, item) => total + item.total, 0)
)
const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut',
    toolbar: { show: false }
  },
  labels: props.items.map(item => item.category),
  colors,
  legend: { show: false },
  dataLabels: { enabled: false },
  stroke: { width: 0 },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 18,
            formatter: () => 'Gangguan'
          },
          value: {
            show: true,
            offsetY: -12,
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--uui-gray-900)',
            formatter: () => formatNumber(totalIncident.value)
          },
          total: {
            show: true,
            showAlways: true,
            label: 'Gangguan',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--uui-gray-500)',
            formatter: () => formatNumber(totalIncident.value)
          }
        }
      }
    }
  },
  tooltip: {
    y: {
      formatter: value => formatUnit(value, 'gangguan')
    }
  }
}))
</script>

<template>
  <div class="grid grid-cols-1 items-center gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
    <ApexChart
      type="donut"
      height="190"
      :options="chartOptions"
      :series="chartSeries"
    />

    <div class="space-y-2">
      <div
        v-for="(item, index) in items"
        :key="item.category"
        class="flex items-center justify-between gap-3 text-sm"
      >
        <span class="flex min-w-0 items-center gap-2 text-[var(--uui-gray-700)]">
          <span
            class="h-2.5 w-2.5 shrink-0 rounded-full"
            :style="{ backgroundColor: colors[index] }"
            aria-hidden="true"
          />
          <span class="truncate">{{ item.category }}</span>
        </span>
        <span class="font-semibold text-[var(--uui-gray-900)]">{{ item.total }}</span>
      </div>
    </div>
  </div>
</template>
