<script setup lang="ts">
import { FileText } from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import { financeDashboard } from '../../../mock/dashboard/finance-dashboard'

function getInvoiceStatusClass(status: string) {
  if (status === 'Lunas') {
    return 'bg-[#DDF6E8] text-[#28C76F]'
  }

  if (status === 'Jatuh Tempo') {
    return 'bg-[#FCE5E6] text-[#EA5455]'
  }

  return 'bg-[#FFF0E1] text-[#FF9F43]'
}
</script>

<template>
  <section class="mt-4 sm:mt-6">
    <DashboardPanelCard
      title="Invoice"
      subtitle="Invoice vendor terbaru"
      :icon="FileText"
      icon-bg="bg-[#E9E7FD]"
      icon-color="text-[#7367F0]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr class="border-b border-[#DBDADE] text-xs uppercase tracking-wide text-[#A5A2AD]">
              <th class="pb-3 font-medium">Item</th>
              <th class="pb-3 font-medium">Tanggal</th>
              <th class="pb-3 font-medium">Jumlah</th>
              <th class="pb-3 font-medium">Status</th>
              <th class="pb-3 text-right font-medium">Nilai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#DBDADE]">
            <tr
              v-for="item in financeDashboard.invoices"
              :key="item.date + item.item"
            >
              <td class="py-3 font-medium text-[#5D596C]">{{ item.item }}</td>
              <td class="py-3 text-[#6F6B7D]">{{ item.date }}</td>
              <td class="py-3 text-[#6F6B7D]">{{ item.quantity }}</td>
              <td class="py-3">
                <span
                  class="inline-flex rounded px-2 py-1 text-xs font-medium"
                  :class="getInvoiceStatusClass(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3 text-right font-semibold text-[#5D596C]">
                {{ item.amount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardPanelCard>
  </section>
</template>
