import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import EditableRow from '../common/EditableRow'
import SearchBar from '../common/SearchBar'
import AddButton from '../common/AddButton'
import AddRow from '../common/AddRow'
import { ColumnConfig, createColumns } from '../common/EditableColumn'

type Empresa = {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: 'Active' | 'Inactive';
  empresa: string;
  direccion: string;
  cif: string;
  actions: "";
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateEmpresas = (): Empresa[] => {
  const empresas = [
    { nombre: 'Carrefour', direccion: 'Calle Alcobendas 12, Madrid', cif: 'A28007748' },
    { nombre: 'Ilunion', direccion: 'Avenida Burgos 8B, Madrid', cif: 'A86788328' },
    { nombre: 'Mercadona', direccion: 'Tavernes Blanques, Valencia', cif: 'A46103834' },
    { nombre: 'El Corte Inglés', direccion: 'Hermosilla 112, Madrid', cif: 'A28017895' },
    { nombre: 'Inditex', direccion: 'Avenida Diputación s/n, A Coruña', cif: 'A15041178' },
    { nombre: 'Telefónica', direccion: 'Gran Vía 28, Madrid', cif: 'A82018474' },
    { nombre: 'BBVA', direccion: 'Paseo Castellana 81, Madrid', cif: 'A48265169' },
    { nombre: 'Repsol', direccion: 'Calle Méndez Álvaro 44, Madrid', cif: 'A78374725' },
    { nombre: 'Santander', direccion: 'Paseo Pereda 9-12, Santander', cif: 'A39000013' },
    { nombre: 'Iberdrola', direccion: 'Plaza Euskadi 5, Bilbao', cif: 'A48010615' },
    { nombre: 'Endesa', direccion: 'Calle Ribera del Loira 60, Madrid', cif: 'A81948077' },
    { nombre: 'Mapfre', direccion: 'Carretera Pozuelo 52, Majadahonda', cif: 'A08055741' }
  ]

  return empresas.map((empresa, index) => ({
    id: index + 1,
    alias: empresa.nombre,
    serialNumber: empresa.cif,
    channel: 'Companies',
    status: 'Active' as const,
    empresa: empresa.nombre,
    direccion: empresa.direccion,
    cif: empresa.cif,
    actions: ''
  }))
}

export default function EmpresasTable() {
  const [empresas, setEmpresas] = useState<Empresa[]>(generateEmpresas())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingEmpresaId, setEditingEmpresaId] = useState<number | null>(null)
  const [editedEmpresa, setEditedEmpresa] = useState<Partial<Empresa>>({})
  const [isAddingEmpresa, setIsAddingEmpresa] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [newEmpresa, setNewEmpresa] = useState<NewItem<Empresa>>({
    alias: '',
    serialNumber: '',
    channel: 'Companies',
    status: 'Active',
    empresa: '',
    direccion: '',
    cif: ''
  })

  const filteredEmpresas = empresas.filter((empresa) => {
    const search = searchTerm.toLowerCase()
    return (
      empresa.empresa.toLowerCase().includes(search) ||
      empresa.direccion.toLowerCase().includes(search) ||
      empresa.cif.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredEmpresas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEmpresas = filteredEmpresas.slice(startIndex, endIndex)

  const handleDeleteEmpresa = (empresaId: number) => {
    setEmpresas(empresas.filter((empresa) => empresa.id !== empresaId))
    setDropdownOpen(null)
  }

  const handleDropdownToggle = (empresaId: number | null) => {
    setDropdownOpen((prev) => (prev === empresaId ? null : empresaId))
  }

  const handleToggleStatus = (empresaId: number) => {
    setEmpresas(empresas.map(empresa => 
      empresa.id === empresaId 
        ? { ...empresa, status: empresa.status === 'Active' ? 'Inactive' : 'Active' }
        : empresa
    ))
  }

  const handleEditEmpresa = (empresa: Empresa) => {
    setEditingEmpresaId(empresa.id)
    setEditedEmpresa(empresa)
    setDropdownOpen(null)
  }

  const handleSaveEdit = () => {
    setEmpresas(
      empresas.map((empresa) =>
        empresa.id === editingEmpresaId ? { ...empresa, ...editedEmpresa } : empresa
      )
    )
    setEditingEmpresaId(null)
    setEditedEmpresa({})
  }

  const handleCancelEdit = () => {
    setEditingEmpresaId(null)
    setEditedEmpresa({})
  }

  const handleAddEmpresa = () => {
    setIsAddingEmpresa(true)
  }

  const handleSaveNewEmpresa = () => {
    if (newEmpresa.empresa && newEmpresa.direccion && newEmpresa.cif) {
      const newId = empresas.length + 1
      setEmpresas([...empresas, { 
        ...(newEmpresa as Empresa), 
        id: newId,
        alias: newEmpresa.empresa || '',
        serialNumber: newEmpresa.cif || '',
        channel: 'Companies',
        status: 'Active',
        actions: ''
      }])
      setIsAddingEmpresa(false)
      setNewEmpresa({
        alias: '',
        serialNumber: '',
        channel: 'Companies',
        status: 'Active',
        empresa: '',
        direccion: '',
        cif: ''
      })
    }
  }

  const handleCancelAddEmpresa = () => {
    setIsAddingEmpresa(false)
    setNewEmpresa({
      alias: '',
      serialNumber: '',
      channel: 'Companies',
      status: 'Active',
      empresa: '',
      direccion: '',
      cif: ''
    })
  }

  const columns: ColumnConfig<Empresa>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'empresa', label: 'Company' },
    { key: 'direccion', label: 'Address' },
    { key: 'cif', label: 'CIF' },
    { key: 'actions', label: 'Actions' }
  ])

  const addColumns = [
    { key: 'id', label: 'ID' },
    { key: 'empresa', label: 'Company' },
    { key: 'direccion', label: 'Address' },
    { key: 'cif', label: 'CIF' }
  ] satisfies { key: keyof Empresa; label: string }[]

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      {/* 🔍 Search Bar & ➕ Add Button */}
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddEmpresa} text='Add Company' />
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
            {paginatedEmpresas.map((empresa) => (
              <EditableRow
                key={empresa.id}
                item={empresa}
                index={empresa.id}
                filteredItems={filteredEmpresas}
                onDelete={handleDeleteEmpresa}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditEmpresa}
                isEditing={editingEmpresaId === empresa.id}
                editedItem={editedEmpresa}
                setEditedItem={setEditedEmpresa}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingEmpresa && (
              <AddRow
                newItem={newEmpresa}
                setNewItem={setNewEmpresa}
                handleSaveNewItem={handleSaveNewEmpresa}
                handleCancelAddItem={handleCancelAddEmpresa}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredEmpresas.length)} of {filteredEmpresas.length} entries
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