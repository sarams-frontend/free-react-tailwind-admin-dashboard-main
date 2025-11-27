import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState, useMemo } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from '@/icons';

interface SensorsDataOverviewProps {
  filters: {
    empresa: string
    proyecto: string
    ubicacion: string
    fechaInicio: string
    fechaFin: string
  }
}

export default function SensorsDataOverview({ filters }: SensorsDataOverviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detectar tema automáticamente
  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Datos ajustados según filtros
  const data = useMemo(() => {
    const hasFilters = filters.empresa || filters.proyecto || filters.ubicacion
    const multiplier = hasFilters ? 0.6 : 1

    return [
      { name: "Temperature", value: Math.round(350 * multiplier), fill: "url(#gradYellow)" },
      { name: "Humidity", value: Math.round(280 * multiplier), fill: "url(#gradCyan)" },
      { name: "Presence", value: Math.round(220 * multiplier), fill: "url(#gradGreen)" }
    ]
  }, [filters]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Sensor Data Overview
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Real-time data for temperature, humidity, and presence
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              Edit
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Definición de gradientes */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradYellow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#F9C74F" />
            <stop offset="100%" stopColor="#E9A617" />
          </linearGradient>

          <linearGradient id="gradCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C4B4" />
            <stop offset="50%" stopColor="#2DD4BF" />
            <stop offset="70%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#99F6E4" />
          </linearGradient>

          <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#96E072" />
            <stop offset="50%" stopColor="#3DA35D" />
            <stop offset="100%" stopColor="#1F7A2E" />
          </linearGradient>
        </defs>
      </svg>

      {/* Gráfico con Recharts */}
      <div className="relative flex justify-center mt-5">
        <div className="max-h-[330px] w-full bg-gray-50 p-4 rounded-lg shadow-md dark:bg-gray-800">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={theme === "dark" ? "#FFF" : "none"} // 🔹 Borde blanco en modo oscuro
                    strokeWidth={theme === "dark" ? 2 : 0}
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      transformOrigin: "center",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)"
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={{ fill: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.8)" }}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#FFF" : "#333",
                  borderRadius: "5px",
                  border: `1px solid ${theme === "dark" ? "#666" : "#ddd"}`,
                  padding: "8px",
                }}
                itemStyle={{ color: theme === "dark" ? "#FFF" : "#000" }}
              />
              <Legend
                wrapperStyle={{
                  color: theme === "dark" ? "#FFF" : "#000",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Información adicional - Ahora visible en modo oscuro */}
      <div className="flex items-center justify-center gap-6 px-6 py-4 sm:py-5">
        <div className="text-center">
          <p className="mb-1 text-gray-700 dark:text-white">Temperature</p>
          <p className="text-lg font-semibold text-yellow-500">350</p>
        </div>

        <div className="w-px bg-gray-200 h-6 dark:bg-gray-600"></div>

        <div className="text-center">
          <p className="mb-1 text-gray-700 dark:text-white">Humidity</p>
          <p className="text-lg font-semibold text-teal-400">280</p>
        </div>

        <div className="w-px bg-gray-200 h-6 dark:bg-gray-600"></div>

        <div className="text-center">
          <p className="mb-1 text-gray-700 dark:text-white">Presence</p>
          <p className="text-lg font-semibold text-green-500">220</p>
        </div>
      </div>
    </div>
  );
}
