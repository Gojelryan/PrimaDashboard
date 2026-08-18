<script setup lang="ts">
import type { Component } from 'vue'
import BaseCard from './BaseCard.vue'
import CardHeader from './CardHeader.vue'

defineProps<{
  title: string
  value: string
  icon: Component
  iconBg: string
  iconColor: string
  borderColor: string
  items: {
    label: string
    value: string
  }[]
}>()
</script>

<template>
  <BaseCard
    hierarchy="prominent"
    class="border-t-2"
    :class="borderColor"
  >
    <CardHeader
      :title="title"
      :icon="icon"
      :icon-bg="iconBg"
      :icon-color="iconColor"
      title-as="h2"
    />

    <p class="mt-4 text-3xl font-bold text-[var(--uui-gray-900)] sm:text-4xl">
      {{ value }}
    </p>

    <hr class="my-5 border-[var(--uui-gray-200)]">

    <!-- Detail -->

    <div class="space-y-2">

        <div
            v-for="item in items"
            :key="item.label"
            class="
                flex
                justify-between
                text-sm
            "
        >

            <span class="text-[var(--uui-gray-700)]">

                {{ item.label }}

            </span>

            <span
                class="
                    font-semibold
                    text-[var(--uui-gray-900)]
                "
            >

                {{ item.value }}

            </span>

        </div>

    </div>
  </BaseCard>
</template>
