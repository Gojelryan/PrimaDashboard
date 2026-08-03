import { describe, expect, it } from 'vitest'

import { dashboardNavigationItems } from './dashboard-navigation'

describe('dashboardNavigationItems', () => {
  it('contains all supported dashboards with unique IDs', () => {
    const ids = dashboardNavigationItems.map(item => item.id)

    expect(ids).toHaveLength(8)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toEqual([
      'director',
      'marketing',
      'finance',
      'teknisi',
      'noc',
      'admin',
      'human-resource',
      'operational',
    ])
  })

  it('provides a label, title, and icon for every dashboard', () => {
    for (const item of dashboardNavigationItems) {
      expect(item.label).toBeTruthy()
      expect(item.title).toBeTruthy()
      expect(item.icon).toBeTruthy()
    }
  })
})
