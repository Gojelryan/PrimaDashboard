<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  icon: Component
  iconBg: string
  iconColor: string
  data: {
    totalPartner: number
    totalCustomer: number
    areas: {
      name: string
      partner: number
      customer: number
    }[]
  }
}>()
</script>

<template>
  <BaseCard>
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
    />

    <div class="mt-5 grid grid-cols-2 gap-3">
      <div
        class="rounded-lg bg-[#F9F5FF] p-3"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-[#667085]">
          Total Mitra
        </p>
        <p class="mt-1 text-2xl font-bold text-[#101828]">
          {{ data.totalPartner.toLocaleString('id-ID') }}
        </p>
      </div>

      <div class="rounded-lg bg-[#EFF8FF] p-3 text-right">
        <p class="text-xs font-medium uppercase tracking-wide text-[#667085]">
          Total Pelanggan
        </p>
        <p class="mt-1 text-2xl font-bold text-[#101828]">
          {{ data.totalCustomer.toLocaleString('id-ID') }}
        </p>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-[minmax(0,1fr)_72px_104px] gap-3 border-b border-[#EAECF0] pb-2 text-xs font-semibold uppercase tracking-wide text-[#667085]">
      <span>Wilayah</span>
      <span class="text-right">Mitra</span>
      <span class="text-right">Pelanggan</span>
    </div>

    <div class="min-h-0 flex-1 divide-y divide-[#EAECF0] overflow-y-auto pr-1">
      <div
        v-for="area in data.areas"
        :key="area.name"
        class="grid grid-cols-[minmax(0,1fr)_72px_104px] items-center gap-3 py-2.5 text-sm"
      >
        <span class="min-w-0 truncate font-medium text-[#344054]" :title="area.name">
          {{ area.name }}
        </span>
        <span class="text-right font-semibold text-[#101828]">
          {{ area.partner.toLocaleString('id-ID') }}
        </span>
        <span class="text-right font-semibold text-[#101828]">
          {{ area.customer.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>
