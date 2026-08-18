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

      <div class="dashboard-chart-panel col-span-12 xl:col-span-5">
        <AnalyticsCard
          title="Pergerakan Keuangan"
          :icon="WalletCards"
          icon-bg="bg-[var(--uui-success-50)]"
          icon-color="text-[var(--uui-success-600)]"
        >
          <RevenueChart :data="financialMetrics" />
        </AnalyticsCard>
      </div>

      <div class="dashboard-chart-panel col-span-12 xl:col-span-4">
        <AnalyticsCard
          title="Tren Pelanggan & Pendapatan"
          :subtitle="customerGrowth.periodLabel"
          :icon="TrendingUp"
          icon-bg="bg-[var(--uui-brand-100)]"
          icon-color="text-[var(--uui-brand-600)]"
        >
          <CustomerGrowthChart :data="customerGrowth" />
        </AnalyticsCard>
      </div>

      <div class="dashboard-chart-panel col-span-12 xl:col-span-3">
        <AnalyticsCard
          title="Distribusi Mitra"
          :icon="Handshake"
          icon-bg="bg-[var(--uui-warning-50)]"
          icon-color="text-[var(--uui-warning-600)]"
        >
          <DonutPartnerChart :data="partnerDistribution" />
        </AnalyticsCard>
      </div>

    </div>
  </section>
</template>
