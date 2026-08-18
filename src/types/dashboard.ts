export interface DashboardPeriod {
  year: number
  month?: number
  label?: string
}

export interface EmployeeSummary {
  total: number
  present: number
  late: number
  absent: number
}

export interface JobSummary {
  total: number
  completed: number
  inProgress: number
  pending: number
}

export interface TicketSummary {
  total: number
  closed: number
  inProgress: number
  hold: number
}

export type CustomerMovementPeriod = 'monthly' | 'ytd'

export interface CustomerMovementSummary {
  period: CustomerMovementPeriod
  periodLabel: string
  newCustomer: number
  churnCustomer: number
}

export interface CustomerSegmentSummary {
  total: number
  movement: CustomerMovementSummary
  outstandingAmount: number
}

export interface DirectorDashboardSummary {
  employees: EmployeeSummary
  jobs: JobSummary
  tickets: TicketSummary
  corporate: CustomerSegmentSummary
  retail: CustomerSegmentSummary
}

export interface FinancialMonthlyPoint {
  month: string
  label: string
  income: number
  expense: number
}

export interface FinancialMovementData {
  selectedMonth: string
  monthly: FinancialMonthlyPoint[]
}

export type DirectorDashboardFinancial = FinancialMovementData

export interface CustomerSegmentTotal {
  segment: 'corporate' | 'retail' | 'partner' | 'analog'
  total: number
}

export interface DashboardTrendPoint {
  month: string
  value: number
}

export interface CustomerMovementTrendPoint extends DashboardTrendPoint {
  newCustomer: number
  churnCustomer: number
}

export interface DirectorDashboardCustomers {
  bySegment: CustomerSegmentTotal[]
  growth: {
    corporateRevenue: DashboardTrendPoint[]
    retailCustomers: CustomerMovementTrendPoint[]
    partnerCustomers: CustomerMovementTrendPoint[]
  }
}

export interface DirectorDashboardInfrastructure {
  addedOdp: number
  addedOlt: number
  addedHomepass: number
  coverageMeters: number
}

export interface DirectorDashboardInternetCapacity {
  totalMbps: number
  usedMbps: number
  availableMbps: number
  utilizationPercent: number
}

export interface DirectorDashboardNetworkHealth {
  uptimePercent: number
  activeIncidents: number
  degradedLinks: number
  offlineLinks: number
}

export interface PartnerAreaDistribution {
  area: string
  partner: number
  customer: number
}

export interface DirectorDashboardPartners {
  totalPartner: number
  totalCustomer: number
  partners: {
    id: string
    name: string
    area: string
    totalCustomer: number
  }[]
  areas: PartnerAreaDistribution[]
}

export interface DirectorDashboardResponse {
  period: DashboardPeriod
  summary: DirectorDashboardSummary
  financial: DirectorDashboardFinancial
  customers: DirectorDashboardCustomers
  infrastructure: DirectorDashboardInfrastructure
  internetCapacity: DirectorDashboardInternetCapacity
  networkHealth: DirectorDashboardNetworkHealth
  partners: DirectorDashboardPartners
  updatedAt?: string
}

export interface DashboardResponseMeta {
  period: DashboardPeriod
  updatedAt?: string
}

export interface MetricItem {
  label: string
  value: number
}

export interface MarketingTarget {
  segment: 'corporate' | 'retail'
  target: number
  current: number
  progressPercent: number
}

export interface CommercialProject {
  id: string
  name: string
  customer: string
  employeeId: string
  contractValue: number
  progressPercent: number
  billingStatus: string
}

export interface MarketingDashboardResponse extends DashboardResponseMeta {
  customerSegments: {
    segment: 'corporate' | 'retail'
    total: number
    movement: CustomerMovementSummary
    outstandingAmount: number
  }[]
  targets: MarketingTarget[]
  branchRetailPartners: {
    totalPartner: number
    totalCustomer: number
    partners: {
      id: string
      name: string
      area: string
      totalCustomer: number
    }[]
    areas: {
      name: string
      partner: number
      customer: number
    }[]
  }
  portStatus: {
    progressPercent: number
    homePass: number
    emptyPort: number
    potentialAreas: string[]
  }
  customerSegmentTotals: CustomerSegmentTotal[]
  growth: {
    corporateRevenue: DashboardTrendPoint[]
    retailCustomers: CustomerMovementTrendPoint[]
    partnerCustomers: CustomerMovementTrendPoint[]
  }
  teamPerformance: {
    employeeId: string
    employeeName: string
    area: string
    retailCustomer: number
    corporateCustomer: number
    project: number
  }[]
  teamCorporateCustomers: {
    id: string
    employeeId: string
    customer: string
    area: string
    package: string
    joinedAt: string
    contractValue: number
    customerStatus: string
  }[]
}

export interface TechnicianDashboardResponse extends DashboardResponseMeta {
  team: {
    total: number
    onsite: number
    standby: number
  }
  jobs: JobSummary
  dailyInstallations: {
    date: string
    total: number
  }[]
  runningProjects: {
    name: string
    progressPercent: number
  }[]
  teamPerformance: {
    name: string
    dailyInstallation: number
    foWithdrawalMeters: number
  }[]
  materialStock: {
    material: string
    available: number
    minimum: number
    unit: string
  }[]
  infrastructureAssets: MetricItem[]
  infrastructureBuilt: {
    totalKm: number
    targetKm: number
    progressPercent: number
    areas: {
      area: string
      totalKm: number
    }[]
  }
}

export interface AdminDashboardResponse extends DashboardResponseMeta {
  customerStatus: {
    total: number
    active: number
    isolated: number
    inactive: number
  }
  customerSegments: {
    segment: 'corporate' | 'retail' | 'partner' | 'analog'
    total: number
    movement: CustomerMovementSummary
    outstandingAmount: number
  }[]
  receipts: {
    total: number
    categories: {
      category: string
      total: number
      completed: number
      remaining: number
    }[]
    collectors: {
      name: string
      internet: number
      analog: number
      completed: number
    }[]
  }
  payments: {
    method: string
    total: number
    percentage: number
  }[]
}

export interface HumanResourceDashboardResponse extends DashboardResponseMeta {
  employees: {
    total: number
    attendance: MetricItem[]
    divisions: MetricItem[]
  }
  overtime: {
    employees: {
      name: string
      hours: number
      details: {
        id: string
        date: string
        startTime: string
        endTime: string
        hours: number
        description: string
        status: 'approved' | 'pending' | 'rejected'
      }[]
    }[]
    divisions: {
      division: string
      hours: number
    }[]
  }
  priorities: {
    label: string
    priority: 'high' | 'medium' | 'low'
  }[]
  leaveRequests: {
    id: string
    employeeId: string
    employeeName: string
    division: string
    leaveType: string
    submittedAt: string
    startDate: string
    endDate: string
    totalDays: number
    reason: string
    directSupervisor: LeaveApprovalStep
    hrApproval: LeaveApprovalStep
    status: 'waiting-supervisor' | 'waiting-hr' | 'approved' | 'rejected'
  }[]
  payroll: {
    total: number
    growthPercent: number
    basicSalary: number
    overtime: number
    allowance: number
  }
}

export interface LeaveApprovalStep {
  approverId?: string
  approverName: string
  status: 'pending' | 'approved' | 'rejected'
  decidedAt?: string
  note?: string
}

export interface FinanceDashboardResponse extends DashboardResponseMeta {
  cash: {
    total: number
    growthPercent: number
  }
  monthlyCashFlow: FinancialMovementData
  receivables: {
    total: number
    asOf: string
  }
  payables: {
    total: number
    nearestDueDate: string
  }
  opex: {
    category: string
    total: number
  }[]
  recentExpenses: {
    date: string
    category: string
    description: string
    amount: number
  }[]
  invoices: {
    date: string
    item: string
    quantity: number
    unit: string
    amount: number
    status: 'due' | 'processing' | 'paid'
  }[]
  projectContracts: {
    period: string
    totalValue: number
    items: CommercialProject[]
  }
}

export interface OperationalDashboardResponse extends DashboardResponseMeta {
  summary: {
    incomingItems: number
    outgoingItems: number
    itemRequests: number
    pendingRequests: number
  }
  itemMovements: {
    incoming: OperationalItemMovement[]
    outgoing: OperationalItemMovement[]
  }
  inventory: {
    item: string
    unit: string
    quantity: number
    used: number
    warehouse: number
    good: number
    damaged: number
    minimumStock: number
  }[]
  vehicles: {
    total: number
    standby: number
    onsite: number
    service: number
  }
}

export interface OperationalItemMovement {
  id: string
  occurredAt: string
  item: string
  quantity: number
  unit: string
  counterparty: string
  document: string
  officer: string
  status: string
}

export interface NocDashboardResponse extends DashboardResponseMeta {
  tickets: {
    total: number
    completed: number
    pending: number
  }
  incidentSummary: {
    total: number
    completed: number
    inProgress: number
    pending: number
  }
  internetCapacity: {
    totalGbps: number
    usedGbps: number
    availableGbps: number
  }
  serviceAlarms: {
    label: string
    occurredAt: string
    severity: 'critical' | 'warning'
  }[]
  latencyResponses: {
    name: string
    ip: string
    latencyMs: number
  }[]
  incidentCategories: {
    category: string
    total: number
  }[]
  incidentHistory: {
    area: string
    total: number
  }[]
  popCapacity: {
    name: string
    capacityGbps: number
    usedGbps: number
    availableGbps: number
    utilizationPercent: number
  }[]
}
