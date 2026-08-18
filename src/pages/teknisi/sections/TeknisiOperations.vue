<script setup lang="ts">
import {
  Activity,
  RadioTower,
} from 'lucide-vue-next'

import LowStockCard from '../../../components/cards/LowStockCard.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'
import { formatNumber } from '../../../utils/dashboard-formatters'

const technicianDashboard = technicalOperationsDashboard.technician
const technicianLowStock = technicianDashboard.materialStock
  .filter(material => material.available > 0 && material.available < material.minimum)
  .map(material => ({
    label: material.material,
    available: material.available,
    minimum: material.minimum,
    unit: material.unit
  }))
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
    <div class="xl:col-span-5">
      <TechnicianPanelCard
        title="Performa Tim"
        :icon="Activity"
        icon-bg="bg-[var(--uui-success-50)]"
        icon-color="text-[var(--uui-success-600)]"
      >
        <div class="h-full min-h-0 overflow-auto">
          <div
            class="
              sticky
              top-0
              z-10
              grid
              min-w-[460px]
              grid-cols-[minmax(0,1.5fr)_minmax(96px,0.8fr)_minmax(120px,1fr)]
              gap-4
              bg-white
              pb-2
              text-xs
              font-semibold
              text-[var(--uui-gray-900)]
            "
          >
            <span>Nama</span>
            <span>Instalasi Harian</span>
            <span>Penarikan FO (meter)</span>
          </div>

          <div class="mt-3 space-y-2">
            <div
              v-for="member in technicianDashboard.teamPerformance"
              :key="member.name"
              class="
                grid
                min-w-[460px]
                grid-cols-[minmax(0,1.5fr)_minmax(96px,0.8fr)_minmax(120px,1fr)]
                gap-4
                text-xs
                leading-tight
                text-[var(--uui-gray-700)]
              "
            >
              <span class="min-w-0 truncate">
                {{ member.name }}
              </span>

              <span>{{ member.dailyInstallation }}</span>

              <span>
                {{ formatNumber(member.foWithdrawalMeters) }} m
              </span>
            </div>
          </div>
        </div>
      </TechnicianPanelCard>
    </div>

    <div class="xl:col-span-4">
      <LowStockCard :items="technicianLowStock" />
    </div>

    <div class="xl:col-span-3">
      <TechnicianPanelCard
        title="Aset Infrastruktur"
        :icon="RadioTower"
        icon-bg="bg-[var(--uui-error-50)]"
        icon-color="text-[var(--uui-error-600)]"
      >
        <div class="space-y-5">
          <div
            v-for="asset in technicianDashboard.infrastructureAssets"
            :key="asset.label"
            class="flex items-center justify-between gap-6 text-base leading-tight"
          >
            <span class="text-[var(--uui-gray-700)]">
              {{ asset.label }}
            </span>

            <span class="font-semibold text-[var(--uui-gray-900)]">
              {{ formatNumber(asset.value) }}
            </span>
          </div>
        </div>
      </TechnicianPanelCard>
    </div>
  </section>
</template>
