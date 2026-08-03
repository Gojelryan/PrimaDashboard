<script setup lang="ts">
import { computed, ref } from 'vue'
import { Clock3, Users } from 'lucide-vue-next'

import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import HumanResourceOvertimeChart from '../../../components/charts/HumanResourceOvertimeChart.vue'
import {
  employeeOvertimeDetails,
  humanResourceDashboard,
} from '../../../mock/dashboard/human-resource-dashboard'

const isOvertimeDetailOpen = ref(false)

const overtimeColumns = [
  { key: 'id', label: 'ID Lembur' },
  { key: 'employee', label: 'Nama Karyawan' },
  { key: 'date', label: 'Tanggal' },
  { key: 'startTime', label: 'Mulai', align: 'center' as const },
  { key: 'endTime', label: 'Selesai', align: 'center' as const },
  { key: 'duration', label: 'Durasi', align: 'right' as const },
  { key: 'description', label: 'Keterangan Pekerjaan' },
  { key: 'status', label: 'Status', type: 'badge' as const },
]

const overtimeRows = employeeOvertimeDetails.map(item => ({
  ...item,
  duration: `${item.hours} jam`,
}))

const totalOvertimeHours = computed(() =>
  employeeOvertimeDetails.reduce((total, item) => total + item.hours, 0)
)
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-12">
    <div class="xl:col-span-5">
      <TechnicianPanelCard
        title="Lembur"
        :subtitle="`Per ${humanResourceDashboard.period}`"
        :icon="Clock3"
        icon-bg="bg-[#FFF0E1]"
        icon-color="text-[#FF9F43]"
      >
        <div class="overflow-x-auto">
          <div class="grid min-w-[360px] grid-cols-[minmax(0,1fr)_100px] gap-4 text-sm">
            <p class="font-semibold text-[#5D596C]">Nama</p>
            <p class="text-right font-semibold text-[#5D596C]">Lembur (jam)</p>

            <template
              v-for="item in humanResourceDashboard.overtime"
              :key="item.name"
            >
              <p class="truncate text-[#6F6B7D]">{{ item.name }}</p>
              <p class="text-right text-[#6F6B7D]">{{ item.hours }}</p>
            </template>
          </div>
        </div>

        <DetailAction
          label="Lihat detail lembur"
          @click="isOvertimeDetailOpen = true"
        />
      </TechnicianPanelCard>
    </div>

    <div class="xl:col-span-7">
      <TechnicianPanelCard
        title="Lembur Divisi"
        :subtitle="humanResourceDashboard.period"
        :icon="Users"
        icon-bg="bg-[#E9E7FD]"
        icon-color="text-[#7367F0]"
      >
        <HumanResourceOvertimeChart
          :items="humanResourceDashboard.overtimeByDivision"
        />
      </TechnicianPanelCard>
    </div>

    <DetailTableModal
      :open="isOvertimeDetailOpen"
      title="Detail Lembur Karyawan"
      :description="`Rincian jam dan pekerjaan lembur periode ${humanResourceDashboard.period}.`"
      :columns="overtimeColumns"
      :rows="overtimeRows"
      :summary="[
        { label: 'Karyawan Lembur', value: String(humanResourceDashboard.overtime.length) },
        { label: 'Total Aktivitas', value: String(employeeOvertimeDetails.length) },
        { label: 'Total Jam', value: `${totalOvertimeHours} jam`, tone: 'warning' }
      ]"
      search-placeholder="Cari karyawan, tanggal, atau pekerjaan..."
      @close="isOvertimeDetailOpen = false"
    />
  </section>
</template>
