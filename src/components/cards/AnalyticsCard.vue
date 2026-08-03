<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  subtitle?: string
  icon?: Component
  iconBg?: string
  iconColor?: string
}>()

</script>

<template>
  <BaseCard padding="none">
    <div class="px-4 pt-5 pb-3 sm:px-6">
      <CardHeader
        :title="title"
        :subtitle="subtitle"
        :icon="icon"
        :icon-bg="iconBg"
        :icon-color="iconColor"
        title-as="h2"
      />
    </div>

    <div class="min-h-0 flex-1 overflow-hidden px-4 pb-6 sm:px-6">
      <slot />
    </div>
  </BaseCard>
</template>
