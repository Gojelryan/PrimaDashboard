import { customerMetrics } from './customer-metrics'

export const partnerCustomerDetails = [
  { id: 'MTR-BON-A', name: 'Andi Firmansyah', area: 'Bone', totalCustomer: 150 },
  { id: 'MTR-BON-B', name: 'Nur Aisyah', area: 'Bone', totalCustomer: 100 },
  { id: 'MTR-BON-C', name: 'Rahmat Hidayat', area: 'Bone', totalCustomer: 131 },
  { id: 'MTR-SDR-A', name: 'Fadli Akbar', area: 'Sidrap', totalCustomer: 100 },
  { id: 'MTR-SDR-B', name: 'Siti Rahmawati', area: 'Sidrap', totalCustomer: 178 },
  { id: 'MTR-BLK-A', name: 'Muhammad Arsyad', area: 'Bulukumba', totalCustomer: 100 },
  { id: 'MTR-BLK-B', name: 'Fitriani Putri', area: 'Bulukumba', totalCustomer: 80 },
  { id: 'MTR-BLK-C', name: 'Ilham Maulana', area: 'Bulukumba', totalCustomer: 93 },
  { id: 'MTR-SNJ-A', name: 'Syamsul Bahri', area: 'Sinjai', totalCustomer: 50 },
  { id: 'MTR-SNJ-B', name: 'Nurul Hikmah', area: 'Sinjai', totalCustomer: 93 },
  { id: 'MTR-PLP-A', name: 'Rizal Pratama', area: 'Palopo', totalCustomer: 112 },
  { id: 'MTR-PLP-B', name: 'Dewi Lestari', area: 'Palopo', totalCustomer: 50 },
  { id: 'MTR-PNR-A', name: 'Hendra Gunawan', area: 'Pinrang', totalCustomer: 79 },
  { id: 'MTR-PNR-B', name: 'Hasna Amelia', area: 'Pinrang', totalCustomer: 50 },
  { id: 'MTR-PNR-C', name: 'Arman Hidayat', area: 'Pinrang', totalCustomer: 100 },
  { id: 'MTR-MRS-A', name: 'Agus Salim', area: 'Maros', totalCustomer: 91 },
  { id: 'MTR-MRS-B', name: 'Nurlaila Hasan', area: 'Maros', totalCustomer: 100 },
  { id: 'MTR-MRS-C', name: 'Reza Mahendra', area: 'Maros', totalCustomer: 100 },
  { id: 'MTR-TKL-A', name: 'Baharuddin Malik', area: 'Takalar', totalCustomer: 88 },
  { id: 'MTR-TKL-B', name: 'Indah Permata', area: 'Takalar', totalCustomer: 50 },
  { id: 'MTR-TKL-C', name: 'Rudi Hartono', area: 'Takalar', totalCustomer: 50 }
] as const

const partnerAreas = [...new Set(partnerCustomerDetails.map(partner => partner.area))]
  .map(area => {
    const partners = partnerCustomerDetails.filter(partner => partner.area === area)

    return {
      name: area,
      partner: partners.length,
      customer: partners.reduce((total, partner) => total + partner.totalCustomer, 0)
    }
  })

export const partnerDistribution = {
  totalPartner: partnerCustomerDetails.length,
  totalCustomer: partnerCustomerDetails.reduce(
    (total, partner) => total + partner.totalCustomer,
    0
  ),
  partners: partnerCustomerDetails,
  areas: partnerAreas
}

if (partnerDistribution.totalCustomer !== customerMetrics.partner.total) {
  throw new Error('Total pelanggan Mitra tidak sesuai customerMetrics')
}
