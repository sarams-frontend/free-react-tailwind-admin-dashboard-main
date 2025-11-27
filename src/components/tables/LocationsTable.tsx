import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import EditableRow from '../common/EditableRow'
import SearchBar from '../common/SearchBar'
import AddButton from '../common/AddButton'
import AddRow from '../common/AddRow'
import { ColumnConfig, createColumns } from '../common/EditableColumn'

type Location = {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: 'Active' | 'Inactive';
  location: string;
  project: string;
  company: string;
  description: string;
  actions: "";
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateLocations = (): Location[] => {
  const locations = [
    { name: 'Madrid Centro', project: 'Smart Retail Madrid', company: 'Carrefour', description: 'Central Madrid retail location' },
    { name: 'Madrid Salamanca', project: 'Smart Retail Madrid', company: 'Carrefour', description: 'Salamanca district store' },
    { name: 'Madrid Norte', project: 'Smart Retail Madrid', company: 'Carrefour', description: 'North Madrid location' },
    { name: 'Barcelona Eixample', project: 'IoT Monitoring Barcelona', company: 'Carrefour', description: 'Eixample district monitoring' },
    { name: 'Barcelona Gràcia', project: 'IoT Monitoring Barcelona', company: 'Carrefour', description: 'Gràcia neighborhood location' },
    { name: 'Barcelona Sants', project: 'IoT Monitoring Barcelona', company: 'Carrefour', description: 'Sants district store' },
    { name: 'Valencia Centro', project: 'Energy Optimization Valencia', company: 'Carrefour', description: 'Central Valencia facility' },
    { name: 'Valencia Campanar', project: 'Energy Optimization Valencia', company: 'Carrefour', description: 'Campanar district location' },
    { name: 'Sevilla Triana', project: 'Facilities Management Sevilla', company: 'Ilunion', description: 'Triana district facility' },
    { name: 'Sevilla Nervión', project: 'Facilities Management Sevilla', company: 'Ilunion', description: 'Nervión area building' },
    { name: 'Madrid Chamartín', project: 'Building Automation Madrid', company: 'Ilunion', description: 'Chamartín building' },
    { name: 'Madrid Retiro', project: 'Building Automation Madrid', company: 'Ilunion', description: 'Retiro area facility' },
    { name: 'Bilbao Deusto', project: 'Warehouse Sensors Bilbao', company: 'Mercadona', description: 'Deusto warehouse' },
    { name: 'Bilbao Abando', project: 'Warehouse Sensors Bilbao', company: 'Mercadona', description: 'Abando storage facility' },
    { name: 'Málaga Centro', project: 'Store Network Monitoring', company: 'Mercadona', description: 'Central Málaga store' },
    { name: 'Málaga Este', project: 'Store Network Monitoring', company: 'Mercadona', description: 'East Málaga location' },
    { name: 'Zaragoza Centro', project: 'Climate Control System', company: 'El Corte Inglés', description: 'Central Zaragoza store' },
    { name: 'Zaragoza Delicias', project: 'Climate Control System', company: 'El Corte Inglés', description: 'Delicias district location' },
    { name: 'Murcia Centro', project: 'Security Sensors Network', company: 'El Corte Inglés', description: 'Central Murcia facility' },
    { name: 'Murcia Norte', project: 'Security Sensors Network', company: 'El Corte Inglés', description: 'North Murcia location' },
    { name: 'Alicante Centro', project: 'Retail Analytics Platform', company: 'El Corte Inglés', description: 'Central Alicante store' },
    { name: 'Alicante San Juan', project: 'Retail Analytics Platform', company: 'El Corte Inglés', description: 'San Juan beach location' },
    { name: 'A Coruña Centro', project: 'Fashion Store IoT', company: 'Inditex', description: 'Central A Coruña store' },
    { name: 'A Coruña Matogrande', project: 'Fashion Store IoT', company: 'Inditex', description: 'Matogrande area location' },
    { name: 'Vigo Centro', project: 'Logistics Tracking Zara', company: 'Inditex', description: 'Central Vigo facility' },
    { name: 'Vigo Bouzas', project: 'Logistics Tracking Zara', company: 'Inditex', description: 'Bouzas district location' },
    { name: 'Gijón Centro', project: 'Warehouse Automation', company: 'Inditex', description: 'Central Gijón warehouse' },
    { name: 'Gijón La Calzada', project: 'Warehouse Automation', company: 'Inditex', description: 'La Calzada facility' },
    { name: 'Valladolid Centro', project: 'Network Infrastructure', company: 'Telefónica', description: 'Central Valladolid hub' },
    { name: 'Valladolid Huerta del Rey', project: 'Network Infrastructure', company: 'Telefónica', description: 'Huerta del Rey location' },
    { name: 'Granada Centro', project: 'Data Center Monitoring', company: 'Telefónica', description: 'Central Granada data center' },
    { name: 'Granada Zaidín', project: 'Data Center Monitoring', company: 'Telefónica', description: 'Zaidín district facility' },
    { name: 'Santander Centro', project: 'Branch Office Sensors', company: 'BBVA', description: 'Central Santander office' },
    { name: 'Santander Cuatro Caminos', project: 'Branch Office Sensors', company: 'BBVA', description: 'Cuatro Caminos branch' },
    { name: 'Pamplona Centro', project: 'ATM Network Monitoring', company: 'BBVA', description: 'Central Pamplona location' },
    { name: 'Pamplona Iturrama', project: 'ATM Network Monitoring', company: 'BBVA', description: 'Iturrama district branch' },
    { name: 'Tarragona Centro', project: 'Refinery Sensors', company: 'Repsol', description: 'Central Tarragona refinery' },
    { name: 'Tarragona Ponent', project: 'Refinery Sensors', company: 'Repsol', description: 'Ponent area facility' },
    { name: 'Logroño Centro', project: 'Gas Station Network', company: 'Repsol', description: 'Central Logroño station' },
    { name: 'Logroño Oeste', project: 'Gas Station Network', company: 'Repsol', description: 'West Logroño location' },
    { name: 'Badajoz Centro', project: 'Banking Operations', company: 'Santander', description: 'Central Badajoz office' },
    { name: 'Badajoz Valdepasillas', project: 'Banking Operations', company: 'Santander', description: 'Valdepasillas branch' },
    { name: 'Salamanca Centro', project: 'Office Building IoT', company: 'Santander', description: 'Central Salamanca building' },
    { name: 'Salamanca Garrido', project: 'Office Building IoT', company: 'Santander', description: 'Garrido district office' },
    { name: 'Cáceres Centro', project: 'Power Grid Monitoring', company: 'Iberdrola', description: 'Central Cáceres grid' },
    { name: 'Cáceres Mejostilla', project: 'Power Grid Monitoring', company: 'Iberdrola', description: 'Mejostilla district facility' },
    { name: 'Castellón Centro', project: 'Renewable Energy Sensors', company: 'Iberdrola', description: 'Central Castellón facility' },
    { name: 'Castellón Grao', project: 'Renewable Energy Sensors', company: 'Iberdrola', description: 'Grao port location' },
    { name: 'Albacete Centro', project: 'Distribution Network', company: 'Endesa', description: 'Central Albacete hub' },
    { name: 'Albacete Villacerrada', project: 'Distribution Network', company: 'Endesa', description: 'Villacerrada facility' },
    { name: 'Toledo Centro', project: 'Smart Grid Barcelona', company: 'Endesa', description: 'Central Toledo grid' },
    { name: 'Toledo Polígono', project: 'Smart Grid Barcelona', company: 'Endesa', description: 'Industrial area location' },
    { name: 'Burgos Centro', project: 'Insurance Office Network', company: 'Mapfre', description: 'Central Burgos office' },
    { name: 'Burgos Gamonal', project: 'Insurance Office Network', company: 'Mapfre', description: 'Gamonal district branch' },
    { name: 'León Centro', project: 'Claims Center Monitoring', company: 'Mapfre', description: 'Central León claims center' },
    { name: 'León Eras de Renueva', project: 'Claims Center Monitoring', company: 'Mapfre', description: 'Eras de Renueva facility' }
  ]

  return locations.map((location, index) => ({
    id: index + 1,
    alias: location.name,
    serialNumber: `LOC-${(index + 1).toString().padStart(3, '0')}`,
    channel: 'Locations',
    status: 'Active' as const,
    location: location.name,
    project: location.project,
    company: location.company,
    description: location.description,
    actions: ''
  }))
}

export default function LocationsTable() {
  const [locations, setLocations] = useState<Location[]>(generateLocations())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null)
  const [editedLocation, setEditedLocation] = useState<Partial<Location>>({})
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [newLocation, setNewLocation] = useState<NewItem<Location>>({
    alias: '',
    serialNumber: '',
    channel: 'Locations',
    status: 'Active',
    location: '',
    project: '',
    company: '',
    description: ''
  })

  const filteredLocations = locations.filter((location) => {
    const search = searchTerm.toLowerCase()
    return (
      location.location.toLowerCase().includes(search) ||
      location.project.toLowerCase().includes(search) ||
      location.company.toLowerCase().includes(search) ||
      location.description.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedLocations = filteredLocations.slice(startIndex, endIndex)

  const handleDeleteLocation = (locationId: number) => {
    setLocations(locations.filter((location) => location.id !== locationId))
    setDropdownOpen(null)
  }

  const handleDropdownToggle = (locationId: number | null) => {
    setDropdownOpen((prev) => (prev === locationId ? null : locationId))
  }

  const handleToggleStatus = (locationId: number) => {
    setLocations(locations.map(location => 
      location.id === locationId 
        ? { ...location, status: location.status === 'Active' ? 'Inactive' : 'Active' }
        : location
    ))
  }

  const handleEditLocation = (location: Location) => {
    setEditingLocationId(location.id)
    setEditedLocation(location)
    setDropdownOpen(null)
  }

  const handleSaveEdit = () => {
    setLocations(
      locations.map((location) =>
        location.id === editingLocationId ? { ...location, ...editedLocation } : location
      )
    )
    setEditingLocationId(null)
    setEditedLocation({})
  }

  const handleCancelEdit = () => {
    setEditingLocationId(null)
    setEditedLocation({})
  }

  const handleAddLocation = () => {
    setIsAddingLocation(true)
  }

  const handleSaveNewLocation = () => {
    if (newLocation.location && newLocation.project && newLocation.company && newLocation.description) {
      const newId = locations.length + 1
      setLocations([...locations, { 
        ...(newLocation as Location), 
        id: newId,
        alias: newLocation.location || '',
        serialNumber: `LOC-${newId.toString().padStart(3, '0')}`,
        channel: 'Locations',
        status: 'Active',
        actions: ''
      }])
      setIsAddingLocation(false)
      setNewLocation({
        alias: '',
        serialNumber: '',
        channel: 'Locations',
        status: 'Active',
        location: '',
        project: '',
        company: '',
        description: ''
      })
    }
  }

  const handleCancelAddLocation = () => {
    setIsAddingLocation(false)
    setNewLocation({
      alias: '',
      serialNumber: '',
      channel: 'Locations',
      status: 'Active',
      location: '',
      project: '',
      company: '',
      description: ''
    })
  }

  const columns: ColumnConfig<Location>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'location', label: 'Location' },
    { key: 'project', label: 'Project' },
    { key: 'company', label: 'Company' },
    { key: 'description', label: 'Description' },
    { key: 'actions', label: 'Actions' }
  ])

  const addColumns = [
    { key: 'id', label: 'ID' },
    { key: 'location', label: 'Location' },
    { key: 'project', label: 'Project' },
    { key: 'company', label: 'Company' },
    { key: 'description', label: 'Description' }
  ] satisfies { key: keyof Location; label: string }[]

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      {/* 🔍 Search Bar & ➕ Add Button */}
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddLocation} text='Add Location' />
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
            {paginatedLocations.map((location) => (
              <EditableRow
                key={location.id}
                item={location}
                index={location.id}
                filteredItems={filteredLocations}
                onDelete={handleDeleteLocation}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditLocation}
                isEditing={editingLocationId === location.id}
                editedItem={editedLocation}
                setEditedItem={setEditedLocation}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingLocation && (
              <AddRow
                newItem={newLocation}
                setNewItem={setNewLocation}
                handleSaveNewItem={handleSaveNewLocation}
                handleCancelAddItem={handleCancelAddLocation}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLocations.length)} of {filteredLocations.length} entries
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