import { PageBreadCrumb, PageMeta, ComponentCard } from '@/components/common';
import { LocationsTable } from '@/components/tables';

export default function Locations() {
  return (
    <div>
      <PageMeta
        title="Snsorial - Locations Management"
        description="Snsorial - Locations Management Dashboard"
      />
      <PageBreadCrumb pageTitle="Locations" />
      <div className="space-y-6">
        <ComponentCard title="Locations List"> 
          <LocationsTable />
        </ComponentCard>
      </div>
    </div>
  );
}
