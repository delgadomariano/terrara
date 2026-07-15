import Link from 'next/link';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <Link href="/dashboard" className={styles.logo}>
          <span>🌿</span> Terrara Admin
        </Link>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>Resumen</Link>
          <Link href="/dashboard/blog" className={styles.navLink}>Blog</Link>
          <Link href="/dashboard/productos" className={styles.navLink}>Productos</Link>
        </nav>
        <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
          <Link href="/" className={styles.navLink} style={{ display: 'block' }}>Ir al sitio público</Link>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
