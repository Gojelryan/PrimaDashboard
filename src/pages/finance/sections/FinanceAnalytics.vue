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
    iconBg: 'bg-[#E9E7FD]',
    iconColor: 'text-[#7367F0]'
  },
  Operasional: {
    icon: Wrench,
    iconBg: 'bg-[#DDF6E8]',
    iconColor: 'text-[#28C76F]'
  },
  Infrastruktur: {
    icon: Router,
    iconBg: 'bg-[#D9F7FC]',
    iconColor: 'text-[#00CFE8]'
  },
  Property: {
    icon: Building2,
    iconBg: 'bg-[#FFF0E1]',
    iconColor: 'text-[#FF9F43]'
  },
  Utilitas: {
    icon: Zap,
    iconBg: 'bg-[#FCE5E6]',
    iconColor: 'text-[#EA5455]'
  }
}

function getCategoryPresentation(category: string) {
  return categoryPresentation[category as keyof typeof categoryPresentation] ?? {
    icon: CircleDollarSign,
    iconBg: 'bg-[#F1F0F2]',
    iconColor: 'text-[#6F6B7D]'
  }
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
    <div class="h-[460px] sm:h-[500px]">
      <AnalyticsCard
        title="Pergerakan Keuangan"
        :icon="WalletCards"
        icon-bg="bg-[#DDF6E8]"
        icon-color="text-[#28C76F]"
      >
        <RevenueChart :data="financeDashboard.monthlyCashFlow" />
      </AnalyticsCard>
    </div>

    <DashboardPanelCard
      title="Pengeluaran Terakhir"
      subtitle="Aktivitas pengeluaran Juli 2026"
      :icon="ReceiptText"
      icon-bg="bg-[#FFF0E1]"
      icon-color="text-[#FF9F43]"
    >
      <div class="divide-y divide-[#DBDADE]">
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
            <p class="truncate text-sm font-medium text-[#5D596C]">
              {{ item.description }}
            </p>
            <p class="mt-0.5 truncate text-xs text-[#A5A2AD]">
              {{ item.category }} · {{ item.date }}
            </p>
          </div>

          <span class="shrink-0 text-right text-sm font-semibold text-[#EA5455]">
            -{{ item.amount }}
          </span>
        </div>
      </div>
    </DashboardPanelCard>
  </section>
</template>
