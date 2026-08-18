<script setup lang="ts">
import { computed } from 'vue'
import ApexChart from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { formatNumber } from '../../utils/dashboard-formatters'

interface PartnerArea {
  name: string
  partner: number
  customer: number
}

const props = defineProps<{
  data: {
    totalPartner: number
    areas: PartnerArea[]
  }
}>()

const chartColors = [
  'var(--uui-brand-600)',
  'var(--uui-success-600)',
  'var(--uui-warning-600)',
  'var(--uui-error-600)',
  'var(--uui-blue-600)',
  'var(--uui-brand-500)',
  'var(--uui-error-500)',
  'var(--uui-success-500)'
]

const chartSeries = computed(() => props.data.areas.map(
  area => area.customer
))

const totalCustomer = computed(() => {

  return props.data.areas.reduce(
    (total, area) => total + area.customer,
    0
  )

})

const chartOptions = computed<ApexOptions>(() => ({

  chart: {
    type: 'donut',
    height: 150,
    parentHeightOffset: 0,
    toolbar: {
      show: false
    }
  },

  labels: props.data.areas.map(
    area => area.name
  ),

  colors: chartColors,

  legend: {
    show: false
  },

  dataLabels: {
    enabled: false
  },

  stroke: {
    width: 0
  },

  plotOptions: {
    pie: {
      donut: {
        size: '72%'
      }
    }
  }

}))

</script>

<template>

<div class="flex h-full min-h-0 flex-col overflow-hidden">

    <!-- SUMMARY -->

    <div class="grid shrink-0 grid-cols-2 gap-6">

        <div>

            <p class="text-[11px] uppercase tracking-wide text-[var(--uui-gray-500)]">
                Total Mitra
            </p>

            <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
                {{ formatNumber(data.totalPartner) }}
            </p>

        </div>

        <div class="text-right">

            <p class="text-[11px] uppercase tracking-wide text-[var(--uui-gray-500)]">
                Total Pelanggan
            </p>

            <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
                {{ formatNumber(totalCustomer) }}
            </p>

        </div>

    </div>

    <!-- DONUT -->

    <div class="my-4 flex h-36 shrink-0 items-center justify-center">

        <ApexChart
            width="150"
            height="150"
            type="donut"
            :options="chartOptions"
            :series="chartSeries"
        />

    </div>

    <div class="shrink-0 border-t border-[var(--uui-gray-200)]"></div>

    <!-- LIST -->

    <div class="relative mt-4 min-h-0 flex-1 overflow-hidden">

        <div
            class="
                h-full
                overflow-y-auto
                pr-2
            "
        >

            <div
                class="
                    space-y-3
                "
            >

                <div
                    v-for="(area,index) in data.areas"
                    :key="area.name"
                    class="
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <div
                        class="
                            flex
                            min-w-0
                            items-center
                            gap-2
                        "
                    >

                        <div
                            class="
                                h-3
                                w-3
                                shrink-0
                                rounded-full
                            "
                            :style="{
                                backgroundColor: chartColors[index % chartColors.length]
                            }"
                        />

                        <div class="min-w-0">

                            <p
                                class="
                                    text-sm
                                    font-medium
                                    text-[var(--uui-gray-900)]
                                    truncate
                                "
                            >
                                {{ area.name }}
                            </p>

                            <p
                                class="
                                    mt-1
                                    text-xs
                                    text-[var(--uui-gray-500)]
                                "
                            >
                                {{ area.partner }} Mitra
                            </p>

                        </div>

                    </div>

                    <span
                        class="
                            text-sm
                            font-semibold
                            text-[var(--uui-gray-900)]
                            shrink-0
                        "
                    >
                        {{ formatNumber(area.customer) }}
                    </span>

                </div>

            </div>

        </div>

        <!-- MASK -->

        <div
            class="
                pointer-events-none
                absolute
                bottom-0
                left-0
                right-0
                h-8
                bg-gradient-to-t
                from-white
                to-transparent
            "
        />

    </div>

</div>

</template>
