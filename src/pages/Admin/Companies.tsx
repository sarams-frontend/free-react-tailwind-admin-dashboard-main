import { PageBreadCrumb, ComponentCard, PageMeta } from '@/components/common'
import { CompaniesTable } from '@/components/tables'

export default function Companies() {
  return (
    <>
      <PageMeta
        title='Snsorial - Companies'
        description='Manage companies information'
      />
      <PageBreadCrumb pageTitle='Companies' />
      <div className='space-y-6'>
        <ComponentCard title='Companies List'>
          <CompaniesTable />
        </ComponentCard>
      </div>
    </>
  )
}
