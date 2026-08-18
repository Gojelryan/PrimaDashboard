<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Activity,
  ChartPie,
  Clock3,
  RadioTower,
} from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import InformationListCard from '../../../components/cards/InformationListCard.vue'
import NocIncidentChart from '../../../components/charts/NocIncidentChart.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { networkHealth } from '../../../mock/dashboard/network-health'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'

const nocDashboard = technicalOperationsDashboard.noc
const isPopDetailOpen = ref(false)

const popDetailColumns = [
  { key: 'name', label: 'POP' },
  { key: 'capacity', label: 'Kapasitas', align: 'right' as const },
  { key: 'used', label: 'Terpakai', align: 'right' as const },
  { key: 'available', label: 'Tersedia', align: 'right' as const },
  { key: 'utilization', label: 'Utilisasi', align: 'right' as const },
  { key: 'status', label: 'Status', type: 'badge' as const },
]

const totalHistory = nocDashboard.incidentHistory.reduce(
  (total, item) => total + item.total,
  0
)

function getLatencyClass(latency: number) {
  if (latency >= 100) {
    return 'bg-[var(--uui-error-50)] text-[var(--uui-error-600)]'
  }

  if (latency >= 50) {
    return 'bg-[var(--uui-warning-50)] text-[var(--uui-warning-600)]'
  }

  return 'bg-[var(--uui-success-50)] text-[var(--uui-success-600)]'
}

function getCapacityClass(utilization: number) {
  if (utilization >= 90) {
    return 'bg-[var(--uui-error-600)]'
  }

  if (utilization >= 75) {
    return 'bg-[var(--uui-warning-600)]'
  }

  return 'bg-[var(--uui-brand-600)]'
}

function getCapacityStatus(utilization: number) {
  if (utilization >= 90) return 'Kritis'
  if (utilization >= 75) return 'Peringatan'
  return 'Normal'
}

const sortedPopCapacity = computed(() =>
  [...nocDashboard.popCapacity].sort(
    (first, second) => second.utilizationPercent - first.utilizationPercent
  )
)

const visiblePopCapacity = computed(() => sortedPopCapacity.value.slice(0, 6))

const popDetailRows = computed(() => sortedPopCapacity.value.map(pop => ({
  id: pop.name,
  name: pop.name,
  capacity: `${pop.capacityGbps} Gbps`,
  used: `${pop.usedGbps} Gbps`,
  available: `${pop.availableGbps} Gbps`,
  utilization: `${pop.utilizationPercent}%`,
  status: getCapacityStatus(pop.utilizationPercent),
})))

const criticalPopTotal = computed(() =>
  nocDashboard.popCapacity.filter(pop => pop.utilizationPercent >= 90).length
)

const warningPopTotal = computed(() =>
  nocDashboard.popCapacity.filter(
    pop => pop.utilizationPercent >= 75 && pop.utilizationPercent < 90
  ).length
)
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-12">
    <div class="dashboard-monitor-panel xl:col-span-5">
      <DashboardPanelCard
        title="Respons Latency"
        subtitle="Latency endpoint pelanggan"
        :icon="Activity"
        icon-bg="bg-[var(--uui-blue-50)]"
        icon-color="text-[var(--uui-blue-600)]"
      >
        <div class="h-full overflow-y-auto pr-1">
          <div class="divide-y divide-[var(--uui-gray-200)]">
            <div
              v-for="endpoint in nocDashboard.latencyResponses"
              :key="endpoint.name + endpoint.ip"
              class="flex items-center justify-between gap-3 py-3 first:pt-0"
            >
              <div class="min-w-0">
                <p class="truncate text-sm font-medium text-[var(--uui-gray-900)]">
                  {{ endpoint.name }}
                </p>
                <p class="mt-0.5 text-xs text-[var(--uui-gray-500)]">{{ endpoint.ip }}</p>
              </div>
              <span
                class="shrink-0 rounded px-2 py-1 text-xs font-semibold"
                :class="getLatencyClass(endpoint.latencyMs)"
              >
                {{ endpoint.latencyMs }} ms
              </span>
            </div>
          </div>
        </div>
      </DashboardPanelCard>
    </div>

    <div class="dashboard-monitor-panel grid auto-rows-auto gap-4 sm:gap-6 xl:col-span-4">
      <DashboardPanelCard
        title="Grafik Gangguan"
        subtitle="Berdasarkan kategori"
        :icon="ChartPie"
        icon-bg="bg-[var(--uui-brand-100)]"
        icon-color="text-[var(--uui-brand-600)]"
      >
        <NocIncidentChart :items="nocDashboard.incidentCategories" />
      </DashboardPanelCard>

      <DashboardPanelCard
        title="Riwayat Gangguan"
        :subtitle="nocDashboard.period.label"
        :icon="Clock3"
        icon-bg="bg-[var(--uui-warning-50)]"
        icon-color="text-[var(--uui-warning-600)]"
      >
        <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div
            v-for="item in nocDashboard.incidentHistory"
            :key="item.area"
            class="flex items-center justify-between gap-3"
          >
            <span class="text-[var(--uui-gray-700)]">{{ item.area }}</span>
            <span class="font-semibold text-[var(--uui-gray-900)]">{{ item.total }}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-between border-t border-[var(--uui-gray-200)] pt-3 text-sm">
          <span class="font-semibold text-[var(--uui-gray-900)]">Total</span>
          <span class="font-semibold text-[var(--uui-error-600)]">{{ totalHistory }}</span>
        </div>
      </DashboardPanelCard>

      <InformationListCard
        title="Kesehatan Jaringan"
        :value="networkHealth.value"
        :icon="Activity"
        icon-bg="bg-[var(--uui-success-50)]"
        icon-color="text-[var(--uui-success-600)]"
        item-layout="stacked"
        :items="networkHealth.items"
      />
    </div>

    <div class="dashboard-monitor-panel xl:col-span-3">
      <DashboardPanelCard
        title="Kapasitas POP"
        subtitle="Utilisasi bandwidth"
        :icon="RadioTower"
        icon-bg="bg-[var(--uui-success-50)]"
        icon-color="text-[var(--uui-success-600)]"
      >
        <div class="flex h-full min-h-0 flex-col">
          <div class="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <div
              v-for="pop in visiblePopCapacity"
              :key="pop.name"
            >
              <div class="flex items-center justify-between gap-3 text-sm">
                <span class="font-medium text-[var(--uui-gray-900)]">{{ pop.name }}</span>
                <span class="text-[var(--uui-gray-700)]">
                  {{ pop.capacityGbps }} Gbps · {{ pop.utilizationPercent }}%
                </span>
              </div>
              <div class="mt-1 flex items-center justify-between gap-3 text-xs text-[var(--uui-gray-500)]">
                <span>Terpakai {{ pop.usedGbps }} Gbps</span>
                <span>Tersedia {{ pop.availableGbps }} Gbps</span>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-[var(--uui-gray-100)]">
                <div
                  class="h-full rounded-full"
                  :class="getCapacityClass(pop.utilizationPercent)"
                  :style="{ width: `${pop.utilizationPercent}%` }"
                  role="progressbar"
                  :aria-label="`Utilisasi ${pop.name}`"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-valuenow="pop.utilizationPercent"
                />
              </div>
            </div>
          </div>

          <DetailAction
            :label="`Lihat detail ${nocDashboard.popCapacity.length} POP`"
            @click="isPopDetailOpen = true"
          />
        </div>
      </DashboardPanelCard>
    </div>

    <DetailTableModal
      :open="isPopDetailOpen"
      title="Detail Kapasitas POP"
      description="Seluruh POP diurutkan dari utilisasi tertinggi."
      :columns="popDetailColumns"
      :rows="popDetailRows"
      :summary="[
        { label: 'Total POP', value: String(nocDashboard.popCapacity.length) },
        { label: 'Kritis', value: String(criticalPopTotal), tone: 'error' },
        { label: 'Peringatan', value: String(warningPopTotal), tone: 'warning' },
        { label: 'Total Kapasitas', value: `${nocDashboard.internetCapacity.totalGbps} Gbps` }
      ]"
      search-placeholder="Cari nama atau status POP..."
      @close="isPopDetailOpen = false"
    />
  </section>
</template>
