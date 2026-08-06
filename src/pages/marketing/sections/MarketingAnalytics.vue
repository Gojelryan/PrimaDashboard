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
      xl:auto-rows-[420px]
      xl:grid-cols-12
    "
  >
    <div class="h-[460px] sm:h-[480px] xl:col-span-6 xl:h-full">
      <AnalyticsCard
        title="Tren Pelanggan & Pendapatan"
        :subtitle="customerGrowth.periodLabel"
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
        { label: 'Total Mitra', value: partnerDistribution.totalPartner.toLocaleString('id-ID') },
        { label: 'Total Pelanggan', value: partnerDistribution.totalCustomer.toLocaleString('id-ID'), tone: 'success' }
      ]"
      search-placeholder="Cari nama Mitra atau wilayah..."
      @close="isPartnerDetailOpen = false"
    />
  </section>
</template>
