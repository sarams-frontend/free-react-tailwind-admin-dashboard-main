import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import EditableRow from '../common/EditableRow'
import SearchBar from '../common/SearchBar'
import AddButton from '../common/AddButton'
import AddRow from '../common/AddRow'
import { ColumnConfig, createColumns } from '../common/EditableColumn'

type Proyecto = {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: 'Active' | 'Inactive';
  proyecto: string;
  empresaPadre: string;
  descripcion: string;
  actions: "";
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateProyectos = (): Proyecto[] => {
  const proyectos = [
    { nombre: 'Smart Retail Madrid', empresaPadre: 'Carrefour', descripcion: 'Smart retail analytics for Madrid stores' },
    { nombre: 'IoT Monitoring Barcelona', empresaPadre: 'Carrefour', descripcion: 'IoT monitoring system for Barcelona location' },
    { nombre: 'Energy Optimization Valencia', empresaPadre: 'Carrefour', descripcion: 'Energy optimization for Valencia facilities' },
    { nombre: 'Facilities Management Sevilla', empresaPadre: 'Ilunion', descripcion: 'Facilities management system for Sevilla' },
    { nombre: 'Building Automation Madrid', empresaPadre: 'Ilunion', descripcion: 'Automated building management in Madrid' },
    { nombre: 'Warehouse Sensors Bilbao', empresaPadre: 'Mercadona', descripcion: 'Warehouse sensor network in Bilbao' },
    { nombre: 'Store Network Monitoring', empresaPadre: 'Mercadona', descripcion: 'Store monitoring across network' },
    { nombre: 'Climate Control System', empresaPadre: 'El Corte Inglés', descripcion: 'Climate control for retail spaces' },
    { nombre: 'Security Sensors Network', empresaPadre: 'El Corte Inglés', descripcion: 'Security sensor deployment' },
    { nombre: 'Retail Analytics Platform', empresaPadre: 'El Corte Inglés', descripcion: 'Retail analytics and insights' },
    { nombre: 'Fashion Store IoT', empresaPadre: 'Inditex', descripcion: 'IoT deployment in fashion stores' },
    { nombre: 'Logistics Tracking Zara', empresaPadre: 'Inditex', descripcion: 'Logistics tracking for Zara' },
    { nombre: 'Warehouse Automation', empresaPadre: 'Inditex', descripcion: 'Automated warehouse systems' },
    { nombre: 'Network Infrastructure', empresaPadre: 'Telefónica', descripcion: 'Network infrastructure monitoring' },
    { nombre: 'Data Center Monitoring', empresaPadre: 'Telefónica', descripcion: 'Data center sensor deployment' },
    { nombre: 'Branch Office Sensors', empresaPadre: 'BBVA', descripcion: 'Branch office monitoring system' },
    { nombre: 'ATM Network Monitoring', empresaPadre: 'BBVA', descripcion: 'ATM network monitoring' },
    { nombre: 'Refinery Sensors', empresaPadre: 'Repsol', descripcion: 'Refinery monitoring system' },
    { nombre: 'Gas Station Network', empresaPadre: 'Repsol', descripcion: 'Gas station network monitoring' },
    { nombre: 'Banking Operations', empresaPadre: 'Santander', descripcion: 'Banking operations monitoring' },
    { nombre: 'Office Building IoT', empresaPadre: 'Santander', descripcion: 'Office building IoT deployment' },
    { nombre: 'Power Grid Monitoring', empresaPadre: 'Iberdrola', descripcion: 'Power grid sensor network' },
    { nombre: 'Renewable Energy Sensors', empresaPadre: 'Iberdrola', descripcion: 'Renewable energy monitoring' },
    { nombre: 'Distribution Network', empresaPadre: 'Endesa', descripcion: 'Distribution network monitoring' },
    { nombre: 'Smart Grid Barcelona', empresaPadre: 'Endesa', descripcion: 'Smart grid deployment in Barcelona' },
    { nombre: 'Insurance Office Network', empresaPadre: 'Mapfre', descripcion: 'Insurance office monitoring' },
    { nombre: 'Claims Center Monitoring', empresaPadre: 'Mapfre', descripcion: 'Claims center sensor network' }
  ]

  return proyectos.map((proyecto, index) => ({
    id: index + 1,
    alias: proyecto.nombre,
    serialNumber: `PROJ-${(index + 1).toString().padStart(3, '0')}`,
    channel: 'Projects',
    status: 'Active' as const,
    proyecto: proyecto.nombre,
    empresaPadre: proyecto.empresaPadre,
    descripcion: proyecto.descripcion,
    actions: ''
  }))
}

export default function ProyectosTable() {
  const [proyectos, setProyectos] = useState<Proyecto[]>(generateProyectos())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingProyectoId, setEditingProyectoId] = useState<number | null>(null)
  const [editedProyecto, setEditedProyecto] = useState<Partial<Proyecto>>({})
  const [isAddingProyecto, setIsAddingProyecto] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [newProyecto, setNewProyecto] = useState<NewItem<Proyecto>>({
    alias: '',
    serialNumber: '',
    channel: 'Projects',
    status: 'Active',
    proyecto: '',
    empresaPadre: '',
    descripcion: ''
  })

  const filteredProyectos = proyectos.filter((proyecto) => {
    const search = searchTerm.toLowerCase()
    return (
      proyecto.proyecto.toLowerCase().includes(search) ||
      proyecto.empresaPadre.toLowerCase().includes(search) ||
      proyecto.descripcion.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredProyectos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProyectos = filteredProyectos.slice(startIndex, endIndex)

  const handleDeleteProyecto = (proyectoId: number) => {
    setProyectos(proyectos.filter((proyecto) => proyecto.id !== proyectoId))
    setDropdownOpen(null)
  }

  const handleDropdownToggle = (proyectoId: number | null) => {
    setDropdownOpen((prev) => (prev === proyectoId ? null : proyectoId))
  }

  const handleToggleStatus = (proyectoId: number) => {
    setProyectos(proyectos.map(proyecto => 
      proyecto.id === proyectoId 
        ? { ...proyecto, status: proyecto.status === 'Active' ? 'Inactive' : 'Active' }
        : proyecto
    ))
  }

  const handleEditProyecto = (proyecto: Proyecto) => {
    setEditingProyectoId(proyecto.id)
    setEditedProyecto(proyecto)
    setDropdownOpen(null)
  }

  const handleSaveEdit = () => {
    setProyectos(
      proyectos.map((proyecto) =>
        proyecto.id === editingProyectoId ? { ...proyecto, ...editedProyecto } : proyecto
      )
    )
    setEditingProyectoId(null)
    setEditedProyecto({})
  }

  const handleCancelEdit = () => {
    setEditingProyectoId(null)
    setEditedProyecto({})
  }

  const handleAddProyecto = () => {
    setIsAddingProyecto(true)
  }

  const handleSaveNewProyecto = () => {
    if (newProyecto.proyecto && newProyecto.empresaPadre && newProyecto.descripcion) {
      const newId = proyectos.length + 1
      setProyectos([...proyectos, { 
        ...(newProyecto as Proyecto), 
        id: newId,
        alias: newProyecto.proyecto || '',
        serialNumber: `PROJ-${newId.toString().padStart(3, '0')}`,
        channel: 'Projects',
        status: 'Active',
        actions: ''
      }])
      setIsAddingProyecto(false)
      setNewProyecto({
        alias: '',
        serialNumber: '',
        channel: 'Projects',
        status: 'Active',
        proyecto: '',
        empresaPadre: '',
        descripcion: ''
      })
    }
  }

  const handleCancelAddProyecto = () => {
    setIsAddingProyecto(false)
    setNewProyecto({
      alias: '',
      serialNumber: '',
      channel: 'Projects',
      status: 'Active',
      proyecto: '',
      empresaPadre: '',
      descripcion: ''
    })
  }

  const columns: ColumnConfig<Proyecto>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'proyecto', label: 'Project' },
    { key: 'empresaPadre', label: 'Parent Company' },
    { key: 'descripcion', label: 'Description' },
    { key: 'actions', label: 'Actions' }
  ])

  const addColumns = [
    { key: 'id', label: 'ID' },
    { key: 'proyecto', label: 'Project' },
    { key: 'empresaPadre', label: 'Parent Company' },
    { key: 'descripcion', label: 'Description' }
  ] satisfies { key: keyof Proyecto; label: string }[]

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      {/* 🔍 Search Bar & ➕ Add Button */}
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddProyecto} text='Add Project' />
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
            {paginatedProyectos.map((proyecto) => (
              <EditableRow
                key={proyecto.id}
                item={proyecto}
                index={proyecto.id}
                filteredItems={filteredProyectos}
                onDelete={handleDeleteProyecto}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditProyecto}
                isEditing={editingProyectoId === proyecto.id}
                editedItem={editedProyecto}
                setEditedItem={setEditedProyecto}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingProyecto && (
              <AddRow
                newItem={newProyecto}
                setNewItem={setNewProyecto}
                handleSaveNewItem={handleSaveNewProyecto}
                handleCancelAddItem={handleCancelAddProyecto}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredProyectos.length)} of {filteredProyectos.length} entries
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