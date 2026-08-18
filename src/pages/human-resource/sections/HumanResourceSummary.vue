<script setup lang="ts">
import { ref } from 'vue'
import { Users } from 'lucide-vue-next'

import BaseCard from '../../../components/cards/BaseCard.vue'
import CardHeader from '../../../components/cards/CardHeader.vue'
import DetailAction from '../../../components/cards/DetailAction.vue'
import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import DetailTableModal from '../../../components/modals/DetailTableModal.vue'
import { humanResourceDashboard } from '../../../mock/dashboard/human-resource-dashboard'
import {
  employeeDetails,
  getEmployeeAttendanceTotal,
} from '../../../mock/dashboard/employee-metrics'

const isEmployeeDetailOpen = ref(false)

const employeeColumns = [
  { key: 'id', label: 'ID Karyawan' },
  { key: 'employee', label: 'Nama' },
  { key: 'division', label: 'Divisi' },
  { key: 'position', label: 'Jabatan' },
  { key: 'employment', label: 'Status Kerja', type: 'badge' as const },
  { key: 'attendance', label: 'Kehadiran', type: 'badge' as const },
  { key: 'joinedAt', label: 'Bergabung' }
]
</script>

<template>
  <section class="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-5">
    <TechnicianPanelCard
      title="Total Karyawan"
      :icon="Users"
      icon-bg="bg-[var(--uui-brand-100)]"
      icon-color="text-[var(--uui-brand-600)]"
    >
      <div class="flex h-full flex-col">
        <p class="text-3xl font-bold text-[var(--uui-gray-900)]">
          {{ humanResourceDashboard.employeeSummary.total }}
        </p>

        <div class="mt-4 space-y-1.5 text-sm">
          <div
            v-for="item in humanResourceDashboard.employeeSummary.attendance"
            :key="item.label"
            class="flex justify-between gap-4"
          >
            <span class="text-[var(--uui-gray-700)]">{{ item.label }}</span>
            <span class="font-semibold text-[var(--uui-gray-900)]">{{ item.value }}</span>
          </div>
        </div>

        <DetailAction @click="isEmployeeDetailOpen = true" />
      </div>
    </TechnicianPanelCard>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:col-span-4 xl:grid-cols-4">
      <BaseCard
        v-for="division in humanResourceDashboard.divisions"
        :key="division.label"
        padding="compact"
      >
        <CardHeader :title="division.label" />
        <p class="mt-5 text-2xl font-bold text-[var(--uui-brand-600)]">
          {{ division.value }}
        </p>
      </BaseCard>
    </div>

    <DetailTableModal
      :open="isEmployeeDetailOpen"
      title="Detail Karyawan"
      :description="`Data karyawan dan kehadiran periode ${humanResourceDashboard.period}.`"
      :columns="employeeColumns"
      :rows="employeeDetails"
      :summary="[
        { label: 'Total Karyawan', value: humanResourceDashboard.employeeSummary.total },
        { label: 'Hadir', value: String(getEmployeeAttendanceTotal('Hadir')), tone: 'success' },
        { label: 'Terlambat', value: String(getEmployeeAttendanceTotal('Terlambat')), tone: 'warning' },
        { label: 'Tidak Hadir', value: String(getEmployeeAttendanceTotal('Tidak Hadir')), tone: 'error' }
      ]"
      search-placeholder="Cari karyawan, divisi, atau jabatan..."
      @close="isEmployeeDetailOpen = false"
    />
  </section>
</template>
