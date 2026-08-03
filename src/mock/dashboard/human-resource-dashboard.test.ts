import { describe, expect, it } from 'vitest'

import {
  employeeLeaveRequests,
  employeeOvertimeDetails,
  humanResourceDashboard,
} from './human-resource-dashboard'

describe('humanResourceDashboard overtime data', () => {
  it('derives each employee total from the detailed overtime activities', () => {
    for (const employee of humanResourceDashboard.overtime) {
      const detailedHours = employeeOvertimeDetails
        .filter(item => item.employee === employee.name)
        .reduce((total, item) => total + item.hours, 0)

      expect(employee.hours).toBe(detailedHours)
    }
  })

  it('provides work and time information for every overtime activity', () => {
    for (const item of employeeOvertimeDetails) {
      expect(item.startTime).toMatch(/^\d{2}:\d{2}$/)
      expect(item.endTime).toMatch(/^\d{2}:\d{2}$/)
      expect(item.hours).toBeGreaterThan(0)
      expect(item.description).toBeTruthy()
    }
  })
})

describe('humanResourceDashboard leave approval data', () => {
  it('keeps HR pending until the direct supervisor approves', () => {
    for (const request of employeeLeaveRequests) {
      if (request.directSupervisor.status === 'Menunggu') {
        expect(request.hrApproval.status).toBe('Belum diproses')
        expect(request.status).toBe('Menunggu Atasan Langsung')
      }

      if (request.directSupervisor.status === 'Disetujui') {
        expect(request.hrApproval.status).toBe('Menunggu')
        expect(request.status).toBe('Menunggu HR')
      }
    }
  })

  it('identifies every applicant independently from attendance status', () => {
    for (const request of employeeLeaveRequests) {
      expect(request.employeeId).toMatch(/^EMP-\d{3}$/)
      expect(request.employee).toBeTruthy()
      expect(request.reason).toBeTruthy()
      expect(request.totalDays).toBeGreaterThan(0)
    }
  })
})
