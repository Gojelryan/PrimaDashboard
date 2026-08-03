<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  subtitle?: string
  icon: Component
  iconBg: string
  iconColor: string
}>()
</script>

<template>
  <BaseCard>
    <CardHeader
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      title-as="h2"
    />

    <div class="mt-5 min-h-0 flex-1">
      <slot />
    </div>
  </BaseCard>
</template>
