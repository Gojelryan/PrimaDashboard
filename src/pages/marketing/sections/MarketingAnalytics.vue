<script setup lang="ts">
import { ref } from 'vue'
import {
  LineChart,
  MapPinned,
} from 'lucide-vue-next'

import AnalyticsCard from '../../../components/cards/AnalyticsCard.vue'
import MarketingBranchCard from '../../../components/cards/MarketingBranchCard.vue'
import CustomerGrowthChart from '../../../components/charts/CustomerGrowthChart.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { customerGrowth } from '../../../mock/dashboard/customer-growth'
import { partnerDistribution } from '../../../mock/dashboard/partner-distribution'
import { formatNumber } from '../../../utils/dashboard-formatters'

const isPartnerDetailOpen = ref(false)

const partnerColumns = [
  { key: 'id', label: 'ID Mitra' },
  { key: 'name', label: 'Nama Mitra' },
  { key: 'area', label: 'Wilayah' },
  { key: 'totalCustomer', label: 'Total Pelanggan', align: 'right' as const }
]
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
      xl:grid-cols-12
    "
  >
    <div class="dashboard-chart-panel xl:col-span-6">
      <AnalyticsCard
        title="Tren Pelanggan & Pendapatan"
        :subtitle="customerGrowth.periodLabel"
        :icon="LineChart"
        icon-bg="bg-[var(--uui-blue-50)]"
        icon-color="text-[var(--uui-blue-600)]"
      >
        <CustomerGrowthChart :data="customerGrowth" />
      </AnalyticsCard>
    </div>

    <div class="dashboard-chart-panel xl:col-span-6">
      <MarketingBranchCard
        title="Distribusi Mitra"
        :icon="MapPinned"
        icon-bg="bg-[var(--uui-warning-50)]"
        icon-color="text-[var(--uui-warning-600)]"
        :data="partnerDistribution"
        @detail="isPartnerDetailOpen = true"
      />
    </div>

    <DetailTableModal
      :open="isPartnerDetailOpen"
      title="Detail Pelanggan Mitra"
      description="Daftar Mitra beserta wilayah dan total pelanggan masing-masing."
      :columns="partnerColumns"
      :rows="partnerDistribution.partners"
      :summary="[
        { label: 'Total Mitra', value: formatNumber(partnerDistribution.totalPartner) },
        { label: 'Total Pelanggan', value: formatNumber(partnerDistribution.totalCustomer), tone: 'success' }
      ]"
      search-placeholder="Cari nama Mitra atau wilayah..."
      @close="isPartnerDetailOpen = false"
    />
  </section>
</template>
