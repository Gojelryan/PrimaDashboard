<script setup lang="ts">
import {
  LineChart,
  MapPinned,
} from 'lucide-vue-next'

import AnalyticsCard from '../../../components/cards/AnalyticsCard.vue'
import MarketingBranchCard from '../../../components/cards/MarketingBranchCard.vue'
import CustomerGrowthChart from '../../../components/charts/CustomerGrowthChart.vue'
import { customerGrowth } from '../../../mock/dashboard/customer-growth'
import { partnerDistribution } from '../../../mock/dashboard/partner-distribution'
</script>

<template>
  <section
    class="
      mt-4
      sm:mt-6
      grid
      auto-rows-auto
      grid-cols-1
      gap-4
      sm:gap-6
      xl:auto-rows-[420px]
      xl:grid-cols-12
    "
  >
    <div class="h-[460px] sm:h-[480px] xl:col-span-6 xl:h-full">
      <AnalyticsCard
        title="Grafik Kenaikan Pelanggan"
        subtitle="2026"
        :icon="LineChart"
        icon-bg="bg-[#D9F7FC]"
        icon-color="text-[#00CFE8]"
      >
        <CustomerGrowthChart :data="customerGrowth" />
      </AnalyticsCard>
    </div>

    <div class="min-h-[420px] xl:col-span-6 xl:h-full">
      <MarketingBranchCard
        title="Distribusi Mitra"
        :icon="MapPinned"
        icon-bg="bg-[#FFF0E1]"
        icon-color="text-[#FF9F43]"
        :data="partnerDistribution"
      />
    </div>
  </section>
</template>
