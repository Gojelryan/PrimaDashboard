<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { ChevronDown } from 'lucide-vue-next'
import type { FinancialMovementData } from '../../types/dashboard'

const props = defineProps<{
  data: FinancialMovementData
}>()

const selectedMonth = ref(props.data.selectedMonth)

watch(
  () => props.data.selectedMonth,
  value => {
    selectedMonth.value = value
  }
)

const months = computed(() => props.data.monthly.map(
  item => item.label
))

const selectedMonthIndex = computed(() => {
  const index = props.data.monthly.findIndex(
    item => item.label === selectedMonth.value
  )

  return index >= 0
    ? index
    : Math.max(props.data.monthly.length - 1, 0)
})

const selectedFinancial = computed(() =>
  props.data.monthly[selectedMonthIndex.value] ?? {
    month: '',
    label: '',
    income: 0,
    expense: 0
  }
)

const previousFinancial = computed(() =>
  props.data.monthly[selectedMonthIndex.value - 1]
)

const visibleFinancialHistory = computed(() =>
  props.data.monthly.slice(0, selectedMonthIndex.value + 1)
)

const incomeGrowthPercent = computed(() => {
  if (!previousFinancial.value) {
    return 0
  }

  const growth =
    ((selectedFinancial.value.income - previousFinancial.value.income) /
      previousFinancial.value.income) *
    100

  return Number(growth.toFixed(1))
})

const chartSeries = computed(() => [
  {
    name: 'Pemasukan',
    data: visibleFinancialHistory.value.map(
      item => item.income
    )
  },
  {
    name: 'Pengeluaran',
    data: visibleFinancialHistory.value.map(
      item => item.expense
    )
  }
])

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'area',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },

  colors: ['#079455', '#DC6803'],

  dataLabels: {
    enabled: false
  },

  stroke: {
    curve: 'smooth',
    width: 3
  },

  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.24,
      opacityTo: 0.02,
      stops: [0, 90, 100]
    }
  },

  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left'
  },

  grid: {
    borderColor: '#EAECF0',
    strokeDashArray: 4
  },

  xaxis: {
    categories: visibleFinancialHistory.value.map(
      item => item.month
    ),
    labels: {
      style: {
        colors: '#667085'
      }
    }
  },

  yaxis: {
    labels: {
      formatter(value: number) {
        return formatCompactCurrency(value)
      }
    }
  },

  tooltip: {
    y: {
      formatter(value: number) {
        return formatCurrency(value)
      }
    }
  }
}))

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

function formatCompactCurrency(value: number) {
  const billion = value / 1000000000

  return `Rp ${billion.toLocaleString('id-ID', {
    maximumFractionDigits: 1
  })} M`
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden">

    <!-- Top Section -->
    <div class="flex shrink-0 flex-col gap-4 2xl:flex-row 2xl:items-start 2xl:justify-between">

      <!-- Left -->
      <div>

        <div class="flex flex-wrap gap-6">

          <!-- Pemasukan -->
          <div>

            <p class="text-sm text-[#A5A2AD]">
              Pemasukan
            </p>

            <h3 class="mt-0 text-xl font-bold text-[#5D596C]">
              {{ formatCurrency(selectedFinancial.income) }}
            </h3>

          </div>

          <!-- Pengeluaran -->
          <div>

            <p class="text-sm text-[#A5A2AD]">
              Pengeluaran
            </p>

            <h3 class="mt-0 text-xl font-bold text-[#5D596C]">
              {{ formatCurrency(selectedFinancial.expense) }}
            </h3>

          </div>

        </div>

        <!-- Growth -->
        <div class="mt-2 flex items-center gap-3">

          <span
            class="rounded-md px-3 py-1 text-sm font-semibold"
            :class="incomeGrowthPercent >= 0
              ? 'bg-[#DDF6E8] text-[#28C76F]'
              : 'bg-[#FCE5E6] text-[#EA5455]'"
          >
            {{ incomeGrowthPercent > 0 ? '+' : '' }}{{ incomeGrowthPercent }}%
          </span>

          <span class="text-sm text-[#A5A2AD]">
            dari bulan lalu
          </span>

        </div>

      </div>

      <!-- Right -->
      <div class="relative">

        <select
            v-model="selectedMonth"
            aria-label="Pilih periode keuangan"
            class="
            appearance-none
            h-10
            w-48
            rounded-lg
            border
            border-[#DBDADE]
            bg-white
            pl-4
            pr-12
            text-sm
            text-[#6F6B7D]
            shadow-[0_2px_6px_rgba(47,43,61,0.10)]
            outline-none
            transition
            focus:border-[#7367F0]
            cursor-pointer
         "
         >
        <option
            v-for="month in months"
            :key="month"
         >
           {{ month }}
           </option>
          </select>

        <ChevronDown
              class="
              pointer-events-none
              absolute
              right-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-[#A5A2AD]
              "
         />

        </div>

    </div>

    <!-- Divider -->
    <div class="my-5 shrink-0 border-b border-[#DBDADE]"></div>

      <!-- Chart -->
    <div class="min-h-0 flex-1 overflow-hidden">

      <ApexChart
        :key="selectedMonth"
        type="area"
        height="100%"
        :options="chartOptions"
        :series="chartSeries"
      />

    </div>

  </div>
</template>
