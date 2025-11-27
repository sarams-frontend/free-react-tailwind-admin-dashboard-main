import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import PageMeta from '@/components/common/PageMeta';
import UsersTable from '@/components/tables/UsersTable';

export default function Users() {
  return (
    <>
      <PageMeta
        title="Snsorial - Users Management"
        description="Snsorial - Users Management Dashboard"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="Users List"> 
          <UsersTable />
        </ComponentCard>
      </div>
    </>
  );
}
