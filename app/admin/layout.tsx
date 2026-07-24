import Link from 'next/link';
import { Sparkles, PlusCircle, LayoutDashboard, ExternalLink, Package, Shield } from 'lucide-react';

export const metadata = {
  title: 'Admin Panel | ToyVerse Inventory Management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b0f17' }}>
      {/* Admin Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" className="brand-logo" style={{ fontSize: '1.4rem' }}>
              <Shield className="w-6 h-6 text-red-500" />
              <span>ToyVerse Admin</span>
            </Link>
            <span
              style={{
                background: 'rgba(0, 180, 216, 0.15)',
                color: 'var(--accent-tertiary)',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              MySQL Active
            </span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/admin"
              className="btn-admin"
              style={{ padding: '0.55rem 1rem' }}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Manage Products</span>
            </Link>

            <Link
              href="/admin/add"
              className="btn-primary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Toy</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="btn-admin"
              style={{ padding: '0.55rem 1rem', borderColor: 'rgba(255, 183, 3, 0.4)' }}
            >
              <ExternalLink className="w-4 h-4 text-yellow-400" />
              <span>View Storefront</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Admin Body */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
