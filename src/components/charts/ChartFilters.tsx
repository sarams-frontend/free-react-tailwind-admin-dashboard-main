import { ChartFilters as ChartFiltersType, TimeRange, DataType } from '@/hooks/useChartFilters'
import { TIME_RANGE_OPTIONS, getQuickFilterButtonClass } from '@/utils/chartUtils'

interface ChartFiltersProps {
  filters: ChartFiltersType
}

export default function ChartFilters({ filters }: ChartFiltersProps) {
  const { selectedTimeRange, selectedDataType, setSelectedTimeRange, setSelectedDataType } = filters

  const handleQuickFilterClick = (range: TimeRange) => {
    setSelectedTimeRange(range)
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as TimeRange)}
              className="px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
            >
              {TIME_RANGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data Type Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Data Type:</label>
            <select 
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value as DataType)}
              className="px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[130px]"
            >
              <option value="all">All Data</option>
              <option value="temperature">Temperature Only</option>
              <option value="humidity">Humidity Only</option>
              <option value="presence">Presence Only</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => handleQuickFilterClick('1d')}
            className={getQuickFilterButtonClass(selectedTimeRange, '1d')}
          >
            Today
          </button>
          <button 
            onClick={() => handleQuickFilterClick('7d')}
            className={getQuickFilterButtonClass(selectedTimeRange, '7d')}
          >
            Week
          </button>
          <button 
            onClick={() => handleQuickFilterClick('30d')}
            className={getQuickFilterButtonClass(selectedTimeRange, '30d')}
          >
            Month
          </button>
        </div>
      </div>
    </div>
  )
}