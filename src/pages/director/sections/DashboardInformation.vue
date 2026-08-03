<script setup lang="ts">
import {
    Activity,
    Network,
    UsersRound,
} from 'lucide-vue-next'

import InformationListCard from '../../../components/cards/InformationListCard.vue'
import NetworkCapacityCard from '../../../components/cards/NetworkCapacityCard.vue'
import { customersByService } from '../../../mock/dashboard/customers-by-service'
import { infrastructureExpansion } from '../../../mock/dashboard/infrastructure-expansion'
import { internetCapacity } from '../../../mock/dashboard/internet-capacity'
import { networkHealth } from '../../../mock/dashboard/network-health'
</script>

<template>

<section class="mt-4 sm:mt-6">

    <div class="grid grid-cols-12 gap-4 sm:gap-6">

        <div class="col-span-12 lg:col-span-3">
            <InformationListCard
                title="Pelanggan"
                subtitle="Berdasarkan layanan"
                :icon="UsersRound"
                icon-bg="bg-[#D9F7FC]"
                icon-color="text-[#00CFE8]"
                :items="customersByService"
            />
        </div>

        <div class="col-span-12 lg:col-span-3">
            <InformationListCard
                title="Ekspansi & Infrastruktur"
                :icon="Network"
                icon-bg="bg-[#E9E7FD]"
                icon-color="text-[#7367F0]"
                :items="infrastructureExpansion"
            />
        </div>

        <div class="col-span-12 lg:col-span-3">
            <NetworkCapacityCard
                :total-gbps="internetCapacity.totalGbps"
                :used-gbps="internetCapacity.usedGbps"
                :available-gbps="internetCapacity.availableGbps"
            />
        </div>

        <div class="col-span-12 lg:col-span-3">
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

    </div>

</section>

</template>
