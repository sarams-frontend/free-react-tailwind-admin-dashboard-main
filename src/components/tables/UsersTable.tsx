import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import EditableRow from '../common/EditableRow'
import SearchBar from '../common/SearchBar'
import AddButton from '../common/AddButton'
import AddRow from '../common/AddRow'
import { ColumnConfig, createColumns } from '../common/EditableColumn'

type User = {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: 'Active' | 'Inactive';
  user: string;
  permission: string;
  company: string;
  actions: "";
}

type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

const generateUsers = (): User[] => {
  const users = [
    { 
      name: 'Carlos Rodriguez', 
      permission: 'Administrator', 
      company: 'Carrefour España S.A.'
    },
    { 
      name: 'Ana Martinez', 
      permission: 'Manager', 
      company: 'Ilunion Hotels S.A.U.'
    },
    { 
      name: 'Luis Garcia', 
      permission: 'Operator', 
      company: 'MediaMarkt Iberia S.A.'
    },
    { 
      name: 'Maria Lopez', 
      permission: 'Supervisor', 
      company: 'Mercadona S.A.'
    },
    { 
      name: 'Jorge Fernandez', 
      permission: 'Administrator', 
      company: 'El Corte Inglés S.A.'
    },
    { 
      name: 'Elena Ruiz', 
      permission: 'Manager', 
      company: 'Carrefour España S.A.'
    },
    { 
      name: 'Miguel Santos', 
      permission: 'Operator', 
      company: 'Ilunion Hotels S.A.U.'
    },
    { 
      name: 'Carmen Diaz', 
      permission: 'Supervisor', 
      company: 'MediaMarkt Iberia S.A.'
    }
  ]
  
  return users.map((user, index) => ({
    id: index + 1,
    alias: user.name,
    serialNumber: `USR-${(index + 1).toString().padStart(3, '0')}`,
    channel: 'Users',
    status: 'Active' as const,
    user: user.name,
    permission: user.permission,
    company: user.company,
    actions: ''
  }))
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(generateUsers())
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editedUser, setEditedUser] = useState<Partial<User>>({})
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState<NewItem<User>>({
    alias: '',
    serialNumber: '',
    channel: 'Users',
    status: 'Active',
    user: '',
    permission: '',
    company: ''
  })

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase()
    return (
      user.user.toLowerCase().includes(search) ||
      user.permission.toLowerCase().includes(search) ||
      user.company.toLowerCase().includes(search)
    )
  })

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    setDropdownOpen(null)
  }

  const handleDropdownToggle = (userId: number | null) => {
    setDropdownOpen((prev) => (prev === userId ? null : userId))
  }

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ))
  }

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id)
    setEditedUser(user)
    setDropdownOpen(null)
  }

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUserId ? { ...user, ...editedUser } : user
      )
    )
    setEditingUserId(null)
    setEditedUser({})
  }

  const handleCancelEdit = () => {
    setEditingUserId(null)
    setEditedUser({})
  }

  const handleAddUser = () => {
    setIsAddingUser(true)
  }

  const handleSaveNewUser = () => {
    if (newUser.user && newUser.permission && newUser.company) {
      const newId = users.length + 1
      setUsers([...users, { 
        ...(newUser as User), 
        id: newId,
        alias: newUser.user || '',
        serialNumber: `USR-${newId.toString().padStart(3, '0')}`,
        channel: 'Users',
        status: 'Active',
        actions: ''
      }])
      setIsAddingUser(false)
      setNewUser({
        alias: '',
        serialNumber: '',
        channel: 'Users',
        status: 'Active',
        user: '',
        permission: '',
        company: ''
      })
    }
  }

  const handleCancelAddUser = () => {
    setIsAddingUser(false)
    setNewUser({
      alias: '',
      serialNumber: '',
      channel: 'Users',
      status: 'Active',
      user: '',
      permission: '',
      company: ''
    })
  }

  const columns: ColumnConfig<User>[] = createColumns([
    { key: 'id', label: 'ID' },
    { key: 'user', label: 'User' },
    { key: 'permission', label: 'Permission' },
    { key: 'company', label: 'Company' },
    { key: 'actions', label: 'Actions' }
  ])

  const addColumns = [
    { key: 'id', label: 'ID' },
    { key: 'user', label: 'User' },
    { key: 'permission', label: 'Permission' },
    { key: 'company', label: 'Company' }
  ] satisfies { key: keyof User; label: string }[]

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md p-5'>
      {/* 🔍 Search Bar & ➕ Add Button */}
      <div className='flex items-center justify-between gap-4 mb-4'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddButton onClick={handleAddUser} text='Add User' />
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
            {filteredUsers.map((user) => (
              <EditableRow
                key={user.id}
                item={user}
                index={user.id}
                filteredItems={filteredUsers}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleStatus}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
                onEdit={handleEditUser}
                isEditing={editingUserId === user.id}
                editedItem={editedUser}
                setEditedItem={setEditedUser}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                columns={columns}
              />
            ))}

            {isAddingUser && (
              <AddRow
                newItem={newUser}
                setNewItem={setNewUser}
                handleSaveNewItem={handleSaveNewUser}
                handleCancelAddItem={handleCancelAddUser}
                columns={addColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}