import { PageBreadCrumb, ComponentCard, PageMeta } from '@/components/common'
import { ProjectsTable } from '@/components/tables'

export default function Projects() {
  return (
    <>
      <PageMeta
        title='Snsorial - Projects'
        description='Manage projects information'
      />
      <PageBreadCrumb pageTitle='Projects' />
      <div className='space-y-6'>
        <ComponentCard title='Projects List'>
          <ProjectsTable />
        </ComponentCard>
      </div>
    </>
  )
}
