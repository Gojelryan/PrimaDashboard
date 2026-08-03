<script setup lang="ts">
import { ClipboardCheck, WalletCards } from 'lucide-vue-next'

import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import { humanResourceDashboard } from '../../../mock/dashboard/human-resource-dashboard'
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
    <TechnicianPanelCard
      title="Prioritas Human Resource"
      :icon="ClipboardCheck"
      icon-bg="bg-[#FCE5E6]"
      icon-color="text-[#EA5455]"
    >
      <div class="space-y-2 text-sm">
        <div
          v-for="item in humanResourceDashboard.priorities"
          :key="item.label"
          class="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4"
        >
          <span class="text-[#6F6B7D]">{{ item.label }}</span>
          <span class="font-medium text-[#5D596C]">{{ item.value }}</span>
        </div>
      </div>
    </TechnicianPanelCard>

    <TechnicianPanelCard
      title="Payroll bulan ini"
      :subtitle="humanResourceDashboard.period"
      :icon="WalletCards"
      icon-bg="bg-[#DDF6E8]"
      icon-color="text-[#28C76F]"
    >
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xl font-bold text-[#5D596C]">
          {{ humanResourceDashboard.payroll.total }}
        </p>
        <p class="text-sm text-[#28C76F]">
          {{ humanResourceDashboard.payroll.growth }}
          <span class="text-[#A5A2AD]">(dari bulan lalu)</span>
        </p>
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <div class="flex justify-between gap-4">
          <span>Gaji Pokok</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.basic }}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span>Lembur</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.overtime }}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span>Tunjangan</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.allowance }}</span>
        </div>
      </div>
    </TechnicianPanelCard>
  </section>
</template>
