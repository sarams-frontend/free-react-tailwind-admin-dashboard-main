import { useRef, useEffect, JSX } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { TableCell, TableRow } from '../ui/table'

// Definición de NewItem<T> para evitar problemas con undefined
type NewItem<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean ? T[K] : never
}

interface AddRowProps<T> {
  newItem: NewItem<T>
  setNewItem: React.Dispatch<React.SetStateAction<NewItem<T>>>
  handleSaveNewItem: () => void
  handleCancelAddItem: () => void
  columns: Array<{
    key: keyof T
    label: string
    inputType?: string
    render?: (
      value: string,
      item: NewItem<T>,
      setItem: React.Dispatch<React.SetStateAction<NewItem<T>>>
    ) => JSX.Element
  }>
}

const AddRow = <T,>({
  newItem,
  setNewItem,
  handleSaveNewItem,
  handleCancelAddItem,
  columns
}: AddRowProps<T>) => {
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  // Función para manejar la conversión de tipos en los inputs
  const handleInputChange = (key: keyof T, value: string, type?: string) => {
    let parsedValue: string | number | boolean = value // 🔹 Definimos un tipo seguro

    if (type === 'number') {
      parsedValue = Number(value) // 🔹 Aseguramos que es un número
    } else if (type === 'checkbox') {
      parsedValue = value === 'true' // 🔹 Convertimos a booleano
    }

    setNewItem((prev) => ({
      ...prev,
      [key]: parsedValue
    }))
  }

  return (
    <TableRow className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
      {columns.map((column, index) => (
        <TableCell
          key={column.key as string}
          className='px-3 py-2 text-gray-800 dark:text-white text-sm text-center'
        >
          {column.render ? (
            column.render(
              String(newItem[column.key] ?? ''),
              newItem,
              setNewItem
            )
          ) : (
            <input
              ref={index === 0 ? firstInputRef : null}
              type={column.inputType || 'text'}
              value={String(newItem[column.key] ?? '')}
              onChange={(e) =>
                handleInputChange(column.key, e.target.value, column.inputType)
              }
              className='w-full p-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            />
          )}
        </TableCell>
      ))}
      <TableCell className='relative px-3 py-2 text-center'>
        <div className='flex flex-col items-center justify-center'>
          <button
            className='px-2 py-1 text-center bg-green-500 text-white rounded-full text-xs mb-2'
            onClick={handleSaveNewItem}
          >
            <FaCheck />
          </button>
          <button
            className='px-2 py-1 text-center bg-red-500 text-white rounded-full text-xs'
            onClick={handleCancelAddItem}
          >
            <FaTimes />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default AddRow
