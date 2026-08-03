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
    iconBg: 'bg-[#DDF6E8]',
    iconColor: 'text-[#28C76F]',
    barColor: 'bg-[#28C76F]'
  },
  {
    icon: CreditCard,
    iconBg: 'bg-[#E9E7FD]',
    iconColor: 'text-[#7367F0]',
    barColor: 'bg-[#7367F0]'
  }
]

function getProgress(completed: string, total: string) {
  return Math.round((Number(completed) / Number(total)) * 100)
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-12">
    <div class="min-h-[420px] xl:col-span-9">
      <DashboardPanelCard
        :title="adminReceiptCollectors.title"
        subtitle="Distribusi dan penyelesaian kwitansi"
        :icon="ReceiptText"
        icon-bg="bg-[#E9E7FD]"
        icon-color="text-[#7367F0]"
      >
        <div class="grid h-full min-h-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(230px,0.65fr)]">
          <div class="min-h-0 overflow-x-auto">
            <table class="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr class="border-b border-[#DBDADE] text-xs uppercase tracking-wide text-[#A5A2AD]">
                  <th class="pb-3 font-medium">Kolektor</th>
                  <th class="pb-3 text-center font-medium">Internet</th>
                  <th class="pb-3 text-center font-medium">Analog</th>
                  <th class="pb-3 text-right font-medium">Selesai</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#DBDADE]">
                <tr
                  v-for="collector in adminReceiptCollectors.collectors"
                  :key="collector.name"
                  class="transition hover:bg-[#F8F7FA]"
                >
                  <td class="py-2.5 font-medium text-[#5D596C]">
                    {{ collector.name }}
                  </td>
                  <td class="py-2.5 text-center text-[#6F6B7D]">
                    {{ collector.internet }}
                  </td>
                  <td class="py-2.5 text-center text-[#6F6B7D]">
                    {{ collector.analog }}
                  </td>
                  <td class="py-2.5 text-right">
                    <span class="rounded bg-[#DDF6E8] px-2 py-1 text-xs font-medium text-[#28C76F]">
                      {{ collector.completed }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div class="rounded-lg bg-[#F8F7FA] p-4">
              <p class="text-sm text-[#A5A2AD]">Total Kwitansi</p>
              <p class="mt-1 text-3xl font-semibold text-[#5D596C]">
                {{ adminReceiptCollectors.totalReceipt }}
              </p>
            </div>

            <div class="mt-4 space-y-4">
              <div
                v-for="(category, index) in adminReceiptCollectors.categories"
                :key="category.label"
              >
                <div class="flex items-center justify-between gap-3 text-sm">
                  <span class="font-medium text-[#5D596C]">{{ category.label }}</span>
                  <span class="text-[#6F6B7D]">
                    {{ category.completed }}/{{ category.value }}
                  </span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#F1F0F2]">
                  <div
                    class="h-full rounded-full"
                    :class="index === 0 ? 'bg-[#7367F0]' : 'bg-[#00CFE8]'"
                    :style="{ width: `${getProgress(category.completed, category.value)}%` }"
                  />
                </div>
                <p class="mt-1 text-xs text-[#A5A2AD]">
                  {{ category.remaining }} belum selesai
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardPanelCard>
    </div>

    <div class="min-h-[340px] xl:col-span-3">
      <DashboardPanelCard
        :title="adminPaymentCustomers.title"
        subtitle="Metode pembayaran pelanggan"
        :icon="WalletCards"
        icon-bg="bg-[#DDF6E8]"
        icon-color="text-[#28C76F]"
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
                  <span class="text-sm font-medium text-[#5D596C]">
                    {{ payment.label }}
                  </span>
                  <span class="text-sm font-semibold text-[#5D596C]">
                    {{ payment.value }}
                  </span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#F1F0F2]">
                  <div
                    class="h-full rounded-full"
                    :class="paymentPresentation[index].barColor"
                    :style="{ width: payment.percentage }"
                  />
                </div>
                <p class="mt-1 text-right text-xs text-[#A5A2AD]">
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
