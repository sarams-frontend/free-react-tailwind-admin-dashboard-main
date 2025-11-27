import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import EditableRow from '@/components/common/EditableRow'
import SearchBar from '@/components/common/SearchBar'
import AddButton from '@/components/common/AddButton'
import AddRow from '@/components/common/AddRow'
import { ColumnConfig, createColumns } from '@/components/common/EditableColumn'

type Master = {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: "Active" | "Inactive";
  actions: "";
  
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateMasters = (): Master[] => {
  const companies = ['Carrefour', 'Ilunion', 'Mercadona', 'El Corte Inglés', 'Inditex', 'Telefónica', 'BBVA', 'Repsol', 'Santander', 'Iberdrola', 'Endesa', 'Mapfre']
  const channels = ['WIFI', '4G']
  const locations = [
    'Madrid Centro', 'Barcelona Eixample', 'Valencia Centro', 'Sevilla Triana', 'Bilbao Deusto',
    'Málaga Centro', 'Zaragoza Centro', 'Murcia Centro', 'Alicante Centro', 'A Coruña Centro',
    'Vigo Centro', 'Gijón Centro', 'Valladolid Centro', 'Granada Centro', 'Santander Centro',
    'Pamplona Centro', 'Tarragona Centro', 'Logroño Centro', 'Badajoz Centro', 'Salamanca Centro',
    'Cáceres Centro', 'Castellón Centro', 'Albacete Centro', 'Toledo Centro', 'Burgos Centro',
    'León Centro', 'Madrid Salamanca', 'Madrid Norte', 'Barcelona Gràcia', 'Barcelona Sants'
  ]

  return Array.from({ length: 640 }).map((_, index) => {
    const companyIndex = Math.floor(index / (640 / companies.length))
    const channelType = channels[index % 2]
    const locationIndex = index % locations.length

    return {
      id: index + 1,
      alias: `${companies[companyIndex]} ${channelType} ${locationIndex + 1}`,
      serialNumber: `MST-${channelType}-${(10000 + index).toString()}`,
      channel: channelType,
      status: index % 3 === 0 ? 'Inactive' : 'Active',
      actions: ''
    }
  })
}

export default function MasterTable() {
  const [masters, setMasters] = useState<Master[]>(generateMasters())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingMasterId, setEditingMasterId] = useState<number | null>(null)
  const [editedMaster, setEditedMaster] = useState<Partial<Master>>({})
  const [isAddingMaster, setIsAddingMaster] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [newMaster, setNewMaster] = useState<NewItem<Master>>({
    alias: '',
    serialNumber: '',
    channel: 'Snsorial',
    status: 'Active'
  })

  const filteredMasters = masters.filter((master) => {
    const search = searchTerm.toLowerCase()
    return (
      master.alias.toLowerCase().includes(search) ||
      master.serialNumber.toLowerCase().includes(search) ||
      master.channel.toLowerCase().includes(search) ||
      master.status.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredMasters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMasters = filteredMasters.slice(startIndex, endIndex)

  const handleDeleteMaster = (masterId: number) => {
    setMasters(masters.filter((master) => master.id !== masterId))
    setDropdownOpen(null)
  }

  const handleDropdownToggle = (masterId: number | null) => {
    setDropdownOpen((prev) => (prev === masterId ? null : masterId))
  }

  const handleEditMaster = (master: Master) => {
    setEditingMasterId(master.id)
    setEditedMaster(master)
    setDropdownOpen(null)
  }

  const handleSaveEdit = () => {
    setMasters(
      masters.map((master) =>
        master.id === editingMasterId ? { ...master, ...editedMaster } : master
      )
    )
    setEditingMasterId(null)
    setEditedMaster({})
  }

  const handleCancelEdit = () => {
    setEditingMasterId(null)
    setEditedMaster({})
  }

  const handleAddMaster = () => {
    setIsAddingMaster(true)
  }

  const handleSaveNewMaster = () => {
    if (newMaster.alias && newMaster.serialNumber) {
      setMasters([...masters, { ...(newMaster as Master), id: masters.length + 1 }])
      setIsAddingMaster(false)
      setNewMaster({ alias: '', 
        serialNumber: '', 
        channel: 'Sensorial', 
        status: 'Active' 
      })
    }
  }

  const handleCancelAddMaster = () => {
    setIsAddingMaster(false)
    setNewMaster({ alias: '', serialNumber: '', channel: 'Sensorial', status: 'Active' })
  }

  const handleToggleStatus = (masterId: number) => {
    setMasters(
      masters.map((master) =>
        master.id === masterId
          ? { ...master, status: master.status === 'Active' ? 'Inactive' : 'Active' }
          : master
      )
    )
  }

  const columns: ColumnConfig<Master>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'alias', label: 'Alias' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'channel', label: 'Channel' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ])

  const addColumns = [
    { key: 'id', label: 'ID' },
    { key: 'alias', label: 'Alias' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'channel', label: 'Channel' },
    { key: 'status', label: 'Status' },
    ] satisfies { key: keyof Master; label: string }[]
  

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      {/* 🔍 Search Bar & ➕ Add Button */}
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddMaster} text='Add Master' />
      </div>
      {/* 🌍 Contenedor Responsivo */}
      <div className='overflow-hidden rounded-lg shadow-md'>
        <Table className='min-w-full'>
          <TableHeader className='border-b border-gray-100 dark:border-gray-700 bg-gray-200 dark:bg-gray-700'>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key as string}
                  isHeader
                  className='px-3 py-2 text-gray-600 text-center text-xs dark:text-gray-400 font-medium'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          
          <TableBody className='divide-y divide-gray-100 dark:divide-gray-700'>
            {paginatedMasters.map((master) => (
              <EditableRow
                key={master.id}
                item={master}
                index={master.id}
                filteredItems={filteredMasters}
                onDelete={handleDeleteMaster}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditMaster}
                isEditing={editingMasterId === master.id}
                editedItem={editedMaster}
                setEditedItem={setEditedMaster}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingMaster && (
              <AddRow
                newItem={newMaster}
                setNewItem={setNewMaster}
                handleSaveNewItem={handleSaveNewMaster}
                handleCancelAddItem={handleCancelAddMaster}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredMasters.length)} of {filteredMasters.length} entries
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
