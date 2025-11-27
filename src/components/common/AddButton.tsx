import { FaPlus } from 'react-icons/fa'

interface AddButtonProps {
  onClick: () => void
  text: string // 🛠️ Añadimos una prop para el texto del botón
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, text }) => {
  return (
    <div>
      <button
        className='flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs'
        onClick={onClick}
      >
        <FaPlus className='text-white' size={12} />
        <span className='font-medium'>{text}</span> 
      </button>
    </div>
  )
}

export default AddButton
