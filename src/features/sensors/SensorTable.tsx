import { useState } from 'react'
import type { JSX } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import EditableRow from '@/components/common/EditableRow'
import SearchBar from '@/components/common/SearchBar'
import AddButton from '@/components/common/AddButton'
import AddRow from '@/components/common/AddRow'
import Badge from '@/components/ui/badge/Badge'
import { ColumnConfig, createColumns } from '@/components/common/EditableColumn'

type Sensor = {
  id: number
  alias: string
  type: string
  serialNumber: string
  mac: string
  channel: string
  status: 'Active' | 'Inactive'
  actions: ''
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateSensors = (): Sensor[] => {
  const companies = ['Carrefour', 'Ilunion', 'Mercadona', 'El Corte Inglés', 'Inditex', 'Telefónica', 'BBVA', 'Repsol', 'Santander', 'Iberdrola', 'Endesa', 'Mapfre']
  const types = ['Temperature', 'Humidity', 'Presence']
  const locations = [
    'Madrid Centro', 'Barcelona Eixample', 'Valencia Centro', 'Sevilla Triana', 'Bilbao Deusto',
    'Málaga Centro', 'Zaragoza Centro', 'Murcia Centro', 'Alicante Centro', 'A Coruña Centro',
    'Vigo Centro', 'Gijón Centro', 'Valladolid Centro', 'Granada Centro', 'Santander Centro',
    'Pamplona Centro', 'Tarragona Centro', 'Logroño Centro', 'Badajoz Centro', 'Salamanca Centro',
    'Cáceres Centro', 'Castellón Centro', 'Albacete Centro', 'Toledo Centro', 'Burgos Centro',
    'León Centro', 'Madrid Salamanca', 'Madrid Norte', 'Barcelona Gràcia', 'Barcelona Sants'
  ]

  const generateMac = (index: number): string => {
    const hex = (index + 0x100000).toString(16).substring(1)
    return `dd:3f:${hex.substring(0, 2)}:${hex.substring(2, 4)}:${hex.substring(4, 6)}:${(index % 256).toString(16).padStart(2, '0')}`
  }

  return Array.from({ length: 1150 }).map((_, index) => {
    const companyIndex = Math.floor(index / (1150 / companies.length))
    const sensorType = types[index % types.length]
    const locationIndex = index % locations.length

    return {
      id: index + 1,
      alias: `${companies[companyIndex]} ${sensorType} ${locationIndex + 1}`,
      type: `${sensorType} Sensor`,
      serialNumber: `SEN-${sensorType.substring(0, 3).toUpperCase()}-${(20000 + index).toString()}`,
      mac: generateMac(index),
      channel: 'Snsorial',
      status: index % 4 === 0 ? 'Inactive' : 'Active',
      actions: ''
    }
  })
}

export default function SensorTable() {
  const [sensors, setSensors] = useState<Sensor[]>(generateSensors())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingSensorId, setEditingSensorId] = useState<number | null>(null)
  const [editedSensor, setEditedSensor] = useState<Partial<Sensor>>({})
  const [isAddingSensor, setIsAddingSensor] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [newSensor, setNewSensor] = useState<NewItem<Sensor>>({
    alias: '',
    type: '',
    serialNumber: '',
    mac: '',
    channel: 'Sensorial',
    status: 'Active'
  })

  // 🔎 Búsqueda multi-campo
  const filteredSensors = sensors.filter((s) => {
    const q = searchTerm.toLowerCase()
    return (
      s.alias.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q) ||
      s.serialNumber.toLowerCase().includes(q) ||
      s.mac.toLowerCase().includes(q) ||
      s.channel.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.ceil(filteredSensors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSensors = filteredSensors.slice(startIndex, endIndex)

  // Handlers (paralelos a MasterTable)
  const handleDeleteSensor = (id: number) => {
    setSensors((prev) => prev.filter((s) => s.id !== id))
    setDropdownOpen(null)
  }
  const handleDropdownToggle = (id: number | null) =>
    setDropdownOpen((prev) => (prev === id ? null : id))
  const handleEditSensor = (s: Sensor) => {
    setEditingSensorId(s.id)
    setEditedSensor(s)
    setDropdownOpen(null)
  }
  const handleSaveEdit = () => {
    setSensors((prev) => prev.map((s) => (s.id === editingSensorId ? { ...s, ...editedSensor } : s)))
    setEditingSensorId(null)
    setEditedSensor({})
  }
  const handleCancelEdit = () => {
    setEditingSensorId(null)
    setEditedSensor({})
  }
  const handleAddSensor = () => setIsAddingSensor(true)
  const handleSaveNewSensor = () => {
    if (newSensor.alias && newSensor.type && newSensor.serialNumber && newSensor.mac) {
      setSensors((prev) => [
        ...prev,
        { ...(newSensor as Sensor), id: prev.length + 1, channel: 'Sensorial', actions: '' }
      ])
      setIsAddingSensor(false)
      setNewSensor({
        alias: '',
        type: '',
        serialNumber: '',
        mac: '',
        channel: 'Sensorial',
        status: 'Active'
      })
    }
  }
  const handleCancelAddSensor = () => {
    setIsAddingSensor(false)
    setNewSensor({
      alias: '',
      type: '',
      serialNumber: '',
      mac: '',
      channel: 'Sensorial',
      status: 'Active'
    })
  }
  const handleToggleStatus = (id: number) => {
    setSensors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s))
    )
  }

  // Columnas (todas las de Sensor, en el orden que quieres VER)
  const columns: ColumnConfig<Sensor>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'alias', label: 'Alias' },
    { key: 'type', label: 'Type Sensor' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'mac', label: 'MAC' },
    { key: 'channel', label: 'Channel' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ])

  // Fila de alta (misma estética de tu SensorTable original)
  const addColumns = [
    { key: 'id', label: 'ID', render: () => <>{sensors.length + 1}</> },
    { key: 'alias', label: 'Alias' },
    { key: 'type', label: 'Type Sensor' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'mac', label: 'MAC' },
    { key: 'channel', label: 'Channel', render: () => <>Sensorial</> },
    {
      key: 'status',
      label: 'Status',
      render: (_value: string, item: NewItem<Sensor>) => {
        const current = (item.status as 'Active' | 'Inactive') ?? 'Active'
        return (
          <div
            className='cursor-pointer'
            onClick={() =>
              setNewSensor((prev) => ({ ...prev, status: current === 'Active' ? 'Inactive' : 'Active' }))
            }
          >
            <Badge size='sm' color={current === 'Active' ? 'success' : 'error'}>
              {current}
            </Badge>
          </div>
        )
      }
    }
  ] satisfies {
    key: keyof Sensor
    label: string
    render?: (value: string, item: NewItem<Sensor>) => JSX.Element
  }[]

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddSensor} text='Add Sensor' />
      </div>

      <div className='overflow-hidden rounded-lg shadow-md'>
        <Table className='min-w-full'>
          <TableHeader className='border-b border-gray-100 dark:border-gray-700 bg-gray-200 dark:bg-gray-700'>
            <TableRow>
              {columns.map((c) => (
                <TableCell
                  key={c.key as string}
                  isHeader
                  className='px-3 py-2 text-gray-600 text-center text-xs dark:text-gray-400 font-medium'
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className='divide-y divide-gray-100 dark:divide-gray-700'>
            {paginatedSensors.map((sensor) => (
              <EditableRow<Sensor>
                key={sensor.id}
                item={sensor}
                index={sensor.id}
                filteredItems={filteredSensors}
                onDelete={handleDeleteSensor}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditSensor}
                isEditing={editingSensorId === sensor.id}
                editedItem={editedSensor}
                setEditedItem={setEditedSensor}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingSensor && (
              <AddRow<Sensor>
                newItem={newSensor}
                setNewItem={setNewSensor}
                handleSaveNewItem={handleSaveNewSensor}
                handleCancelAddItem={handleCancelAddSensor}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredSensors.length)} of {filteredSensors.length} entries
        </p>
        <div className='flex gap-2'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300'
          >
            Previous
          </button>
          <span className='px-3 py-1 text-sm text-gray-700 dark:text-gray-300'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
