<script setup lang="ts">
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Handshake,
  Radio,
  Store,
} from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import { adminCustomerSegments } from '../../../mock/dashboard/admin-customer-segments'

const segmentPresentation = [
  {
    icon: Building2,
    iconBg: 'bg-[var(--uui-blue-50)]',
    iconColor: 'text-[var(--uui-blue-600)]',
    accent: 'bg-[var(--uui-blue-600)]'
  },
  {
    icon: Store,
    iconBg: 'bg-[var(--uui-success-50)]',
    iconColor: 'text-[var(--uui-success-600)]',
    accent: 'bg-[var(--uui-success-600)]'
  },
  {
    icon: Radio,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    accent: 'bg-[var(--uui-brand-600)]'
  },
  {
    icon: Handshake,
    iconBg: 'bg-[var(--uui-warning-50)]',
    iconColor: 'text-[var(--uui-warning-600)]',
    accent: 'bg-[var(--uui-warning-600)]'
  }
]
</script>

<template>
  <section class="mt-4 sm:mt-6">
    <div class="mb-3 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-[var(--uui-gray-900)]">Segmen Pelanggan</h2>
        <p class="mt-1 text-sm text-[var(--uui-gray-500)]">
          Mutasi dan outstanding per segmen
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BaseCard
        v-for="(segment, index) in adminCustomerSegments"
        :key="segment.title"
        padding="compact"
      >
        <CardHeader
          :title="segment.title"
          :icon="segmentPresentation[index].icon"
          :icon-bg="segmentPresentation[index].iconBg"
          :icon-color="segmentPresentation[index].iconColor"
        />

        <p class="mt-3 text-2xl font-semibold text-[var(--uui-gray-900)]">
          {{ segment.total }}
        </p>
        <p class="mt-1 text-xs text-[var(--uui-gray-500)]">
          Periode mutasi: {{ segment.periodLabel }}
        </p>

        <div class="mt-5 grid grid-cols-2 gap-3">
          <div class="rounded-md bg-[var(--uui-success-50)] p-3">
            <p class="flex items-center gap-1 text-xs font-medium text-[var(--uui-success-600)]">
              <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
              Pelanggan Baru
            </p>
            <p class="mt-1 text-lg font-semibold text-[var(--uui-gray-900)]">
              {{ segment.newCustomer }}
            </p>
          </div>
          <div class="rounded-md bg-[var(--uui-error-50)] p-3">
            <p class="flex items-center gap-1 text-xs font-medium text-[var(--uui-error-600)]">
              <ArrowDownRight class="h-3.5 w-3.5" aria-hidden="true" />
              Pelanggan Putus
            </p>
            <p class="mt-1 text-lg font-semibold text-[var(--uui-gray-900)]">
              {{ segment.churnCustomer }}
            </p>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-3 border-t border-[var(--uui-gray-200)] pt-4">
          <span class="text-sm text-[var(--uui-gray-500)]">Outstanding</span>
          <span class="text-sm font-semibold text-[var(--uui-warning-600)]">
            {{ segment.outstanding }}
          </span>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
