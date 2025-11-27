import { PageBreadCrumb, ComponentCard, PageMeta } from '@/components/common'
import { SensorTable } from '@/features/sensors'

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title='Snsorial - Sensor Tables'
        description='Snsorial - Sensor Tables'
      />
      <PageBreadCrumb pageTitle='Sensor' />
      <div className='space-y-6'>
        <ComponentCard title='Sensor List'>
          <SensorTable />
        </ComponentCard>
      </div>
    </>
  )
}
