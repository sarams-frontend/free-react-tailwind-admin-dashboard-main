import { useState } from 'react'
import { EcommerceMetrics, FormHome } from '@/features/dashboard'
import { MastersCategoryChart, MastersDataOverview } from '@/features/masters'
import { SensorsCategoryChart, SensorsDataOverview } from '@/features/sensors'
import { PageMeta } from '@/components/common'

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<{
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }>({
    empresa: '',
    proyecto: '',
    ubicacion: '',
    fechaInicio: '',
    fechaFin: '',
  });

  const handleFilter = (filterValues: {
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }) => {
    setActiveFilters(filterValues);
    console.log('Filters applied:', filterValues);
  };

  const hasActiveFilters = activeFilters.empresa || activeFilters.proyecto || activeFilters.ubicacion || activeFilters.fechaInicio || activeFilters.fechaFin;

  return (
    <>
      <PageMeta title='Snsorial' description='Snsorial - Dashboard' />
      <div className='grid grid-cols-12 gap-4 md:gap-6'>
        <div className='col-span-12 space-y-6'>
          <FormHome onFilter={handleFilter} />

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Active Filters:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeFilters.empresa && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Company: {activeFilters.empresa}
                      </span>
                    )}
                    {activeFilters.proyecto && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Project: {activeFilters.proyecto}
                      </span>
                    )}
                    {activeFilters.ubicacion && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Location: {activeFilters.ubicacion}
                      </span>
                    )}
                    {activeFilters.fechaInicio && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Start: {activeFilters.fechaInicio}
                      </span>
                    )}
                    {activeFilters.fechaFin && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        End: {activeFilters.fechaFin}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <EcommerceMetrics filters={activeFilters} />
        </div>

        <div className='col-span-12 space-y-6 xl:col-span-7'>
          <MastersCategoryChart filters={activeFilters} />
        </div>

        <div className='col-span-12 space-y-6 xl:col-span-5'>
          <MastersDataOverview filters={activeFilters} />
        </div>

        <div className='col-span-12 space-y-6 xl:col-span-7'>
          <SensorsCategoryChart filters={activeFilters} />
        </div>

        <div className='col-span-12 xl:col-span-5'>
          <SensorsDataOverview filters={activeFilters} />
        </div>
      </div>
    </>
  )
};
