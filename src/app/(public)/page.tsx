import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Dale vida a tus espacios con Terrara</h1>
          <p className={styles.subtitle}>
            Descubre terrarios únicos, plantas exóticas y la magia de conectar con la naturaleza en tu propio hogar. Aprende, compra y crea con nosotros.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/tienda" className="btn-primary">
              Visitar Tienda
            </Link>
            <Link href="/libro" className={styles.btnSecondaryWhite}>
              Conocer el Libro
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className={styles.sectionTitle}>Últimas Notas del Blog</h2>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Próximamente compartiremos artículos increíbles sobre el cuidado de terrarios...</p>
        </div>
      </section>
    </div>
  );
}
