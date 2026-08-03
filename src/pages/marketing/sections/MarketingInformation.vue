<script setup lang="ts">
import { RadioTower, UsersRound } from 'lucide-vue-next'

import InformationListCard from '../../../components/cards/InformationListCard.vue'
import MarketingStatusCard from '../../../components/cards/MarketingStatusCard.vue'
import { marketingCustomersByService } from '../../../mock/dashboard/marketing-customers-by-service'
import { portStatus } from '../../../mock/dashboard/marketing-port-status'
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
      lg:grid-cols-2
    "
  >
    <div class="min-h-[360px]">
      <InformationListCard
        title="Pelanggan dengan Layanan"
        :icon="UsersRound"
        icon-bg="bg-[#D9F7FC]"
        icon-color="text-[#00CFE8]"
        :items="marketingCustomersByService"
      />
    </div>

    <div class="min-h-[360px]">
      <MarketingStatusCard
        title="Status Port Wilayah"
        :progress="portStatus.progress"
        :home-pass="portStatus.homePass"
        :empty-port="portStatus.emptyPort"
        :potential-areas="portStatus.potentialAreas"
        :icon="RadioTower"
        icon-bg="bg-[#FCE5E6]"
        icon-color="text-[#EA5455]"
      />
    </div>
  </section>
</template>
