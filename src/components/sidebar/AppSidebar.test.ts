import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppSidebar from './AppSidebar.vue'

describe('AppSidebar', () => {
  it('marks the active page and emits a selection', async () => {
    const wrapper = mount(AppSidebar, {
      props: {
        activePage: 'director',
      },
    })

    expect(wrapper.get('[aria-current="page"]').text()).toContain('Dashboard')

    const marketingButton = wrapper
      .findAll('button')
      .find(button => button.text().includes('Marketing'))

    expect(marketingButton).toBeDefined()
    await marketingButton?.trigger('click')
    expect(wrapper.emitted('select-page')).toEqual([['marketing']])
  })
})
