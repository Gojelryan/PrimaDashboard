<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-vue-next'

export interface DetailTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  type?: 'text' | 'badge'
  sortable?: boolean
  sortType?: 'text' | 'number' | 'currency' | 'date'
}

export interface DetailTableRow {
  id: string | number
  [key: string]: string | number
}

export interface DetailModalSummary {
  label: string
  value: string
  tone?: 'default' | 'success' | 'warning' | 'error'
}

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  description?: string
  columns: DetailTableColumn[]
  rows: readonly DetailTableRow[]
  summary?: DetailModalSummary[]
  searchPlaceholder?: string
  emptyText?: string
  pageSize?: number
}>(), {
  description: undefined,
  summary: () => [],
  searchPlaceholder: 'Cari data...',
  emptyText: 'Data tidak ditemukan.',
  pageSize: 0
})

const emit = defineEmits<{
  close: []
}>()

const searchQuery = ref('')
const currentPage = ref(1)
const sortKey = ref<string | null>(null)
const sortDirection = ref<'ascending' | 'descending'>('ascending')
const closeButton = ref<HTMLButtonElement | null>(null)
let previousActiveElement: HTMLElement | null = null
let previousBodyOverflow = ''

const filteredRows = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('id-ID')

  if (!query) {
    return props.rows
  }

  return props.rows.filter(row =>
    props.columns.some(column =>
      String(row[column.key] ?? '')
        .toLocaleLowerCase('id-ID')
        .includes(query)
    )
  )
})

const textCollator = new Intl.Collator('id-ID', {
  numeric: true,
  sensitivity: 'base'
})

const sortedRows = computed(() => {
  if (!sortKey.value) return filteredRows.value

  const column = props.columns.find(item => item.key === sortKey.value)
  if (!column) return filteredRows.value

  const directionMultiplier = sortDirection.value === 'ascending' ? 1 : -1

  return [...filteredRows.value].sort((firstRow, secondRow) => {
    const comparison = compareValues(
      firstRow[column.key],
      secondRow[column.key],
      column.sortType ?? 'text'
    )

    return comparison * directionMultiplier
  })
})

const hasPagination = computed(() => props.pageSize > 0)
const totalPages = computed(() => {
  if (!hasPagination.value) return 1
  return Math.max(1, Math.ceil(filteredRows.value.length / props.pageSize))
})
const displayedRows = computed(() => {
  if (!hasPagination.value) return sortedRows.value

  const startIndex = (currentPage.value - 1) * props.pageSize
  return sortedRows.value.slice(startIndex, startIndex + props.pageSize)
})
const firstDisplayedRow = computed(() => {
  if (filteredRows.value.length === 0) return 0
  if (!hasPagination.value) return 1
  return ((currentPage.value - 1) * props.pageSize) + 1
})
const lastDisplayedRow = computed(() => {
  if (!hasPagination.value) return filteredRows.value.length
  return Math.min(currentPage.value * props.pageSize, filteredRows.value.length)
})

function closeModal() {
  emit('close')
}

function previousPage() {
  currentPage.value = Math.max(1, currentPage.value - 1)
}

function nextPage() {
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1)
}

function sortBy(column: DetailTableColumn) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'ascending'
      ? 'descending'
      : 'ascending'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'ascending'
  }

  currentPage.value = 1
}

function getAriaSort(column: DetailTableColumn) {
  if (!column.sortable || sortKey.value !== column.key) return undefined
  return sortDirection.value
}

function compareValues(
  firstValue: string | number,
  secondValue: string | number,
  sortType: NonNullable<DetailTableColumn['sortType']>
) {
  if (sortType === 'currency' || sortType === 'number') {
    return parseNumericValue(firstValue) - parseNumericValue(secondValue)
  }

  if (sortType === 'date') {
    return parseIndonesianDate(firstValue) - parseIndonesianDate(secondValue)
  }

  return textCollator.compare(String(firstValue), String(secondValue))
}

function parseNumericValue(value: string | number) {
  if (typeof value === 'number') return value
  return Number(value.replace(/[^\d-]/g, '')) || 0
}

function parseIndonesianDate(value: string | number) {
  const monthIndexes: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    Mei: 4,
    Jun: 5,
    Jul: 6,
    Agu: 7,
    Sep: 8,
    Okt: 9,
    Nov: 10,
    Des: 11
  }
  const [day, month, year] = String(value).split(' ')

  if (!day || !month || !year || monthIndexes[month] === undefined) return 0
  return Date.UTC(Number(year), monthIndexes[month], Number(day))
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

function getAlignmentClass(alignment?: DetailTableColumn['align']) {
  if (alignment === 'right') return 'text-right'
  if (alignment === 'center') return 'text-center'
  return 'text-left'
}

function getSummaryClass(tone?: DetailModalSummary['tone']) {
  if (tone === 'success') return 'bg-[#DDF6E8] text-[#28C76F]'
  if (tone === 'warning') return 'bg-[#FFF0E1] text-[#FF9F43]'
  if (tone === 'error') return 'bg-[#FCE5E6] text-[#EA5455]'
  return 'bg-[#F8F7FA] text-[#101828]'
}

function getBadgeClass(value: string | number) {
  const normalizedValue = String(value).toLocaleLowerCase('id-ID')

  if (
    normalizedValue.includes('selesai') ||
    normalizedValue === 'lunas' ||
    normalizedValue.includes('dijadwalkan') ||
    normalizedValue.includes('disetujui') ||
    normalizedValue.includes('diterima') ||
    normalizedValue.includes('disalurkan') ||
    normalizedValue === 'aktif' ||
    normalizedValue === 'hadir'
  ) {
    return 'bg-[#DDF6E8] text-[#28C76F]'
  }

  if (
    normalizedValue.includes('kritis') ||
    normalizedValue.includes('lewat') ||
    normalizedValue.includes('isolir') ||
    normalizedValue.includes('putus') ||
    normalizedValue === 'sakit' ||
    normalizedValue === 'tidak hadir'
  ) {
    return 'bg-[#FCE5E6] text-[#EA5455]'
  }

  if (
    normalizedValue.includes('tunda') ||
    normalizedValue.includes('peringatan') ||
    normalizedValue.includes('tempo') ||
    normalizedValue.includes('verifikasi') ||
    normalizedValue.includes('menunggu') ||
    normalizedValue === 'terlambat' ||
    normalizedValue === 'cuti'
  ) {
    return 'bg-[#FFF0E1] text-[#FF9F43]'
  }

  return 'bg-[#EFF8FF] text-[#1570EF]'
}

watch(
  () => props.open,
  async isOpen => {
    if (isOpen) {
      searchQuery.value = ''
      currentPage.value = 1
      sortKey.value = null
      sortDirection.value = 'ascending'
      previousActiveElement = document.activeElement as HTMLElement | null
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
      closeButton.value?.focus()
      return
    }

    document.body.style.overflow = previousBodyOverflow
    window.removeEventListener('keydown', handleKeydown)
    previousActiveElement?.focus()
  }
)

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(totalPages, pages => {
  if (currentPage.value > pages) {
    currentPage.value = pages
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/60 p-4 sm:p-6"
        role="presentation"
        @click.self="closeModal"
      >
        <section
          class="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-modal-title"
          :aria-describedby="description ? 'detail-modal-description' : undefined"
        >
          <header class="flex shrink-0 items-start justify-between gap-4 border-b border-[#EAECF0] px-4 py-4 sm:px-6">
            <div class="min-w-0">
              <h2 id="detail-modal-title" class="text-xl font-semibold text-[#101828]">
                {{ title }}
              </h2>
              <p
                v-if="description"
                id="detail-modal-description"
                class="mt-1 text-sm text-[#667085]"
              >
                {{ description }}
              </p>
            </div>

            <button
              ref="closeButton"
              type="button"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#667085] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
              aria-label="Tutup detail"
              @click="closeModal"
            >
              <X class="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div class="min-h-0 overflow-y-auto px-4 py-4 sm:px-6">
            <div
              v-if="summary.length"
              class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div
                v-for="item in summary"
                :key="item.label"
                class="rounded-lg p-3"
                :class="getSummaryClass(item.tone)"
              >
                <p class="text-xs font-medium opacity-80">{{ item.label }}</p>
                <p class="mt-1 text-lg font-semibold">{{ item.value }}</p>
              </div>
            </div>

            <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label class="relative block w-full sm:max-w-sm">
                <span class="sr-only">{{ searchPlaceholder }}</span>
                <Search
                  class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]"
                  aria-hidden="true"
                />
                <input
                  v-model="searchQuery"
                  type="search"
                  class="h-10 w-full rounded-lg border border-[#EAECF0] bg-white pl-9 pr-3 text-sm text-[#101828] outline-none placeholder:text-[#667085] focus:border-[#7367F0]"
                  :placeholder="searchPlaceholder"
                >
              </label>

              <p class="text-sm text-[#667085]" aria-live="polite">
                <template v-if="hasPagination">
                  {{ firstDisplayedRow }}–{{ lastDisplayedRow }} dari {{ filteredRows.length }} data
                </template>
                <template v-else>
                  {{ filteredRows.length }} dari {{ rows.length }} data
                </template>
              </p>
            </div>

            <div class="mt-4 overflow-x-auto rounded-lg border border-[#EAECF0]">
              <table class="w-full min-w-[820px] text-sm">
                <thead>
                  <tr class="border-b border-[#EAECF0] text-xs uppercase tracking-wide text-[#667085]">
                    <th
                      v-for="column in columns"
                      :key="column.key"
                      scope="col"
                      class="px-4 py-3 font-semibold"
                      :class="getAlignmentClass(column.align)"
                      :aria-sort="getAriaSort(column)"
                    >
                      <button
                        v-if="column.sortable"
                        type="button"
                        class="inline-flex w-full items-center gap-1.5 rounded-sm hover:text-[#344054] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7367F0]"
                        :class="column.align === 'right' ? 'justify-end' : ''"
                        :aria-label="`Urutkan berdasarkan ${column.label}`"
                        @click="sortBy(column)"
                      >
                        <span>{{ column.label }}</span>
                        <ArrowUp
                          v-if="sortKey === column.key && sortDirection === 'ascending'"
                          class="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        <ArrowDown
                          v-else-if="sortKey === column.key && sortDirection === 'descending'"
                          class="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        <ArrowUpDown
                          v-else
                          class="h-3.5 w-3.5 opacity-60"
                          aria-hidden="true"
                        />
                      </button>
                      <template v-else>{{ column.label }}</template>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EAECF0]">
                  <tr
                    v-for="row in displayedRows"
                    :key="row.id"
                    class="hover:bg-[#F8F7FA]"
                  >
                    <td
                      v-for="column in columns"
                      :key="column.key"
                      class="whitespace-nowrap px-4 py-3 text-[#344054]"
                      :class="getAlignmentClass(column.align)"
                    >
                      <span
                        v-if="column.type === 'badge'"
                        class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                        :class="getBadgeClass(row[column.key])"
                      >
                        {{ row[column.key] }}
                      </span>
                      <span v-else>{{ row[column.key] }}</span>
                    </td>
                  </tr>

                  <tr v-if="!filteredRows.length">
                    <td
                      :colspan="columns.length"
                      class="px-4 py-12 text-center text-sm text-[#667085]"
                    >
                      {{ emptyText }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <footer class="flex shrink-0 items-center justify-between gap-4 border-t border-[#EAECF0] px-4 py-3 sm:px-6">
            <div
              v-if="hasPagination && filteredRows.length"
              class="flex items-center gap-2"
            >
              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-lg border border-[#EAECF0] bg-white px-3 py-2 text-sm font-semibold text-[#344054] transition-colors hover:bg-[#F8F7FA] disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="currentPage === 1"
                aria-label="Halaman sebelumnya"
                @click="previousPage"
              >
                <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                <span class="hidden sm:inline">Sebelumnya</span>
              </button>

              <span class="min-w-24 text-center text-sm text-[#667085]">
                Halaman {{ currentPage }} dari {{ totalPages }}
              </span>

              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-lg border border-[#EAECF0] bg-white px-3 py-2 text-sm font-semibold text-[#344054] transition-colors hover:bg-[#F8F7FA] disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="currentPage === totalPages"
                aria-label="Halaman berikutnya"
                @click="nextPage"
              >
                <span class="hidden sm:inline">Berikutnya</span>
                <ChevronRight class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <span v-else />

            <button
              type="button"
              class="rounded-lg border border-[#EAECF0] bg-white px-4 py-2 text-sm font-semibold text-[#344054] transition-colors hover:bg-[#F8F7FA]"
              @click="closeModal"
            >
              Tutup
            </button>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
