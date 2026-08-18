<script setup lang="ts">
import {
  Banknote,
  CreditCard,
  ReceiptText,
  WalletCards,
} from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import { adminPaymentCustomers } from '../../../mock/dashboard/admin-payment-customers'
import { adminReceiptCollectors } from '../../../mock/dashboard/admin-receipt-collectors'

const paymentPresentation = [
  {
    icon: Banknote,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    barColor: 'bg-[var(--uui-success-600)]'
  },
  {
    icon: CreditCard,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    barColor: 'bg-[var(--uui-brand-600)]'
  }
]

function getProgress(completed: string, total: string) {
  return Math.round((Number(completed) / Number(total)) * 100)
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-12">
    <div class="xl:col-span-9">
      <DashboardPanelCard
        :title="adminReceiptCollectors.title"
        subtitle="Distribusi dan penyelesaian kwitansi"
        :icon="ReceiptText"
        icon-bg="bg-[var(--uui-brand-100)]"
        icon-color="text-[var(--uui-brand-600)]"
      >
        <div class="grid h-full min-h-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(230px,0.65fr)]">
          <div class="min-h-0 overflow-x-auto">
            <table class="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr class="border-b border-[var(--uui-gray-200)] text-xs uppercase tracking-wide text-[var(--uui-gray-500)]">
                  <th class="pb-3 font-medium">Kolektor</th>
                  <th class="pb-3 text-center font-medium">Internet</th>
                  <th class="pb-3 text-center font-medium">Analog</th>
                  <th class="pb-3 text-right font-medium">Selesai</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--uui-gray-200)]">
                <tr
                  v-for="collector in adminReceiptCollectors.collectors"
                  :key="collector.name"
                  class="transition hover:bg-[var(--uui-gray-50)]"
                >
                  <td class="py-2.5 font-medium text-[var(--uui-gray-900)]">
                    {{ collector.name }}
                  </td>
                  <td class="py-2.5 text-center text-[var(--uui-gray-700)]">
                    {{ collector.internet }}
                  </td>
                  <td class="py-2.5 text-center text-[var(--uui-gray-700)]">
                    {{ collector.analog }}
                  </td>
                  <td class="py-2.5 text-right">
                    <span class="rounded bg-[var(--uui-success-50)] px-2 py-1 text-xs font-medium text-[var(--uui-success-600)]">
                      {{ collector.completed }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div class="rounded-lg bg-[var(--uui-gray-50)] p-4">
              <p class="text-sm text-[var(--uui-gray-500)]">Total Kwitansi</p>
              <p class="mt-1 text-3xl font-semibold text-[var(--uui-gray-900)]">
                {{ adminReceiptCollectors.totalReceipt }}
              </p>
            </div>

            <div class="mt-4 space-y-4">
              <div
                v-for="(category, index) in adminReceiptCollectors.categories"
                :key="category.label"
              >
                <div class="flex items-center justify-between gap-3 text-sm">
                  <span class="font-medium text-[var(--uui-gray-900)]">{{ category.label }}</span>
                  <span class="text-[var(--uui-gray-700)]">
                    {{ category.completed }}/{{ category.value }}
                  </span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-[var(--uui-gray-100)]">
                  <div
                    class="h-full rounded-full"
                    :class="index === 0 ? 'bg-[var(--uui-brand-600)]' : 'bg-[var(--uui-blue-600)]'"
                    :style="{ width: `${getProgress(category.completed, category.value)}%` }"
                  />
                </div>
                <p class="mt-1 text-xs text-[var(--uui-gray-500)]">
                  {{ category.remaining }} belum selesai
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardPanelCard>
    </div>

    <div class="xl:col-span-3">
      <DashboardPanelCard
        :title="adminPaymentCustomers.title"
        subtitle="Metode pembayaran pelanggan"
        :icon="WalletCards"
        icon-bg="bg-[var(--uui-success-50)]"
        icon-color="text-[var(--uui-success-600)]"
      >
        <div class="space-y-6">
          <div
            v-for="(payment, index) in adminPaymentCustomers.items"
            :key="payment.label"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                :class="[paymentPresentation[index].iconBg, paymentPresentation[index].iconColor]"
              >
                <component
                  :is="paymentPresentation[index].icon"
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-sm font-medium text-[var(--uui-gray-900)]">
                    {{ payment.label }}
                  </span>
                  <span class="text-sm font-semibold text-[var(--uui-gray-900)]">
                    {{ payment.value }}
                  </span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-[var(--uui-gray-100)]">
                  <div
                    class="h-full rounded-full"
                    :class="paymentPresentation[index].barColor"
                    :style="{ width: payment.percentage }"
                  />
                </div>
                <p class="mt-1 text-right text-xs text-[var(--uui-gray-500)]">
                  {{ payment.percentage }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardPanelCard>
    </div>
  </section>
</template>
