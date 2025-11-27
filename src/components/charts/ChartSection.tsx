import ComponentCard from '../common/ComponentCard'
import LineChartOne from './line/LineChartTemperature'
import BarChartOne from './line/LineChartHumidity'
import BarChartPresence from './bar/BarChartPresence'
import { TimeRange, DataType } from '@/hooks/useChartFilters'
import { getTimeRangeDisplayName } from '@/utils/chartUtils'

interface ChartSectionProps {
  selectedTimeRange: TimeRange
  selectedDataType: DataType
}

export default function ChartSection({ selectedTimeRange, selectedDataType }: ChartSectionProps) {
  const timeRangeLabel = getTimeRangeDisplayName(selectedTimeRange)

  const shouldShowChart = (chartType: DataType) => {
    return selectedDataType === 'all' || selectedDataType === chartType
  }

  return (
    <div className='space-y-6'>
      {/* Temperature Chart */}
      {shouldShowChart('temperature') && (
        <ComponentCard title={`Temperature Data - ${timeRangeLabel}`}>
          <LineChartOne timeRange={selectedTimeRange} />
        </ComponentCard>
      )}
      
      {/* Humidity Chart */}
      {shouldShowChart('humidity') && (
        <ComponentCard title={`Humidity Data - ${timeRangeLabel}`}>
          <BarChartOne timeRange={selectedTimeRange} />
        </ComponentCard>
      )}
      
      {/* Presence Chart */}
      {shouldShowChart('presence') && (
        <ComponentCard title={`Presence Data - ${timeRangeLabel}`}>
          <BarChartPresence timeRange={selectedTimeRange} />
        </ComponentCard>
      )}
    </div>
  )
}