import { useState } from 'react'

export type TimeRange = '1d' | '7d' | '30d' | '90d' | '1y'
export type DataType = 'all' | 'temperature' | 'humidity' | 'presence'

export interface ChartFilters {
  selectedTimeRange: TimeRange
  selectedDataType: DataType
  setSelectedTimeRange: (range: TimeRange) => void
  setSelectedDataType: (type: DataType) => void
}

export const useChartFilters = (): ChartFilters => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('7d')
  const [selectedDataType, setSelectedDataType] = useState<DataType>('all')

  return {
    selectedTimeRange,
    selectedDataType,
    setSelectedTimeRange,
    setSelectedDataType,
  }
}