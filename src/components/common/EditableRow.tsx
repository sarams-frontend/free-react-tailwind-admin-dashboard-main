import { FaCheck, FaTimes } from 'react-icons/fa';
import { MoreDotIcon } from '@/icons';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import Badge from '../ui/badge/Badge';
import { JSX } from 'react';

interface ItemWithRequiredProps {
  id: number;
  alias: string;
  serialNumber: string;
  channel: string;
  status: 'Active' | 'Inactive';
}

interface EditableRowProps<T extends ItemWithRequiredProps> {
  item: T;
  index: number;
  filteredItems: T[];
  onDelete: (itemId: number) => void;
  onToggleStatus: (itemId: number) => void;
  onDropdownToggle: (itemId: number | null) => void;
  onEdit: (item: T) => void;
  isEditing: boolean;
  editedItem: Partial<T>;
  setEditedItem: React.Dispatch<React.SetStateAction<Partial<T>>>;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  dropdownOpen: number | null;
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (
      value: string,
      item: T,
      setItem: React.Dispatch<React.SetStateAction<T>>
    ) => JSX.Element;
  }>;
}

const EditableRow = <T extends ItemWithRequiredProps>({
  item,
  index,
  filteredItems,
  onDelete,
  onToggleStatus,
  onDropdownToggle,
  dropdownOpen,
  onEdit,
  isEditing,
  editedItem,
  setEditedItem,
  handleSaveEdit,
  handleCancelEdit,
  columns,
}: EditableRowProps<T>) => {
  // valor actual (si hay edición, prioriza editedItem)
  const getVal = <K extends keyof T>(k: K): T[K] =>
    (isEditing ? (editedItem[k] ?? item[k]) : item[k]) as T[K];

  // setter tipado para columnas (sin any)
  const setField = <K extends keyof T>(k: K, v: T[K]) => {
    setEditedItem((prev) => ({ ...prev, [k]: v }));
  };

  // puente para column.render (sin any)
  const setItemBridge: React.Dispatch<React.SetStateAction<T>> = (update) => {
    if (typeof update === 'function') {
      setEditedItem((prev) => {
        const draft: T = { ...item, ...(prev as T) };
        const next = (update as (p: T) => T)(draft);
        return next as Partial<T>;
      });
    } else {
      setEditedItem(update as Partial<T>);
    }
  };

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
      {columns.map((col) => {
        const keyStr = String(col.key);

        // 1) Render personalizado desde columns
        if (col.render) {
          return (
            <td key={keyStr} className="px-3 py-2 text-gray-600 dark:text-white text-sm text-center">
              {col.render(String(getVal(col.key) ?? ''), item, setItemBridge)}
            </td>
          );
        }

        // 2) STATUS como Badge (clicable solo si no editas)
        if (keyStr === 'status') {
          const current = (isEditing ? (editedItem.status ?? item.status) : item.status);
          return (
            <td key={keyStr} className="px-3 py-2 text-center">
              <div
                className="cursor-pointer"
                onClick={() => !isEditing && onToggleStatus(item.id)}
              >
                <Badge size="sm" color={current === 'Active' ? 'success' : 'error'}>
                  {current}
                </Badge>
              </div>
            </td>
          );
        }

        // 3) ACTIONS (⋮ o ✓/✕ cuando editas)
        if (keyStr === 'actions') {
          return (
            <td key={keyStr} className="relative px-3 py-2 text-center">
              {isEditing ? (
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded-full text-xs mb-2"
                    onClick={handleSaveEdit}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-full text-xs"
                    onClick={handleCancelEdit}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <button
                  className="focus:outline-none"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onDropdownToggle(dropdownOpen === item.id ? null : item.id);
                  }}
                >
                  <MoreDotIcon className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 size-4" />
                </button>
              )}

              {dropdownOpen === item.id && !isEditing && (
                <Dropdown
                  isOpen={true}
                  onClose={() => onDropdownToggle(null)}
                  className={`absolute right-0 w-32 p-1 z-50 bg-white dark:bg-gray-800 shadow-lg ${
                    index >= filteredItems.length - 2 ? 'bottom-full' : 'top-full'
                  }`}
                >
                  <DropdownItem onClick={() => onEdit(item)}>Edit</DropdownItem>
                  <DropdownItem className="text-red-500" onClick={() => onDelete(item.id)}>
                    Delete
                  </DropdownItem>
                </Dropdown>
              )}
            </td>
          );
        }

        // 4) Resto de columnas: input si editas (menos id), texto si no
        const valueAsString = String(getVal(col.key) ?? '');
        const isId = keyStr === 'id';

        return (
          <td key={keyStr} className="px-3 py-2 text-gray-600 dark:text-white text-sm text-center">
            {isEditing && !isId ? (
              <input
                type="text"
                value={valueAsString}
                onChange={(e) => {
                  // e.target.value es string; como tu modelo usa strings en estas columnas,
                  // casteamos a T[K] (sin any)
                  setField(col.key, e.target.value as unknown as T[typeof col.key]);
                }}
                className="w-full p-1 border border-gray-300 rounded-md text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-yellow-100"
              />
            ) : (
              valueAsString
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default EditableRow;
