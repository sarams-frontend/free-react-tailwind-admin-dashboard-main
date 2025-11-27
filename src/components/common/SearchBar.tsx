import { IoIosSearch } from 'react-icons/io';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-1/3">
      <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className='pl-10 p-1 px-3 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
