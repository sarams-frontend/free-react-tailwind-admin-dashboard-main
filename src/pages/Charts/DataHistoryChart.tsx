import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import ChartFilters from '@/components/charts/ChartFilters'
import DataSummaryCards from '@/components/charts/DataSummaryCards'
import ChartSection from '@/components/charts/ChartSection'
import { useChartFilters } from '@/hooks/useChartFilters'

export default function LineChart() {
  const filters = useChartFilters()
  return (
    <>
      <PageMeta
        title='Data-History Chart'
        description='visualize the historical data of temperature and humidity'
      />
      <PageBreadcrumb pageTitle='Historical Data' />
      
      <ChartFilters filters={filters} />
      
      <DataSummaryCards timeRange={filters.selectedTimeRange} />
      
      <ChartSection 
        selectedTimeRange={filters.selectedTimeRange}
        selectedDataType={filters.selectedDataType}
      />
    </>
  )
}
