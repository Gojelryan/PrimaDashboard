<script setup lang="ts">
import { ref } from 'vue'
import {
  Building2,
  Store,
  Target,
  Wifi,
} from 'lucide-vue-next'

import DetailAction from '../../../components/cards/DetailAction.vue'
import MarketingCustomerCard from '../../../components/cards/MarketingCustomerCard.vue'
import MarketingTargetCard from '../../../components/cards/MarketingTargetCard.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import {
  corporateCustomerSummary,
  retailCustomerSummary,
} from '../../../mock/dashboard/marketing-customer-summary'
import {
  targetCorporatePerformance,
  targetRetailPerformance,
} from '../../../mock/dashboard/marketing-target-performance'
import {
  corporateCustomerDetails,
  retailCustomerDetails,
} from '../../../mock/dashboard/priority-detail-data'

const activeCustomerDetail = ref<'corporate' | 'retail' | null>(null)

const customerColumns = [
  { key: 'id', label: 'ID Pelanggan' },
  { key: 'customer', label: 'Pelanggan' },
  { key: 'area', label: 'Area' },
  { key: 'package', label: 'Paket Layanan' },
  { key: 'joinedAt', label: 'Tanggal Bergabung' },
  { key: 'outstanding', label: 'Outstanding', align: 'right' as const },
  { key: 'status', label: 'Status', type: 'badge' as const }
]
</script>

<template>
  <section
    class="
      grid
      auto-rows-auto
      grid-cols-1
      gap-4
      sm:gap-6
      md:grid-cols-2
      2xl:auto-rows-[224px]
      2xl:grid-cols-4
    "
  >
    <MarketingCustomerCard
      v-bind="corporateCustomerSummary"
      :icon="Building2"
      icon-bg="bg-[#D9F7FC]"
      icon-color="text-[#00CFE8]"
    >
      <template #footer>
        <DetailAction inline @click="activeCustomerDetail = 'corporate'" />
      </template>
    </MarketingCustomerCard>

    <MarketingCustomerCard
      v-bind="retailCustomerSummary"
      :icon="Store"
      icon-bg="bg-[#DDF6E8]"
      icon-color="text-[#28C76F]"
    >
      <template #footer>
        <DetailAction inline @click="activeCustomerDetail = 'retail'" />
      </template>
    </MarketingCustomerCard>

    <MarketingTargetCard
      v-bind="targetCorporatePerformance"
      :icon="Target"
      icon-bg="bg-[#E9E7FD]"
      icon-color="text-[#7367F0]"
    />

    <MarketingTargetCard
      v-bind="targetRetailPerformance"
      :icon="Wifi"
      icon-bg="bg-[#E9E7FD]"
      icon-color="text-[#7367F0]"
    />

    <DetailTableModal
      :open="activeCustomerDetail === 'corporate'"
      title="Detail Pelanggan Corporate"
      description="Pelanggan Corporate terbaru beserta nilai outstanding."
      :columns="customerColumns"
      :rows="corporateCustomerDetails"
      :summary="[
        { label: 'Total Pelanggan', value: corporateCustomerSummary.total },
        { label: 'Pelanggan Baru', value: corporateCustomerSummary.newCustomer, tone: 'success' },
        { label: 'Pelanggan Putus', value: corporateCustomerSummary.churnCustomer, tone: 'error' },
        { label: 'Outstanding', value: corporateCustomerSummary.outstanding, tone: 'warning' }
      ]"
      search-placeholder="Cari pelanggan, area, atau paket..."
      @close="activeCustomerDetail = null"
    />

    <DetailTableModal
      :open="activeCustomerDetail === 'retail'"
      title="Detail Pelanggan Retail"
      description="Pelanggan Retail terbaru beserta nilai outstanding."
      :columns="customerColumns"
      :rows="retailCustomerDetails"
      :summary="[
        { label: 'Total Pelanggan', value: retailCustomerSummary.total },
        { label: 'Pelanggan Baru', value: retailCustomerSummary.newCustomer, tone: 'success' },
        { label: 'Pelanggan Putus', value: retailCustomerSummary.churnCustomer, tone: 'error' },
        { label: 'Outstanding', value: retailCustomerSummary.outstanding, tone: 'warning' }
      ]"
      search-placeholder="Cari pelanggan, area, atau paket..."
      @close="activeCustomerDetail = null"
    />
  </section>
</template>
