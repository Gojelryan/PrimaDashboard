import {
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  LayoutDashboard,
  RadioTower,
  UserCog,
  UsersRound,
  Wrench
} from 'lucide-vue-next'

export const dashboardNavigationItems = [
  {
    id: 'director',
    label: 'Dashboard',
    title: 'Director Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'marketing',
    label: 'Marketing',
    title: 'Marketing Dashboard',
    icon: ChartNoAxesCombined
  },
  {
    id: 'finance',
    label: 'Finance',
    title: 'Finance Dashboard',
    icon: CircleDollarSign
  },
  {
    id: 'teknisi',
    label: 'Teknisi',
    title: 'Teknisi Dashboard',
    icon: Wrench
  },
  {
    id: 'noc',
    label: 'NOC',
    title: 'NOC Dashboard',
    icon: RadioTower
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Admin Dashboard',
    icon: UserCog
  },
  {
    id: 'human-resource',
    label: 'Human Resource',
    title: 'Human Resource Dashboard',
    icon: UsersRound
  },
  {
    id: 'operational',
    label: 'Operational',
    title: 'Operational Dashboard',
    icon: Boxes
  },
] as const

export type DashboardPage = typeof dashboardNavigationItems[number]['id']
