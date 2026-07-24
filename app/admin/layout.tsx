import Link from 'next/link';

export const metadata = {
  title: 'Toy Joy Admin | Inventory Management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-container-flex bg-surface">
      {/* Admin Header */}
      <header
        className="admin-sticky-header"
      >
        <div className="container-max admin-header-flex">
          <div className="admin-brand-wrap">
            <Link href="/admin" className="brand-logo-toyjoy">
              <span className="material-symbols-outlined admin-shield-icon">
                shield
              </span>
              <span className="brand-title admin-brand-title">Toy Joy Admin</span>
            </Link>
            <span
              className="admin-db-badge"
            >
              MySQL Connected
            </span>
          </div>

          <nav className="admin-nav-flex">
            <Link href="/admin" className="nav-link-active">
              Manage Products
            </Link>

            <Link href="/admin/add" className="btn-primary-toyjoy">
              <span className="material-symbols-outlined admin-add-icon">add_circle</span>
              <span>Add New Toy</span>
            </Link>

            <Link href="/" target="_blank" className="btn-whatsapp-toyjoy admin-store-link">
              <span className="material-symbols-outlined admin-store-icon">open_in_new</span>
              <span>Storefront</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="admin-main-body">
        <div className="container-max">{children}</div>
      </main>
    </div>
  );
}
