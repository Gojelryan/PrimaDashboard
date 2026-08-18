<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  as?: string
  padding?: 'none' | 'compact' | 'default'
  overflow?: 'hidden' | 'visible'
  hierarchy?: 'prominent' | 'default' | 'subtle'
}>(), {
  as: 'article',
  padding: 'default',
  overflow: 'hidden',
  hierarchy: 'default'
})

const paddingClass = computed(() => {
  if (props.padding === 'none') {
    return ''
  }

  return props.padding === 'compact'
    ? 'p-4 sm:p-5'
    : 'p-4 sm:p-6'
})
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="
      flex
      h-full
      min-h-0
      flex-col
      rounded-xl
      border
      border-[var(--uui-gray-200)]
      bg-white
    "
    :class="[
      paddingClass,
      overflow === 'hidden' ? 'overflow-hidden' : 'overflow-visible',
      hierarchy === 'prominent'
        ? 'shadow-[var(--uui-shadow-sm)]'
        : hierarchy === 'subtle'
          ? 'bg-[var(--uui-gray-25)] shadow-none'
          : 'shadow-[var(--uui-shadow-xs)]'
    ]"
  >
    <slot />
  </component>
</template>
