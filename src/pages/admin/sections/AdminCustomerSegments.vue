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
    iconBg: 'bg-[#D9F7FC]',
    iconColor: 'text-[#00CFE8]',
    accent: 'bg-[#00CFE8]'
  },
  {
    icon: Store,
    iconBg: 'bg-[#DDF6E8]',
    iconColor: 'text-[#28C76F]',
    accent: 'bg-[#28C76F]'
  },
  {
    icon: Radio,
    iconBg: 'bg-[#E9E7FD]',
    iconColor: 'text-[#7367F0]',
    accent: 'bg-[#7367F0]'
  },
  {
    icon: Handshake,
    iconBg: 'bg-[#FFF0E1]',
    iconColor: 'text-[#FF9F43]',
    accent: 'bg-[#FF9F43]'
  }
]
</script>

<template>
  <section class="mt-4 sm:mt-6">
    <div class="mb-3 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-[#5D596C]">Segmen Pelanggan</h2>
        <p class="mt-1 text-sm text-[#A5A2AD]">
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

        <p class="mt-3 text-2xl font-semibold text-[#101828]">
          {{ segment.total }}
        </p>
        <p class="mt-1 text-xs text-[#A5A2AD]">
          Periode mutasi: {{ segment.periodLabel }}
        </p>

        <div class="mt-5 grid grid-cols-2 gap-3">
          <div class="rounded-md bg-[#DDF6E8] p-3">
            <p class="flex items-center gap-1 text-xs font-medium text-[#28C76F]">
              <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
              Pelanggan Baru
            </p>
            <p class="mt-1 text-lg font-semibold text-[#5D596C]">
              {{ segment.newCustomer }}
            </p>
          </div>
          <div class="rounded-md bg-[#FCE5E6] p-3">
            <p class="flex items-center gap-1 text-xs font-medium text-[#EA5455]">
              <ArrowDownRight class="h-3.5 w-3.5" aria-hidden="true" />
              Pelanggan Putus
            </p>
            <p class="mt-1 text-lg font-semibold text-[#5D596C]">
              {{ segment.churnCustomer }}
            </p>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-3 border-t border-[#DBDADE] pt-4">
          <span class="text-sm text-[#A5A2AD]">Outstanding</span>
          <span class="text-sm font-semibold text-[#FF9F43]">
            {{ segment.outstanding }}
          </span>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
