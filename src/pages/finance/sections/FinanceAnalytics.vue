<script setup lang="ts">
import {
  Banknote,
  Building2,
  CircleDollarSign,
  ReceiptText,
  Router,
  WalletCards,
  Wrench,
  Zap,
} from 'lucide-vue-next'

import AnalyticsCard from '../../../components/cards/AnalyticsCard.vue'
import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import RevenueChart from '../../../components/charts/RevenueChart.vue'
import { financeDashboard } from '../../../mock/dashboard/finance-dashboard'

const categoryPresentation = {
  'Gaji Karyawan': {
    icon: Banknote,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]'
  },
  Operasional: {
    icon: Wrench,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]'
  },
  Infrastruktur: {
    icon: Router,
    iconBg: 'bg-[var(--uui-blue-50)]',
    iconColor: 'text-[var(--uui-blue-600)]'
  },
  Property: {
    icon: Building2,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]'
  },
  Utilitas: {
    icon: Zap,
    iconBg: 'bg-[var(--uui-error-50)]',
    iconColor: 'text-[var(--uui-error-600)]'
  }
}

function getCategoryPresentation(category: string) {
  return categoryPresentation[category as keyof typeof categoryPresentation] ?? {
    icon: CircleDollarSign,
    iconBg: 'bg-[var(--uui-gray-100)]',
    iconColor: 'text-[var(--uui-gray-700)]'
  }
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
    <div class="dashboard-chart-panel">
      <AnalyticsCard
        title="Pergerakan Keuangan"
        :icon="WalletCards"
        icon-bg="bg-[var(--uui-success-50)]"
        icon-color="text-[var(--uui-success-600)]"
      >
        <RevenueChart :data="financeDashboard.monthlyCashFlow" />
      </AnalyticsCard>
    </div>

    <DashboardPanelCard
      title="Pengeluaran Terakhir"
      subtitle="Aktivitas pengeluaran Juli 2026"
      :icon="ReceiptText"
      icon-bg="bg-[var(--uui-warning-50)]"
      icon-color="text-[var(--uui-warning-600)]"
    >
      <div class="divide-y divide-[var(--uui-gray-200)]">
        <div
          v-for="item in financeDashboard.expenses"
          :key="item.date + item.category"
          class="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
            :class="[
              getCategoryPresentation(item.category).iconBg,
              getCategoryPresentation(item.category).iconColor
            ]"
          >
            <component
              :is="getCategoryPresentation(item.category).icon"
              class="h-4 w-4"
              aria-hidden="true"
            />
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-[var(--uui-gray-900)]">
              {{ item.description }}
            </p>
          </div>

          <span class="shrink-0 text-right text-sm font-semibold text-[var(--uui-error-600)]">
            -{{ item.amount }}
          </span>
        </div>
      </div>
    </DashboardPanelCard>
  </section>
</template>
