import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.content}>
          <div>
            <div className={styles.logo}>🌿 Terrara</div>
            <p className={styles.description}>
              Descubre el mundo de los terrarios, las plantas exóticas y la magia de conectar con la naturaleza en tu propio hogar.
            </p>
          </div>
          <div>
            <h3 className={styles.title}>Explorar</h3>
            <div className={styles.links}>
              <Link href="/" className={styles.link}>Inicio</Link>
              <Link href="/blog" className={styles.link}>Blog</Link>
              <Link href="/tienda" className={styles.link}>Tienda</Link>
              <Link href="/libro" className={styles.link}>Mi Libro</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.title}>Legal</h3>
            <div className={styles.links}>
              <Link href="/terminos" className={styles.link}>Términos y Condiciones</Link>
              <Link href="/privacidad" className={styles.link}>Política de Privacidad</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          © {new Date().getFullYear()} Terrara. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
