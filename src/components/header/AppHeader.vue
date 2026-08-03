<script setup lang="ts">
import { Moon, Sun, UserRound } from 'lucide-vue-next'

defineProps<{
  title: string
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'set-theme', theme: 'light' | 'dark'): void
}>()
</script>

<template>
  <header
    class="
      h-16
      bg-white
      border-b
      border-[#EAECF0]
      flex
      items-center
      justify-between
      px-4
      lg:px-6
      shrink-0
    "
  >

    <!-- Left -->
    <div class="flex min-w-0 items-center gap-3">

      <!-- Burger Mobile -->
      <button
        type="button"
        aria-label="Buka atau tutup navigasi"
        aria-controls="app-sidebar"
        :aria-expanded="sidebarOpen"
        class="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          text-[#475467]
          hover:bg-[#F2F4F7]
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-[#7F56D9]
          lg:hidden
        "
        @click="emit('toggle-sidebar')"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

      </button>

      <h2 class="truncate text-lg font-semibold text-[#101828] lg:text-xl">
        {{ title }}
      </h2>

    </div>

    <!-- Right -->
    <div class="flex items-center gap-2 sm:gap-3">

      <div
        class="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB] text-[#475467] shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        title="Profil pengguna"
        aria-label="Profil pengguna"
      >
        <UserRound class="h-5 w-5" aria-hidden="true" />
      </div>

      <div
        class="theme-switcher flex h-10 items-center rounded-lg border border-[#EAECF0] bg-[#F9FAFB] p-1 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        role="group"
        aria-label="Pilihan tema"
      >
        <button
          type="button"
          class="theme-option flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors sm:px-2.5"
          :class="theme === 'light'
            ? 'theme-option-active bg-white text-[#101828]'
            : 'text-[#667085]'"
          :aria-pressed="theme === 'light'"
          title="Gunakan tema terang"
          @click="emit('set-theme', 'light')"
        >
          <Sun class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Light</span>
        </button>

        <button
          type="button"
          class="theme-option flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors sm:px-2.5"
          :class="theme === 'dark'
            ? 'theme-option-active bg-white text-[#101828]'
            : 'text-[#667085]'"
          :aria-pressed="theme === 'dark'"
          title="Gunakan tema gelap"
          @click="emit('set-theme', 'dark')"
        >
          <Moon class="h-4 w-4" aria-hidden="true" />
          <span class="hidden md:inline">Dark</span>
        </button>
      </div>

    </div>

  </header>
</template>
