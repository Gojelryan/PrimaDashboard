<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Component } from 'vue'

import AppSidebar from '../components/sidebar/AppSidebar.vue'
import AppHeader from '../components/header/AppHeader.vue'
import DirectorDashboard from '../pages/director/DirectorDashboard.vue'
import MarketingDashboard from '../pages/marketing/MarketingDashboard.vue'
import TeknisiDashboard from '../pages/teknisi/TeknisiDashboard.vue'
import HumanResourceDashboard from '../pages/human-resource/HumanResourceDashboard.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import OperationalDashboard from '../pages/operational/OperationalDashboard.vue'
import FinanceDashboard from '../pages/finance/FinanceDashboard.vue'
import NocDashboard from '../pages/noc/NocDashboard.vue'
import {
  dashboardNavigationItems,
  type DashboardPage
} from '../config/dashboard-navigation'

const sidebarOpen = ref(false)
const activePage = ref<DashboardPage>('director')
type ThemeMode = 'light' | 'dark'
type ThemePreference = ThemeMode | 'system'

const storedTheme = window.localStorage.getItem('pinisi-theme')
const theme = ref<ThemePreference>(
  storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
    ? storedTheme
    : 'system'
)
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemTheme = ref<ThemeMode>(systemThemeQuery.matches ? 'dark' : 'light')
const resolvedTheme = computed<ThemeMode>(() =>
  theme.value === 'system' ? systemTheme.value : theme.value
)

watch(theme, (value) => {
  document.documentElement.dataset.themePreference = value
  window.localStorage.setItem('pinisi-theme', value)
}, { immediate: true })

watch(resolvedTheme, (value) => {
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}, { immediate: true })

function handleSystemThemeChange(event: MediaQueryListEvent) {
  systemTheme.value = event.matches ? 'dark' : 'light'
}

onMounted(() => {
  systemThemeQuery.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  systemThemeQuery.removeEventListener('change', handleSystemThemeChange)
})

const dashboardComponents: Record<DashboardPage, Component> = {
  director: DirectorDashboard,
  marketing: MarketingDashboard,
  teknisi: TeknisiDashboard,
  'human-resource': HumanResourceDashboard,
  admin: AdminDashboard,
  operational: OperationalDashboard,
  finance: FinanceDashboard,
  noc: NocDashboard
}

const activeNavigationItem = computed(() =>
  dashboardNavigationItems.find(item => item.id === activePage.value)
)
const pageTitle = computed(() =>
  activeNavigationItem.value?.title ?? 'Director Dashboard'
)
const activeDashboardComponent = computed(() =>
  dashboardComponents[activePage.value]
)

function selectPage(page: DashboardPage) {
  activePage.value = page
  sidebarOpen.value = false
}

function setTheme(value: ThemePreference) {
  theme.value = value
}
</script>

<template>
  <div class="theme-shell flex h-dvh overflow-hidden bg-[var(--uui-page)] text-[var(--uui-gray-700)]">

    <!-- Backdrop Mobile -->
    <button
      v-if="sidebarOpen"
      type="button"
      aria-label="Tutup navigasi"
      class="fixed inset-0 z-40 bg-[var(--uui-gray-900)]/45 backdrop-blur-[1px] lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar Desktop -->
    <div class="hidden h-full shrink-0 overflow-hidden lg:flex">
      <AppSidebar
        :active-page="activePage"
        @select-page="selectPage"
      />
    </div>

    <!-- Sidebar Mobile -->
    <div
      class="fixed left-0 top-0 z-50 h-dvh transform overflow-hidden transition-transform duration-300 lg:hidden"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <AppSidebar
        :active-page="activePage"
        @select-page="selectPage"
      />
    </div>

    <!-- Content -->
    <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

      <!-- Header -->
      <AppHeader
        :title="pageTitle"
        :sidebar-open="sidebarOpen"
        :theme="theme"
        :resolved-theme="resolvedTheme"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @set-theme="setTheme"
      />

      <!-- Main -->
      <main
        id="main-content"
        class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-5 lg:p-6"
        tabindex="-1"
      >
        <div class="mx-auto w-full max-w-[1600px]">
          <KeepAlive>
            <component :is="activeDashboardComponent" />
          </KeepAlive>
        </div>
      </main>

    </div>

  </div>
</template>
