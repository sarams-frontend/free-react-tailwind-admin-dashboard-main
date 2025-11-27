import { create } from "zustand";

export interface Company {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  companyId: number;
}

export interface Location {
  id: number;
  name: string;
  projectId: number;
}

export interface DashboardFilters {
  company: string;
  project: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface DashboardDataState {
  companies: Company[];
  projects: Project[];
  locations: Location[];
  filters: DashboardFilters;
  setCompanies: (companies: Company[]) => void;
  setProjects: (projects: Project[]) => void;
  setLocations: (locations: Location[]) => void;
  setFilters: (filters: DashboardFilters) => void;
  clearFilters: () => void;
}

const defaultFilters: DashboardFilters = {
  company: "",
  project: "",
  location: "",
  startDate: "",
  endDate: "",
};

export const useDashboardDataStore = create<DashboardDataState>((set) => ({
  companies: [
    { id: 1, name: "Carrefour" },
    { id: 2, name: "Ilunion" },
    { id: 3, name: "Mercadona" },
    { id: 4, name: "El Corte Inglés" },
    { id: 5, name: "Inditex" },
    { id: 6, name: "Telefónica" },
    { id: 7, name: "BBVA" },
    { id: 8, name: "Repsol" },
    { id: 9, name: "Santander" },
    { id: 10, name: "Iberdrola" },
    { id: 11, name: "Endesa" },
    { id: 12, name: "Mapfre" },
  ],
  projects: [
    { id: 1, name: "Smart Retail Madrid", companyId: 1 },
    { id: 2, name: "IoT Monitoring Barcelona", companyId: 1 },
    { id: 3, name: "Energy Optimization Valencia", companyId: 1 },
    { id: 4, name: "Facilities Management Sevilla", companyId: 2 },
    { id: 5, name: "Building Automation Madrid", companyId: 2 },
    { id: 6, name: "Warehouse Sensors Bilbao", companyId: 3 },
    { id: 7, name: "Store Network Monitoring", companyId: 3 },
    { id: 8, name: "Climate Control System", companyId: 4 },
    { id: 9, name: "Security Sensors Network", companyId: 4 },
    { id: 10, name: "Retail Analytics Platform", companyId: 4 },
    { id: 11, name: "Fashion Store IoT", companyId: 5 },
    { id: 12, name: "Logistics Tracking Zara", companyId: 5 },
    { id: 13, name: "Warehouse Automation", companyId: 5 },
    { id: 14, name: "Network Infrastructure", companyId: 6 },
    { id: 15, name: "Data Center Monitoring", companyId: 6 },
    { id: 16, name: "Branch Office Sensors", companyId: 7 },
    { id: 17, name: "ATM Network Monitoring", companyId: 7 },
    { id: 18, name: "Refinery Sensors", companyId: 8 },
    { id: 19, name: "Gas Station Network", companyId: 8 },
    { id: 20, name: "Banking Operations", companyId: 9 },
    { id: 21, name: "Office Building IoT", companyId: 9 },
    { id: 22, name: "Power Grid Monitoring", companyId: 10 },
    { id: 23, name: "Renewable Energy Sensors", companyId: 10 },
    { id: 24, name: "Distribution Network", companyId: 11 },
    { id: 25, name: "Smart Grid Barcelona", companyId: 11 },
    { id: 26, name: "Insurance Office Network", companyId: 12 },
    { id: 27, name: "Claims Center Monitoring", companyId: 12 },
  ],
  locations: [
    { id: 1, name: "Madrid Centro", projectId: 1 },
    { id: 2, name: "Madrid Salamanca", projectId: 1 },
    { id: 3, name: "Madrid Norte", projectId: 1 },
    { id: 4, name: "Barcelona Eixample", projectId: 2 },
    { id: 5, name: "Barcelona Gràcia", projectId: 2 },
    { id: 6, name: "Barcelona Sants", projectId: 2 },
    { id: 7, name: "Valencia Centro", projectId: 3 },
    { id: 8, name: "Valencia Campanar", projectId: 3 },
    { id: 9, name: "Sevilla Triana", projectId: 4 },
    { id: 10, name: "Sevilla Nervión", projectId: 4 },
    { id: 11, name: "Madrid Chamartín", projectId: 5 },
    { id: 12, name: "Madrid Retiro", projectId: 5 },
    { id: 13, name: "Bilbao Deusto", projectId: 6 },
    { id: 14, name: "Bilbao Abando", projectId: 6 },
    { id: 15, name: "Málaga Centro", projectId: 7 },
    { id: 16, name: "Málaga Este", projectId: 7 },
    { id: 17, name: "Zaragoza Centro", projectId: 8 },
    { id: 18, name: "Zaragoza Delicias", projectId: 8 },
    { id: 19, name: "Murcia Centro", projectId: 9 },
    { id: 20, name: "Murcia Norte", projectId: 9 },
    { id: 21, name: "Alicante Centro", projectId: 10 },
    { id: 22, name: "Alicante San Juan", projectId: 10 },
    { id: 23, name: "A Coruña Centro", projectId: 11 },
    { id: 24, name: "A Coruña Matogrande", projectId: 11 },
    { id: 25, name: "Vigo Centro", projectId: 12 },
    { id: 26, name: "Vigo Bouzas", projectId: 12 },
    { id: 27, name: "Gijón Centro", projectId: 13 },
    { id: 28, name: "Gijón La Calzada", projectId: 13 },
    { id: 29, name: "Valladolid Centro", projectId: 14 },
    { id: 30, name: "Valladolid Huerta del Rey", projectId: 14 },
    { id: 31, name: "Granada Centro", projectId: 15 },
    { id: 32, name: "Granada Zaidín", projectId: 15 },
    { id: 33, name: "Santander Centro", projectId: 16 },
    { id: 34, name: "Santander Cuatro Caminos", projectId: 16 },
    { id: 35, name: "Pamplona Centro", projectId: 17 },
    { id: 36, name: "Pamplona Iturrama", projectId: 17 },
    { id: 37, name: "Tarragona Centro", projectId: 18 },
    { id: 38, name: "Tarragona Ponent", projectId: 18 },
    { id: 39, name: "Logroño Centro", projectId: 19 },
    { id: 40, name: "Logroño Oeste", projectId: 19 },
    { id: 41, name: "Badajoz Centro", projectId: 20 },
    { id: 42, name: "Badajoz Valdepasillas", projectId: 20 },
    { id: 43, name: "Salamanca Centro", projectId: 21 },
    { id: 44, name: "Salamanca Garrido", projectId: 21 },
    { id: 45, name: "Cáceres Centro", projectId: 22 },
    { id: 46, name: "Cáceres Mejostilla", projectId: 22 },
    { id: 47, name: "Castellón Centro", projectId: 23 },
    { id: 48, name: "Castellón Grao", projectId: 23 },
    { id: 49, name: "Albacete Centro", projectId: 24 },
    { id: 50, name: "Albacete Villacerrada", projectId: 24 },
    { id: 51, name: "Toledo Centro", projectId: 25 },
    { id: 52, name: "Toledo Polígono", projectId: 25 },
    { id: 53, name: "Burgos Centro", projectId: 26 },
    { id: 54, name: "Burgos Gamonal", projectId: 26 },
    { id: 55, name: "León Centro", projectId: 27 },
    { id: 56, name: "León Eras de Renueva", projectId: 27 },
  ],
  filters: defaultFilters,

  setCompanies: (companies) => set({ companies }),
  setProjects: (projects) => set({ projects }),
  setLocations: (locations) => set({ locations }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: defaultFilters }),
}));