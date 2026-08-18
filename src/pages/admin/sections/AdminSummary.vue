<script setup lang="ts">
import { ref } from 'vue'
import {
  AlertTriangle,
  Ban,
  UserCheck,
  UserX,
  Users,
} from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { adminCustomerStatus } from '../../../mock/dashboard/admin-customer-status'
import { isolatedCustomerDetails } from '../../../mock/dashboard/priority-detail-data'

const isIsolatedDetailOpen = ref(false)

const isolatedCustomerColumns = [
  { key: 'id', label: 'ID Pelanggan' },
  { key: 'customer', label: 'Pelanggan' },
  { key: 'service', label: 'Layanan' },
  { key: 'invoice', label: 'Invoice' },
  { key: 'overdue', label: 'Tunggakan' },
  { key: 'lastPayment', label: 'Pembayaran Terakhir' },
  { key: 'pic', label: 'PIC' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const isolatedCustomerSummary = [
  { label: 'Total Isolir', value: '100', tone: 'error' as const },
  { label: 'Perlu Verifikasi', value: '63', tone: 'warning' as const },
  { label: 'Dijadwalkan Aktif', value: '37', tone: 'success' as const }
]

const statusPresentation = [
  {
    icon: Users,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    accent: 'bg-[var(--uui-brand-600)]'
  },
  {
    icon: UserCheck,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    accent: 'bg-[var(--uui-success-600)]'
  },
  {
    icon: Ban,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]',
    accent: 'bg-[var(--uui-warning-600)]'
  },
  {
    icon: UserX,
    iconBg: 'bg-[var(--uui-error-50)]',
    iconColor: 'text-[var(--uui-error-600)]',
    accent: 'bg-[var(--uui-error-600)]'
  }
]
</script>

<template>
  <section>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BaseCard
        v-for="(status, index) in adminCustomerStatus"
        :key="status.title"
        padding="compact"
      >
        <CardHeader
          :title="status.title"
          :icon="statusPresentation[index].icon"
          :icon-bg="statusPresentation[index].iconBg"
          :icon-color="statusPresentation[index].iconColor"
        />

        <p class="mt-3 text-3xl font-semibold tracking-tight text-[var(--uui-gray-900)]">
          {{ status.value }}
        </p>

        <p class="mt-2 text-sm text-[var(--uui-gray-500)]">
          {{ status.caption }}
        </p>

        <DetailAction
          v-if="status.title === 'Isolir'"
          @click="isIsolatedDetailOpen = true"
        />
      </BaseCard>
    </div>

    <div
      class="mt-4 flex items-start gap-3 rounded-lg border border-[var(--uui-warning-600)]/30 bg-[var(--uui-warning-50)] px-4 py-3 text-sm text-[var(--uui-warning-700)]"
      role="alert"
    >
      <AlertTriangle class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p class="font-semibold">Pelanggan membutuhkan tindak lanjut</p>
        <p class="mt-0.5 text-[var(--uui-warning-700)]">
          Terdapat 100 pelanggan berstatus isolir. Prioritaskan verifikasi
          pembayaran dan jadwal aktivasi kembali.
        </p>
      </div>
    </div>

    <DetailTableModal
      :open="isIsolatedDetailOpen"
      title="Pelanggan Isolir"
      description="Sampel 10 dari 100 pelanggan isolir yang memerlukan verifikasi dan jadwal aktivasi kembali."
      :columns="isolatedCustomerColumns"
      :rows="isolatedCustomerDetails"
      :summary="isolatedCustomerSummary"
      search-placeholder="Cari pelanggan, invoice, atau PIC..."
      @close="isIsolatedDetailOpen = false"
    />
  </section>
</template>
