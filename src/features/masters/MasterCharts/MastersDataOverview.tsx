import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useEffect, useState, useMemo } from 'react'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem'
import { MoreDotIcon } from '@/icons'

interface MasterDataOverviewProps {
  filters: {
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }
}

export default function MasterDataOverview({ filters }: MasterDataOverviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  // Detectar si está en modo oscuro
  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }

    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  // Datos ajustados según filtros
  const data = useMemo(() => {
    const hasFilters = filters.empresa || filters.proyecto || filters.ubicacion
    const multiplier = hasFilters ? 0.6 : 1

    return [
      { name: 'WIFI', value: Math.round(420 * multiplier), fill: 'url(#gradBlue)' },
      { name: '4G', value: Math.round(280 * multiplier), fill: 'url(#gradGray)' }
    ]
  }, [filters])

  return (
    <div className='rounded-2xl border border-gray-200 bg-white shadow-xl p-5 dark:border-gray-800 dark:bg-gray-900'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
            Master Data Overview
          </h3>
          <p className='mt-1 text-gray-500 text-theme-sm dark:text-gray-400'>
            Real-time data for WIFI and 4G
          </p>
        </div>
        <div className='relative inline-block'>
          <button className='dropdown-toggle' onClick={toggleDropdown}>
            <MoreDotIcon className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6' />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className='w-40 p-2'
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className='flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className='flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Definición de gradientes */}
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='gradBlue' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#001F54' />
            <stop offset='40%' stopColor='#004AAD' />
            <stop offset='70%' stopColor='#0096D6' />
            <stop offset='100%' stopColor='#33D1FF' />
          </linearGradient>

          <linearGradient id='gradGray' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#2C2C2C' />
            <stop offset='50%' stopColor='#6C757D' />
            <stop offset='100%' stopColor='#D6D9DC' />
          </linearGradient>
        </defs>
      </svg>

      {/* Gráfico con Recharts */}
      <div className='relative flex justify-center mt-5'>
        <div className='max-h-[330px] w-full bg-gray-50 p-4 rounded-lg shadow-md dark:bg-gray-800'>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={theme === 'dark' ? '#FFF' : 'none'} // Bordes en modo oscuro
                    strokeWidth={theme === 'dark' ? 2 : 0}
                    style={{
                      transition: 'transform 0.3s ease-in-out',
                      transformOrigin: 'center',
                      transform:
                        hoveredIndex === index ? 'scale(1.08)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
                  color: theme === 'dark' ? '#FFF' : '#333',
                  borderRadius: '5px',
                  border: `1px solid ${theme === 'dark' ? '#666' : '#ddd'}`,
                  padding: '8px'
                }}
                itemStyle={{ color: theme === 'dark' ? '#FFF' : '#000' }}
              />
              <Legend
                wrapperStyle={{
                  color: theme === 'dark' ? '#FFF' : '#000',
                  fontSize: '14px',
                  textAlign: 'center'
                }}
                iconSize={14}
                layout='horizontal'
                verticalAlign='bottom'
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Información adicional con mejor visibilidad en modo oscuro */}
      <div className='flex items-center justify-center gap-6 px-6 py-4 sm:py-5'>
        <div className='text-center'>
          <p className='mb-1 text-gray-700 dark:text-white'>WIFI</p>
          <p className='text-lg font-semibold text-blue-400'>420</p>
        </div>

        <div className='w-px bg-gray-200 h-6 dark:bg-gray-700'></div>

        <div className='text-center'>
          <p className='mb-1 text-gray-700 dark:text-white'>4G</p>
          <p className='text-lg font-semibold text-gray-400'>280</p>
        </div>
      </div>
    </div>
  )
}
