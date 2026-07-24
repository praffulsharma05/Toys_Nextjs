import AdminLayout from './admin/layout';
import AdminDashboard from './admin/page';

export const revalidate = 0;

export default function RootPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
