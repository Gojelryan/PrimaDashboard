import { apiGet } from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'
import type {
  AdminDashboardResponse,
  DirectorDashboardResponse,
  FinanceDashboardResponse,
  HumanResourceDashboardResponse,
  MarketingDashboardResponse,
  NocDashboardResponse,
  OperationalDashboardResponse,
  TechnicianDashboardResponse,
} from '../types/dashboard'

export function getDirectorDashboard() {
  return apiGet<DirectorDashboardResponse>(API_ENDPOINTS.dashboard.director)
}

export function getMarketingDashboard() {
  return apiGet<MarketingDashboardResponse>(API_ENDPOINTS.dashboard.marketing)
}

export function getTechnicianDashboard() {
  return apiGet<TechnicianDashboardResponse>(API_ENDPOINTS.dashboard.technician)
}

export function getAdminDashboard() {
  return apiGet<AdminDashboardResponse>(API_ENDPOINTS.dashboard.admin)
}

export function getHumanResourceDashboard() {
  return apiGet<HumanResourceDashboardResponse>(
    API_ENDPOINTS.dashboard.humanResource
  )
}

export function getOperationalDashboard() {
  return apiGet<OperationalDashboardResponse>(
    API_ENDPOINTS.dashboard.operational
  )
}

export function getFinanceDashboard() {
  return apiGet<FinanceDashboardResponse>(API_ENDPOINTS.dashboard.finance)
}

export function getNocDashboard() {
  return apiGet<NocDashboardResponse>(API_ENDPOINTS.dashboard.noc)
}

export async function getDirectorDashboardSummary() {
  const dashboard = await getDirectorDashboard()

  return dashboard.summary
}

export async function getDirectorDashboardFinancial() {
  const dashboard = await getDirectorDashboard()

  return dashboard.financial
}

export async function getDirectorDashboardCustomers() {
  const dashboard = await getDirectorDashboard()

  return dashboard.customers
}

export async function getDirectorDashboardInfrastructure() {
  const dashboard = await getDirectorDashboard()

  return dashboard.infrastructure
}

export async function getDirectorDashboardInternetCapacity() {
  const dashboard = await getDirectorDashboard()

  return dashboard.internetCapacity
}

export async function getDirectorDashboardNetworkHealth() {
  const dashboard = await getDirectorDashboard()

  return dashboard.networkHealth
}

export async function getDirectorDashboardPartners() {
  const dashboard = await getDirectorDashboard()

  return dashboard.partners
}
