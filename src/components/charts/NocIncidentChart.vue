<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const props = defineProps<{
  items: readonly {
    category: string
    total: number
  }[]
}>()

const colors = ['#7F56D9', '#DC6803', '#D92D20', '#1570EF', '#079455']
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
            color: '#101828',
            formatter: () => totalIncident.value.toLocaleString('id-ID')
          },
          total: {
            show: true,
            showAlways: true,
            label: 'Gangguan',
            fontSize: '14px',
            fontWeight: 500,
            color: '#667085',
            formatter: () => totalIncident.value.toLocaleString('id-ID')
          }
        }
      }
    }
  },
  tooltip: {
    y: {
      formatter: value => `${value.toLocaleString('id-ID')} gangguan`
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
        <span class="flex min-w-0 items-center gap-2 text-[#6F6B7D]">
          <span
            class="h-2.5 w-2.5 shrink-0 rounded-full"
            :style="{ backgroundColor: colors[index] }"
            aria-hidden="true"
          />
          <span class="truncate">{{ item.category }}</span>
        </span>
        <span class="font-semibold text-[#5D596C]">{{ item.total }}</span>
      </div>
    </div>
  </div>
</template>
