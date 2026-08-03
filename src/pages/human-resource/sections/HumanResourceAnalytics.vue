<script setup lang="ts">
import { Clock3, Users } from 'lucide-vue-next'

import TechnicianPanelCard from '../../../components/cards/TechnicianPanelCard.vue'
import HumanResourceOvertimeChart from '../../../components/charts/HumanResourceOvertimeChart.vue'
import { humanResourceDashboard } from '../../../mock/dashboard/human-resource-dashboard'
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
  </section>
</template>
