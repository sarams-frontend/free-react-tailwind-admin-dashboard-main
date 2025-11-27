import { useState, useEffect, useMemo } from 'react';
import { useDashboardDataStore } from '@/store/dashboardDataStore';

interface FormHomeProps {
  onFilter: (filters: {
    empresa: string;
    proyecto: string;
    ubicacion: string;
    fechaInicio: string;
    fechaFin: string;
  }) => void;
}

const FormHome: React.FC<FormHomeProps> = ({ onFilter }) => {
  const { companies, projects, locations, filters, setFilters, clearFilters } = useDashboardDataStore();

  const [empresa, setEmpresa] = useState<string>(filters.company);
  const [proyecto, setProyecto] = useState<string>(filters.project);
  const [ubicacion, setUbicacion] = useState<string>(filters.location);
  const [fechaInicio, setFechaInicio] = useState<string>(filters.startDate);
  const [fechaFin, setFechaFin] = useState<string>(filters.endDate);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Filtrar proyectos basados en la empresa seleccionada
  const filteredProjects = useMemo(() => {
    if (!empresa) return projects;
    const selectedCompany = companies.find(c => c.name === empresa);
    return selectedCompany ? projects.filter(p => p.companyId === selectedCompany.id) : [];
  }, [empresa, companies, projects]);

  // Filtrar ubicaciones basadas en el proyecto seleccionado
  const filteredLocations = useMemo(() => {
    if (!proyecto) return locations;
    const selectedProject = projects.find(p => p.name === proyecto);
    return selectedProject ? locations.filter(l => l.projectId === selectedProject.id) : [];
  }, [proyecto, projects, locations]);

  // Resetear proyecto cuando cambia empresa
  useEffect(() => {
    if (empresa) {
      const isProjectValid = filteredProjects.some(p => p.name === proyecto);
      if (!isProjectValid) {
        setProyecto('');
        setUbicacion('');
      }
    }
  }, [empresa, filteredProjects, proyecto]);

  // Resetear ubicación cuando cambia proyecto
  useEffect(() => {
    if (proyecto) {
      const isLocationValid = filteredLocations.some(l => l.name === ubicacion);
      if (!isLocationValid) {
        setUbicacion('');
      }
    }
  }, [proyecto, filteredLocations, ubicacion]);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFilters = {
      company: empresa,
      project: proyecto,
      location: ubicacion,
      startDate: fechaInicio,
      endDate: fechaFin,
    };

    setFilters(newFilters);
    onFilter({
      empresa,
      proyecto,
      ubicacion,
      fechaInicio,
      fechaFin,
    });
  };

  const handleClearFilters = () => {
    setEmpresa('');
    setProyecto('');
    setUbicacion('');
    setFechaInicio('');
    setFechaFin('');
    clearFilters();
    onFilter({
      empresa: '',
      proyecto: '',
      ubicacion: '',
      fechaInicio: '',
      fechaFin: '',
    });
  };

  const hasActiveFilters = empresa || proyecto || ubicacion || fechaInicio || fechaFin;

  return (
    <form
      onSubmit={handleFilter}
      className={`p-4 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 items-end transition-all ${
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Company Filter */}
      <div className="flex flex-col">
        <label className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Company
        </label>
        <select
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className={`w-full h-8 p-1 border rounded text-xs transition-all ${
            theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
          }`}
        >
          <option value="">Select</option>
          {companies.map((comp) => (
            <option key={comp.id} value={comp.name}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Project Filter */}
      <div className="flex flex-col">
        <label className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Project
        </label>
        <select
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          disabled={!empresa}
          className={`w-full h-8 p-1 border rounded text-xs transition-all ${
            theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
          } ${!empresa ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="">Select</option>
          {filteredProjects.map((proj) => (
            <option key={proj.id} value={proj.name}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="flex flex-col">
        <label className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Location
        </label>
        <select
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          disabled={!proyecto}
          className={`w-full h-8 p-1 border rounded text-xs transition-all ${
            theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
          } ${!proyecto ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="">Select</option>
          {filteredLocations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="flex flex-col">
        <label className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Start
        </label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className={`w-full h-8 p-1 border rounded text-xs transition-all ${
            theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
          }`}
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col">
        <label className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          End
        </label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className={`w-full h-8 p-1 border rounded text-xs transition-all ${
            theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
          }`}
        />
      </div>

      {/* Filter Button */}
      <div className="flex flex-col">
        <button
          type="submit"
          className={`w-full h-8 rounded text-xs font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Filter
        </button>
      </div>

      {/* Clear Filters Button */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className={`w-full h-8 rounded text-xs font-semibold transition-all ${
            hasActiveFilters
              ? theme === 'dark'
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormHome;
