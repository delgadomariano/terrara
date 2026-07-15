'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from './CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span> Terrara
        </Link>
        <nav className={styles.links}>
          <Link href="/" className={styles.link}>Inicio</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
          <Link href="/tienda" className={styles.link}>Tienda</Link>
          <Link href="/libro" className={styles.link}>Mi Libro</Link>
        </nav>
        <div className={styles.actions}>
          <Link href="/carrito" style={{ textDecoration: 'none' }}>
            <button className={styles.cartBtn} aria-label="Carrito de compras" style={{ cursor: 'pointer' }}>
              🛒
              {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
