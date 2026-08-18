import type {
  NocDashboardResponse,
  TechnicianDashboardResponse,
} from '../../types/dashboard'
import {
  employeeMetrics,
  technicianEmployeeNames,
} from './employee-metrics'
import { internetCapacity, popCapacity } from './internet-capacity'
import { commercialProjects } from './commercial-performance'

const dailyInstallationPerformance = [2, 3, 2, 2, 4, 3, 5]
const foWithdrawalPerformance = [3000, 800, 12100, 20000, 8400, 2800, 12000]

export const technicalOperationsDashboard = {
  technician: {
    period: {
      year: 2026,
      month: 7,
      label: 'Juli 2026'
    },
    team: {
      total: employeeMetrics.technician.total,
      onsite: employeeMetrics.technician.onsite,
      standby: employeeMetrics.technician.standby
    },
    jobs: {
      total: 124,
      completed: 80,
      inProgress: 35,
      pending: 9
    },
    infrastructureBuilt: {
      totalKm: 800,
      targetKm: 4000,
      progressPercent: 20,
      areas: [
        { area: 'Makassar', totalKm: 130 },
        { area: 'Maros', totalKm: 50 },
        { area: 'Gowa', totalKm: 150 },
        { area: 'Pangkep', totalKm: 67 },
        { area: 'Sidrap', totalKm: 100 },
        { area: 'Palopo', totalKm: 50 },
        { area: 'Pinrang', totalKm: 186 },
        { area: 'Barru', totalKm: 67 }
      ]
    },
    dailyInstallations: [
      { date: '25/7', total: 18 },
      { date: '26/7', total: 24 },
      { date: '27/7', total: 21 },
      { date: '28/7', total: 32 },
      { date: '29/7', total: 28 },
      { date: '30/7', total: 39 },
      { date: '31/7', total: 35 }
    ],
    runningProjects: commercialProjects.map(project => ({
      name: project.name,
      progressPercent: project.progressPercent,
    })),
    teamPerformance: technicianEmployeeNames.map((name, index) => ({
      name,
      dailyInstallation: dailyInstallationPerformance[
        index % dailyInstallationPerformance.length
      ] ?? 0,
      foWithdrawalMeters: foWithdrawalPerformance[
        index % foWithdrawalPerformance.length
      ] ?? 0
    })),
    materialStock: [
      { material: 'Kabel Fiber 48 Core', available: 1000, minimum: 5000, unit: 'm' },
      { material: 'ODP 16 Core', available: 3, minimum: 20, unit: 'unit' },
      { material: 'Closure Dome', available: 5, minimum: 20, unit: 'unit' },
      { material: 'Connector SC/APC', available: 20, minimum: 100, unit: 'pcs' },
      { material: 'Splice Sleeve', available: 30, minimum: 500, unit: 'pcs' }
    ],
    infrastructureAssets: [
      { label: 'ODP', value: 210 },
      { label: 'ODC', value: 34 },
      { label: 'OLT', value: 27 },
      { label: 'POP', value: 27 },
      { label: 'Tiang', value: 163 }
    ]
  },
  noc: {
    period: {
      year: 2026,
      month: 7,
      label: 'Juli 2026'
    },
    tickets: {
      total: 128,
      completed: 96,
      pending: 32
    },
    incidentSummary: {
      total: 36,
      completed: 24,
      inProgress: 8,
      pending: 4
    },
    internetCapacity,
    serviceAlarms: [
      {
        label: 'Link Down - Makassar - Gowa',
        occurredAt: '2026-07-27T08:12:00+08:00',
        severity: 'critical'
      },
      {
        label: 'Informasi Kapasitas POP Makassar Utara',
        occurredAt: '2026-07-27T09:35:00+08:00',
        severity: 'warning'
      },
      {
        label: 'OLT Offline - Gowa ABC',
        occurredAt: '2026-07-27T10:18:00+08:00',
        severity: 'critical'
      }
    ],
    latencyResponses: [
      { name: 'Diskominfo Palopo', ip: '45.198.8.30', latencyMs: 314 },
      { name: 'Diskominfo Bantaeng', ip: '45.198.8.166', latencyMs: 24.6 },
      { name: 'DPRD SULSEL', ip: '45.198.8.22', latencyMs: 184.3 },
      { name: 'Diskominfo Pinrang', ip: '45.198.8.31', latencyMs: 50.5 },
      { name: 'MITRA WAJO', ip: '45.198.8.114', latencyMs: 18.5 },
      { name: 'MX-CCM', ip: '45.198.8.45', latencyMs: 10.2 },
      { name: 'LORWIS', ip: '45.198.8.174', latencyMs: 24 },
      { name: 'Pemkab Maros', ip: '45.198.8.91', latencyMs: 42.8 },
      { name: 'RSUD Barru', ip: '45.198.8.117', latencyMs: 76.4 },
      { name: 'Pemda Parepare', ip: '45.198.8.205', latencyMs: 31.7 },
      { name: 'Kantor Bupati Gowa', ip: '45.198.8.72', latencyMs: 16.9 },
      { name: 'Diskominfo Pangkep', ip: '45.198.8.133', latencyMs: 62.1 }
    ],
    incidentCategories: [
      { category: 'Fiber Optic Cut', total: 12 },
      { category: 'Power Off (Listrik)', total: 8 },
      { category: 'Hardware Error', total: 5 },
      { category: 'Link Down', total: 7 },
      { category: 'High Latency', total: 4 }
    ],
    incidentHistory: [
      { area: 'Makassar', total: 9 },
      { area: 'Maros', total: 4 },
      { area: 'Gowa', total: 7 },
      { area: 'Pangkep', total: 3 },
      { area: 'Barru', total: 2 },
      { area: 'Parepare', total: 3 },
      { area: 'Pinrang', total: 3 },
      { area: 'Palopo', total: 5 }
    ],
    popCapacity
  }
} satisfies {
  technician: TechnicianDashboardResponse
  noc: NocDashboardResponse
}
