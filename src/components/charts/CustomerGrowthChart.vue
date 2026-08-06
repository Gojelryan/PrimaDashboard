<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
interface GrowthSeries {
  categories: readonly string[]
  series: readonly number[]
  newCustomers?: readonly number[]
  churnCustomers?: readonly number[]
}

interface TooltipContext {
  seriesIndex: number
  dataPointIndex: number
}

const props = defineProps<{
  data: {
    corporate: GrowthSeries
    retail: GrowthSeries
    partner: GrowthSeries
  }
}>()

const selectedType = ref<'corporate' | 'retail'>('retail')
const showPartner = ref(false)

watch(selectedType, (value) => {
  if (value === 'corporate') {
    showPartner.value = false
  }
})

const chartSeries = computed(() => {
  if (selectedType.value === 'corporate') {
    return [
      {
        name: 'Pendapatan Corporate',
        data: [...props.data.corporate.series]
      }
    ]
  }

  if (showPartner.value) {
    return [
      {
        name: 'Retail',
        data: [...props.data.retail.series]
      },
      {
        name: 'Mitra',
        data: [...props.data.partner.series]
      }
    ]
  }

  return [
    {
      name: 'Retail',
      data: [...props.data.retail.series]
    }
  ]
})

const chartCategories = computed(() =>
  selectedType.value === 'corporate'
    ? [...props.data.corporate.categories]
    : [...props.data.retail.categories]
)

const chartOptions = computed<ApexOptions>(() => {
  const isCorporate = selectedType.value === 'corporate'

  return {

    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },

    colors: ['#7F56D9', '#079455'],

    stroke: {
      curve: 'smooth',
      width: 3
    },

    dataLabels: {
      enabled: false
    },

    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left'
    },

    grid: {
      borderColor: '#EAECF0'
    },

    xaxis: {
      categories: chartCategories.value
    },

    yaxis: isCorporate
  ? {
      min: 0,
      max: 3500,
      tickAmount: 7,
      decimalsInFloat: 0,

      labels: {
        show: true,

        formatter(value: number) {

          if (value === 0) {
            return 'Rp 0'
          }

          if (value >= 1000) {
            const billion = value / 1000

            if (Number.isInteger(billion)) {
              return `Rp ${billion} M`
            }

            return `Rp ${billion.toLocaleString('id-ID')} M`
          }

          return `Rp ${value} Jt`
        }
      }
    }
  : {
      min: 0,
      tickAmount: 5,

      labels: {
        formatter(value: number) {
          return value.toLocaleString('id-ID')
        }
      }
    },

    tooltip: {
      y: {
        formatter(value: number, context?: TooltipContext) {
          return isCorporate
            ? formatCorporateRevenue(value)
            : formatCustomerMovement(context)
        }
      }
    },

}
})

function formatCorporateRevenue(value: number) {
  if (value >= 1000) {
    return `Rp ${(value / 1000).toLocaleString('id-ID', {
      maximumFractionDigits: 2
    })} M`
  }

  return `Rp ${value.toLocaleString('id-ID')} Jt`
}

function formatCustomerMovement(context?: TooltipContext) {
  if (!context) return 'Baru: – · Putus: –'

  const growthData = showPartner.value && context.seriesIndex === 1
    ? props.data.partner
    : props.data.retail
  const newCustomer = growthData.newCustomers?.[context.dataPointIndex]
  const churnCustomer = growthData.churnCustomers?.[context.dataPointIndex]

  if (newCustomer === undefined || churnCustomer === undefined) {
    return 'Baru: – · Putus: –'
  }

  return `Baru: ${newCustomer} · Putus: ${churnCustomer}`
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden">

    <div class="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div class="flex flex-wrap gap-6">

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="selectedType"
            type="radio"
            value="corporate"
            class="accent-[#7367F0]"
          >
          <span class="text-sm font-medium text-[#6F6B7D]">
            Corporate
          </span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="selectedType"
            type="radio"
            value="retail"
            class="accent-[#7367F0]"
          >
          <span class="text-sm font-medium text-[#6F6B7D]">
            Retail
          </span>
        </label>

      </div>

      <div
        class="flex items-center gap-3"
        :class="selectedType === 'corporate'
          ? 'opacity-50 pointer-events-none'
          : ''"
      >

        <span class="text-sm text-[#6F6B7D]">
          Mitra
        </span>

        <button
          type="button"
          role="switch"
          aria-label="Tampilkan data mitra"
          :aria-checked="showPartner"
          :disabled="selectedType === 'corporate'"
          class="relative h-6 w-11 rounded-full transition"
          :class="[
            showPartner ? 'bg-[#7367F0]' : 'bg-[#DBDADE]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7367F0]'
          ]"
          @click="showPartner = !showPartner"
        >
          <span
            class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition"
            :class="showPartner ? 'translate-x-5' : ''"
          />
        </button>

      </div>

    </div>

    <div class="my-5 shrink-0 border-b border-[#DBDADE]"></div>

    <div class="min-h-0 flex-1 overflow-hidden">

      <ApexChart
  :key="`${selectedType}-${showPartner}`"
  type="line"
  height="100%"
  :options="chartOptions"
  :series="chartSeries"
/>

    </div>

  </div>
</template>
