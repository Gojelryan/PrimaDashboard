import {
  financialMetrics,
  financialReportingPeriod,
  formatFinancialCurrency,
  formatFinancialCurrencyCompact,
  selectedFinancialMetric,
} from './financial-metrics'
import {
  formatCustomerCurrency,
  totalCustomerOutstanding,
} from './customer-metrics'

const selectedCashFlow = selectedFinancialMetric.income - selectedFinancialMetric.expense

export const financeDashboard = {
  period: financialReportingPeriod,
  summary: [
    { title: 'Total Kas', value: 'Rp 7.300.000.000', detail: '+ 10%', note: 'dari bulan lalu', period: '20 Juli 2026' },
    {
      title: 'Cash Flow Bulan ini',
      value: formatFinancialCurrency(selectedCashFlow),
      detail: `Masuk ${formatFinancialCurrencyCompact(selectedFinancialMetric.income)}`,
      note: `Keluar ${formatFinancialCurrencyCompact(selectedFinancialMetric.expense)}`,
      period: ''
    },
    { title: 'Piutang', value: formatCustomerCurrency(totalCustomerOutstanding), detail: '', note: '', period: 'Per Juli 2026' },
    { title: 'Hutang', value: 'Rp 550.000.000', detail: '', note: 'Jatuh tempo terdekat 28 Juli 2026', period: '' }
  ],
  monthlyCashFlow: financialMetrics,
  opex: [
    { label: 'Gaji', value: 1200000000 }, { label: 'Operasional', value: 600000000 }, { label: 'Infrastruktur', value: 400000000 },
    { label: 'Property', value: 250000000 }, { label: 'Utilitas', value: 150000000 }
  ],
  expenses: [
    { date: '15 Jul 2026', category: 'Gaji Karyawan', description: 'Gaji Bulan Juli', amount: 'Rp 1.800.000.000' },
    { date: '10 Jul 2026', category: 'Operasional', description: 'BBM Kendaraan', amount: 'Rp 185.000.000' },
    { date: '5 Jul 2026', category: 'Infrastruktur', description: 'Pembelian Drop Cable', amount: 'Rp 320.000.000' },
    { date: '2 Jul 2026', category: 'Property', description: 'Pembelian Meja', amount: 'Rp 45.000.000' },
    { date: '1 Jul 2026', category: 'Utilitas', description: 'Listrik Kantor', amount: 'Rp 62.000.000' }
  ],
  invoices: [
    { date: '27-7-2026', item: 'ODP 16 core', quantity: '20 Unit', amount: 'Rp 4.500.000', status: 'Jatuh Tempo' },
    { date: '29-7-2026', item: 'Fiber Optic 48c', quantity: '5.000 meter', amount: 'Rp 5.600.000', status: 'Diproses' },
    { date: '25-7-2026', item: 'IP Transit', quantity: '5 Gbps', amount: 'Rp 10.000.000', status: 'Lunas' }
  ]
}
