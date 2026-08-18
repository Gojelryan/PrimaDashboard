<script setup lang="ts">
import {
  ChartLine,
  MapPinned,
} from 'lucide-vue-next'

import AnalyticsCard from '../../../components/cards/AnalyticsCard.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import TechnicianDailyInstallationChart from '../../../components/charts/TechnicianDailyInstallationChart.vue'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'

const technicianDashboard = technicalOperationsDashboard.technician
</script>

<template>
  <section
    class="
      mt-4
      sm:mt-6
      grid
      auto-rows-auto
      grid-cols-1
      gap-4
      sm:gap-6
      xl:grid-cols-12
    "
  >
    <div class="dashboard-chart-panel-compact xl:col-span-6">
      <AnalyticsCard
        title="Grafik Instalasi Pelanggan Baru"
        subtitle="Minggu ini"
        :icon="ChartLine"
        icon-bg="bg-[var(--uui-blue-50)]"
        icon-color="text-[var(--uui-blue-600)]"
      >
        <TechnicianDailyInstallationChart
          :categories="technicianDashboard.dailyInstallations.map(point => point.date)"
          :series="technicianDashboard.dailyInstallations.map(point => point.total)"
        />
      </AnalyticsCard>
    </div>

    <div class="dashboard-chart-panel-compact xl:col-span-6">
      <TechnicianPanelCard
        title="Proyek Berdasarkan Lokasi / Proyek Berjalan"
        :icon="MapPinned"
        icon-bg="bg-[var(--uui-warning-50)]"
        icon-color="text-[var(--uui-warning-600)]"
      >
        <div class="space-y-5">
          <div
            v-for="project in technicianDashboard.runningProjects"
            :key="project.name"
            class="
              grid
              grid-cols-[minmax(0,1fr)_80px_48px]
              sm:grid-cols-[minmax(0,1fr)_minmax(120px,180px)_48px]
              items-center
              gap-4
              text-sm
            "
          >
            <span class="min-w-0 truncate text-[var(--uui-gray-700)]">
              {{ project.name }}
            </span>

            <div class="h-2 rounded-full bg-[var(--uui-gray-100)]">
              <div
                class="h-2 rounded-full bg-[var(--uui-warning-600)]"
                :style="{ width: `${project.progressPercent}%` }"
              />
            </div>

            <span class="text-right font-semibold text-[var(--uui-gray-900)]">
              {{ project.progressPercent }}%
            </span>
          </div>
        </div>
      </TechnicianPanelCard>
    </div>
  </section>
</template>
