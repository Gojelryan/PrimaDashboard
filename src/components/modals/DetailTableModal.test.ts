/* @vitest-environment jsdom */

import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import DetailTableModal from './DetailTableModal.vue'

const rows = Array.from({ length: 25 }, (_, index) => ({
  id: `CST-${String(index + 1).padStart(3, '0')}`,
  customer: `Pelanggan ${index + 1}`
}))

const mountedWrappers: ReturnType<typeof mount>[] = []

function mountModal() {
  const wrapper = mount(DetailTableModal, {
    props: {
      open: true,
      title: 'Detail Pelanggan',
      columns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'customer', label: 'Pelanggan', sortable: true }
      ],
      rows,
      pageSize: 10
    },
    global: {
      stubs: {
        Teleport: true
      }
    }
  })

  mountedWrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  for (const wrapper of mountedWrappers.splice(0)) {
    wrapper.unmount()
  }
})

describe('DetailTableModal pagination', () => {
  it('shows ten rows and moves through all result pages', async () => {
    const wrapper = mountModal()

    expect(wrapper.text()).toContain('1–10 dari 25 data')
    expect(wrapper.text()).toContain('CST-010')
    expect(wrapper.text()).not.toContain('CST-011')

    await wrapper.get('[aria-label="Halaman berikutnya"]').trigger('click')

    expect(wrapper.text()).toContain('Halaman 2 dari 3')
    expect(wrapper.text()).toContain('CST-011')
    expect(wrapper.text()).toContain('CST-020')
    expect(wrapper.text()).not.toContain('CST-010')

    await wrapper.get('[aria-label="Halaman berikutnya"]').trigger('click')

    expect(wrapper.text()).toContain('21–25 dari 25 data')
    expect(wrapper.text()).toContain('CST-025')
    expect(wrapper.get('[aria-label="Halaman berikutnya"]').attributes('disabled')).toBeDefined()
  })

  it('returns to the first page when a search is entered', async () => {
    const wrapper = mountModal()

    await wrapper.get('[aria-label="Halaman berikutnya"]').trigger('click')
    await wrapper.get('input[type="search"]').setValue('Pelanggan 25')

    expect(wrapper.text()).toContain('Halaman 1 dari 1')
    expect(wrapper.text()).toContain('CST-025')
    expect(wrapper.text()).toContain('1–1 dari 1 data')
  })

  it('sorts naturally and returns to the first page', async () => {
    const wrapper = mountModal()
    const sortButton = wrapper.get('[aria-label="Urutkan berdasarkan Pelanggan"]')

    await wrapper.get('[aria-label="Halaman berikutnya"]').trigger('click')
    await sortButton.trigger('click')
    await sortButton.trigger('click')

    expect(wrapper.text()).toContain('Halaman 1 dari 3')
    expect(wrapper.text()).toContain('CST-025')
    expect(wrapper.text()).not.toContain('CST-001')
  })
})
