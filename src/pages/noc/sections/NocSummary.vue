<script setup lang="ts">
import { ref } from 'vue'
import {
  Activity,
  BellRing,
  CircleCheck,
  Clock3,
  TicketCheck,
  TriangleAlert,
} from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import NetworkCapacityCard from '../../../components/cards/NetworkCapacityCard.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { nocIncidentDetails } from '../../../mock/dashboard/priority-detail-data'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'

const nocDashboard = technicalOperationsDashboard.noc
const isIncidentDetailOpen = ref(false)

const incidentColumns = [
  { key: 'id', label: 'ID Gangguan' },
  { key: 'area', label: 'Area' },
  { key: 'category', label: 'Kategori' },
  { key: 'startedAt', label: 'Mulai' },
  { key: 'duration', label: 'Durasi' },
  { key: 'severity', label: 'Severity', type: 'badge' as const },
  { key: 'pic', label: 'PIC' },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const incidentSummary = [
  { label: 'Total Gangguan', value: String(nocDashboard.incidentSummary.total), tone: 'error' as const },
  { label: 'Selesai', value: String(nocDashboard.incidentSummary.completed), tone: 'success' as const },
  { label: 'On Progress', value: String(nocDashboard.incidentSummary.inProgress) },
  { label: 'Tunda', value: String(nocDashboard.incidentSummary.pending), tone: 'warning' as const }
]
const alarmTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Makassar'
})

const summaryCards = [
  {
    title: 'Total Ticket',
    value: nocDashboard.tickets.total,
    icon: TicketCheck,
    iconBg: 'bg-[var(--uui-brand-100)]',
    iconColor: 'text-[var(--uui-brand-600)]',
    accent: 'bg-[var(--uui-brand-600)]',
    items: [
      {
        label: 'Selesai',
        value: nocDashboard.tickets.completed,
        icon: CircleCheck,
        color: 'text-[var(--uui-success-600)]'
      },
      {
        label: 'Tunda',
        value: nocDashboard.tickets.pending,
        icon: Clock3,
        color: 'text-[var(--uui-warning-600)]'
      }
    ]
  },
  {
    title: 'Total Gangguan',
    value: nocDashboard.incidentSummary.total,
    icon: TriangleAlert,
    iconBg: 'bg-[var(--uui-error-50)]',
    iconColor: 'text-[var(--uui-error-600)]',
    accent: 'bg-[var(--uui-error-600)]',
    items: [
      {
        label: 'Selesai',
        value: nocDashboard.incidentSummary.completed,
        icon: CircleCheck,
        color: 'text-[var(--uui-success-600)]'
      },
      {
        label: 'On Progress',
        value: nocDashboard.incidentSummary.inProgress,
        icon: Activity,
        color: 'text-[var(--uui-blue-600)]'
      },
      {
        label: 'Tunda',
        value: nocDashboard.incidentSummary.pending,
        icon: Clock3,
        color: 'text-[var(--uui-warning-600)]'
      }
    ]
  }
]

function getAlarmClass(severity: string) {
  return severity === 'critical'
    ? 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]'
    : 'bg-[var(--uui-warning-50)] text-[var(--uui-warning-600)]'
}

function formatAlarmTime(occurredAt: string) {
  return `${alarmTimeFormatter.format(new Date(occurredAt))} WITA`
}
</script>

<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <BaseCard
      v-for="card in summaryCards"
      :key="card.title"
      padding="compact"
    >
      <CardHeader
        :title="card.title"
        :icon="card.icon"
        :icon-bg="card.iconBg"
        :icon-color="card.iconColor"
      />

      <p class="mt-3 text-2xl font-semibold text-[var(--uui-gray-900)]">
        {{ card.value }}
      </p>

      <div class="mt-4 space-y-2">
        <div
          v-for="item in card.items"
          :key="item.label"
          class="flex items-center justify-between gap-3 text-sm"
        >
          <span class="flex items-center gap-2 text-[var(--uui-gray-700)]">
            <component
              :is="item.icon"
              class="h-4 w-4"
              :class="item.color"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
          <span class="font-semibold text-[var(--uui-gray-900)]">{{ item.value }}</span>
        </div>
      </div>

      <DetailAction
        v-if="card.title === 'Total Gangguan'"
        @click="isIncidentDetailOpen = true"
      />
    </BaseCard>

    <NetworkCapacityCard
      :total-gbps="nocDashboard.internetCapacity.totalGbps"
      :used-gbps="nocDashboard.internetCapacity.usedGbps"
      :available-gbps="nocDashboard.internetCapacity.availableGbps"
    />

    <BaseCard padding="compact">
      <CardHeader
        title="Alarm Layanan"
        :icon="BellRing"
        icon-bg="bg-[var(--uui-warning-50)]"
        icon-color="text-[var(--uui-warning-600)]"
      />

      <p class="mt-3 text-2xl font-semibold text-[var(--uui-gray-900)]">
        {{ nocDashboard.serviceAlarms.length }}
      </p>

      <div class="mt-4 space-y-2">
        <div
          v-for="alarm in nocDashboard.serviceAlarms"
          :key="`${alarm.label}-${alarm.occurredAt}`"
          class="flex items-center justify-between gap-3 text-xs"
        >
          <span
            class="min-w-0 truncate rounded px-2 py-1 font-medium"
            :class="getAlarmClass(alarm.severity)"
          >
            {{ alarm.label }}
          </span>
          <time
            class="shrink-0 font-semibold text-[var(--uui-gray-900)]"
            :datetime="alarm.occurredAt"
            :aria-label="`Terjadi pukul ${formatAlarmTime(alarm.occurredAt)}`"
          >
            {{ formatAlarmTime(alarm.occurredAt) }}
          </time>
        </div>
      </div>
    </BaseCard>

    <DetailTableModal
      :open="isIncidentDetailOpen"
      title="Detail Gangguan NOC"
      :description="`Gangguan aktif dan terbaru untuk periode ${nocDashboard.period.label}.`"
      :columns="incidentColumns"
      :rows="nocIncidentDetails"
      :summary="incidentSummary"
      search-placeholder="Cari ID, area, kategori, atau PIC..."
      @close="isIncidentDetailOpen = false"
    />
  </section>
</template>
