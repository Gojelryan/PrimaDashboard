<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue'
import {
  BriefcaseBusiness,
  Network,
  UsersRound,
} from 'lucide-vue-next'

import TechnicianMetricCard from '../../../components/cards/TechnicianMetricCard.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { technicianJobDetails } from '../../../mock/dashboard/priority-detail-data'
import { technicalOperationsDashboard } from '../../../mock/dashboard/technical-operations-dashboard'
import { formatNumber } from '../../../utils/dashboard-formatters'

const technicianDashboard = technicalOperationsDashboard.technician
const isJobDetailOpen = ref(false)

const jobColumns = [
  { key: 'id', label: 'Nomor Pekerjaan' },
  { key: 'customer', label: 'Pelanggan/Proyek' },
  { key: 'location', label: 'Lokasi' },
  { key: 'type', label: 'Jenis Pekerjaan' },
  { key: 'technician', label: 'Teknisi' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'progress', label: 'Progres', align: 'right' as const },
  { key: 'status', label: 'Status', type: 'badge' as const }
]

const jobSummary = [
  { label: 'Total Pekerjaan', value: String(technicianDashboard.jobs.total) },
  { label: 'Selesai', value: String(technicianDashboard.jobs.completed), tone: 'success' as const },
  { label: 'On Progress', value: String(technicianDashboard.jobs.inProgress) },
  { label: 'Tunda', value: String(technicianDashboard.jobs.pending), tone: 'warning' as const }
]
const teamItems = [
  { label: 'Onsite', value: formatNumber(technicianDashboard.team.onsite) },
  { label: 'Standby', value: formatNumber(technicianDashboard.team.standby) }
]
const jobItems = [
  { label: 'Selesai', value: formatNumber(technicianDashboard.jobs.completed) },
  { label: 'On Progress', value: formatNumber(technicianDashboard.jobs.inProgress) },
  { label: 'Tunda', value: formatNumber(technicianDashboard.jobs.pending) }
]

const infrastructureProgressStyle = computed(() => ({
  background: `conic-gradient(var(--uui-brand-600) ${technicianDashboard.infrastructureBuilt.progressPercent * 3.6}deg, var(--uui-gray-100) 0deg)`
}))
</script>

<template>
  <section
    class="
      grid
      auto-rows-auto
      grid-cols-1
      gap-4
      sm:gap-6
      lg:grid-cols-12
    "
  >
    <div class="h-full lg:col-span-3">
      <TechnicianMetricCard
        title="Total Tim"
        :value="formatNumber(technicianDashboard.team.total)"
        :icon="UsersRound"
        icon-bg="bg-[var(--uui-blue-50)]"
        icon-color="text-[var(--uui-blue-600)]"
        :items="teamItems"
      />
    </div>

    <div
      class="h-full lg:col-span-3 xl:col-span-2"
    >
      <TechnicianMetricCard
        title="Total Pekerjaan"
        :value="formatNumber(technicianDashboard.jobs.total)"
        :icon="BriefcaseBusiness"
        icon-bg="bg-[var(--uui-warning-50)]"
        icon-color="text-[var(--uui-warning-600)]"
        :items="jobItems"
      >
        <template #footer>
          <DetailAction inline @click="isJobDetailOpen = true" />
        </template>
      </TechnicianMetricCard>
    </div>

    <div class="h-full lg:col-span-6 xl:col-span-7">
      <TechnicianPanelCard
        title="Total Infrastruktur Terbangun"
        :icon="Network"
        icon-bg="bg-[var(--uui-brand-100)]"
        icon-color="text-[var(--uui-brand-600)]"
      >
        <div
          class="
            grid
            h-full
            min-h-0
            grid-cols-1
            items-center
            gap-6
            lg:grid-cols-[minmax(120px,0.8fr)_96px_minmax(220px,1.5fr)]
          "
        >
          <div>
            <p class="text-2xl font-bold leading-none text-[var(--uui-gray-900)]">
              {{ formatNumber(technicianDashboard.infrastructureBuilt.totalKm) }} km
            </p>

            <p class="mt-2 text-xs text-[var(--uui-gray-500)]">
              target tahun 2026:
              {{ formatNumber(technicianDashboard.infrastructureBuilt.targetKm) }} km
            </p>
          </div>

          <div
            class="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
            "
            :style="infrastructureProgressStyle"
          >
            <div
              class="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                text-xl
                font-bold
                text-[var(--uui-gray-700)]
              "
            >
              {{ technicianDashboard.infrastructureBuilt.progressPercent }}%
            </div>
          </div>

          <div class="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            <div
              v-for="area in technicianDashboard.infrastructureBuilt.areas"
              :key="area.area"
              class="flex items-center justify-between gap-4 text-sm leading-tight"
            >
              <span class="min-w-0 truncate text-[var(--uui-gray-700)]">
                {{ area.area }}
              </span>

              <span class="shrink-0 font-semibold text-[var(--uui-gray-900)]">
                {{ formatNumber(area.totalKm) }} km
              </span>
            </div>
          </div>
        </div>
      </TechnicianPanelCard>
    </div>

    <DetailTableModal
      :open="isJobDetailOpen"
      title="Detail Pekerjaan Teknisi"
      :description="`Pekerjaan aktif dan terbaru untuk periode ${technicianDashboard.period.label}.`"
      :columns="jobColumns"
      :rows="technicianJobDetails"
      :summary="jobSummary"
      search-placeholder="Cari pekerjaan, pelanggan, lokasi, atau teknisi..."
      @close="isJobDetailOpen = false"
    />
  </section>
</template>
