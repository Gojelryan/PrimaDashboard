import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppHeader from './AppHeader.vue'

describe('AppHeader theme preference', () => {
  it('offers system, light, and dark preferences', async () => {
    const wrapper = mount(AppHeader, {
      props: {
        title: 'Director Dashboard',
        sidebarOpen: false,
        theme: 'system',
        resolvedTheme: 'dark',
      },
    })

    const systemButton = wrapper.get('button[title^="Ikuti tema sistem"]')

    expect(systemButton.attributes('aria-pressed')).toBe('true')
    expect(systemButton.attributes('title')).toContain('dark')

    await wrapper.get('button[title="Gunakan tema terang"]').trigger('click')
    await wrapper.get('button[title="Gunakan tema gelap"]').trigger('click')
    await systemButton.trigger('click')

    expect(wrapper.emitted('set-theme')).toEqual([
      ['light'],
      ['dark'],
      ['system'],
    ])
  })
})
