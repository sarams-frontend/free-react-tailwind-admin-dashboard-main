import { useMemo } from 'react'
import { GridIcon, TaskIcon, LocationPinIcon } from '@/icons'
import { useDashboardDataStore } from '@/store/dashboardDataStore'

interface EcommerceMetricsProps {
  filters: {
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }
}

export default function EcommerceMetrics({ filters }: EcommerceMetricsProps) {
  const { companies, projects, locations } = useDashboardDataStore()

  const metrics = useMemo(() => {
    let filteredCompanies = companies
    let filteredProjects = projects
    let filteredLocations = locations

    // Filtrar por empresa
    if (filters.empresa) {
      filteredCompanies = companies.filter(c => c.name === filters.empresa)
      const companyIds = filteredCompanies.map(c => c.id)
      filteredProjects = projects.filter(p => companyIds.includes(p.companyId))
    }

    // Filtrar por proyecto
    if (filters.proyecto) {
      filteredProjects = filteredProjects.filter(p => p.name === filters.proyecto)
      const projectIds = filteredProjects.map(p => p.id)
      filteredLocations = locations.filter(l => projectIds.includes(l.projectId))
    }

    // Filtrar por ubicación
    if (filters.ubicacion) {
      filteredLocations = filteredLocations.filter(l => l.name === filters.ubicacion)
    }

    // Si solo hay filtro de proyecto sin empresa, obtener todas las ubicaciones de ese proyecto
    if (!filters.empresa && filters.proyecto) {
      const projectIds = filteredProjects.map(p => p.id)
      filteredLocations = locations.filter(l => projectIds.includes(l.projectId))
    }

    return {
      companies: filteredCompanies.length,
      projects: filteredProjects.length,
      locations: filteredLocations.length,
    }
  }, [filters, companies, projects, locations])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 justify-items-center'>
      {/* Total Companies */}
      <div className='w-full flex-grow rounded-2xl border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-white/[0.03] shadow-md'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <GridIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='flex items-end justify-between mt-5'>
          <div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {filters.empresa ? 'Filtered' : 'Total'} Companies
            </span>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {metrics.companies.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Projects */}
      <div className='w-full flex-grow rounded-2xl border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-white/[0.03] shadow-md'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <TaskIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='flex items-end justify-between mt-5'>
          <div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {filters.empresa || filters.proyecto ? 'Filtered' : 'Total'} Projects
            </span>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {metrics.projects.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Locations */}
      <div className='w-full flex-grow rounded-2xl border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-white/[0.03] shadow-md'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <LocationPinIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='flex items-end justify-between mt-5'>
          <div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {filters.empresa || filters.proyecto || filters.ubicacion ? 'Filtered' : 'Total'} Locations
            </span>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {metrics.locations.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
