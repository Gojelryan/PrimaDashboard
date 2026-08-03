<script setup lang="ts">
import {
  Activity,
  ChartPie,
  Clock3,
  RadioTower,
} from 'lucide-vue-next'

import DashboardPanelCard from '../../../components/cards/DashboardPanelCard.vue'
import InformationListCard from '../../../components/cards/InformationListCard.vue'
import NocIncidentChart from '../../../components/charts/NocIncidentChart.vue'
import { networkHealth } from '../../../mock/dashboard/network-health'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'

const nocDashboard = technicalOperationsDashboard.noc

const totalHistory = nocDashboard.incidentHistory.reduce(
  (total, item) => total + item.total,
  0
)

function getLatencyClass(latency: number) {
  if (latency >= 100) {
    return 'bg-[#FCE5E6] text-[#EA5455]'
  }

  if (latency >= 50) {
    return 'bg-[#FFF0E1] text-[#FF9F43]'
  }

  return 'bg-[#DDF6E8] text-[#28C76F]'
}

function getCapacityClass(utilization: number) {
  if (utilization >= 90) {
    return 'bg-[#EA5455]'
  }

  if (utilization >= 75) {
    return 'bg-[#FF9F43]'
  }

  return 'bg-[#7367F0]'
}
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-12">
    <div class="min-h-[620px] xl:col-span-5">
      <DashboardPanelCard
        title="Respons Latency"
        subtitle="Latency endpoint pelanggan"
        :icon="Activity"
        icon-bg="bg-[#D9F7FC]"
        icon-color="text-[#00CFE8]"
      >
        <div class="h-full overflow-y-auto pr-1">
          <div class="divide-y divide-[#DBDADE]">
            <div
              v-for="endpoint in nocDashboard.latencyResponses"
              :key="endpoint.name + endpoint.ip"
              class="flex items-center justify-between gap-3 py-3 first:pt-0"
            >
              <div class="min-w-0">
                <p class="truncate text-sm font-medium text-[#5D596C]">
                  {{ endpoint.name }}
                </p>
                <p class="mt-0.5 text-xs text-[#A5A2AD]">{{ endpoint.ip }}</p>
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

    <div class="grid min-h-[620px] auto-rows-auto gap-4 sm:gap-6 xl:col-span-4">
      <DashboardPanelCard
        title="Grafik Gangguan"
        subtitle="Berdasarkan kategori"
        :icon="ChartPie"
        icon-bg="bg-[#E9E7FD]"
        icon-color="text-[#7367F0]"
      >
        <NocIncidentChart :items="nocDashboard.incidentCategories" />
      </DashboardPanelCard>

      <DashboardPanelCard
        title="Riwayat Gangguan"
        :subtitle="nocDashboard.period.label"
        :icon="Clock3"
        icon-bg="bg-[#FFF0E1]"
        icon-color="text-[#FF9F43]"
      >
        <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div
            v-for="item in nocDashboard.incidentHistory"
            :key="item.area"
            class="flex items-center justify-between gap-3"
          >
            <span class="text-[#6F6B7D]">{{ item.area }}</span>
            <span class="font-semibold text-[#5D596C]">{{ item.total }}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-between border-t border-[#DBDADE] pt-3 text-sm">
          <span class="font-semibold text-[#5D596C]">Total</span>
          <span class="font-semibold text-[#EA5455]">{{ totalHistory }}</span>
        </div>
      </DashboardPanelCard>

      <InformationListCard
        title="Kesehatan Jaringan"
        :value="networkHealth.value"
        :icon="Activity"
        icon-bg="bg-[#DDF6E8]"
        icon-color="text-[#28C76F]"
        item-layout="stacked"
        :items="networkHealth.items"
      />
    </div>

    <div class="min-h-[620px] xl:col-span-3">
      <DashboardPanelCard
        title="Kapasitas POP"
        subtitle="Utilisasi bandwidth"
        :icon="RadioTower"
        icon-bg="bg-[#DDF6E8]"
        icon-color="text-[#28C76F]"
      >
        <div class="h-full overflow-y-auto pr-1">
          <div class="space-y-4">
            <div
              v-for="pop in nocDashboard.popCapacity"
              :key="pop.name"
            >
              <div class="flex items-center justify-between gap-3 text-sm">
                <span class="font-medium text-[#5D596C]">{{ pop.name }}</span>
                <span class="text-[#6F6B7D]">
                  {{ pop.capacityGbps }} Gbps · {{ pop.utilizationPercent }}%
                </span>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#F1F0F2]">
                <div
                  class="h-full rounded-full"
                  :class="getCapacityClass(pop.utilizationPercent)"
                  :style="{ width: `${pop.utilizationPercent}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardPanelCard>
    </div>
  </section>
</template>
