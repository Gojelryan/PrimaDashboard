<script setup lang="ts">
import { BriefcaseBusiness, FileText } from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import { financeDashboard } from '../../../mock/dashboard/finance-dashboard'
import { formatFinancialCurrency } from '../../../utils/dashboard-formatters'

function getInvoiceStatusClass(status: string) {
  if (status === 'Lunas') {
    return 'bg-[var(--uui-success-50)] text-[var(--uui-success-600)]'
  }

  if (status === 'Jatuh Tempo') {
    return 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]'
  }

  return 'bg-[var(--uui-warning-50)] text-[var(--uui-warning-600)]'
}

function getProjectBillingStatusClass(status: string) {
  if (status === 'Termin 3') {
    return 'bg-[var(--uui-success-50)] text-[var(--uui-success-600)]'
  }

  if (status === 'Termin 2') {
    return 'bg-[var(--uui-blue-50)] text-[var(--uui-blue-600)]'
  }

  return 'bg-[var(--uui-warning-50)] text-[var(--uui-warning-600)]'
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
    <DashboardPanelCard
      title="Invoice"
      subtitle="Invoice vendor terbaru"
      :icon="FileText"
      icon-bg="bg-[var(--uui-brand-100)]"
      icon-color="text-[var(--uui-brand-600)]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr class="border-b border-[var(--uui-gray-200)] text-xs uppercase tracking-wide text-[var(--uui-gray-500)]">
              <th class="pb-3 font-medium">Item</th>
              <th class="pb-3 font-medium">Tanggal</th>
              <th class="pb-3 font-medium">Jumlah</th>
              <th class="pb-3 font-medium">Status</th>
              <th class="pb-3 text-right font-medium">Nilai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--uui-gray-200)]">
            <tr
              v-for="item in financeDashboard.invoices"
              :key="item.date + item.item"
            >
              <td class="py-3 font-medium text-[var(--uui-gray-900)]">{{ item.item }}</td>
              <td class="py-3 text-[var(--uui-gray-700)]">{{ item.date }}</td>
              <td class="py-3 text-[var(--uui-gray-700)]">{{ item.quantity }}</td>
              <td class="py-3">
                <span
                  class="inline-flex rounded px-2 py-1 text-xs font-medium"
                  :class="getInvoiceStatusClass(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3 text-right font-semibold text-[var(--uui-gray-900)]">
                {{ item.amount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardPanelCard>

    <DashboardPanelCard
      title="Nilai Kontrak Project"
      :subtitle="`${financeDashboard.projectContracts.period} | Total ${formatFinancialCurrency(financeDashboard.projectContracts.totalValue)}`"
      :icon="BriefcaseBusiness"
      icon-bg="bg-[var(--uui-warning-50)]"
      icon-color="text-[var(--uui-warning-600)]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr class="border-b border-[var(--uui-gray-200)] text-xs uppercase tracking-wide text-[var(--uui-gray-500)]">
              <th class="pb-3 font-medium">Project</th>
              <th class="pb-3 font-medium">Pelanggan</th>
              <th class="pb-3 text-center font-medium">Progress</th>
              <th class="pb-3 font-medium">Penagihan</th>
              <th class="pb-3 text-right font-medium">Nilai Kontrak</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--uui-gray-200)]">
            <tr
              v-for="project in financeDashboard.projectContracts.items"
              :key="project.id"
            >
              <td class="max-w-56 truncate py-3 font-medium text-[var(--uui-gray-900)]" :title="project.name">
                {{ project.name }}
              </td>
              <td class="max-w-48 truncate py-3 text-[var(--uui-gray-700)]" :title="project.customer">
                {{ project.customer }}
              </td>
              <td class="py-3 text-center text-[var(--uui-gray-700)]">
                {{ project.progressPercent }}%
              </td>
              <td class="py-3">
                <span
                  class="inline-flex rounded px-2 py-1 text-xs font-medium"
                  :class="getProjectBillingStatusClass(project.billingStatus)"
                >
                  {{ project.billingStatus }}
                </span>
              </td>
              <td class="py-3 text-right font-semibold text-[var(--uui-gray-900)]">
                {{ formatFinancialCurrency(project.contractValue) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardPanelCard>
  </section>
</template>
