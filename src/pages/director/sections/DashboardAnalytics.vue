<script setup lang="ts">
import {
  Handshake,
  TrendingUp,
  WalletCards,
} from 'lucide-vue-next'

import AnalyticsCard from '../../../components/cards/AnalyticsCard.vue'

import RevenueChart from '../../../components/charts/RevenueChart.vue'
import CustomerGrowthChart from '../../../components/charts/CustomerGrowthChart.vue'
import DonutPartnerChart from '../../../components/charts/DonutPartnerChart.vue'
import { customerGrowth } from '../../../mock/dashboard/customer-growth'
import { financialMetrics } from '../../../mock/dashboard/financial-metrics'
import { partnerDistribution } from '../../../mock/dashboard/partner-distribution'
</script>

<template>
  <section class="mt-4 sm:mt-6">
    <div class="grid grid-cols-12 gap-4 sm:gap-6">

      <div class="col-span-12 h-[460px] sm:h-[500px] xl:col-span-5">
        <AnalyticsCard
          title="Pergerakan Keuangan"
          :icon="WalletCards"
          icon-bg="bg-[#DDF6E8]"
          icon-color="text-[#28C76F]"
        >
          <RevenueChart :data="financialMetrics" />
        </AnalyticsCard>
      </div>

      <div class="col-span-12 h-[460px] sm:h-[500px] xl:col-span-4">
        <AnalyticsCard
          title="Grafik Kenaikan Pelanggan"
          subtitle="2026"
          :icon="TrendingUp"
          icon-bg="bg-[#E9E7FD]"
          icon-color="text-[#7367F0]"
        >
          <CustomerGrowthChart :data="customerGrowth" />
        </AnalyticsCard>
      </div>

      <div class="col-span-12 h-[500px] xl:col-span-3">
        <AnalyticsCard
          title="Total Mitra"
          :icon="Handshake"
          icon-bg="bg-[#FFF0E1]"
          icon-color="text-[#FF9F43]"
        >
          <DonutPartnerChart :data="partnerDistribution" />
        </AnalyticsCard>
      </div>

    </div>
  </section>
</template>
