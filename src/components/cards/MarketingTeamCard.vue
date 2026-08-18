<script setup lang="ts">
import { computed, type Component } from 'vue'

import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'
import DetailAction from './DetailAction.vue'
import { formatNumber } from '../../utils/dashboard-formatters'

const props = defineProps<{
  title: string
  periodLabel: string
  retailCustomerTotal: number
  corporateCustomerTotal: number
  projectTotal: number
  icon: Component
  iconBg: string
  iconColor: string
  members: readonly {
    id: string
    name: string
    area: string
    retailCustomer: number
    corporateCustomer: number
    project: number
  }[]
}>()

defineEmits<{
  detail: []
}>()

const topMembers = computed(() =>
  [...props.members]
    .sort((firstMember, secondMember) =>
      (secondMember.retailCustomer + secondMember.corporateCustomer)
      - (firstMember.retailCustomer + firstMember.corporateCustomer)
    )
    .slice(0, 3)
)

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
}
</script>

<template>
  <BaseCard padding="compact">
    <CardHeader
      :title="title"
      :subtitle="periodLabel"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      icon-size="sm"
    />

    <div class="mt-5 grid grid-cols-3 gap-2">
      <div class="rounded-lg bg-[var(--uui-brand-50)] p-3">
        <p class="text-xs font-medium uppercase tracking-wide text-[var(--uui-gray-500)]">
          Retail
        </p>
        <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(retailCustomerTotal) }}
        </p>
      </div>

      <div class="rounded-lg bg-[var(--uui-blue-50)] p-3">
        <p class="text-xs font-medium uppercase tracking-wide text-[var(--uui-gray-500)]">
          Corporate
        </p>
        <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(corporateCustomerTotal) }}
        </p>
      </div>

      <div class="rounded-lg bg-[var(--uui-warning-50)] p-3">
        <p class="text-xs font-medium uppercase tracking-wide text-[var(--uui-gray-500)]">
          Project
        </p>
        <p class="mt-1 text-2xl font-bold text-[var(--uui-gray-900)]">
          {{ formatNumber(projectTotal) }}
        </p>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between gap-3 border-b border-[var(--uui-gray-200)] pb-2">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-[var(--uui-gray-500)]">
          Pencapaian tertinggi
        </p>
      </div>
      <DetailAction inline @click="$emit('detail')" />
    </div>

    <div class="min-h-0 flex-1 divide-y divide-[var(--uui-gray-200)]">
      <div
        v-for="member in topMembers"
        :key="member.id"
        class="flex items-center gap-3 py-2.5"
      >
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--uui-brand-100)] text-xs font-semibold text-[var(--uui-brand-600)]">
          {{ getInitials(member.name) }}
        </span>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-[var(--uui-gray-700)]">
            {{ member.name }}
          </p>
          <p class="truncate text-xs text-[var(--uui-gray-500)]">
            {{ member.area }}
          </p>
        </div>

        <div class="shrink-0 text-right">
          <p class="text-sm font-semibold text-[var(--uui-gray-900)]">
            {{ formatNumber(member.retailCustomer + member.corporateCustomer) }}
          </p>
          <p class="text-xs text-[var(--uui-gray-500)]">
            R {{ member.retailCustomer }} / C {{ member.corporateCustomer }} / P {{ member.project }}
          </p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
