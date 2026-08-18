<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { RadioTower, UserRoundCheck, UsersRound } from 'lucide-vue-next'

import MarketingSegmentCard from '../../../components/cards/MarketingSegmentCard.vue'
import MarketingStatusCard from '../../../components/cards/MarketingStatusCard.vue'
import MarketingTeamCard from '../../../components/cards/MarketingTeamCard.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import type { DetailTableRow } from '../../../components/modals/DetailTableModal.vue'
import {
  marketingCustomerSegments,
  marketingCustomerTotal,
} from '../../../mock/dashboard/marketing-customers-by-service'
import { portStatus } from '../../../mock/dashboard/marketing-port-status'
import {
  getMarketingCorporateCustomers,
  marketingTeamPerformance,
} from '../../../mock/dashboard/commercial-performance'
import { formatCustomerCurrency, formatNumber } from '../../../utils/dashboard-formatters'

const isMarketingTeamDetailOpen = ref(false)
const activeMarketingId = ref<string | null>(null)

const marketingTeamColumns = [
  { key: 'name', label: 'Nama Marketing', sortable: true },
  { key: 'area', label: 'Area', sortable: true },
  {
    key: 'retailCustomer',
    label: 'Retail (Agu 2026)',
    align: 'right' as const,
    sortable: true,
    sortType: 'number' as const,
  },
  {
    key: 'corporateCustomer',
    label: 'Corporate (YTD 2026)',
    align: 'right' as const,
    sortable: true,
    sortType: 'number' as const,
  },
  {
    key: 'project',
    label: 'Project',
    align: 'right' as const,
    sortable: true,
    sortType: 'number' as const,
  },
]

const corporateCustomerColumns = [
  { key: 'customer', label: 'Pelanggan Corporate', sortable: true },
  { key: 'area', label: 'Area', sortable: true },
  { key: 'package', label: 'Paket Layanan', sortable: true },
  { key: 'joinedAt', label: 'Tanggal Bergabung', sortable: true, sortType: 'date' as const },
  { key: 'contractValue', label: 'Nilai Kontrak', align: 'right' as const, sortable: true, sortType: 'currency' as const },
  { key: 'customerStatus', label: 'Status Layanan', type: 'badge' as const, sortable: true },
]

const activeMarketing = computed(() =>
  marketingTeamPerformance.members.find(member => member.id === activeMarketingId.value)
)
const activeCorporateCustomers = computed(() =>
  activeMarketingId.value
    ? getMarketingCorporateCustomers(activeMarketingId.value)
    : []
)
const activeCorporateCustomerRows = computed(() =>
  activeCorporateCustomers.value.map(customer => ({
    ...customer,
    contractValue: formatCustomerCurrency(customer.contractValue),
  }))
)
const activeCorporateContractValue = computed(() =>
  activeCorporateCustomers.value.reduce(
    (total, customer) => total + customer.contractValue,
    0
  )
)

async function openMarketingCorporateDetail(row: DetailTableRow) {
  isMarketingTeamDetailOpen.value = false
  await nextTick()
  activeMarketingId.value = String(row.id)
}

async function closeMarketingCorporateDetail() {
  activeMarketingId.value = null
  await nextTick()
  isMarketingTeamDetailOpen.value = true
}
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
      lg:grid-cols-2
      xl:grid-cols-3
    "
  >
    <div>
      <MarketingSegmentCard
        title="Pelanggan per Segmen"
        subtitle="Komposisi seluruh pelanggan aktif"
        :total="marketingCustomerTotal"
        :icon="UsersRound"
        icon-bg="bg-[var(--uui-blue-50)]"
        icon-color="text-[var(--uui-blue-600)]"
        :items="marketingCustomerSegments"
      />
    </div>

    <div>
      <MarketingStatusCard
        title="Status Port Wilayah"
        :progress="portStatus.progress"
        :home-pass="portStatus.homePass"
        :empty-port="portStatus.emptyPort"
        :potential-areas="portStatus.potentialAreas"
        :icon="RadioTower"
        icon-bg="bg-[var(--uui-error-50)]"
        icon-color="text-[var(--uui-error-600)]"
      />
    </div>

    <div>
      <MarketingTeamCard
        title="Tim Marketing"
        :period-label="marketingTeamPerformance.periodLabel"
        :retail-customer-total="marketingTeamPerformance.retailCustomerTotal"
        :corporate-customer-total="marketingTeamPerformance.corporateCustomerTotal"
        :project-total="marketingTeamPerformance.projectTotal"
        :members="marketingTeamPerformance.members"
        :icon="UserRoundCheck"
        icon-bg="bg-[var(--uui-brand-100)]"
        icon-color="text-[var(--uui-brand-600)]"
        @detail="isMarketingTeamDetailOpen = true"
      />
    </div>

    <DetailTableModal
      :open="isMarketingTeamDetailOpen"
      title="Detail Pencapaian Tim Marketing"
      :description="`Retail ${marketingTeamPerformance.retailPeriodLabel}, Corporate ${marketingTeamPerformance.corporatePeriodLabel}, dan Project aktif ${marketingTeamPerformance.periodLabel.toLocaleLowerCase('id-ID')}.`"
      :columns="marketingTeamColumns"
      :rows="marketingTeamPerformance.members"
      :summary="[
        { label: 'Total Marketing', value: formatNumber(marketingTeamPerformance.totalMember) },
        { label: `Retail ${marketingTeamPerformance.retailPeriodLabel}`, value: formatNumber(marketingTeamPerformance.retailCustomerTotal), tone: 'success' },
        { label: `Corporate ${marketingTeamPerformance.corporatePeriodLabel}`, value: formatNumber(marketingTeamPerformance.corporateCustomerTotal) },
        { label: 'Project Aktif', value: formatNumber(marketingTeamPerformance.projectTotal), tone: 'warning' }
      ]"
      :page-size="10"
      row-action-label="Lihat pelanggan Corporate"
      search-placeholder="Cari nama marketing atau area..."
      @close="isMarketingTeamDetailOpen = false"
      @row-action="openMarketingCorporateDetail"
    />

    <DetailTableModal
      :open="activeMarketingId !== null"
      :title="`Pelanggan Corporate - ${activeMarketing?.name ?? ''}`"
      :description="`Daftar pelanggan Corporate ${marketingTeamPerformance.corporatePeriodLabel} yang diatribusikan kepada marketing beserta nilai kontraknya.`"
      :columns="corporateCustomerColumns"
      :rows="activeCorporateCustomerRows"
      :summary="[
        { label: 'Marketing', value: activeMarketing?.name ?? '-' },
        { label: 'Total Pelanggan Corporate', value: formatNumber(activeCorporateCustomers.length), tone: 'success' },
        { label: 'Total Nilai Kontrak', value: formatCustomerCurrency(activeCorporateContractValue), tone: 'warning' }
      ]"
      search-placeholder="Cari pelanggan, area, atau paket..."
      @close="closeMarketingCorporateDetail"
    />
  </section>
</template>
