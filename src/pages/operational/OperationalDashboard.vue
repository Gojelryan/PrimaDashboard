<script setup lang="ts">
import OperationalAlerts from './sections/OperationalAlerts.vue'
import OperationalInventory from './sections/OperationalInventory.vue'
import OperationalSummary from './sections/OperationalSummary.vue'
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <OperationalSummary />
    <OperationalInventory />
    <OperationalAlerts />
  </div>
</template>
