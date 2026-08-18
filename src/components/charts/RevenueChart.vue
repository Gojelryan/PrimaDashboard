<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { ChevronDown } from 'lucide-vue-next'
import type { FinancialMovementData } from '../../types/dashboard'
import { formatCompactCurrency, formatCurrency } from '../../utils/dashboard-formatters'

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

  colors: ['var(--uui-success-600)', 'var(--uui-warning-600)'],

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
    borderColor: 'var(--uui-gray-200)',
    strokeDashArray: 4
  },

  xaxis: {
    categories: visibleFinancialHistory.value.map(
      item => item.month
    ),
    labels: {
      style: {
        colors: 'var(--uui-gray-500)'
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

            <p class="text-sm text-[var(--uui-gray-500)]">
              Pemasukan
            </p>

            <h3 class="mt-0 text-xl font-bold text-[var(--uui-gray-900)]">
              {{ formatCurrency(selectedFinancial.income) }}
            </h3>

          </div>

          <!-- Pengeluaran -->
          <div>

            <p class="text-sm text-[var(--uui-gray-500)]">
              Pengeluaran
            </p>

            <h3 class="mt-0 text-xl font-bold text-[var(--uui-gray-900)]">
              {{ formatCurrency(selectedFinancial.expense) }}
            </h3>

          </div>

        </div>

        <!-- Growth -->
        <div class="mt-2 flex items-center gap-3">

          <span
            class="rounded-md px-3 py-1 text-sm font-semibold"
            :class="incomeGrowthPercent >= 0
              ? 'bg-[var(--uui-success-50)] text-[var(--uui-success-600)]'
              : 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]'"
          >
            {{ incomeGrowthPercent > 0 ? '+' : '' }}{{ incomeGrowthPercent }}%
          </span>

          <span class="text-sm text-[var(--uui-gray-500)]">
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
            border-[var(--uui-gray-200)]
            bg-white
            pl-4
            pr-12
            text-sm
            text-[var(--uui-gray-700)]
            shadow-[0_2px_6px_rgba(47,43,61,0.10)]
            outline-none
            transition
            focus:border-[var(--uui-brand-600)]
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
              text-[var(--uui-gray-500)]
              "
         />

        </div>

    </div>

    <!-- Divider -->
    <div class="my-5 shrink-0 border-b border-[var(--uui-gray-200)]"></div>

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
