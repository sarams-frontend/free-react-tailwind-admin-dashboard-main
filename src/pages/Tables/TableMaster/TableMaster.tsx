import { PageBreadCrumb, ComponentCard, PageMeta } from '@/components/common'
import { MasterTable } from '@/features/masters'

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title='Snsorial - Master Tables'
        description='Snsorial - Master Tables'
      />
      <PageBreadCrumb pageTitle='Master' />
      <div className='space-y-6'>
        <ComponentCard title='Master List'>
          <MasterTable />
        </ComponentCard>
      </div>
    </>
  )
}
