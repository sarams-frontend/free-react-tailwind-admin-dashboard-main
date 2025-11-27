import { TimeRange } from '@/hooks/useChartFilters'

export interface TimeRangeOption {
  value: TimeRange
  label: string
  displayName: string
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const getDateRange = (timeRange: TimeRange): { startDate: string, endDate: string } => {
  const now = new Date()
  const endDate = formatDate(now)
  
  let startDate: Date
  
  switch (timeRange) {
    case '1d':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      break
    case '1y':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      break
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  }
  
  return {
    startDate: formatDate(startDate),
    endDate
  }
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { value: '1d', label: 'Last 24 Hours', displayName: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days', displayName: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days', displayName: 'Last 30 Days' },
  { value: '90d', label: 'Last 3 Months', displayName: 'Last 3 Months' },
  { value: '1y', label: 'Last Year', displayName: 'Last Year' },
]

export const getTimeRangeDisplayName = (timeRange: TimeRange): string => {
  const { startDate, endDate } = getDateRange(timeRange)
  const option = TIME_RANGE_OPTIONS.find(opt => opt.value === timeRange)
  const baseName = option?.displayName || 'Last 7 Days'
  
  return `${baseName} (${startDate} - ${endDate})`
}

export const getQuickFilterButtonClass = (
  currentRange: TimeRange,
  buttonRange: TimeRange
): string => {
  const baseClass = 'px-3 py-1 text-xs rounded-full transition-colors'
  const activeClass = 'bg-blue-100 text-blue-700 border border-blue-300'
  const inactiveClass = 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
  
  return `${baseClass} ${currentRange === buttonRange ? activeClass : inactiveClass}`
}

// Generate summary data based on time range
export const generateSummaryData = (timeRange: TimeRange) => {
  switch (timeRange) {
    case '1d':
      return {
        temperature: {
          value: '21.2°C',
          change: '+1.8%',
          changeType: 'increase' as const,
          comparison: 'vs yesterday'
        },
        humidity: {
          value: '68.5%',
          change: '-0.5%',
          changeType: 'decrease' as const,
          comparison: 'vs yesterday'
        },
        presence: {
          value: '82.1%',
          change: '+3.2%',
          changeType: 'increase' as const,
          comparison: 'vs yesterday'
        }
      }
    case '7d':
      return {
        temperature: {
          value: '23.8°C',
          change: '+2.1%',
          changeType: 'increase' as const,
          comparison: 'vs previous week'
        },
        humidity: {
          value: '65.2%',
          change: '-1.2%',
          changeType: 'decrease' as const,
          comparison: 'vs previous week'
        },
        presence: {
          value: '79.6%',
          change: '+4.3%',
          changeType: 'increase' as const,
          comparison: 'vs previous week'
        }
      }
    case '30d':
      return {
        temperature: {
          value: '22.5°C',
          change: '+1.5%',
          changeType: 'increase' as const,
          comparison: 'vs previous month'
        },
        humidity: {
          value: '63.8%',
          change: '-2.3%',
          changeType: 'decrease' as const,
          comparison: 'vs previous month'
        },
        presence: {
          value: '76.4%',
          change: '+5.1%',
          changeType: 'increase' as const,
          comparison: 'vs previous month'
        }
      }
    case '90d':
      return {
        temperature: {
          value: '24.1°C',
          change: '+3.2%',
          changeType: 'increase' as const,
          comparison: 'vs previous quarter'
        },
        humidity: {
          value: '61.9%',
          change: '-1.8%',
          changeType: 'decrease' as const,
          comparison: 'vs previous quarter'
        },
        presence: {
          value: '74.7%',
          change: '+6.8%',
          changeType: 'increase' as const,
          comparison: 'vs previous quarter'
        }
      }
    case '1y':
    default:
      return {
        temperature: {
          value: '23.5°C',
          change: '+5.2%',
          changeType: 'increase' as const,
          comparison: 'vs previous year'
        },
        humidity: {
          value: '64.8%',
          change: '-2.1%',
          changeType: 'decrease' as const,
          comparison: 'vs previous year'
        },
        presence: {
          value: '78.3%',
          change: '+8.7%',
          changeType: 'increase' as const,
          comparison: 'vs previous year'
        }
      }
  }
}

// Generate real date labels based on time range
export const generateDateLabels = (timeRange: TimeRange): string[] => {
  const now = new Date()
  
  switch (timeRange) {
    case '1d':
      // Last 24 hours - show 6 hour intervals
      return Array.from({ length: 6 }, (_, i) => {
        const time = new Date(now.getTime() - (5 - i) * 4 * 60 * 60 * 1000)
        return time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      })
      
    case '7d':
      // Last 7 days - show day names
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
        return date.toLocaleDateString('en-US', { weekday: 'short' })
      })
      
    case '30d':
      // Last 30 days - show last 4 weeks with actual dates
      return Array.from({ length: 4 }, (_, i) => {
        const date = new Date(now.getTime() - (3 - i) * 7 * 24 * 60 * 60 * 1000)
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      })
      
    case '90d':
      // Last 3 months - show actual month names
      return Array.from({ length: 3 }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1)
        return date.toLocaleDateString('en-US', { month: 'short' })
      })
      
    case '1y':
    default:
      // Last 12 months - show all month names
      return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
        return date.toLocaleDateString('en-US', { month: 'short' })
      })
  }
}