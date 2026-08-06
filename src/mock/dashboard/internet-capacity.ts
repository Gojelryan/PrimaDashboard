export const popCapacity = [
  { name: 'Makassar A', capacityGbps: 10, usedGbps: 8 },
  { name: 'Makassar AB', capacityGbps: 10, usedGbps: 7.5 },
  { name: 'Makassar A12', capacityGbps: 10, usedGbps: 9 },
  { name: 'Gowa A', capacityGbps: 5, usedGbps: 4.75 },
  { name: 'Gowa B', capacityGbps: 5, usedGbps: 2.4 },
  { name: 'Gowa C', capacityGbps: 5, usedGbps: 3.25 },
  { name: 'Gowa ABC', capacityGbps: 5, usedGbps: 1.5 },
  { name: 'Maros A', capacityGbps: 5, usedGbps: 1.25 },
  { name: 'Palopo A', capacityGbps: 5, usedGbps: 0.75 },
  { name: 'Palopo B', capacityGbps: 5, usedGbps: 1.5 },
  { name: 'Palopo C', capacityGbps: 5, usedGbps: 3.5 },
  { name: 'Barru A', capacityGbps: 10, usedGbps: 8 },
  { name: 'Parepare A', capacityGbps: 10, usedGbps: 7.5 },
  { name: 'Pinrang A', capacityGbps: 10, usedGbps: 8.5 },
  { name: 'Pangkep A', capacityGbps: 10, usedGbps: 9 },
  { name: 'Sidrap A', capacityGbps: 10, usedGbps: 6.5 },
  { name: 'Wajo A', capacityGbps: 10, usedGbps: 7 },
  { name: 'Bone A', capacityGbps: 10, usedGbps: 8 },
  { name: 'Bulukumba A', capacityGbps: 10, usedGbps: 8.5 },
  { name: 'Bantaeng A', capacityGbps: 10, usedGbps: 9.5 },
  { name: 'Jeneponto A', capacityGbps: 10, usedGbps: 7.5 },
  { name: 'Takalar A', capacityGbps: 5, usedGbps: 4.5 },
  { name: 'Sinjai A', capacityGbps: 5, usedGbps: 4 },
  { name: 'Soppeng A', capacityGbps: 5, usedGbps: 4.75 },
  { name: 'Enrekang A', capacityGbps: 5, usedGbps: 4.25 },
  { name: 'Luwu A', capacityGbps: 5, usedGbps: 4.1 },
  { name: 'Toraja A', capacityGbps: 5, usedGbps: 5 }
].map(pop => ({
  ...pop,
  availableGbps: Number((pop.capacityGbps - pop.usedGbps).toFixed(2)),
  utilizationPercent: Number(
    ((pop.usedGbps / pop.capacityGbps) * 100).toFixed(1)
  )
}))

export const internetCapacity = popCapacity.reduce(
  (total, pop) => ({
    totalGbps: total.totalGbps + pop.capacityGbps,
    usedGbps: total.usedGbps + pop.usedGbps,
    availableGbps: total.availableGbps + pop.availableGbps
  }),
  { totalGbps: 0, usedGbps: 0, availableGbps: 0 }
)
