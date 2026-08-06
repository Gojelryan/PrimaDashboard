import { retailAcquisitionCapacity } from './customer-metrics'

export const portStatus = {
  progress: Math.round(
    (retailAcquisitionCapacity.targetHomeConnect / retailAcquisitionCapacity.homePass) * 100
  ),
  homePass: retailAcquisitionCapacity.homePass,
  emptyPort: retailAcquisitionCapacity.emptyPort,
  potentialAreas: [
    'Rappocini - Makassar',
    'Latimojong - Sinjai',
    'Syekh Yusuf - Gowa'
  ]
}
