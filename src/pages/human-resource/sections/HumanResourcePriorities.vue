<script setup lang="ts">
import { computed, ref } from 'vue'
import { ClipboardCheck, WalletCards } from 'lucide-vue-next'

import DetailAction from '../../../components/cards/DetailAction.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import {
  employeeLeaveRequests,
  humanResourceDashboard,
} from '../../../mock/dashboard/human-resource-dashboard'

const isLeaveRequestDetailOpen = ref(false)

const leaveRequestColumns = [
  { key: 'id', label: 'ID Pengajuan' },
  { key: 'employee', label: 'Nama Karyawan' },
  { key: 'division', label: 'Divisi' },
  { key: 'leaveType', label: 'Jenis Cuti' },
  { key: 'submittedAt', label: 'Diajukan' },
  { key: 'period', label: 'Periode Cuti' },
  { key: 'duration', label: 'Durasi', align: 'right' as const },
  { key: 'reason', label: 'Alasan' },
  { key: 'supervisor', label: 'Atasan Langsung' },
  { key: 'supervisorStatus', label: 'Persetujuan Atasan', type: 'badge' as const },
  { key: 'hrStatus', label: 'Persetujuan HR', type: 'badge' as const },
  { key: 'status', label: 'Status Proses', type: 'badge' as const },
]

const leaveRequestRows = employeeLeaveRequests.map(request => ({
  id: request.id,
  employee: `${request.employee} (${request.employeeId})`,
  division: request.division,
  leaveType: request.leaveType,
  submittedAt: request.submittedAt,
  period: request.period,
  duration: `${request.totalDays} hari`,
  reason: request.reason,
  supervisor: request.directSupervisor.name,
  supervisorStatus: request.directSupervisor.status,
  hrStatus: request.hrApproval.status,
  status: request.status,
}))

const waitingSupervisorTotal = computed(() =>
  employeeLeaveRequests.filter(
    request => request.directSupervisor.status === 'Menunggu'
  ).length
)

const waitingHrTotal = computed(() =>
  employeeLeaveRequests.filter(
    request => request.directSupervisor.status === 'Disetujui' &&
      request.hrApproval.status === 'Menunggu'
  ).length
)
</script>

<template>
  <section class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
    <TechnicianPanelCard
      title="Prioritas Human Resource"
      :icon="ClipboardCheck"
      icon-bg="bg-[#FCE5E6]"
      icon-color="text-[#EA5455]"
    >
      <div class="space-y-2 text-sm">
        <div
          v-for="item in humanResourceDashboard.priorities"
          :key="item.label"
          class="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4"
        >
          <span class="text-[#6F6B7D]">{{ item.label }}</span>
          <div class="flex items-center justify-between gap-2 sm:justify-end">
            <span class="font-medium text-[#5D596C]">{{ item.value }}</span>
            <DetailAction
              v-if="item.detailType === 'leave-request'"
              inline
              label="Lihat pengajuan"
              @click="isLeaveRequestDetailOpen = true"
            />
          </div>
        </div>
      </div>
    </TechnicianPanelCard>

    <TechnicianPanelCard
      title="Payroll bulan ini"
      :subtitle="humanResourceDashboard.period"
      :icon="WalletCards"
      icon-bg="bg-[#DDF6E8]"
      icon-color="text-[#28C76F]"
    >
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xl font-bold text-[#5D596C]">
          {{ humanResourceDashboard.payroll.total }}
        </p>
        <p class="text-sm text-[#28C76F]">
          {{ humanResourceDashboard.payroll.growth }}
          <span class="text-[#A5A2AD]">(dari bulan lalu)</span>
        </p>
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <div class="flex justify-between gap-4">
          <span>Gaji Pokok</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.basic }}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span>Lembur</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.overtime }}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span>Tunjangan</span>
          <span class="text-right">{{ humanResourceDashboard.payroll.allowance }}</span>
        </div>
      </div>
    </TechnicianPanelCard>

    <DetailTableModal
      :open="isLeaveRequestDetailOpen"
      title="Pengajuan Cuti Menunggu"
      description="Daftar pemohon dan tahapan persetujuan atasan langsung serta Human Resource."
      :columns="leaveRequestColumns"
      :rows="leaveRequestRows"
      :summary="[
        { label: 'Total Pengajuan', value: String(employeeLeaveRequests.length) },
        { label: 'Menunggu Atasan', value: String(waitingSupervisorTotal), tone: 'warning' },
        { label: 'Menunggu HR', value: String(waitingHrTotal), tone: 'error' }
      ]"
      search-placeholder="Cari pemohon, divisi, jenis cuti, atau status..."
      @close="isLeaveRequestDetailOpen = false"
    />
  </section>
</template>
