import type { OperationalDashboardResponse } from '../../types/dashboard'

const itemMovements = {
  incoming: [
    { id: 'BM-2607-1280', occurredAt: '2026-07-27T09:20:00+08:00', item: 'ONU/ONT', quantity: 400, unit: 'unit', counterparty: 'PT Network Utama', document: 'SJ-NU-2707', officer: 'Arman Tangkudung', status: 'Diterima' },
    { id: 'BM-2607-1279', occurredAt: '2026-07-26T15:45:00+08:00', item: 'Fast Connector SC/UPC', quantity: 300, unit: 'unit', counterparty: 'CV Solusi Network', document: 'SJ-SN-2607', officer: 'Muhammad Akbar', status: 'Diterima' },
    { id: 'BM-2607-1278', occurredAt: '2026-07-25T11:10:00+08:00', item: 'ODP', quantity: 200, unit: 'unit', counterparty: 'PT Fiber Optik Indonesia', document: 'SJ-FOI-2507', officer: 'Arman Tangkudung', status: 'Diterima' },
    { id: 'BM-2607-1277', occurredAt: '2026-07-24T14:30:00+08:00', item: 'PLC Splitter 1:8', quantity: 100, unit: 'unit', counterparty: 'CV Cahaya Telekom', document: 'SJ-CT-2407', officer: 'Muhammad Akbar', status: 'Diterima' },
    { id: 'BM-2607-1276', occurredAt: '2026-07-23T10:05:00+08:00', item: 'Patch Cord SC/UPC', quantity: 180, unit: 'unit', counterparty: 'PT Network Utama', document: 'SJ-NU-2307', officer: 'Arman Tangkudung', status: 'Diterima' },
    { id: 'BM-2607-1275', occurredAt: '2026-07-22T16:25:00+08:00', item: 'Router Mikrotik', quantity: 20, unit: 'unit', counterparty: 'CV Solusi Network', document: 'SJ-SN-2207', officer: 'Muhammad Akbar', status: 'Diterima' },
    { id: 'BM-2607-1274', occurredAt: '2026-07-21T13:40:00+08:00', item: 'Switch Managed 24 Port', quantity: 50, unit: 'unit', counterparty: 'PT Data Perkasa', document: 'SJ-DP-2107', officer: 'Arman Tangkudung', status: 'Diterima' },
    { id: 'BM-2607-1273', occurredAt: '2026-07-20T08:50:00+08:00', item: 'UPS 3000 VA', quantity: 30, unit: 'unit', counterparty: 'PT Energi Sulawesi', document: 'SJ-ES-2007', officer: 'Muhammad Akbar', status: 'Diterima' }
  ],
  outgoing: [
    { id: 'BK-2607-0842', occurredAt: '2026-07-27T13:15:00+08:00', item: 'ONU/ONT', quantity: 300, unit: 'unit', counterparty: 'Tim Instalasi Makassar', document: 'DO-2707-042', officer: 'Arman Tangkudung', status: 'Disalurkan' },
    { id: 'BK-2607-0841', occurredAt: '2026-07-27T10:30:00+08:00', item: 'ODP', quantity: 150, unit: 'unit', counterparty: 'Proyek FO Gowa', document: 'DO-2707-041', officer: 'Muhammad Akbar', status: 'Disalurkan' },
    { id: 'BK-2607-0840', occurredAt: '2026-07-26T14:20:00+08:00', item: 'Fast Connector SC/UPC', quantity: 200, unit: 'unit', counterparty: 'Tim Teknisi Maros', document: 'DO-2607-040', officer: 'Arman Tangkudung', status: 'Disalurkan' },
    { id: 'BK-2607-0839', occurredAt: '2026-07-25T16:05:00+08:00', item: 'PLC Splitter 1:8', quantity: 80, unit: 'unit', counterparty: 'Proyek ODP Pangkep', document: 'DO-2507-039', officer: 'Muhammad Akbar', status: 'Disalurkan' },
    { id: 'BK-2607-0838', occurredAt: '2026-07-24T09:45:00+08:00', item: 'Patch Cord SC/UPC', quantity: 60, unit: 'unit', counterparty: 'Tim NOC', document: 'DO-2407-038', officer: 'Arman Tangkudung', status: 'Disalurkan' },
    { id: 'BK-2607-0837', occurredAt: '2026-07-23T12:35:00+08:00', item: 'Router Mikrotik', quantity: 15, unit: 'unit', counterparty: 'Aktivasi Corporate', document: 'DO-2307-037', officer: 'Muhammad Akbar', status: 'Disalurkan' },
    { id: 'BK-2607-0836', occurredAt: '2026-07-22T15:10:00+08:00', item: 'Switch Managed 24 Port', quantity: 20, unit: 'unit', counterparty: 'POP Makassar Utara', document: 'DO-2207-036', officer: 'Arman Tangkudung', status: 'Disalurkan' },
    { id: 'BK-2607-0835', occurredAt: '2026-07-21T11:25:00+08:00', item: 'UPS 3000 VA', quantity: 17, unit: 'unit', counterparty: 'POP Gowa', document: 'DO-2107-035', officer: 'Muhammad Akbar', status: 'Disalurkan' }
  ]
}

export const operationalDashboard = {
  period: {
    year: 2026,
    month: 7,
    label: 'Juli 2026'
  },
  updatedAt: '2026-07-27T11:45:00+08:00',
  summary: {
    incomingItems: itemMovements.incoming.reduce((total, movement) => total + movement.quantity, 0),
    outgoingItems: itemMovements.outgoing.reduce((total, movement) => total + movement.quantity, 0),
    itemRequests: 37,
    pendingRequests: 8
  },
  itemMovements,
  inventory: [
    { item: 'OLT', unit: 'unit', quantity: 18, used: 12, warehouse: 6, good: 5, damaged: 1, minimumStock: 3 },
    { item: 'ONU/ONT/ODC', unit: 'unit', quantity: 420, used: 312, warehouse: 108, good: 102, damaged: 6, minimumStock: 50 },
    { item: 'ODP', unit: 'unit', quantity: 185, used: 142, warehouse: 43, good: 40, damaged: 3, minimumStock: 20 },
    { item: 'Fiber Optic Drop Cable', unit: 'meter', quantity: 32000, used: 24600, warehouse: 7400, good: 7200, damaged: 200, minimumStock: 5000 },
    { item: 'Fiber Optic Feeder Cable', unit: 'meter', quantity: 18000, used: 13100, warehouse: 4900, good: 4700, damaged: 200, minimumStock: 3000 },
    { item: 'Patch Cord SC/UPC', unit: 'unit', quantity: 240, used: 224, warehouse: 16, good: 15, damaged: 1, minimumStock: 25 },
    { item: 'PLC Splitter 1:8', unit: 'unit', quantity: 95, used: 87, warehouse: 8, good: 7, damaged: 1, minimumStock: 12 },
    { item: 'PLC Splitter 1:16', unit: 'unit', quantity: 74, used: 67, warehouse: 7, good: 7, damaged: 0, minimumStock: 10 },
    { item: 'Fast Connector SC/UPC', unit: 'unit', quantity: 580, used: 491, warehouse: 89, good: 85, damaged: 4, minimumStock: 50 },
    { item: 'Closure Fiber Optic', unit: 'unit', quantity: 64, used: 48, warehouse: 16, good: 15, damaged: 1, minimumStock: 10 },
    { item: 'Router Mikrotik', unit: 'unit', quantity: 27, used: 27, warehouse: 0, good: 0, damaged: 0, minimumStock: 5 },
    { item: 'Switch Managed 24 Port', unit: 'unit', quantity: 15, used: 15, warehouse: 0, good: 0, damaged: 0, minimumStock: 3 },
    { item: 'Rack Server 42U', unit: 'unit', quantity: 8, used: 8, warehouse: 0, good: 0, damaged: 0, minimumStock: 2 },
    { item: 'UPS 3000 VA', unit: 'unit', quantity: 22, used: 17, warehouse: 5, good: 4, damaged: 1, minimumStock: 4 }
  ],
  vehicles: {
    total: 18,
    standby: 7,
    onsite: 9,
    service: 2
  }
} satisfies OperationalDashboardResponse
