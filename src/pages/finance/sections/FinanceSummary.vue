<script setup lang="ts">
import { ref } from 'vue'
import {
  AlertTriangle,
  ArrowLeftRight,
  Banknote,
  HandCoins,
  Landmark,
  TrendingUp,
} from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { financeDashboard } from '../../../mock/dashboard/finance-dashboard'
import {
  totalCustomerOutstanding,
} from '../../../mock/dashboard/customer-metrics'
import { formatCustomerCurrency } from '../../../utils/dashboard-formatters'
import {
  payableDetails,
  receivableDetails,
} from '../../../mock/dashboard/priority-detail-data'

const activeFinanceDetail = ref<'receivable' | 'payable' | null>(null)

const receivableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Pelanggan' },
  { key: 'invoice', label: 'Invoice' },
  { key: 'dueDate', label: 'Jatuh Tempo' },
  { key: 'age', label: 'Umur Piutang' },
  { key: 'amount', label: 'Nilai', align: 'right' as const },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const payableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'vendor', label: 'Vendor' },
  { key: 'invoice', label: 'Invoice' },
  { key: 'dueDate', label: 'Jatuh Tempo' },
  { key: 'category', label: 'Kategori' },
  { key: 'amount', label: 'Nilai', align: 'right' as const },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const overdueReceivable = 930_000_000

const receivableSummary = [
  { label: 'Total Piutang', value: formatCustomerCurrency(totalCustomerOutstanding) },
  { label: 'Lewat Jatuh Tempo', value: formatCustomerCurrency(overdueReceivable), tone: 'error' as const },
  { label: 'Belum Jatuh Tempo', value: formatCustomerCurrency(totalCustomerOutstanding - overdueReceivable), tone: 'warning' as const }
]

const payableSummary = [
  { label: 'Total Hutang', value: 'Rp 550.000.000' },
  { label: 'Jatuh Tempo Terdekat', value: '28 Juli 2026', tone: 'warning' as const },
  { label: 'Perlu Disiapkan', value: 'Rp 175.000.000', tone: 'error' as const }
]

function openFinanceDetail(title: string) {
  activeFinanceDetail.value = title === 'Piutang' ? 'receivable' : 'payable'
}

const cardPresentation = [
  {
    icon: Banknote,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    accent: 'bg-[var(--uui-brand-600)]'
  },
  {
    icon: ArrowLeftRight,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    accent: 'bg-[var(--uui-success-600)]'
  },
  {
    icon: HandCoins,
    iconBg: 'bg-[var(--uui-blue-50)]',
    iconColor: 'text-[var(--uui-blue-600)]',
    accent: 'bg-[var(--uui-blue-600)]'
  },
  {
    icon: Landmark,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]',
    accent: 'bg-[var(--uui-warning-600)]'
  }
]
</script>

<template>
  <section>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BaseCard
        v-for="(item, index) in financeDashboard.summary"
        :key="item.title"
        padding="compact"
      >
        <CardHeader
          :title="item.title"
          :icon="cardPresentation[index].icon"
          :icon-bg="cardPresentation[index].iconBg"
          :icon-color="cardPresentation[index].iconColor"
        />

        <p class="mt-3 whitespace-nowrap text-xl font-semibold tracking-tight text-[var(--uui-gray-900)] sm:text-2xl">
          {{ item.value }}
        </p>

        <div
          v-if="item.title === 'Total Kas'"
          class="mt-4 flex flex-wrap items-center gap-2 text-sm"
        >
          <span class="inline-flex items-center gap-1 rounded px-2 py-1 font-medium text-[var(--uui-success-600)] bg-[var(--uui-success-50)]">
            <TrendingUp class="h-3.5 w-3.5" aria-hidden="true" />
            {{ item.detail }}
          </span>
          <span class="text-[var(--uui-gray-700)]">{{ item.note }}</span>
        </div>

        <div
          v-else-if="item.title === 'Cash Flow Bulan ini'"
          class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm"
        >
          <span class="font-medium text-[var(--uui-success-600)]">{{ item.detail }}</span>
          <span class="font-medium text-[var(--uui-error-600)]">{{ item.note }}</span>
        </div>

        <p v-else-if="item.period" class="mt-4 text-sm text-[var(--uui-gray-700)]">
          {{ item.period }}
        </p>

        <p v-else class="mt-4 flex items-center gap-2 text-sm text-[var(--uui-warning-600)]">
          <AlertTriangle class="h-4 w-4 shrink-0" aria-hidden="true" />
          {{ item.note }}
        </p>

        <DetailAction
          v-if="item.title === 'Piutang' || item.title === 'Hutang'"
          @click="openFinanceDetail(item.title)"
        />
      </BaseCard>
    </div>

    <div
      class="
        mt-4
        flex
        items-start
        gap-3
        rounded-lg
        border
        border-[var(--uui-warning-600)]/30
        bg-[var(--uui-warning-50)]
        px-4
        py-3
        text-sm
        text-[var(--uui-warning-700)]
      "
      role="alert"
    >
      <AlertTriangle class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p class="font-semibold">Pengingat jatuh tempo</p>
        <p class="mt-0.5 text-[var(--uui-warning-700)]">
          Hutang terdekat sebesar Rp 550 juta jatuh tempo pada 28 Juli 2026.
          Pastikan saldo pembayaran tersedia sebelum tanggal tersebut.
        </p>
      </div>
    </div>

    <DetailTableModal
      :open="activeFinanceDetail === 'receivable'"
      title="Detail Piutang"
      description="Daftar piutang pelanggan per Juli 2026."
      :columns="receivableColumns"
      :rows="receivableDetails"
      :summary="receivableSummary"
      search-placeholder="Cari pelanggan atau invoice..."
      @close="activeFinanceDetail = null"
    />

    <DetailTableModal
      :open="activeFinanceDetail === 'payable'"
      title="Detail Hutang"
      description="Daftar kewajiban vendor dan jadwal jatuh tempo."
      :columns="payableColumns"
      :rows="payableDetails"
      :summary="payableSummary"
      search-placeholder="Cari vendor, invoice, atau kategori..."
      @close="activeFinanceDetail = null"
    />
  </section>
</template>
