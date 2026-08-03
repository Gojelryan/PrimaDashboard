<script setup lang="ts">
import SummaryCard from '../../../components/cards/SummaryCard.vue'
import { summaryCards } from '../../../mock/dashboard/summary-cards'
</script>

<template>

<div
    class="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-4
        sm:gap-6
    "
>

    <SummaryCard

        v-for="card in summaryCards"

        :key="card.title"

        v-bind="card"

    />

</div>

</template>
