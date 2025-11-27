import { useState, useEffect, useMemo } from 'react'
import { FaChartBar } from 'react-icons/fa6' // Importa el icono que deseas utilizar
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem'
import { MoreDotIcon } from '@/icons'

interface MonthlySalesChartProps {
  filters: {
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }
}

export default function MonthlySalesChart({ filters }: MonthlySalesChartProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Detecta el tema automáticamente
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
      { category: 'Temperature', totalSensors: Math.round(450 * multiplier), fill: 'url(#gradYellow)' },
      { category: 'Humidity', totalSensors: Math.round(320 * multiplier), fill: 'url(#gradCyan)' },
      { category: 'Presence', totalSensors: Math.round(380 * multiplier), fill: 'url(#gradGreen)' }
    ]
  }, [filters])

  const totalSensors = data.reduce((sum, item) => sum + item.totalSensors, 0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-gray-900 sm:px-6 sm:pt-6 shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='bg-gray-200 dark:bg-gray-700 p-2 rounded-full'>
            <FaChartBar className='text-gray-700 dark:text-white text-xl' />{' '}
            {/* Ajusta el icono aquí */}
          </div>
          <h3 className='ml-4 text-lg font-semibold text-gray-800 dark:text-white'>
            Sensor Data by Category
          </h3>
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

      <p className='mt-1 text-gray-500 text-theme-sm dark:text-gray-400'>
        Real-time number of temperature, humidity, and presence sensors.
      </p>

      {/* Definición de gradientes */}
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='gradYellow' x1='0' x2='1' y1='1' y2='0'>
            <stop offset='0%' stopColor='#FFD700' />
            <stop offset='50%' stopColor='#F9C74F' />
            <stop offset='100%' stopColor='#E9A617' />
          </linearGradient>

          <linearGradient id='gradCyan' x1='0' x2='1' y1='1' y2='0'>
            <stop offset='0%' stopColor='#00C4B4' />
            <stop offset='50%' stopColor='#2DD4BF' />
            <stop offset='70%' stopColor='#5EEAD4' />
            <stop offset='100%' stopColor='#99F6E4' />
          </linearGradient>

          <linearGradient id='gradGreen' x1='0' x2='1' y1='1' y2='0'>
            <stop offset='0%' stopColor='#96E072' />
            <stop offset='50%' stopColor='#3DA35D' />
            <stop offset='100%' stopColor='#1F7A2E' />
          </linearGradient>
        </defs>
      </svg>

      <div className='relative flex justify-center mt-5'>
        <div className='w-full bg-gray-50 p-4 rounded-lg shadow-md dark:bg-gray-800'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} layout='vertical' barCategoryGap='40%'>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke={theme === 'dark' ? '#555' : '#ddd'}
              />
              <XAxis
                type='number'
                tick={{ fill: theme === 'dark' ? '#FFF' : '#333' }}
                domain={[0, 'dataMax + 30']}
                padding={{ left: 20 }}
              />
              <YAxis
                dataKey='category'
                type='category'
                tick={{
                  fill: theme === 'dark' ? '#FFF' : '#000',
                  fontSize: 14
                }}
                width={100}
                tickMargin={20}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }} // Cursor transparente
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
                  color: theme === 'dark' ? '#FFF' : '#333',
                  borderRadius: '5px',
                  border: `1px solid ${theme === 'dark' ? '#666' : '#ddd'}`,
                  padding: '8px'
                }}
                itemStyle={{ color: theme === 'dark' ? '#FFF' : '#000' }}
              />
              <Bar
                dataKey='totalSensors'
                name='Number-Sensors'
                barSize={25}
                radius={8}
                animationDuration={1000}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={theme === 'dark' ? '#FFF' : 'none'} // Borde blanco en modo oscuro
                    strokeWidth={theme === 'dark' ? 2 : 0}
                    style={{
                      transition:
                        'fill 0.3s ease-in-out, transform 0.2s ease-in-out',
                      transform:
                        hoveredIndex === index ? 'scaleX(1.05)' : 'scaleX(1)'
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='mt-4 text-center'>
        <p className='text-gray-900 dark:text-gray-300 text-lg'>
          Total Sensors:{' '}
          <span className='text-blue-600 dark:text-blue-400'>
            {totalSensors}
          </span>
        </p>
      </div>
    </div>
  )
}
