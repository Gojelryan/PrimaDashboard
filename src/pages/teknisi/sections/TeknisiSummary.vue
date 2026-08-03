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
  { label: 'Onsite', value: technicianDashboard.team.onsite.toLocaleString('id-ID') },
  { label: 'Standby', value: technicianDashboard.team.standby.toLocaleString('id-ID') }
]
const jobItems = [
  { label: 'Selesai', value: technicianDashboard.jobs.completed.toLocaleString('id-ID') },
  { label: 'On Progress', value: technicianDashboard.jobs.inProgress.toLocaleString('id-ID') },
  { label: 'Tunda', value: technicianDashboard.jobs.pending.toLocaleString('id-ID') }
]

const infrastructureProgressStyle = computed(() => ({
  background: `conic-gradient(#7F56D9 ${technicianDashboard.infrastructureBuilt.progressPercent * 3.6}deg, #F2F4F7 0deg)`
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
      lg:auto-rows-[248px]
      lg:grid-cols-12
    "
  >
    <div class="h-full lg:col-span-3">
      <TechnicianMetricCard
        title="Total Tim"
        :value="technicianDashboard.team.total.toLocaleString('id-ID')"
        :icon="UsersRound"
        icon-bg="bg-[#D9F7FC]"
        icon-color="text-[#00CFE8]"
        :items="teamItems"
      />
    </div>

    <div
      class="h-full lg:col-span-3 xl:col-span-2"
    >
      <TechnicianMetricCard
        title="Total Pekerjaan"
        :value="technicianDashboard.jobs.total.toLocaleString('id-ID')"
        :icon="BriefcaseBusiness"
        icon-bg="bg-[#FFF0E1]"
        icon-color="text-[#FF9F43]"
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
        icon-bg="bg-[#E9E7FD]"
        icon-color="text-[#7367F0]"
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
            <p class="text-2xl font-bold leading-none text-[#5D596C]">
              {{ technicianDashboard.infrastructureBuilt.totalKm.toLocaleString('id-ID') }} km
            </p>

            <p class="mt-2 text-xs text-[#A5A2AD]">
              target tahun 2026:
              {{ technicianDashboard.infrastructureBuilt.targetKm.toLocaleString('id-ID') }} km
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
                text-[#6F6B7D]
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
              <span class="min-w-0 truncate text-[#6F6B7D]">
                {{ area.area }}
              </span>

              <span class="shrink-0 font-semibold text-[#5D596C]">
                {{ area.totalKm.toLocaleString('id-ID') }} km
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
