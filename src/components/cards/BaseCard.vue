<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  as?: string
  padding?: 'none' | 'compact' | 'default'
  overflow?: 'hidden' | 'visible'
}>(), {
  as: 'article',
  padding: 'default',
  overflow: 'hidden'
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
      border-[#EAECF0]
      bg-white
      shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)]
    "
    :class="[
      paddingClass,
      overflow === 'hidden' ? 'overflow-hidden' : 'overflow-visible'
    ]"
  >
    <slot />
  </component>
</template>
