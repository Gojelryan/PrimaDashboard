import { customerMetrics } from './customer-metrics'

export const customerGrowth = {
  corporate: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu'
   
    ],

    series: [
      1500,
      1750,
      2150,
      2620,
      2800,
      2950,
      3000,
      3250
   
    ]
  },

  retail: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu'
    ],

    series: [
      800,
      850,
      920,
      980,
      1100,
      1220,
      1380,
      customerMetrics.retail.total
    ]
  },

  partner: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu'
    ],

    series: [
      300,
      350,
      400,
      470,
      740,
      612,
      498,
      1206
    ]
  }
}
