import { TimeRange } from '@/hooks/useChartFilters'
import { generateSummaryData } from '@/utils/chartUtils'

interface DataSummaryCardsProps {
  timeRange: TimeRange
}

export default function DataSummaryCards({ timeRange }: DataSummaryCardsProps) {
  const summaryData = generateSummaryData(timeRange)
  
  const getChangeStyle = (changeType: 'increase' | 'decrease') => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600'
  }
  
  const getChangeIcon = (changeType: 'increase' | 'decrease') => {
    return changeType === 'increase' ? '↑' : '↓'
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Temperature Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Temperature</p>
            <p className="text-2xl font-bold text-red-600">{summaryData.temperature.value}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className={getChangeStyle(summaryData.temperature.changeType)}>
                {getChangeIcon(summaryData.temperature.changeType)} {summaryData.temperature.change}
              </span> {summaryData.temperature.comparison}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Humidity Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Humidity</p>
            <p className="text-2xl font-bold text-blue-600">{summaryData.humidity.value}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className={getChangeStyle(summaryData.humidity.changeType)}>
                {getChangeIcon(summaryData.humidity.changeType)} {summaryData.humidity.change}
              </span> {summaryData.humidity.comparison}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Presence Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Detections</p>
            <p className="text-2xl font-bold text-green-600">{summaryData.presence.value}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className={getChangeStyle(summaryData.presence.changeType)}>
                {getChangeIcon(summaryData.presence.changeType)} {summaryData.presence.change}
              </span> {summaryData.presence.comparison}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}