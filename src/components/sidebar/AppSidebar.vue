<script setup lang="ts">
import pinisiLogo from '../../assets/pinisi-white.svg'
import {
  dashboardNavigationItems,
  type DashboardPage
} from '../../config/dashboard-navigation'

defineProps<{
  activePage: DashboardPage
}>()

const emit = defineEmits<{
  (event: 'select-page', page: DashboardPage): void
}>()
</script>

<template>
  <aside
    id="app-sidebar"
    class="flex h-full min-h-0 w-72 flex-col border-r border-[var(--uui-sidebar-border)] bg-[var(--uui-sidebar)] text-white"
    aria-label="Navigasi dashboard"
  >
    <div class="flex h-16 items-center gap-3 border-b border-[var(--uui-sidebar-border)] px-6">
      <img
        :src="pinisiLogo"
        alt=""
        class="h-11 w-16 shrink-0 object-contain"
        aria-hidden="true"
      />
      <div>
        <h1 class="text-lg font-semibold tracking-tight text-white">PINISI</h1>
        <p class="text-[11px] text-[var(--uui-sidebar-text-muted)]">Executive Dashboard</p>
      </div>
    </div>

    <nav
      class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6"
      aria-label="Menu utama"
    >
      <ul class="space-y-1.5">
        <li
          v-for="item in dashboardNavigationItems"
          :key="item.id"
        >
          <button
            type="button"
            class="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="activePage === item.id
              ? 'bg-[var(--uui-brand-600)] font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.20)]'
              : 'font-medium text-[var(--uui-gray-300)] hover:bg-[var(--uui-sidebar-hover)] hover:text-white'"
            :aria-current="activePage === item.id ? 'page' : undefined"
            @click="emit('select-page', item.id)"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <span class="truncate">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
