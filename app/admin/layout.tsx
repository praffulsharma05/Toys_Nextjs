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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      {/* Admin Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid var(--color-outline-variant)',
        }}
      >
        <div className="container-max" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/admin" className="brand-logo-toyjoy">
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary)' }}>
                shield
              </span>
              <span className="brand-title" style={{ fontSize: '24px' }}>Toy Joy Admin</span>
            </Link>
            <span
              style={{
                background: 'var(--color-surface-container-highest)',
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '9999px',
              }}
            >
              MySQL Connected
            </span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/admin" className="nav-link-active">
              Manage Products
            </Link>

            <Link href="/admin/add" className="btn-primary-toyjoy">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
              <span>Add New Toy</span>
            </Link>

            <Link href="/" target="_blank" className="btn-whatsapp-toyjoy" style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--color-surface-container-highest)', color: 'var(--color-on-surface)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>open_in_new</span>
              <span>Storefront</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Admin Body */}
      <main style={{ flex: 1, padding: '32px 0' }}>
        <div className="container-max">{children}</div>
      </main>
    </div>
  );
}
