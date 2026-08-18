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
} from '../../../mock/dashboard/customer-detail-data'

const activeCustomerDetail = ref<'corporate' | 'retail' | null>(null)

const baseCustomerColumns = [
  { key: 'id', label: 'ID Pelanggan', sortable: true },
  { key: 'customer', label: 'Pelanggan', sortable: true },
  { key: 'area', label: 'Area', sortable: true },
  { key: 'package', label: 'Paket Layanan', sortable: true },
  { key: 'joinedAt', label: 'Tanggal Bergabung', sortable: true, sortType: 'date' as const }
]

const serviceStatusColumn = {
  key: 'customerStatus',
  label: 'Status Layanan',
  type: 'badge' as const,
  sortable: true
}

const billingStatusColumn = {
  key: 'billingStatus',
  label: 'Status Tagihan',
  type: 'badge' as const,
  sortable: true
}

const corporateCustomerColumns = [
  ...baseCustomerColumns,
  { key: 'outstanding', label: 'Outstanding', align: 'right' as const, sortable: true, sortType: 'currency' as const },
  serviceStatusColumn,
  { key: 'periodStatus', label: 'Keterangan Periode', type: 'badge' as const, sortable: true },
  billingStatusColumn
]

const retailCustomerColumns = [
  ...baseCustomerColumns,
  { key: 'monthlyFee', label: 'Iuran', align: 'right' as const, sortable: true, sortType: 'currency' as const },
  serviceStatusColumn,
  billingStatusColumn
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
      2xl:grid-cols-4
    "
  >
    <MarketingCustomerCard
      v-bind="corporateCustomerSummary"
      :icon="Building2"
      icon-bg="bg-[var(--uui-blue-50)]"
      icon-color="text-[var(--uui-blue-600)]"
    >
      <template #footer>
        <DetailAction inline @click="activeCustomerDetail = 'corporate'" />
      </template>
    </MarketingCustomerCard>

    <MarketingCustomerCard
      v-bind="retailCustomerSummary"
      :icon="Store"
      icon-bg="bg-[var(--uui-success-50)]"
      icon-color="text-[var(--uui-success-600)]"
    >
      <template #footer>
        <DetailAction inline @click="activeCustomerDetail = 'retail'" />
      </template>
    </MarketingCustomerCard>

    <MarketingTargetCard
      v-bind="targetCorporatePerformance"
      :icon="Target"
      icon-bg="bg-[var(--uui-brand-100)]"
      icon-color="text-[var(--uui-brand-600)]"
    />

    <MarketingTargetCard
      v-bind="targetRetailPerformance"
      :icon="Wifi"
      icon-bg="bg-[var(--uui-brand-100)]"
      icon-color="text-[var(--uui-brand-600)]"
    />

    <DetailTableModal
      :open="activeCustomerDetail === 'corporate'"
      title="Detail Pelanggan Corporate"
      description="Ringkasan populasi Corporate dan sampel 100 pelanggan. Label YTD hanya untuk mutasi tahun 2026."
      :columns="corporateCustomerColumns"
      :rows="corporateCustomerDetails"
      :summary="[
        { label: 'Total Pelanggan', value: corporateCustomerSummary.total },
        { label: `Pelanggan Baru ${corporateCustomerSummary.periodLabel}`, value: corporateCustomerSummary.newCustomer, tone: 'success' },
        { label: `Pelanggan Putus ${corporateCustomerSummary.periodLabel}`, value: corporateCustomerSummary.churnCustomer, tone: 'error' },
        { label: 'Outstanding', value: corporateCustomerSummary.outstanding, tone: 'warning' }
      ]"
      :page-size="10"
      search-placeholder="Cari pelanggan, area, atau paket..."
      @close="activeCustomerDetail = null"
    />

    <DetailTableModal
      :open="activeCustomerDetail === 'retail'"
      title="Detail Pelanggan Retail"
      description="Ringkasan populasi Retail Agustus 2026 dan sampel 100 pelanggan beserta status tagihannya."
      :columns="retailCustomerColumns"
      :rows="retailCustomerDetails"
      :summary="[
        { label: 'Total Pelanggan', value: retailCustomerSummary.total },
        { label: retailCustomerSummary.newCustomerLabel, value: retailCustomerSummary.newCustomer, tone: 'success' },
        { label: retailCustomerSummary.churnCustomerLabel, value: retailCustomerSummary.churnCustomer, tone: 'error' },
        { label: 'Outstanding', value: retailCustomerSummary.outstanding, tone: 'warning' }
      ]"
      :page-size="10"
      search-placeholder="Cari pelanggan, area, atau paket..."
      @close="activeCustomerDetail = null"
    />
  </section>
</template>
